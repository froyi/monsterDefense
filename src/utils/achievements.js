// Achievement definitions – all achievements organized by category
// Secret achievements have secret: true → name/description hidden until unlocked

export const ACHIEVEMENT_CATEGORIES = {
    milestones: { name: 'Meilensteine', icon: '🏆', description: 'Fortschritt im Spiel' },
    speed: { name: 'Geschwindigkeit', icon: '⚡', description: 'Schneller tippen' },
    accuracy: { name: 'Genauigkeit', icon: '🎯', description: 'Präzise tippen' },
    streak: { name: 'Ausdauer', icon: '🔥', description: 'Regelmäßig üben' },
    combo: { name: 'Combos', icon: '💥', description: 'Fehlerfrei tippen' },
    secret: { name: 'Geheim', icon: '🔮', description: 'Geheimnisse entdecken' },
};

export const ACHIEVEMENTS = {
    // ===================== MEILENSTEINE =====================
    words_10: {
        category: 'milestones',
        name: 'Erste Schritte',
        description: '10 Wörter besiegt',
        icon: '📝',
        check: (stats) => stats.totalWordsDefeated >= 10,
    },
    words_50: {
        category: 'milestones',
        name: 'Wort-Lehrling',
        description: '50 Wörter besiegt',
        icon: '📖',
        check: (stats) => stats.totalWordsDefeated >= 50,
    },
    words_100: {
        category: 'milestones',
        name: 'Wort-Geselle',
        description: '100 Wörter besiegt',
        icon: '📚',
        check: (stats) => stats.totalWordsDefeated >= 100,
    },
    words_500: {
        category: 'milestones',
        name: 'Wort-Meister',
        description: '500 Wörter besiegt',
        icon: '🏅',
        check: (stats) => stats.totalWordsDefeated >= 500,
    },
    words_1000: {
        category: 'milestones',
        name: 'Wort-Legende',
        description: '1000 Wörter besiegt',
        icon: '👑',
        check: (stats) => stats.totalWordsDefeated >= 1000,
    },
    rounds_5: {
        category: 'milestones',
        name: 'Verteidiger',
        description: '5 Runden gespielt',
        icon: '🛡️',
        check: (stats) => stats.totalRounds >= 5,
    },
    rounds_25: {
        category: 'milestones',
        name: 'Burgwächter',
        description: '25 Runden gespielt',
        icon: '⚔️',
        check: (stats) => stats.totalRounds >= 25,
    },
    rounds_100: {
        category: 'milestones',
        name: 'Kriegsherr',
        description: '100 Runden gespielt',
        icon: '🏰',
        check: (stats) => stats.totalRounds >= 100,
    },
    coins_100: {
        category: 'milestones',
        name: 'Sparschwein',
        description: '100 Münzen gesammelt (gesamt)',
        icon: '🐷',
        check: (stats) => stats.totalCoinsEarned >= 100,
    },
    coins_1000: {
        category: 'milestones',
        name: 'Schatzkammer',
        description: '1000 Münzen gesammelt (gesamt)',
        icon: '💰',
        check: (stats) => stats.totalCoinsEarned >= 1000,
    },
    skills_all: {
        category: 'milestones',
        name: 'Alle Finger bereit!',
        description: 'Alle 7 Skills freigeschaltet',
        icon: '🖐️',
        check: (stats) => stats.unlockedSkills >= 7,
    },
    daily_challenge_1: {
        category: 'milestones',
        name: 'Herausforderer',
        description: 'Erste Tagesherausforderung gemeistert',
        icon: '📋',
        check: (stats) => stats.dailyChallengesCompleted >= 1,
    },
    daily_challenge_5: {
        category: 'milestones',
        name: 'Aufgaben-Held',
        description: '5 Tagesherausforderungen gemeistert',
        icon: '📝',
        check: (stats) => stats.dailyChallengesCompleted >= 5,
    },
    daily_challenge_10: {
        category: 'milestones',
        name: 'Tagesmeister',
        description: '10 Tagesherausforderungen gemeistert',
        icon: '🗓️',
        check: (stats) => stats.dailyChallengesCompleted >= 10,
    },

    // ===================== GESCHWINDIGKEIT =====================
    wpm_15: {
        category: 'speed',
        name: 'Flotte Finger',
        description: '15 WPM in einer Runde',
        icon: '🐢',
        check: (stats) => stats.bestWPM >= 15,
    },
    wpm_25: {
        category: 'speed',
        name: 'Schnelltipper',
        description: '25 WPM in einer Runde',
        icon: '🐇',
        check: (stats) => stats.bestWPM >= 25,
    },
    wpm_35: {
        category: 'speed',
        name: 'Blitzfinger',
        description: '35 WPM in einer Runde',
        icon: '⚡',
        check: (stats) => stats.bestWPM >= 35,
    },
    wpm_50: {
        category: 'speed',
        name: 'Tipp-Turbo',
        description: '50 WPM in einer Runde',
        icon: '🚀',
        check: (stats) => stats.bestWPM >= 50,
    },
    wpm_75: {
        category: 'speed',
        name: 'Tastatur-Legende',
        description: '75 WPM in einer Runde',
        icon: '🌟',
        check: (stats) => stats.bestWPM >= 75,
    },
    score_500: {
        category: 'speed',
        name: 'Punktejäger',
        description: '500 Punkte in einer Runde',
        icon: '💎',
        check: (stats) => stats.bestScore >= 500,
    },
    score_1000: {
        category: 'speed',
        name: 'Punkte-König',
        description: '1000 Punkte in einer Runde',
        icon: '👑',
        check: (stats) => stats.bestScore >= 1000,
    },

    // ===================== GENAUIGKEIT =====================
    accuracy_95: {
        category: 'accuracy',
        name: 'Scharfschütze',
        description: 'Eine Runde mit >95% Genauigkeit',
        icon: '🎯',
        check: (stats) => stats.bestAccuracy >= 95,
    },
    accuracy_100: {
        category: 'accuracy',
        name: 'Perfektionist',
        description: 'Eine Runde mit 100% Genauigkeit',
        icon: '💯',
        check: (stats) => stats.bestAccuracy >= 100,
    },
    perfect_3: {
        category: 'accuracy',
        name: 'Dreifach perfekt',
        description: '3 Runden mit 100% Genauigkeit',
        icon: '✨',
        check: (stats) => stats.perfectRounds >= 3,
    },
    perfect_10: {
        category: 'accuracy',
        name: 'Makellos',
        description: '10 Runden mit 100% Genauigkeit',
        icon: '🔥',
        check: (stats) => stats.perfectRounds >= 10,
    },
    no_castle_dmg: {
        category: 'accuracy',
        name: 'Unverwundbar',
        description: 'Runde beendet ohne Burgschaden',
        icon: '🏰',
        check: (stats) => stats.roundsNoCastleDamage >= 1,
    },
    no_castle_dmg_5: {
        category: 'accuracy',
        name: 'Eiserne Mauer',
        description: '5 Runden ohne Burgschaden',
        icon: '🧱',
        check: (stats) => stats.roundsNoCastleDamage >= 5,
    },

    // ===================== AUSDAUER (STREAK) =====================
    streak_3: {
        category: 'streak',
        name: 'Dranbleiber',
        description: '3 Tage in Folge gespielt',
        icon: '📆',
        check: (stats) => stats.currentStreak >= 3,
    },
    streak_7: {
        category: 'streak',
        name: 'Wochenkrieger',
        description: '7 Tage in Folge gespielt',
        icon: '🗓️',
        check: (stats) => stats.currentStreak >= 7,
    },
    streak_14: {
        category: 'streak',
        name: 'Zweiwochenmeister',
        description: '14 Tage in Folge gespielt',
        icon: '🏋️',
        check: (stats) => stats.currentStreak >= 14,
    },
    streak_30: {
        category: 'streak',
        name: 'Monats-Champion',
        description: '30 Tage in Folge gespielt',
        icon: '🏆',
        check: (stats) => stats.currentStreak >= 30,
    },
    streak_100: {
        category: 'streak',
        name: 'Unaufhaltbar',
        description: '100 Tage in Folge gespielt',
        icon: '💪',
        check: (stats) => stats.currentStreak >= 100,
    },
    daily_chest_7: {
        category: 'streak',
        name: 'Truhensammler',
        description: '7 tägliche Truhen geöffnet',
        icon: '🎁',
        check: (stats) => stats.totalDailyChests >= 7,
    },

    // ===================== COMBOS =====================
    combo_10: {
        category: 'combo',
        name: 'Combo-Starter',
        description: '10er Combo erreicht',
        icon: '🔗',
        check: (stats) => stats.bestCombo >= 10,
    },
    combo_25: {
        category: 'combo',
        name: 'Combo-Künstler',
        description: '25er Combo erreicht',
        icon: '⛓️',
        check: (stats) => stats.bestCombo >= 25,
    },
    combo_50: {
        category: 'combo',
        name: 'Combo-Meister',
        description: '50er Combo erreicht',
        icon: '🔥',
        check: (stats) => stats.bestCombo >= 50,
    },
    combo_100: {
        category: 'combo',
        name: 'Combo-Legende',
        description: '100er Combo erreicht',
        icon: '💥',
        check: (stats) => stats.bestCombo >= 100,
    },

    // ===================== GEHEIM =====================
    first_game: {
        category: 'secret',
        name: 'Willkommen!',
        description: 'Dein allererstes Spiel gespielt',
        icon: '🎮',
        secret: true,
        check: (stats) => stats.totalRounds >= 1,
    },
    night_owl: {
        category: 'secret',
        name: 'Nachteule',
        description: 'Nach 22 Uhr gespielt',
        icon: '🦉',
        secret: true,
        check: (stats) => stats.playedLateNight === true,
    },
    early_bird: {
        category: 'secret',
        name: 'Frühaufsteher',
        description: 'Vor 7 Uhr morgens gespielt',
        icon: '🐓',
        secret: true,
        check: (stats) => stats.playedEarlyMorning === true,
    },
    shopaholic: {
        category: 'secret',
        name: 'Shoppingsüchtig',
        description: '5 Items im Shop gekauft',
        icon: '🛍️',
        secret: true,
        check: (stats) => stats.totalItemsBought >= 5,
    },
    all_skins: {
        category: 'secret',
        name: 'Sammler',
        description: 'Alle Skins besitzen',
        icon: '🎨',
        secret: true,
        check: (stats) => stats.totalItemsBought >= 10,
    },
    wave_3_cleared: {
        category: 'secret',
        name: 'Wellenbrecher',
        description: 'Alle 3 Wellen in einer Runde geschafft',
        icon: '🌊',
        secret: true,
        check: (stats) => stats.clearedAllWaves === true,
    },
    comeback: {
        category: 'secret',
        name: 'Comeback-Kid',
        description: 'Gewonnen mit weniger als 20 HP',
        icon: '🔄',
        secret: true,
        check: (stats) => stats.wonWithLowHP === true,
    },
    speed_demon: {
        category: 'secret',
        name: 'Speed Demon',
        description: 'Ein Wort in unter 2 Sekunden getippt',
        icon: '👹',
        secret: true,
        check: (stats) => stats.fastestWord === true,
    },
    zen_master: {
        category: 'secret',
        name: 'Zen-Meister',
        description: '3 perfekte Runden hintereinander',
        icon: '🧘',
        secret: true,
        check: (stats) => stats.consecutivePerfectRounds >= 3,
    },
};

// Get all achievement keys by category
export function getAchievementsByCategory() {
    const result = {};
    for (const [catKey] of Object.entries(ACHIEVEMENT_CATEGORIES)) {
        result[catKey] = Object.entries(ACHIEVEMENTS)
            .filter(([, a]) => a.category === catKey)
            .map(([key, a]) => ({ key, ...a }));
    }
    return result;
}

export const TOTAL_ACHIEVEMENTS = Object.keys(ACHIEVEMENTS).length;
