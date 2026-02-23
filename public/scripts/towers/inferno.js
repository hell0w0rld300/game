/**
 * Inferno Tower
 * Burns enemies dealing damage over time
 */

class InfernoTower extends Tower {
    constructor(gridX, gridY) {
        super(gridX, gridY, 'inferno');
    }

    onShoot(target, allTargets) {
        const targets = gameState.getEnemiesInRange(this.x, this.y, this.stats.range * CONFIG.GAME.GRID_SIZE);
        targets.forEach(enemy => {
            this.applyBurn(enemy);
        });
        particleSystem.emitFire(target.x, target.y);
    }

    applyBurn(enemy) {
        if (!enemy.burnStack) enemy.burnStack = 0;
        enemy.burnStack += this.stats.damage * 0.5;
        enemy.isBurning = true;
        enemy.burnEndFrame = gameState.frameCount + (this.stats.burnDuration || 180);

        const tickDamage = this.stats.burnDamage || 2;
        const burnInterval = setInterval(() => {
            if (enemy.hp <= 0 || gameState.frameCount >= enemy.burnEndFrame) {
                enemy.isBurning = false;
                clearInterval(burnInterval);
                return;
            }
            enemy.hp -= tickDamage;
            this.damageDealt += tickDamage;
            if (enemy.hp <= 0) {
                this.kills++;
                gameState.removeEnemy(enemy);
                gameState.earnGold(enemy.reward);
                gameState.addScore(enemy.reward * 10);
            }
        }, 500);
    }
}
