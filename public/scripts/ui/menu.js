/**
 * Menu System
 * Manages all menu screens and navigation
 */

class MenuSystem {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Main menu buttons
        document.getElementById('singleplayerBtn').addEventListener('click', () => {
            gameState.isMultiplayer = false;
            this.startGame();
        });

        document.getElementById('multiplayerBtn').addEventListener('click', () => {
            gameState.isMultiplayer = true;
            showScreen('multiplayerLobby');
        });

        document.getElementById('settingsBtn').addEventListener('click', () => {
            showScreen('settingsScreen');
        });

        // Settings screen
        document.getElementById('settingsApplyBtn').addEventListener('click', () => {
            this.applySettings();
        });

        document.getElementById('settingsBackBtn').addEventListener('click', () => {
            showScreen('mainMenu');
        });

        // Settings sliders
        document.getElementById('startHealthSlider').addEventListener('input', (e) => {
            document.getElementById('startHealthValue').textContent = e.target.value;
        });

        document.getElementById('startGoldSlider').addEventListener('input', (e) => {
            document.getElementById('startGoldValue').textContent = e.target.value;
        });

        document.getElementById('gameSpeedSlider').addEventListener('input', (e) => {
            document.getElementById('gameSpeedValue').textContent = (parseFloat(e.target.value)).toFixed(2) + '×';
        });

        document.getElementById('waveDurationSlider').addEventListener('input', (e) => {
            document.getElementById('waveDurationValue').textContent = e.target.value + 's';
        });

        // Multiplayer
        document.getElementById('createRoomBtn').addEventListener('click', () => {
            this.createRoom();
        });

        document.getElementById('lobbyBackBtn').addEventListener('click', () => {
            showScreen('mainMenu');
        });

        // Game over
        document.getElementById('restartBtn').addEventListener('click', () => {
            gameState.reset();
            this.startGame();
        });

        document.getElementById('menuFromGameBtn').addEventListener('click', () => {
            gameState.reset();
            showScreen('mainMenu');
        });
    }

    applySettings() {
        const settings = {
            language: document.getElementById('languageSelect').value,
            difficulty: document.getElementById('difficultySelect').value,
            startHealth: parseInt(document.getElementById('startHealthSlider').value),
            startGold: parseInt(document.getElementById('startGoldSlider').value),
            gameSpeed: parseFloat(document.getElementById('gameSpeedSlider').value),
            waveDuration: parseInt(document.getElementById('waveDurationSlider').value),
        };

        saveSettings(settings);
        gameState.maxLives = settings.startHealth;
        gameState.lives = settings.startHealth;
        gameState.gold = settings.startGold;
        gameState.gameSpeed = settings.gameSpeed;
        gameState.difficulty = settings.difficulty;
        gameState.difficultyMultiplier = applyDifficulty(settings.difficulty);

        setLanguage(settings.language);
        showScreen('mainMenu');
    }

    startGame() {
        gameState.reset();

        const settings = loadSettings();
        gameState.maxLives = settings.startHealth;
        gameState.lives = settings.startHealth;
        gameState.gold = settings.startGold;
        gameState.difficulty = settings.difficulty;
        gameState.difficultyMultiplier = applyDifficulty(settings.difficulty);

        // Setup game map BEFORE switching to playing mode
        gameState.gameMap = {
            path: generateDefaultPath(),
        };

        // Initialize renderer BEFORE playing mode (which triggers render)
        initRenderer();

        // Show game screen BEFORE playing mode
        showScreen('gameScreen');

        // NOW we can set playing mode and start rendering
        gameState.gameMode = CONSTANTS.GAME_STATE.PLAYING;
        gameState.frameCount = 0;

        // Start wave after everything is initialized
        waveSystem.startWave();
    }

    createRoom() {
        gameState.roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        this.startGame();
    }
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.display = 'none';
    });

    const screen = document.getElementById(screenId);
    if (screen) {
        screen.style.display = 'flex';
    }
}

function generateDefaultPath() {
    return [
        {x: -1, y: 7}, {x: 2, y: 7}, {x: 2, y: 3}, {x: 5, y: 3},
        {x: 5, y: 10}, {x: 8, y: 10}, {x: 8, y: 2}, {x: 12, y: 2},
        {x: 12, y: 11}, {x: 15, y: 11}, {x: 15, y: 5}, {x: 19, y: 5},
        {x: 19, y: 14}
    ];
}

const menuSystem = new MenuSystem();

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    loadSettings();
    showScreen('mainMenu');
});
