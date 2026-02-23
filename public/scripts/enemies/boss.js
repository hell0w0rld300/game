/**
 * Boss Enemy
 * Appears every 5 waves, massive HP
 */

class BossEnemy extends Enemy {
    constructor(waveNumber) {
        super('boss', waveNumber);
        this.isBoss = true;
        this.shieldActive = false;
        this.shieldHP = this.maxHp * 0.2;
        this.shieldMaxHP = this.shieldHP;
    }

    update() {
        if (this.hp <= 0) {
            this.showBossDefeated();
            return;
        }

        // Regenerate shield every 10 seconds if not hit
        if (this.shieldHP < this.shieldMaxHP && gameState.frameCount % (10 * gameState.tickRate) === 0) {
            this.shieldHP = Math.min(this.shieldMaxHP, this.shieldHP + 10);
        }

        super.update();
    }

    applyDamage(damage) {
        if (this.shieldHP > 0) {
            // Damage shield first
            this.shieldHP -= damage;
            if (this.shieldHP < 0) {
                damage = -this.shieldHP;
                this.shieldHP = 0;
                this.hp -= damage;
            }
        } else {
            this.hp -= damage * (1 - this.armor);
        }

        if (this.hp <= 0) {
            this.die();
        }
    }

    showBossDefeated() {
        // Bonus points for defeating boss
        gameState.addScore(500);
    }

    draw(ctx, offsetX, offsetY, scale) {
        super.draw(ctx, offsetX, offsetY, scale);

        // Draw boss aura
        const x = offsetX + this.x * scale;
        const y = offsetY + this.y * scale;
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 15 * scale, 0, Math.PI * 2);
        ctx.stroke();

        // Draw shield indicator
        if (this.shieldHP > 0) {
            ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
            ctx.beginPath();
            ctx.arc(x, y, 18 * scale, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
