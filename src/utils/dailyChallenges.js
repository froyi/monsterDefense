// Daily Challenge definitions
// Each challenge has difficulty: 'easy' | 'medium' | 'hard'
// Check function receives round stats and returns progress increment

export const DAILY_CHALLENGES = [
    // ══════════════════════ 🟢 EASY ══════════════════════
    {
        key: 'play_3_rounds',
        name: 'Fleißig üben',
        description: 'Spiele heute 3 Runden',
        icon: '📝',
        difficulty: 'easy',
        target: 3,
        reward: 25,
        getProgress: () => 1,
        type: 'cumulative',
    },
    {
        key: 'words_15',
        name: 'Wort-Jäger',
        description: 'Besiege 15 Wörter in einer Runde',
        icon: '⚔️',
        difficulty: 'easy',
        target: 15,
        reward: 25,
        getProgress: (roundStats) => roundStats.wordsCompleted,
        type: 'single_round',
    },
    {
        key: 'wpm_20',
        name: 'Schnelle Finger',
        description: 'Tippe mit mindestens 20 WPM',
        icon: '⚡',
        difficulty: 'easy',
        target: 20,
        reward: 25,
        getProgress: (roundStats) => roundStats.wpm,
        type: 'threshold',
    },
    {
        key: 'score_300',
        name: 'Punkte sammeln',
        description: 'Erreiche 300 Punkte in einer Runde',
        icon: '💎',
        difficulty: 'easy',
        target: 300,
        reward: 25,
        getProgress: (roundStats) => roundStats.score,
        type: 'threshold',
    },
    {
        key: 'three_waves',
        name: 'Wellenbrecher',
        description: 'Überlebe alle 3 Wellen in einer Runde',
        icon: '🌊',
        difficulty: 'easy',
        target: 3,
        reward: 25,
        getProgress: (roundStats) => roundStats.wave,
        type: 'threshold',
    },
    {
        key: 'no_errors_5',
        name: 'Fehlerfreie Serie',
        description: 'Besiege 5 Wörter nacheinander ohne Fehler',
        icon: '✨',
        difficulty: 'easy',
        target: 5,
        reward: 25,
        getProgress: (roundStats) => roundStats.maxCombo >= 5 && roundStats.accuracy >= 100 ? 5 : 0,
        type: 'threshold',
    },
    // ══════════════════════ 🟡 MEDIUM ══════════════════════
    {
        key: 'words_25',
        name: 'Doppelter Kampf',
        description: 'Besiege insgesamt 25 Wörter heute',
        icon: '🗡️',
        difficulty: 'medium',
        target: 25,
        reward: 40,
        getProgress: (roundStats) => roundStats.wordsCompleted,
        type: 'cumulative',
    },
    {
        key: 'accuracy_95',
        name: 'Scharfschütze',
        description: 'Erreiche mindestens 95% Genauigkeit in einer Runde',
        icon: '🎯',
        difficulty: 'medium',
        target: 95,
        reward: 40,
        getProgress: (roundStats) => roundStats.accuracy,
        type: 'threshold',
    },
    {
        key: 'combo_15',
        name: 'Combo-Starter',
        description: 'Erreiche eine 15er Combo',
        icon: '🔗',
        difficulty: 'medium',
        target: 15,
        reward: 40,
        getProgress: (roundStats) => roundStats.maxCombo,
        type: 'threshold',
    },
    {
        key: 'wpm_30',
        name: 'Turbo-Tipper',
        description: 'Tippe mit mindestens 30 WPM in einer Runde',
        icon: '🚀',
        difficulty: 'medium',
        target: 30,
        reward: 40,
        getProgress: (roundStats) => roundStats.wpm,
        type: 'threshold',
    },
    {
        key: 'score_600',
        name: 'Punkte-Jäger',
        description: 'Erreiche 600 Punkte in einer Runde',
        icon: '👑',
        difficulty: 'medium',
        target: 600,
        reward: 40,
        getProgress: (roundStats) => roundStats.score,
        type: 'threshold',
    },
    {
        key: 'play_5_rounds',
        name: 'Viel-Spieler',
        description: 'Spiele heute 5 Runden',
        icon: '🎮',
        difficulty: 'medium',
        target: 5,
        reward: 40,
        getProgress: () => 1,
        type: 'cumulative',
    },
    {
        key: 'words_total_40',
        name: 'Wort-Marathon',
        description: 'Besiege insgesamt 40 Wörter heute',
        icon: '🏃',
        difficulty: 'medium',
        target: 40,
        reward: 40,
        getProgress: (roundStats) => roundStats.wordsCompleted,
        type: 'cumulative',
    },
    {
        key: 'fast_and_accurate',
        name: 'Schnell & Präzise',
        description: '20+ WPM und 90%+ Genauigkeit in einer Runde',
        icon: '🌟',
        difficulty: 'medium',
        target: 1,
        reward: 40,
        getProgress: (roundStats) => (roundStats.wpm >= 20 && roundStats.accuracy >= 90) ? 1 : 0,
        type: 'threshold',
    },
    {
        key: 'improve_wpm',
        name: 'Persönliche Bestleistung',
        description: 'Verbessere dein WPM gegenüber dem Durchschnitt',
        icon: '📈',
        difficulty: 'medium',
        target: 1,
        reward: 40,
        getProgress: (roundStats) => roundStats.wpm > (roundStats.averageWPM || 0) ? 1 : 0,
        type: 'threshold',
    },
    // ══════════════════════ 🔴 HARD ══════════════════════
    {
        key: 'accuracy_100',
        name: 'Perfekter Tag',
        description: 'Schaffe eine Runde mit 100% Genauigkeit',
        icon: '💯',
        difficulty: 'hard',
        target: 100,
        reward: 60,
        getProgress: (roundStats) => roundStats.accuracy,
        type: 'threshold',
    },
    {
        key: 'combo_30',
        name: 'Combo-Meister',
        description: 'Erreiche eine 30er Combo in einer Runde',
        icon: '⛓️',
        difficulty: 'hard',
        target: 30,
        reward: 60,
        getProgress: (roundStats) => roundStats.maxCombo,
        type: 'threshold',
    },
    {
        key: 'no_damage',
        name: 'Eiserne Mauer',
        description: 'Beende eine Runde ohne Burgschaden',
        icon: '🏰',
        difficulty: 'hard',
        target: 1,
        reward: 60,
        getProgress: (roundStats) => roundStats.castleHp >= 100 ? 1 : 0,
        type: 'threshold',
    },
    {
        key: 'high_combo_accurate',
        name: 'Meister der Kontrolle',
        description: '20er Combo und 95%+ Genauigkeit',
        icon: '🎖️',
        difficulty: 'hard',
        target: 1,
        reward: 60,
        getProgress: (roundStats) => (roundStats.maxCombo >= 20 && roundStats.accuracy >= 95) ? 1 : 0,
        type: 'threshold',
    },
    {
        key: 'survivor',
        name: 'Überlebenskünstler',
        description: 'Beende eine Runde mit weniger als 50 HP',
        icon: '💪',
        difficulty: 'hard',
        target: 1,
        reward: 60,
        getProgress: (roundStats) => (roundStats.castleHp > 0 && roundStats.castleHp < 50) ? 1 : 0,
        type: 'threshold',
    },
];

