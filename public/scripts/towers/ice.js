/**
 * Ice Tower
 * Slows enemies without dealing heavy damage
 */

class IceTower extends Tower {
    constructor(gridX, gridY) {
        super(gridX, gridY, 'ice');
    }

    onShoot(target, allTargets) {
        const targets = gameState.getEnemiesInRange(this.x, this.y, this.stats.range * CONFIG.GAME.GRID_SIZE);
        targets.forEach(enemy => {
            this.applyFreeze(enemy);
        });
        particleSystem.emitFreeze(target.x, target.y);
    }

    applyFreeze(enemy) {
        enemy.isSlowed = true;
        enemy.slowMultiplier = 1 - (this.stats.slowAmount || 0.5);
        enemy.slowEndFrame = gameState.frameCount + (this.stats.slowDuration || 120);

        setTimeout(() => {
            if (gameState.frameCount >= enemy.slowEndFrame) {
                enemy.isSlowed = false;
                enemy.slowMultiplier = 1;
            }
        }, this.stats.slowDuration * 16);
    }
}
