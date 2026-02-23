/**
 * Cannon Tower
 * Splash damage tower with area of effect
 */

class CannonTower extends Tower {
    constructor(gridX, gridY) {
        super(gridX, gridY, 'cannon');
    }

    onShoot(target, allTargets) {
        const projectile = physicsSystem.createProjectile(this, target);
        projectile.towerType = this.type;
        projectile.splashRadius = (this.stats.splashRadius || 2) * CONFIG.GAME.GRID_SIZE;

        const checkCollisionInterval = setInterval(() => {
            if (!projectile.reachedTarget()) {
                const hit = physicsSystem.checkCollision(projectile, gameState.enemies);
                if (hit) {
                    // Apply splash damage
                    const splashTargets = gameState.enemies.filter(e =>
                        Physics.distance(projectile.x, projectile.y, e.x, e.y) <= projectile.splashRadius
                    );
                    splashTargets.forEach(enemy => {
                        const damage = this.stats.damage * (enemy === hit ? 1 : 0.7);
                        this.applyDamage(enemy, damage);
                    });
                    particleSystem.emitExplosion(projectile.x, projectile.y);
                    physicsSystem.projectiles = physicsSystem.projectiles.filter(p => p !== projectile);
                    clearInterval(checkCollisionInterval);
                }
            } else {
                clearInterval(checkCollisionInterval);
            }
        }, 10);
    }
}
