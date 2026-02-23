/**
 * HUD System
 * Manages UI updates and display
 */

class HUD {
    constructor() {
        this.setupEventListeners();
        this.updateInterval = null;
    }

    setupEventListeners() {
        // Language button
        document.getElementById('languageBtn').addEventListener('click', () => {
            const newLang = currentLanguage === 'en' ? 'zh' : 'en';
            setLanguage(newLang);
            document.getElementById('languageBtn').textContent = newLang === 'en' ? 'EN' : '中';
        });

        // Pause button
        document.getElementById('pauseBtn').addEventListener('click', () => {
            gameState.isPaused = !gameState.isPaused;
            document.getElementById('pauseBtn').textContent = gameState.isPaused ? '▶' : '⏸';
        });

        // Speed button
        document.getElementById('speedBtn').addEventListener('click', () => {
            gameState.gameSpeed = gameState.gameSpeed === 1 ? 2 : 1;
            document.getElementById('speedBtn').textContent = gameState.gameSpeed === 1 ? '1×' : '2×';
        });

        // Menu button
        document.getElementById('menuBtn').addEventListener('click', () => {
            showScreen('mainMenu');
        });

        // Tower buttons
        const towerGrid = document.getElementById('towerGrid');
        Object.entries(CONSTANTS.TOWER_TYPES).forEach(([type, data]) => {
            const btn = document.createElement('button');
            btn.className = 'tower-btn';
            btn.innerHTML = `${data.emoji}<div class="tower-cost">${data.baseCost}</div>`;
            btn.addEventListener('click', () => {
                if (gameState.canAffordTower(type)) {
                    gameState.selectedTowerType = gameState.selectedTowerType === type ? null : type;
                    this.updateTowerSelection();
                } else {
                    this.showNotification(t('notEnoughGold'), 'error');
                }
            });
            towerGrid.appendChild(btn);
        });
    }

    update() {
        // Update HUD values
        document.getElementById('waveCounter').textContent = `${gameState.currentWave}/${gameState.totalWaves}`;
        document.getElementById('livesCounter').textContent = `❤️ ${gameState.lives}`;
        document.getElementById('goldCounter').textContent = `💰 ${gameState.gold}`;
        document.getElementById('scoreCounter').textContent = gameState.score;
        document.getElementById('enemyCounter').textContent = gameState.enemies.filter(e => e.isAlive()).length;
        document.getElementById('towerCounter').textContent = gameState.towers.length;

        // Update info panel
        this.updateInfoPanel();

        // Update stats panel
        this.updateStatsPanel();
    }

    updateTowerSelection() {
        document.querySelectorAll('.tower-btn').forEach((btn, idx) => {
            const types = Object.keys(CONSTANTS.TOWER_TYPES);
            if (types[idx] === gameState.selectedTowerType) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
    }

    updateInfoPanel() {
        const panel = document.getElementById('infoPanel');
        if (!gameState.selectedTowerType) {
            panel.innerHTML = '<p>Select a tower to see information</p>';
            return;
        }

        const towerData = CONSTANTS.TOWER_TYPES[gameState.selectedTowerType];
        const dps = (towerData.baseStats.damage / towerData.baseStats.fireRate * CONFIG.GAME.TICKS_PER_SECOND).toFixed(1);

        panel.innerHTML = `
            <div class="tower-name">${towerData.emoji} ${t(gameState.selectedTowerType)}</div>
            <div class="tower-stats">
                <div>💰 ${towerData.baseCost}</div>
                <div>⚔️ ${towerData.baseStats.damage}</div>
                <div>🎯 ${towerData.baseStats.range}</div>
                <div>⏱️ ${dps} DPS</div>
            </div>
        `;
    }

    updateStatsPanel() {
        const panel = document.getElementById('statsPanel');
        const stats = gameState.statistics;

        panel.innerHTML = `
            <div><span class="stats-label">Killed:</span> <span class="stats-value">${stats.totalEnemiesKilled}</span></div>
            <div><span class="stats-label">Towers:</span> <span class="stats-value">${gameState.towers.length}</span></div>
            <div><span class="stats-label">Waves:</span> <span class="stats-value">${gameState.currentWave}</span></div>
            <div><span class="stats-label">Gold Earned:</span> <span class="stats-value">${Math.floor(stats.totalGoldEarned)}</span></div>
        `;
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('gameNotifications');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        container.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    showGameOver() {
        const modal = document.getElementById('gameOverModal');
        const title = document.getElementById('gameOverTitle');
        const stats = document.getElementById('gameOverStats');

        const isVictory = gameState.victory;
        title.textContent = isVictory ? t('victory') : t('gameOver');
        title.className = isVictory ? 'victory' : 'defeat';

        const finalStats = gameState.getStatistics();
        stats.innerHTML = `
            <div>${t('wavesSurvived')}: <strong>${finalStats.wavesSurvived}</strong></div>
            <div>${t('towersBuilt')}: <strong>${finalStats.towersBuilt}</strong></div>
            <div>${t('enemiesKilled')}: <strong>${finalStats.totalEnemiesKilled}</strong></div>
            <div>${t('totalScore')}: <strong>${finalStats.finalScore}</strong></div>
        `;

        modal.style.display = 'flex';
    }

    hideGameOver() {
        document.getElementById('gameOverModal').style.display = 'none';
    }
}

const hud = new HUD();
