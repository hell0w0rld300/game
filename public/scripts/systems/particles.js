/**
 * Particle System
 * Manages particle effects for visual feedback
 */

class Particle {
    constructor(x, y, vx, vy, type, duration = 30) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.type = type;
        this.life = duration;
        this.maxLife = duration;
        this.size = 3;
        this.rotation = 0;
        this.rotationSpeed = Math.random() * 0.1 - 0.05;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2; // gravity
        this.rotation += this.rotationSpeed;
        this.life--;
    }

    getAlpha() {
        return Math.max(0, this.life / this.maxLife);
    }

    draw(ctx, offsetX, offsetY, scale) {
        const x = offsetX + this.x * scale;
        const y = offsetY + this.y * scale;

        ctx.save();
        ctx.globalAlpha = this.getAlpha();
        ctx.translate(x, y);
        ctx.rotate(this.rotation);

        // Color based on type
        switch (this.type) {
            case CONSTANTS.PARTICLE_TYPE.EXPLOSION:
                ctx.fillStyle = '#fbbf24';
                break;
            case CONSTANTS.PARTICLE_TYPE.BLOOD:
                ctx.fillStyle = '#ef4444';
                break;
            case CONSTANTS.PARTICLE_TYPE.SMOKE:
                ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
                break;
            case CONSTANTS.PARTICLE_TYPE.SPARK:
                ctx.fillStyle = '#fbbf24';
                break;
            case CONSTANTS.PARTICLE_TYPE.ICE:
                ctx.fillStyle = '#3b82f6';
                break;
            case CONSTANTS.PARTICLE_TYPE.FIRE:
                ctx.fillStyle = '#ef4444';
                break;
        }

        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    isAlive() {
        return this.life > 0;
    }
}

class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    emit(x, y, type, count = 5, velocity = 2) {
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            const particle = new Particle(x, y, vx, vy, type, 30);
            this.particles.push(particle);
        }
    }

    emitExplosion(x, y) {
        this.emit(x, y, CONSTANTS.PARTICLE_TYPE.EXPLOSION, 8, 3);
        this.emit(x, y, CONSTANTS.PARTICLE_TYPE.SPARK, 5, 2);
    }

    emitBlood(x, y) {
        this.emit(x, y, CONSTANTS.PARTICLE_TYPE.BLOOD, 4, 2);
    }

    emitSmoke(x, y) {
        this.emit(x, y, CONSTANTS.PARTICLE_TYPE.SMOKE, 3, 1.5);
    }

    emitFreeze(x, y) {
        this.emit(x, y, CONSTANTS.PARTICLE_TYPE.ICE, 6, 2);
    }

    emitFire(x, y) {
        this.emit(x, y, CONSTANTS.PARTICLE_TYPE.FIRE, 5, 1.5);
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            if (!this.particles[i].isAlive()) {
                this.particles.splice(i, 1);
            }
        }
    }

    draw(ctx, offsetX, offsetY, scale) {
        this.particles.forEach(particle => {
            particle.draw(ctx, offsetX, offsetY, scale);
        });
    }

    clear() {
        this.particles = [];
    }
}

// Global particle system
const particleSystem = new ParticleSystem();
