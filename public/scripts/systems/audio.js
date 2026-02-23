/**
 * Audio System
 * Procedural sound generation using Web Audio API
 */

class AudioSystem {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.connect(this.audioContext.destination);
        this.masterGain.gain.value = CONFIG.AUDIO.MASTER_VOLUME;
        this.isMuted = false;
    }

    setVolume(volume) {
        this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
    }

    mute() {
        this.isMuted = true;
        this.masterGain.gain.value = 0;
    }

    unmute() {
        this.isMuted = false;
        this.masterGain.gain.value = CONFIG.AUDIO.MASTER_VOLUME;
    }

    // Play different sound effects
    playSoundEffect(type) {
        if (this.isMuted) return;

        const ctx = this.audioContext;
        const now = ctx.currentTime;

        switch (type) {
            case CONSTANTS.SOUNDS.TOWER_SHOOT:
                this.playShootSound(now);
                break;
            case CONSTANTS.SOUNDS.TOWER_BUILD:
                this.playBuildSound(now);
                break;
            case CONSTANTS.SOUNDS.TOWER_UPGRADE:
                this.playUpgradeSound(now);
                break;
            case CONSTANTS.SOUNDS.TOWER_SELL:
                this.playSellSound(now);
                break;
            case CONSTANTS.SOUNDS.ENEMY_DEATH:
                this.playDeathSound(now);
                break;
            case CONSTANTS.SOUNDS.EXPLOSION:
                this.playExplosionSound(now);
                break;
            case CONSTANTS.SOUNDS.WAVE_START:
                this.playWaveStartSound(now);
                break;
            case CONSTANTS.SOUNDS.GAME_OVER:
                this.playGameOverSound(now);
                break;
        }
    }

    playShootSound(now) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        osc.start(now);
        osc.stop(now + 0.1);
    }

    playBuildSound(now) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.start(now);
        osc.stop(now + 0.15);
    }

    playUpgradeSound(now) {
        for (let i = 0; i < 3; i++) {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain);

            const freq = 400 + i * 200;
            osc.frequency.setValueAtTime(freq, now + i * 0.1);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + i * 0.1 + 0.1);
            gain.gain.setValueAtTime(0.1, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.1);

            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.1);
        }
    }

    playSellSound(now) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        osc.start(now);
        osc.stop(now + 0.2);
    }

    playDeathSound(now) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
    }

    playExplosionSound(now) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.4);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0, now + 0.4);

        osc.start(now);
        osc.stop(now + 0.4);
    }

    playWaveStartSound(now) {
        for (let i = 0; i < 2; i++) {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain);

            const freq = 400 + i * 300;
            osc.frequency.setValueAtTime(freq, now + i * 0.2);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + i * 0.2 + 0.25);
            gain.gain.setValueAtTime(0.15, now + i * 0.2);
            gain.gain.exponentialRampToValueAtTime(0, now + i * 0.2 + 0.25);

            osc.start(now + i * 0.2);
            osc.stop(now + i * 0.2 + 0.25);
        }
    }

    playGameOverSound(now) {
        for (let i = 0; i < 3; i++) {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain);

            const freq = 600 - i * 150;
            osc.frequency.setValueAtTime(freq, now + i * 0.15);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + i * 0.15 + 0.2);
            gain.gain.setValueAtTime(0.15, now + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(0, now + i * 0.15 + 0.2);

            osc.start(now + i * 0.15);
            osc.stop(now + i * 0.15 + 0.2);
        }
    }
}

// Global audio system
const audioSystem = new AudioSystem();
