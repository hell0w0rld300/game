/**
 * Game State Management
 * Central state store for the entire game
 */

class GameState {
    constructor() {
        this.reset();
        this.eventListeners = {};
    }

    reset() {
        this.gameMode = CONSTANTS.GAME_STATE.MENU;
        this.isMultiplayer = false;
        this.roomCode = null;
        this.playerId = this.generateId();

        // Game progress
        this.currentWave = 0;
        this.totalWaves = 10;
        this.lives = 20;
        this.maxLives = 20;
        this.gold = 500;
        this.score = 0;
        this.isPaused = false;
        this.gameOver = false;
        this.victory = false;

        // Collections
        this.towers = [];
        this.enemies = [];
        this.projectiles = [];
        this.particles = [];
        this.effects = [];

        // Game timing
        this.deltaTime = 0;
        this.totalTime = 0;
        this.frameCount = 0;
        this.gameSpeed = 1;
        this.tickRate = CONFIG.GAME.TICKS_PER_SECOND;

        // Wave management
        this.waveInProgress = false;
        this.waveStartTime = 0;
        this.waveDuration = 30;
        this.enemySpawned = 0;
        this.totalEnemiesThisWave = 0;

        // Input
        this.selectedTowerType = null;
        this.hoveredTower = null;
        this.mouseX = 0;
        this.mouseY = 0;

        // Settings
        this.difficulty = 'normal';
        this.difficultyMultiplier = applyDifficulty(this.difficulty);
        this.language = 'en';

        // Statistics
        this.statistics = {
            totalEnemiesKilled: 0,
            totalDamageDealt: 0,
            totalGoldEarned: 0,
            towersBuilt: 0,
            towersUpgraded: 0,
            towersSold: 0,
            startTime: Date.now(),
            endTime: null,
        };
    }

    // Event system
    on(eventName, callback) {
        if (!this.eventListeners[eventName]) {
            this.eventListeners[eventName] = [];
        }
        this.eventListeners[eventName].push(callback);
    }

    off(eventName, callback) {
        if (this.eventListeners[eventName]) {
            this.eventListeners[eventName] = this.eventListeners[eventName].filter(cb => cb !== callback);
        }
    }

    emit(eventName, data = {}) {
        if (this.eventListeners[eventName]) {
            this.eventListeners[eventName].forEach(callback => callback(data));
        }
    }

    // Utility methods
    generateId() {
        return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Tower management
    addTower(tower) {
        this.towers.push(tower);
        this.statistics.towersBuilt++;
        this.emit(CONSTANTS.UI_EVENT.TOWER_PLACED, {tower});
    }

    removeTower(tower) {
        const index = this.towers.indexOf(tower);
        if (index > -1) {
            this.towers.splice(index, 1);
            this.emit(CONSTANTS.UI_EVENT.TOWER_SOLD, {tower});
        }
    }

    getTowerAt(gridX, gridY) {
        return this.towers.find(t => t.gridX === gridX && t.gridY === gridY);
    }

    // Enemy management
    addEnemy(enemy) {
        this.enemies.push(enemy);
        this.totalEnemiesThisWave++;
        this.emit(CONSTANTS.UI_EVENT.ENEMY_KILLED, {enemy});
    }

    removeEnemy(enemy) {
        const index = this.enemies.indexOf(enemy);
        if (index > -1) {
            this.enemies.splice(index, 1);
            this.statistics.totalEnemiesKilled++;
        }
    }

    getEnemiesInRange(x, y, range) {
        return this.enemies.filter(e =>
            Math.hypot(e.x - x, e.y - y) <= range && e.hp > 0
        );
    }

    // Projectile management
    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }

    removeProjectile(projectile) {
        const index = this.projectiles.indexOf(projectile);
        if (index > -1) {
            this.projectiles.splice(index, 1);
        }
    }

    // Particle management
    addParticle(particle) {
        if (this.particles.length < CONFIG.PARTICLES.MAX_PARTICLES) {
            this.particles.push(particle);
        }
    }

    removeParticle(particle) {
        const index = this.particles.indexOf(particle);
        if (index > -1) {
            this.particles.splice(index, 1);
        }
    }

    // Resource management
    spendGold(amount) {
        if (this.gold >= amount) {
            this.gold -= amount;
            return true;
        }
        return false;
    }

    earnGold(amount) {
        this.gold += amount;
        this.statistics.totalGoldEarned += amount;
    }

    addScore(amount) {
        this.score += amount;
    }

    takeDamage(amount) {
        this.lives -= amount;
        if (this.lives <= 0) {
            this.lives = 0;
            this.gameOver = true;
            this.victory = false;
            this.statistics.endTime = Date.now();
        }
    }

    // Wave management
    startWave() {
        if (this.currentWave >= this.totalWaves) {
            this.victory = true;
            this.gameOver = true;
            this.statistics.endTime = Date.now();
            this.emit(CONSTANTS.UI_EVENT.WAVE_COMPLETED);
            return false;
        }

        this.currentWave++;
        this.waveInProgress = true;
        this.waveStartTime = this.totalTime;
        this.enemySpawned = 0;
        this.totalEnemiesThisWave = getWaveSize(this.currentWave - 1, this.difficulty);

        this.emit(CONSTANTS.UI_EVENT.WAVE_STARTED, {
            waveNumber: this.currentWave,
            totalEnemies: this.totalEnemiesThisWave,
        });

        return true;
    }

    completeWave() {
        this.waveInProgress = false;
        this.emit(CONSTANTS.UI_EVENT.WAVE_COMPLETED, {
            waveNumber: this.currentWave,
        });
    }

    // Game state queries
    isGameActive() {
        return !this.gameOver && !this.isPaused && this.gameMode === CONSTANTS.GAME_STATE.PLAYING;
    }

    canAffordTower(towerType) {
        const towerData = CONSTANTS.TOWER_TYPES[towerType];
        return this.gold >= towerData.baseCost;
    }

    getGameProgress() {
        return {
            waveProgress: this.currentWave / this.totalWaves,
            healthPercent: this.lives / this.maxLives,
            score: this.score,
            gold: this.gold,
        };
    }

    // Statistics
    getStatistics() {
        const duration = (this.statistics.endTime || Date.now()) - this.statistics.startTime;
        return {
            ...this.statistics,
            duration: Math.floor(duration / 1000),
            finalScore: this.score,
            wavesSurvived: this.currentWave,
            towersActive: this.towers.length,
        };
    }

    exportState() {
        return {
            gameMode: this.gameMode,
            isMultiplayer: this.isMultiplayer,
            playerId: this.playerId,
            currentWave: this.currentWave,
            lives: this.lives,
            gold: this.gold,
            score: this.score,
            towers: this.towers.map(t => ({
                type: t.type,
                gridX: t.gridX,
                gridY: t.gridY,
                level: t.level,
            })),
            enemies: this.enemies.map(e => ({
                type: e.type,
                pathProgress: e.pathProgress,
                hp: e.hp,
                maxHp: e.maxHp,
            })),
        };
    }

    importState(state) {
        Object.assign(this, state);
    }
}

// Global game state instance
const gameState = new GameState();

// Save/Load functionality
function saveGameState() {
    const state = gameState.exportState();
    localStorage.setItem('gameState', JSON.stringify(state));
}

function loadGameState() {
    const saved = localStorage.getItem('gameState');
    if (saved) {
        try {
            gameState.importState(JSON.parse(saved));
            return true;
        } catch (e) {
            console.error('Failed to load game state:', e);
            return false;
        }
    }
    return false;
}

function clearGameState() {
    localStorage.removeItem('gameState');
    gameState.reset();
}
