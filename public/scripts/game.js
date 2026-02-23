/**
 * Main Game Loop
 * Core game engine with tick-based updates
 */

class Game {
    constructor() {
        this.isRunning = false;
        this.lastFrameTime = 0;
        this.tickDuration = 1000 / CONFIG.GAME.TICKS_PER_SECOND;
        this.accumulator = 0;
        this.animationFrameId = null;

        this.input = {
            mouseX: 0,
            mouseY: 0,
            lastMouseX: 0,
            lastMouseY: 0,
            isMouseDown: false,
        };

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Mouse events
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('mousedown', (e) => this.onMouseDown(e));
        document.addEventListener('mouseup', (e) => this.onMouseUp(e));
        document.addEventListener('contextmenu', (e) => this.onContextMenu(e));

        // Touch events
        document.addEventListener('touchstart', (e) => this.onTouchStart(e));
        document.addEventListener('touchmove', (e) => this.onTouchMove(e));
        document.addEventListener('touchend', (e) => this.onTouchEnd(e));

        // Keyboard events
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));

        // Window resize
        window.addEventListener('resize', () => {
            if (renderer) renderer.resize();
        });
    }

    onMouseMove(e) {
        const canvas = document.getElementById('gameCanvas');
        const rect = canvas.getBoundingClientRect();
        this.input.mouseX = e.clientX - rect.left;
        this.input.mouseY = e.clientY - rect.top;
        gameState.mouseX = this.input.mouseX;
        gameState.mouseY = this.input.mouseY;
    }

    onMouseDown(e) {
        if (e.button === 0) { // Left click
            this.input.isMouseDown = true;
            this.placeTowerAtMouse();
        }
    }

    onMouseUp(e) {
        this.input.isMouseDown = false;
    }

    onContextMenu(e) {
        e.preventDefault();
        this.sellTowerAtMouse();
    }

    onTouchStart(e) {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            this.onMouseMove({clientX: touch.clientX, clientY: touch.clientY});
            this.placeTowerAtMouse();
        }
    }

    onTouchMove(e) {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            this.onMouseMove({clientX: touch.clientX, clientY: touch.clientY});
        }
    }

    onTouchEnd(e) {
        this.input.isMouseDown = false;
    }

    onKeyDown(e) {
        // Pause with space
        if (e.code === 'Space') {
            e.preventDefault();
            gameState.isPaused = !gameState.isPaused;
            document.getElementById('pauseBtn').textContent = gameState.isPaused ? '▶' : '⏸';
        }

        // Speed with 'S'
        if (e.code === 'KeyS') {
            gameState.gameSpeed = gameState.gameSpeed === 1 ? 2 : 1;
            document.getElementById('speedBtn').textContent = gameState.gameSpeed === 1 ? '1×' : '2×';
        }

        // Tower hotkeys 1-6
        const towerKeys = ['1', '2', '3', '4', '5', '6'];
        const towerTypes = Object.keys(CONSTANTS.TOWER_TYPES);
        const keyIndex = towerKeys.indexOf(e.key);
        if (keyIndex >= 0 && keyIndex < towerTypes.length) {
            gameState.selectedTowerType = towerTypes[keyIndex];
            hud.updateTowerSelection();
        }
    }

    onKeyUp(e) {
        // Handle key up
    }

    placeTowerAtMouse() {
        if (!gameState.selectedTowerType || gameState.isPaused || gameState.gameOver) {
            return;
        }

        const canvas = document.getElementById('gameCanvas');
        const rect = canvas.getBoundingClientRect();
        const x = (this.input.mouseX - renderer.offset.x) / renderer.scale / CONFIG.GAME.GRID_SIZE;
        const y = (this.input.mouseY - renderer.offset.y) / renderer.scale / CONFIG.GAME.GRID_SIZE;

        const gridX = Math.floor(x);
        const gridY = Math.floor(y);

        // Check if valid placement
        if (gridX < 0 || gridX >= 20 || gridY < 0 || gridY >= 14) return;
        if (gameState.getTowerAt(gridX, gridY)) return;
        if (this.isOnPath(gridX, gridY)) return;

        const towerData = CONSTANTS.TOWER_TYPES[gameState.selectedTowerType];
        if (!gameState.spendGold(towerData.baseCost)) {
            hud.showNotification(t('notEnoughGold'), 'error');
            return;
        }

        const TowerClass = this.getTowerClass(gameState.selectedTowerType);
        const tower = new TowerClass(gridX, gridY);
        gameState.addTower(tower);
        hud.showNotification(t('tower_placed'), 'success');
    }

    sellTowerAtMouse() {
        const canvas = document.getElementById('gameCanvas');
        const x = (this.input.mouseX - renderer.offset.x) / renderer.scale / CONFIG.GAME.GRID_SIZE;
        const y = (this.input.mouseY - renderer.offset.y) / renderer.scale / CONFIG.GAME.GRID_SIZE;

        const gridX = Math.floor(x);
        const gridY = Math.floor(y);

        const tower = gameState.getTowerAt(gridX, gridY);
        if (tower) {
            const sellPrice = tower.getSellPrice();
            gameState.gold += sellPrice;
            gameState.removeTower(tower);
            hud.showNotification(t('towerSold'), 'success');
        }
    }

    isOnPath(gridX, gridY) {
        const path = gameState.gameMap.path;
        const px = (gridX + 0.5) * CONFIG.GAME.GRID_SIZE;
        const py = (gridY + 0.5) * CONFIG.GAME.GRID_SIZE;

        for (let point of path) {
            const pathX = point.x * CONFIG.GAME.GRID_SIZE;
            const pathY = point.y * CONFIG.GAME.GRID_SIZE;
            if (Math.hypot(pathX - px, pathY - py) < CONFIG.GAME.GRID_SIZE * 0.4) {
                return true;
            }
        }
        return false;
    }

    getTowerClass(type) {
        const map = {
            arrow: ArrowTower,
            cannon: CannonTower,
            ice: IceTower,
            tesla: TeslaTower,
            inferno: InfernoTower,
            chronos: ChronosTower,
        };
        return map[type] || ArrowTower;
    }

    update(deltaTime) {
        if (gameState.isPaused || gameState.gameOver) {
            return;
        }

        // Apply game speed
        deltaTime *= gameState.gameSpeed;
        gameState.deltaTime = deltaTime;
        gameState.totalTime += deltaTime / 1000;

        // Update systems
        waveSystem.update();
        gameState.towers.forEach(tower => tower.update());
        gameState.enemies.forEach(enemy => enemy.update());
        physicsSystem.update();
        particleSystem.update();

        // Check game over conditions
        if (gameState.lives <= 0) {
            gameState.gameOver = true;
            gameState.victory = false;
            hud.showGameOver();
        }

        if (gameState.victory && gameState.gameOver) {
            hud.showGameOver();
        }

        // Sync multiplayer
        if (gameState.isMultiplayer) {
            multiplayerSystem.sync();
        }
    }

    render() {
        // Clear canvas
        renderer.clear();
        renderer.frame();

        if (gameState.gameMode !== CONSTANTS.GAME_STATE.PLAYING) {
            return;
        }

        // Draw game elements
        renderer.drawPath(gameState.gameMap.path);
        gameState.enemies.forEach(enemy => {
            if (enemy.isAlive()) {
                enemy.draw(renderer.ctx, renderer.offset.x, renderer.offset.y, renderer.scale);
            }
        });
        gameState.towers.forEach(tower => {
            tower.draw(renderer.ctx, renderer.offset.x, renderer.offset.y, renderer.scale);
        });
        renderer.drawProjectiles(physicsSystem.projectiles);
        renderer.drawParticles(particleSystem.particles);
        renderer.drawBossHealthBar();

        // Update HUD
        hud.update();
    }

    tick() {
        const now = performance.now();
        const deltaTime = now - this.lastFrameTime || this.tickDuration;
        this.lastFrameTime = now;

        this.accumulator += deltaTime;

        // Fixed timestep update
        while (this.accumulator >= this.tickDuration) {
            this.update(this.tickDuration);
            gameState.frameCount++;
            this.accumulator -= this.tickDuration;
        }

        this.render();

        this.animationFrameId = requestAnimationFrame(() => this.tick());
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.tick();
        }
    }

    stop() {
        this.isRunning = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }
}

// Global game instance
let game = null;

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    game = new Game();
    game.start();

    // Listen for screen changes
    const observer = new MutationObserver(() => {
        const gameScreen = document.getElementById('gameScreen');
        if (gameScreen && gameScreen.style.display !== 'none') {
            if (!renderer) {
                initRenderer();
            }
        }
    });

    observer.observe(document.body, {subtree: true, attributes: true});

    // Start menu
    showScreen('mainMenu');
});
