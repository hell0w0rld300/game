/**
 * Wave System
 * Manages enemy spawning and wave progression
 */

class WaveSystem {
    constructor() {
        this.currentWave = 0;
        this.totalWaves = 10;
        this.waveInProgress = false;
        this.waveDuration = 30;
        this.waveStartTime = 0;
        this.waveTimerInterval = null;
        this.spawnedInWave = 0;
        this.totalEnemiesInWave = 0;
    }

    startWave() {
        if (gameState.currentWave >= gameState.totalWaves) {
            gameState.victory = true;
            gameState.gameOver = true;
            return false;
        }

        gameState.currentWave++;
        gameState.waveInProgress = true;
        this.waveStartTime = gameState.totalTime;
        this.spawnedInWave = 0;
        this.totalEnemiesInWave = getWaveSize(gameState.currentWave - 1, gameState.difficulty);

        gameState.emit(CONSTANTS.UI_EVENT.WAVE_STARTED, {
            waveNumber: gameState.currentWave,
            totalEnemies: this.totalEnemiesInWave,
        });

        audioSystem.playSoundEffect(CONSTANTS.SOUNDS.WAVE_START);
        return true;
    }

    spawnEnemy() {
        if (this.spawnedInWave >= this.totalEnemiesInWave) {
            return false;
        }

        let enemyType = 'normal';
        const rand = Math.random();

        if (gameState.currentWave > 3 && rand < 0.3) {
            enemyType = Math.random() < 0.5 ? 'armored' : 'swift';
        }

        // Boss spawn
        if (gameState.currentWave % 5 === 0 && this.spawnedInWave === this.totalEnemiesInWave - 1) {
            enemyType = 'boss';
        }

        const EnemyClass = {
            normal: NormalEnemy,
            armored: ArmoredEnemy,
            swift: SwiftEnemy,
            boss: BossEnemy,
        }[enemyType];

        const enemy = new EnemyClass(gameState.currentWave - 1);
        gameState.addEnemy(enemy);
        this.spawnedInWave++;

        return true;
    }

    update() {
        if (!gameState.waveInProgress) return;

        // Spawn enemies gradually
        const spawnRate = 0.5; // enemies per second
        const timeSinceWaveStart = gameState.totalTime - this.waveStartTime;
        const shouldSpawn = Math.floor(timeSinceWaveStart * spawnRate) > this.spawnedInWave;

        if (shouldSpawn) {
            this.spawnEnemy();
        }

        // Check if wave is complete
        const allSpawned = this.spawnedInWave >= this.totalEnemiesInWave;
        const allKilled = gameState.enemies.filter(e => e.isAlive()).length === 0;

        if (allSpawned && allKilled) {
            gameState.completeWave();
        }
    }

    completeWave() {
        gameState.waveInProgress = false;
        gameState.emit(CONSTANTS.UI_EVENT.WAVE_COMPLETED, {
            waveNumber: gameState.currentWave,
        });
    }

    getWaveProgress() {
        const spawned = this.spawnedInWave;
        const total = this.totalEnemiesInWave;
        const killed = total - gameState.enemies.filter(e => e.isAlive()).length;

        return {
            spawned,
            killed,
            total,
            allSpawned: spawned >= total,
            waveComplete: spawned >= total && killed >= total,
        };
    }
}

const waveSystem = new WaveSystem();
