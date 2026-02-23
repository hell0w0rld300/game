/**
 * Rendering System
 * Handles all canvas drawing operations
 */

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.offset = {x: 0, y: 0};
        this.scale = 1;
        this.gameMap = null;
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    drawBackground() {
        const ctx = this.ctx;
        ctx.fillStyle = '#1e3c72';
        ctx.fillRect(0, 0, this.width, this.height);

        // Grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 0.5;
        const gridSize = CONFIG.GAME.GRID_SIZE * this.scale;

        for (let x = 0; x < this.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
            ctx.stroke();
        }

        for (let y = 0; y < this.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
            ctx.stroke();
        }
    }

    drawPath(path) {
        const ctx = this.ctx;
        ctx.strokeStyle = 'rgba(251, 193, 36, 0.3)';
        ctx.lineWidth = CONFIG.GAME.GRID_SIZE * this.scale - 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        path.forEach((point, index) => {
            const x = this.offset.x + point.x * this.scale;
            const y = this.offset.y + point.y * this.scale;
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Draw start and end markers
        if (path.length > 0) {
            ctx.fillStyle = '#10b981';
            ctx.beginPath();
            ctx.arc(
                this.offset.x + path[0].x * this.scale,
                this.offset.y + path[0].y * this.scale,
                8,
                0,
                Math.PI * 2
            );
            ctx.fill();

            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(
                this.offset.x + path[path.length - 1].x * this.scale,
                this.offset.y + path[path.length - 1].y * this.scale,
                8,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    }

    drawTower(tower) {
        const ctx = this.ctx;
        const x = this.offset.x + tower.x * this.scale;
        const y = this.offset.y + tower.y * this.scale;
        const size = (CONFIG.GAME.GRID_SIZE * 0.8 * this.scale) / 2;

        // Tower body
        const towerData = CONSTANTS.TOWER_TYPES[tower.type];
        ctx.fillStyle = towerData.color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Tower glow on selection
        if (gameState.selectedTowerType === tower.type) {
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, size + 2, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Tower emoji/symbol
        ctx.font = `${Math.floor(size * 1.2)}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(towerData.emoji, x, y);

        // Level indicator
        if (tower.level > 1) {
            ctx.fillStyle = '#fbbf24';
            ctx.font = `bold ${Math.floor(size * 0.6)}px Arial`;
            ctx.fillText(tower.level, x + size - 4, y - size + 4);
        }

        // Range indicator (if hovering)
        if (gameState.hoveredTower === tower) {
            ctx.strokeStyle = 'rgba(251, 191, 36, 0.2)';
            ctx.lineWidth = 1;
            const rangePixels = tower.range * this.scale;
            ctx.beginPath();
            ctx.arc(x, y, rangePixels, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    drawEnemy(enemy) {
        const ctx = this.ctx;
        const x = this.offset.x + enemy.x * this.scale;
        const y = this.offset.y + enemy.y * this.scale;
        const size = 10 * this.scale;

        // Enemy body
        ctx.fillStyle = enemy.type === 'boss' ? '#ef4444' : '#666';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Enemy emoji
        ctx.font = `${Math.floor(size * 1.3)}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const enemyData = CONSTANTS.ENEMY_TYPES[enemy.type];
        ctx.fillText(enemyData.emoji, x, y);

        // Health bar
        const barWidth = 20 * this.scale;
        const healthPercent = enemy.hp / enemy.maxHp;
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(x - barWidth / 2, y - size - 8, barWidth * healthPercent, 3);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.strokeRect(x - barWidth / 2, y - size - 8, barWidth, 3);

        // Status effects
        if (enemy.isSlowed) {
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x, y, size + 2, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    drawProjectiles(projectiles) {
        projectiles.forEach(projectile => {
            projectile.draw(this.ctx, this.offset.x, this.offset.y, this.scale);
        });
    }

    drawParticles(particles) {
        particleSystem.draw(this.ctx, this.offset.x, this.offset.y, this.scale);
    }

    drawBossHealthBar() {
        const boss = gameState.enemies.find(e => e.type === 'boss' && e.hp > 0);
        if (!boss) return;

        const ctx = this.ctx;
        const barWidth = 400;
        const barHeight = 30;
        const x = (this.width - barWidth) / 2;
        const y = this.height - 60;

        // Background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(x, y, barWidth, barHeight);

        // Boss name
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#ef4444';
        ctx.textAlign = 'left';
        ctx.fillText('BOSS - ' + CONSTANTS.ENEMY_TYPES.boss.emoji, x + 10, y + 12);

        // Health bar
        const healthPercent = boss.hp / boss.maxHp;
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(x + 10, y + 18, (barWidth - 20) * healthPercent, 10);

        // Border
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth, barHeight);

        // HP text
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'right';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(`${Math.floor(boss.hp)}/${Math.floor(boss.maxHp)}`, x + barWidth - 10, y + 25);
    }

    drawUI() {
        // UI drawing handled by HTML/CSS
    }

    frame() {
        this.drawBackground();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

// Global renderer
let renderer = null;

function initRenderer() {
    const canvas = document.getElementById('gameCanvas');
    renderer = new Renderer(canvas);
    window.addEventListener('resize', () => renderer.resize());
}
