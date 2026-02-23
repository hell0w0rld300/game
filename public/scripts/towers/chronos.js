/**
 * Chronos Tower
 * Warps time in an area, slowing enemies
 */

class ChronosTower extends Tower {
    constructor(gridX, gridY) {
        super(gridX, gridY, 'chronos');
        this.timeWarpActive = false;
    }

    onShoot(target, allTargets) {
        const timeWarpRadius = (this.stats.timeWarpRadius || 3) * CONFIG.GAME.GRID_SIZE;
        const affectedEnemies = gameState.enemies.filter(e =>
            Physics.distance(this.x, this.y, e.x, e.y) <= timeWarpRadius && e.hp > 0
        );

        affectedEnemies.forEach(enemy => {
            this.applyTimeWarp(enemy);
        });

        particleSystem.emit(this.x, this.y, CONSTANTS.PARTICLE_TYPE.SPARK, 8, 1.5);
    }

    applyTimeWarp(enemy) {
        const intensity = this.stats.timeWarpIntensity || 0.7;
        enemy.timeWarpMultiplier = intensity;
        enemy.timeWarpEndFrame = gameState.frameCount + 60;

        setTimeout(() => {
            if (gameState.frameCount >= enemy.timeWarpEndFrame) {
                enemy.timeWarpMultiplier = 1;
            }
        }, 1000);
    }
}
