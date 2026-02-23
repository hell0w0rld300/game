/**
 * Arrow Tower
 * Fast attacking tower with low damage
 */

class ArrowTower extends Tower {
    constructor(gridX, gridY) {
        super(gridX, gridY, 'arrow');
    }

    onShoot(target, allTargets) {
        const projectile = physicsSystem.createProjectile(this, target);
        projectile.towerType = this.type;

        const checkCollisionInterval = setInterval(() => {
            if (!projectile.reachedTarget()) {
                const hit = physicsSystem.checkCollision(projectile, gameState.enemies);
                if (hit) {
                    this.applyDamage(hit, this.stats.damage);
                    physicsSystem.projectiles = physicsSystem.projectiles.filter(p => p !== projectile);
                    clearInterval(checkCollisionInterval);
                }
            } else {
                clearInterval(checkCollisionInterval);
            }
        }, 10);
    }
}
