/**
 * Tesla Tower
 * Chains lightning to multiple enemies
 */

class TeslaTower extends Tower {
    constructor(gridX, gridY) {
        super(gridX, gridY, 'tesla');
    }

    selectTarget(enemies) {
        // Select enemy furthest along the path
        return enemies.reduce((furthest, current) =>
            current.pathProgress > furthest.pathProgress ? current : furthest
        );
    }

    onShoot(target, allTargets) {
        const chainCount = this.stats.chainCount || 3;
        const chained = this.getChainedEnemies(target, chainCount, allTargets);

        chained.forEach((enemy, index) => {
            const damage = this.stats.damage * Math.pow(0.8, index);
            this.applyDamage(enemy, damage);
        });
    }

    getChainedEnemies(start, chainCount, allTargets) {
        const chained = [start];
        let current = start;
        const chainRange = this.stats.range * CONFIG.GAME.GRID_SIZE * 1.5;

        for (let i = 1; i < chainCount; i++) {
            const nearest = allTargets.find(e =>
                !chained.includes(e) &&
                e.hp > 0 &&
                Physics.distance(current.x, current.y, e.x, e.y) <= chainRange
            );
            if (nearest) {
                chained.push(nearest);
                current = nearest;
            }
        }

        return chained;
    }
}
