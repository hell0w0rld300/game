/**
 * Tower Base Class
 * Base functionality for all tower types
 */

class Tower {
    constructor(gridX, gridY, type) {
        this.gridX = gridX;
        this.gridY = gridY;
        this.x = (gridX + 0.5) * CONFIG.GAME.GRID_SIZE;
        this.y = (gridY + 0.5) * CONFIG.GAME.GRID_SIZE;
        this.type = type;
        this.level = 1;
        this.towerData = CONSTANTS.TOWER_TYPES[type];

        // Initialize stats
        this.baseStats = {...this.towerData.baseStats};
        this.stats = {...this.baseStats};
        this.applyLevelMultiplier();

        this.cost = this.towerData.baseCost;
        this.lastShotTime = 0;
        this.rotation = 0;
        this.targetEnemy = null;
        this.isActive = true;
        this.kills = 0;
        this.damageDealt = 0;
    }

    applyLevelMultiplier() {
        const multiplier = getTowerStatMultiplier(this.level);
        this.stats.damage = this.baseStats.damage * multiplier;
        if (this.baseStats.fireRate) {
            this.stats.fireRate = Math.max(1, this.baseStats.fireRate / multiplier);
        }
        if (this.baseStats.range) {
            this.stats.range = this.baseStats.range * (1 + (this.level - 1) * 0.1);
        }
    }

    upgrade() {
        if (this.level >= 3) return false;

        const upgradeCost = getTowerUpgradeCost(this.cost, this.level);
        if (!gameState.spendGold(upgradeCost)) {
            return false;
        }

        this.level++;
        this.applyLevelMultiplier();
        gameState.statistics.towersUpgraded++;
        audioSystem.playSoundEffect(CONSTANTS.SOUNDS.TOWER_UPGRADE);
        return true;
    }

    getUpgradeCost() {
        if (this.level >= 3) return 0;
        return getTowerUpgradeCost(this.cost, this.level);
    }

    canShoot() {
        const now = gameState.frameCount;
        return (now - this.lastShotTime) >= this.stats.fireRate;
    }

    shoot(enemies) {
        if (!this.canShoot()) return;

        const targets = gameState.getEnemiesInRange(this.x, this.y, this.stats.range * CONFIG.GAME.GRID_SIZE);
        if (targets.length === 0) return;

        this.lastShotTime = gameState.frameCount;
        const target = this.selectTarget(targets);
        this.targetEnemy = target;

        this.onShoot(target, targets);
        audioSystem.playSoundEffect(CONSTANTS.SOUNDS.TOWER_SHOOT);
    }

    selectTarget(enemies) {
        // Default: select first alive enemy
        return enemies[0];
    }

    onShoot(target, allTargets) {
        // Override in subclasses
    }

    applyDamage(enemy, damage) {
        const actualDamage = damage * (1 - enemy.armor);
        enemy.hp -= actualDamage;
        this.damageDealt += actualDamage;
        gameState.statistics.totalDamageDealt += actualDamage;

        if (enemy.hp <= 0) {
            this.kills++;
            gameState.removeEnemy(enemy);
            gameState.earnGold(enemy.reward);
            gameState.addScore(enemy.reward * 10);
            audioSystem.playSoundEffect(CONSTANTS.SOUNDS.ENEMY_DEATH);
            particleSystem.emitExplosion(enemy.x, enemy.y);
        }
    }

    getSellPrice() {
        return Math.floor(this.cost * CONFIG.TOWERS.SELL_REFUND);
    }

    getInfo() {
        return {
            name: this.towerData.name,
            emoji: this.towerData.emoji,
            level: this.level,
            stats: this.stats,
            cost: this.cost,
            upgradeCost: this.getUpgradeCost(),
            damage: this.stats.damage,
            fireRate: this.stats.fireRate,
            range: this.stats.range,
            dps: (this.stats.damage / (this.stats.fireRate / CONFIG.GAME.TICKS_PER_SECOND)).toFixed(2),
        };
    }

    update() {
        this.shoot(gameState.enemies);
    }

    draw(ctx, offsetX, offsetY, scale) {
        renderer.drawTower(this);
    }

    destroy() {
        this.isActive = false;
    }
}
