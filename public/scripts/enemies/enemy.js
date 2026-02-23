/**
 * Enemy Base Class
 * Base functionality for all enemy types
 */

class Enemy {
    constructor(type, waveNumber) {
        this.type = type;
        this.waveNumber = waveNumber;
        this.enemyData = CONSTANTS.ENEMY_TYPES[type];

        // Position
        this.pathProgress = 0;
        this.x = 0;
        this.y = 0;

        // Stats with difficulty scaling
        const diffMult = gameState.difficultyMultiplier || applyDifficulty('normal');
        this.maxHp = getEnemyHealth(this.enemyData.baseHealth, waveNumber);
        this.hp = this.maxHp;
        this.baseSpeed = this.enemyData.baseSpeed;
        this.speed = this.baseSpeed;
        this.armor = this.enemyData.armor || 0;
        this.reward = getEnemyReward(this.enemyData.baseReward, waveNumber);

        // Status effects
        this.isSlowed = false;
        this.slowMultiplier = 1;
        this.slowEndFrame = 0;
        this.isBurning = false;
        this.burnStack = 0;
        this.burnEndFrame = 0;
        this.timeWarpMultiplier = 1;
        this.timeWarpEndFrame = 0;

        // Timing
        this.spawnFrame = gameState.frameCount;
        this.updatePosition();
    }

    updatePosition() {
        if (gameState.gameMap && gameState.gameMap.path) {
            const path = gameState.gameMap.path;
            const pathLength = path.length;
            const index = Math.min(
                Math.floor(this.pathProgress * (pathLength - 1)),
                pathLength - 1
            );
            const nextIndex = Math.min(index + 1, pathLength - 1);

            const current = path[index];
            const next = path[nextIndex];
            const t = (this.pathProgress * (pathLength - 1)) % 1;

            this.x = Physics.lerp(current.x * CONFIG.GAME.GRID_SIZE, next.x * CONFIG.GAME.GRID_SIZE, t);
            this.y = Physics.lerp(current.y * CONFIG.GAME.GRID_SIZE, next.y * CONFIG.GAME.GRID_SIZE, t);
        }
    }

    update() {
        if (this.hp <= 0) return;

        // Update status effects
        if (gameState.frameCount > this.slowEndFrame) {
            this.isSlowed = false;
            this.slowMultiplier = 1;
        }
        if (gameState.frameCount > this.timeWarpEndFrame) {
            this.timeWarpMultiplier = 1;
        }

        // Calculate actual speed
        let actualSpeed = this.baseSpeed * this.slowMultiplier * this.timeWarpMultiplier;
        actualSpeed *= gameState.gameSpeed;

        this.pathProgress += (actualSpeed * 0.01) / gameState.tickRate;

        if (this.pathProgress >= 1) {
            gameState.lives--;
            this.hp = 0;
            gameState.emit(CONSTANTS.UI_EVENT.ENEMY_ESCAPED);
            audioSystem.playSoundEffect(CONSTANTS.SOUNDS.ENEMY_ESCAPE);
            return;
        }

        this.updatePosition();
    }

    applyDamage(damage) {
        const actualDamage = damage * (1 - this.armor);
        this.hp -= actualDamage;

        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        this.hp = 0;
        gameState.statistics.totalEnemiesKilled++;
    }

    getInfo() {
        return {
            name: this.enemyData.name,
            emoji: this.enemyData.emoji,
            type: this.type,
            hp: Math.ceil(this.hp),
            maxHp: Math.ceil(this.maxHp),
            speed: this.speed,
            armor: this.armor,
            reward: this.reward,
        };
    }

    isAlive() {
        return this.hp > 0;
    }

    draw(ctx, offsetX, offsetY, scale) {
        renderer.drawEnemy(this);
    }
}
