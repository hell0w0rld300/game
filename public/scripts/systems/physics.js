/**
 * Physics System
 * Handles collision detection and projectile motion
 */

class Projectile {
    constructor(x, y, targetX, targetY, type, damage, speed = 5) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.type = type;
        this.damage = damage;
        this.speed = speed;
        this.traveled = 0;
        this.totalDistance = Math.hypot(targetX - x, targetY - y);
        this.angle = Math.atan2(targetY - y, targetX - x);
    }

    update() {
        const dx = Math.cos(this.angle) * this.speed;
        const dy = Math.sin(this.angle) * this.speed;

        this.x += dx;
        this.y += dy;
        this.traveled += this.speed;
    }

    reachedTarget() {
        return this.traveled >= this.totalDistance;
    }

    draw(ctx, offsetX, offsetY, scale) {
        const x = offsetX + this.x * scale;
        const y = offsetY + this.y * scale;

        ctx.save();

        switch (this.type) {
            case CONSTANTS.PROJECTILE_TYPE.ARROW:
                ctx.strokeStyle = '#fbbf24';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x - Math.cos(this.angle) * 8, y - Math.sin(this.angle) * 8);
                ctx.lineTo(x + Math.cos(this.angle) * 8, y + Math.sin(this.angle) * 8);
                ctx.stroke();
                break;

            case CONSTANTS.PROJECTILE_TYPE.CANNON_BALL:
                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fill();
                break;

            case CONSTANTS.PROJECTILE_TYPE.ICE_BOLT:
                ctx.fillStyle = '#3b82f6';
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
                break;

            case CONSTANTS.PROJECTILE_TYPE.LIGHTNING:
                ctx.strokeStyle = '#fbbf24';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.targetX, this.targetY);
                ctx.stroke();
                break;

            case CONSTANTS.PROJECTILE_TYPE.FIRE:
                ctx.fillStyle = '#f97316';
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fill();
                break;
        }

        ctx.restore();
    }
}

class PhysicsSystem {
    constructor() {
        this.projectiles = [];
    }

    createProjectile(tower, target) {
        const projectile = new Projectile(
            tower.x,
            tower.y,
            target.x,
            target.y,
            this.getProjectileType(tower.type),
            tower.damage,
            3
        );
        this.projectiles.push(projectile);
        return projectile;
    }

    getProjectileType(towerType) {
        const typeMap = {
            arrow: CONSTANTS.PROJECTILE_TYPE.ARROW,
            cannon: CONSTANTS.PROJECTILE_TYPE.CANNON_BALL,
            ice: CONSTANTS.PROJECTILE_TYPE.ICE_BOLT,
            tesla: CONSTANTS.PROJECTILE_TYPE.LIGHTNING,
            inferno: CONSTANTS.PROJECTILE_TYPE.FIRE,
            chronos: CONSTANTS.PROJECTILE_TYPE.TIME_WARP,
        };
        return typeMap[towerType] || CONSTANTS.PROJECTILE_TYPE.ARROW;
    }

    update() {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.update();

            if (projectile.reachedTarget()) {
                this.projectiles.splice(i, 1);
            }
        }
    }

    checkCollision(projectile, enemies) {
        for (const enemy of enemies) {
            if (enemy.hp <= 0) continue;

            const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if (distance < 20) {
                return enemy;
            }
        }
        return null;
    }

    draw(ctx, offsetX, offsetY, scale) {
        this.projectiles.forEach(projectile => {
            projectile.draw(ctx, offsetX, offsetY, scale);
        });
    }

    clear() {
        this.projectiles = [];
    }
}

// Collision detection utilities
const Physics = {
    // Check if two circles overlap
    circleCollision(x1, y1, r1, x2, y2, r2) {
        const distance = Math.hypot(x2 - x1, y2 - y1);
        return distance < r1 + r2;
    },

    // Check if a point is in range
    pointInRange(x1, y1, x2, y2, range) {
        return Math.hypot(x2 - x1, y2 - y1) <= range;
    },

    // Get distance between two points
    distance(x1, y1, x2, y2) {
        return Math.hypot(x2 - x1, y2 - y1);
    },

    // Linearly interpolate between two values
    lerp(a, b, t) {
        return a + (b - a) * t;
    },

    // Clamp value between min and max
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },

    // Vector normalization
    normalize(x, y) {
        const length = Math.hypot(x, y);
        if (length === 0) return {x: 0, y: 0};
        return {x: x / length, y: y / length};
    },
};

// Global physics system
const physicsSystem = new PhysicsSystem();
