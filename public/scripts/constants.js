/**
 * Game Constants
 * Immutable game data
 */

const CONSTANTS = {
    // Game states
    GAME_STATE: {
        MENU: 'menu',
        SETTINGS: 'settings',
        MULTIPLAYER_LOBBY: 'multiplayer_lobby',
        PLAYING: 'playing',
        PAUSED: 'paused',
        GAME_OVER: 'game_over',
    },

    // Input types
    INPUT: {
        CLICK: 'click',
        DRAG: 'drag',
        RELEASE: 'release',
        TOUCH_START: 'touchstart',
        TOUCH_MOVE: 'touchmove',
        TOUCH_END: 'touchend',
    },

    // Entity types
    ENTITY_TYPE: {
        TOWER: 'tower',
        ENEMY: 'enemy',
        PROJECTILE: 'projectile',
        PARTICLE: 'particle',
    },

    // Tower types and their properties
    TOWER_TYPES: {
        arrow: {
            name: 'arrow',
            emoji: '🏹',
            color: '#8b5cf6',
            baseCost: 100,
            baseStats: {
                damage: 10,
                fireRate: 8,
                range: 5,
                attackSpeed: 1,
            },
            description: 'Fast tower, good for early game',
        },
        cannon: {
            name: 'cannon',
            emoji: '💣',
            color: '#ef4444',
            baseCost: 200,
            baseStats: {
                damage: 25,
                fireRate: 12,
                range: 4.5,
                splashRadius: 2,
            },
            description: 'Splash damage tower',
        },
        ice: {
            name: 'ice',
            emoji: '❄️',
            color: '#3b82f6',
            baseCost: 150,
            baseStats: {
                damage: 5,
                fireRate: 10,
                range: 4.5,
                slowAmount: 0.5,
                slowDuration: 120,
            },
            description: 'Slows enemies by 50%',
        },
        tesla: {
            name: 'tesla',
            emoji: '⚡',
            color: '#fbbf24',
            baseCost: 300,
            baseStats: {
                damage: 15,
                fireRate: 15,
                range: 4,
                chainCount: 3,
                chainDamageReduction: 0.2,
            },
            description: 'Chains to nearby enemies',
        },
        inferno: {
            name: 'inferno',
            emoji: '🔥',
            color: '#f97316',
            baseCost: 250,
            baseStats: {
                damage: 20,
                fireRate: 10,
                range: 3.5,
                burnDamage: 2,
                burnDuration: 180,
            },
            description: 'Burns enemies over time',
        },
        chronos: {
            name: 'chronos',
            emoji: '⏱️',
            color: '#06b6d4',
            baseCost: 350,
            baseStats: {
                damage: 8,
                fireRate: 8,
                range: 4,
                timeWarpRadius: 3,
                timeWarpIntensity: 0.7,
            },
            description: 'Warps time in area',
        },
    },

    // Enemy types and their properties
    ENEMY_TYPES: {
        normal: {
            name: 'normal',
            emoji: '🧟',
            baseHealth: 20,
            baseSpeed: 1.5,
            baseReward: 10,
            armor: 0.1,
        },
        armored: {
            name: 'armored',
            emoji: '🛡️',
            baseHealth: 40,
            baseSpeed: 0.8,
            baseReward: 15,
            armor: 0.4,
        },
        swift: {
            name: 'swift',
            emoji: '💨',
            baseHealth: 10,
            baseSpeed: 3,
            baseReward: 8,
            armor: 0,
        },
        boss: {
            name: 'boss',
            emoji: '👑',
            baseHealth: 200,
            baseSpeed: 1,
            baseReward: 50,
            armor: 0.2,
        },
    },

    // Status effects
    STATUS_EFFECT: {
        SLOW: 'slow',
        BURN: 'burn',
        STUN: 'stun',
        FREEZE: 'freeze',
        CURSE: 'curse',
    },

    // Projectile types
    PROJECTILE_TYPE: {
        ARROW: 'arrow',
        CANNON_BALL: 'cannon_ball',
        ICE_BOLT: 'ice_bolt',
        LIGHTNING: 'lightning',
        FIRE: 'fire',
        TIME_WARP: 'time_warp',
    },

    // Particle types
    PARTICLE_TYPE: {
        EXPLOSION: 'explosion',
        BLOOD: 'blood',
        SMOKE: 'smoke',
        SPARK: 'spark',
        ICE: 'ice',
        FIRE: 'fire',
    },

    // UI events
    UI_EVENT: {
        TOWER_SELECTED: 'tower_selected',
        TOWER_PLACED: 'tower_placed',
        TOWER_UPGRADED: 'tower_upgraded',
        TOWER_SOLD: 'tower_sold',
        ENEMY_KILLED: 'enemy_killed',
        ENEMY_ESCAPED: 'enemy_escaped',
        WAVE_STARTED: 'wave_started',
        WAVE_COMPLETED: 'wave_completed',
        GAME_OVER: 'game_over',
    },

    // Colors
    COLORS: {
        PRIMARY: '#6366f1',
        SUCCESS: '#10b981',
        DANGER: '#ef4444',
        WARNING: '#f59e0b',
        INFO: '#3b82f6',
        GOLD: '#fbbf24',
        DARK: '#1f2937',
        LIGHT: '#f3f4f6',
    },

    // Sound effects
    SOUNDS: {
        TOWER_SHOOT: 'shoot',
        TOWER_BUILD: 'build',
        TOWER_UPGRADE: 'upgrade',
        TOWER_SELL: 'sell',
        ENEMY_DEATH: 'death',
        ENEMY_SPAWN: 'spawn',
        ENEMY_ESCAPE: 'escape',
        WAVE_START: 'wave_start',
        GAME_OVER: 'game_over',
        EXPLOSION: 'explosion',
    },
};

// Tower upgrade formula
const getTowerUpgradeCost = (baseCost, level) => {
    return Math.floor(baseCost * Math.pow(1.5, level - 1));
};

// Tower stat multiplier per level
const getTowerStatMultiplier = (level) => {
    return 1 + (level - 1) * 0.3;
};

// Enemy health scaling
const getEnemyHealth = (baseHealth, waveNumber, difficulty = 'normal') => {
    const diffMult = CONFIG.DIFFICULTY[difficulty]?.enemyHP || 1;
    return Math.floor(baseHealth * Math.pow(1.15, waveNumber) * diffMult);
};

// Enemy reward scaling
const getEnemyReward = (baseReward, waveNumber, difficulty = 'normal') => {
    const diffMult = CONFIG.DIFFICULTY[difficulty]?.enemyReward || 1;
    return Math.floor(baseReward * (1 + waveNumber * 0.1) * diffMult);
};

// Wave size calculation
const getWaveSize = (waveNumber, difficulty = 'normal') => {
    const base = 5 + waveNumber * 1.5;
    const diffMult = CONFIG.DIFFICULTY[difficulty]?.waveSize || 1;
    return Math.floor(base * diffMult);
};
