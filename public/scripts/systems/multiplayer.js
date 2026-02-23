/**
 * Multiplayer System
 * Handles multiplayer game logic and synchronization
 */

class MultiplayerSystem {
    constructor() {
        this.isHost = false;
        this.players = [];
        this.roomCode = null;
        this.lastSyncTime = 0;
        this.syncInterval = 1000 / (CONFIG.MULTIPLAYER.TICK_SYNC_RATE);
    }

    createRoom() {
        this.roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        this.isHost = true;
        gameState.roomCode = this.roomCode;
        return this.roomCode;
    }

    joinRoom(code) {
        this.roomCode = code;
        this.isHost = false;
        gameState.roomCode = code;
        // In real implementation, would connect to server
    }

    addPlayer(playerId, playerState) {
        const player = {
            id: playerId,
            ...playerState,
        };
        this.players.push(player);
    }

    removePlayer(playerId) {
        this.players = this.players.filter(p => p.id !== playerId);
    }

    sync() {
        if (!gameState.isMultiplayer) return;

        const now = Date.now();
        if (now - this.lastSyncTime < this.syncInterval) return;
        this.lastSyncTime = now;

        const state = {
            gameState: gameState.exportState(),
            timestamp: now,
        };

        // In real implementation, would send to server
        this.broadcastState(state);
    }

    broadcastState(state) {
        // Stub: In real implementation, would send to WebSocket/server
        console.log('Broadcasting state:', state);
    }

    onStateReceived(state) {
        // Stub: Handle received state from other players
        if (!this.isHost && state.gameState) {
            // Validate and apply prediction
            this.predictAndInterpolate(state);
        }
    }

    predictAndInterpolate(state) {
        // Client-side prediction and interpolation
        // This helps smooth out latency
    }

    getLeaderboard() {
        return this.players.sort((a, b) => b.score - a.score);
    }
}

const multiplayerSystem = new MultiplayerSystem();
