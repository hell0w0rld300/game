/**
 * Armored Enemy
 * High HP, slow, resistant
 */

class ArmoredEnemy extends Enemy {
    constructor(waveNumber) {
        super('armored', waveNumber);
        // Armored enemies have natural armor reduction
        this.armor = Math.max(0.3, this.armor);
    }
}
