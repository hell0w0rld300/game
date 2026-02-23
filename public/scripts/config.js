/**
 * Game Configuration
 * Centralized settings for game mechanics
 */

const CONFIG = {
    // Canvas
    CANVAS: {
        WIDTH: 1200,
        HEIGHT: 700,
        SCALE: 1,
    },

    // Game mechanics
    GAME: {
        TICKS_PER_SECOND: 60,
        GRID_SIZE: 40,
        MAX_WAVES: 10,
        STARTING_LIVES: 20,
        STARTING_GOLD: 500,
        STARTING_SPEED: 1,
    },

    // Difficulty multipliers
    DIFFICULTY: {
        easy: {
            enemyHP: 0.7,
            enemySpeed: 0.85,
            enemyReward: 0.8,
            waveSize: 0.85,
        },
        normal: {
            enemyHP: 1.0,
            enemySpeed: 1.0,
            enemyReward: 1.0,
            waveSize: 1.0,
        },
        hard: {
            enemyHP: 1.5,
            enemySpeed: 1.2,
            enemyReward: 1.3,
            waveSize: 1.3,
        },
        extreme: {
            enemyHP: 2.0,
            enemySpeed: 1.5,
            enemyReward: 1.6,
            waveSize: 1.6,
        },
    },

    // Tower balancing
    TOWERS: {
        UPGRADE_COST_MULTIPLIER: 1.5,
        RANGE_MULTIPLIER: 40, // grid cells to pixels
        SELL_REFUND: 0.6,
    },

    // Enemy scaling
    ENEMIES: {
        BASE_HP_MULTIPLIER: 1.15,
        SPEED_VARIATION: 0.1,
        REWARD_MULTIPLIER: 1.1,
    },

    // Wave system
    WAVES: {
        ENEMY_SPAWN_RATE: 0.3, // enemies per tick
        WAVE_DELAY: 3, // seconds between waves
        BOSS_INTERVAL: 5, // every N waves
    },

    // Particle system
    PARTICLES: {
        MAX_PARTICLES: 1000,
        EMISSION_RATE: 10,
    },

    // Audio
    AUDIO: {
        MASTER_VOLUME: 0.5,
        MUTE_WHEN_PAUSED: false,
    },

    // Multiplayer
    MULTIPLAYER: {
        TICK_SYNC_RATE: 5, // sync every N ticks
        PREDICTION_FRAMES: 3,
    },
};

// Apply difficulty settings
function applyDifficulty(difficulty) {
    const multiplier = CONFIG.DIFFICULTY[difficulty] || CONFIG.DIFFICULTY.normal;
    return multiplier;
}

// Get user settings from localStorage
function loadSettings() {
    const defaults = {
        language: 'en',
        difficulty: 'normal',
        startHealth: 20,
        startGold: 500,
        gameSpeed: 1,
        waveDuration: 30,
        masterVolume: 0.5,
    };

    const saved = {};
    Object.keys(defaults).forEach(key => {
        const value = localStorage.getItem(`setting_${key}`);
        saved[key] = value !== null ? JSON.parse(value) : defaults[key];
    });

    return saved;
}

// Save user settings to localStorage
function saveSettings(settings) {
    Object.entries(settings).forEach(([key, value]) => {
        localStorage.setItem(`setting_${key}`, JSON.stringify(value));
    });
}
