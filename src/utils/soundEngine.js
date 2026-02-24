// Sound Engine – Web Audio API based (no external files)
// All sounds are synthesized procedurally.

let audioCtx = null;

function getCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume if suspended (browsers require user gesture)
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}

function playTone(frequency, duration, type = 'sine', volume = 0.15, decay = true) {
    try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.value = frequency;
        gain.gain.value = volume;

        if (decay) {
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        }

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
    } catch {
        // Silently ignore audio errors
    }
}

function playSequence(notes, interval = 0.1) {
    notes.forEach(([freq, dur, type, vol], i) => {
        setTimeout(() => playTone(freq, dur, type, vol), i * interval * 1000);
    });
}

// ─── Sound Effects ───────────────────────────────────────────

export function playCorrectKey() {
    playTone(880, 0.08, 'sine', 0.08);
}

export function playErrorKey() {
    playTone(200, 0.15, 'sawtooth', 0.08);
}

export function playMonsterDefeated() {
    playSequence([
        [523, 0.1, 'sine', 0.12],  // C5
        [659, 0.1, 'sine', 0.12],  // E5
        [784, 0.15, 'sine', 0.12], // G5
    ], 0.08);
}

export function playBossAppear() {
    playSequence([
        [150, 0.3, 'sawtooth', 0.12],
        [100, 0.4, 'sawtooth', 0.15],
        [80, 0.5, 'sawtooth', 0.12],
    ], 0.25);
}

export function playBossEnrage() {
    playSequence([
        [200, 0.15, 'square', 0.1],
        [250, 0.15, 'square', 0.1],
        [300, 0.15, 'square', 0.12],
        [350, 0.15, 'square', 0.12],
    ], 0.08);
}

export function playLevelComplete() {
    playSequence([
        [523, 0.12, 'sine', 0.15],  // C5
        [659, 0.12, 'sine', 0.15],  // E5
        [784, 0.12, 'sine', 0.15],  // G5
        [1047, 0.3, 'sine', 0.18],  // C6
    ], 0.12);
}

export function playLevelFail() {
    playSequence([
        [400, 0.2, 'sawtooth', 0.1],
        [350, 0.2, 'sawtooth', 0.1],
        [300, 0.3, 'sawtooth', 0.12],
        [200, 0.5, 'sawtooth', 0.1],
    ], 0.2);
}

export function playAchievementUnlock() {
    playSequence([
        [659, 0.1, 'sine', 0.12],   // E5
        [784, 0.1, 'sine', 0.12],   // G5
        [988, 0.1, 'sine', 0.14],   // B5
        [1175, 0.25, 'sine', 0.16], // D6
    ], 0.1);
}

export function playComboMilestone() {
    playSequence([
        [1047, 0.08, 'sine', 0.1],  // C6
        [1319, 0.08, 'sine', 0.1],  // E6
        [1568, 0.15, 'sine', 0.12], // G6
    ], 0.06);
}

export function playCastleDamage() {
    playTone(120, 0.3, 'square', 0.1);
}
