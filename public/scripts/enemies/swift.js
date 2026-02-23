/**
 * Swift Enemy
 * Low HP, very fast
 */

class SwiftEnemy extends Enemy {
    constructor(waveNumber) {
        super('swift', waveNumber);
        // Swift enemies are harder to slow
        this.baseslowResistance = 0.5;
    }

    applySlowEffect(slowMultiplier) {
        // Reduce effectiveness of slow
        this.slowMultiplier = 1 - ((1 - slowMultiplier) * this.baseSlowResistance);
    }
}