// Grouped by difficulty for easy access
export const CHALLENGES_BY_DIFFICULTY = {
    easy: DAILY_CHALLENGES.filter(c => c.difficulty === 'easy'),
    medium: DAILY_CHALLENGES.filter(c => c.difficulty === 'medium'),
    hard: DAILY_CHALLENGES.filter(c => c.difficulty === 'hard'),
};

// Bonus for completing all 3 challenges in a day
export const ALL_COMPLETE_BONUS = {
    coins: 25,
    card: true, // drops a random trading card
};

// Returns an object { easy, medium, hard } with one challenge per difficulty,
// deterministically selected per calendar day (same challenges all day).
export function getTodaysChallenges() {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    return {
        easy: CHALLENGES_BY_DIFFICULTY.easy[seed % CHALLENGES_BY_DIFFICULTY.easy.length],
        medium: CHALLENGES_BY_DIFFICULTY.medium[(seed * 3) % CHALLENGES_BY_DIFFICULTY.medium.length],
        hard: CHALLENGES_BY_DIFFICULTY.hard[(seed * 7) % CHALLENGES_BY_DIFFICULTY.hard.length],
    };
}

// Legacy – kept for backward compatibility
export function getTodaysChallenge() {
    const { easy } = getTodaysChallenges();
    return easy;
}

export function getTodayDateString() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
}
