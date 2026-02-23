// Achievement definitions – all achievements organized by category
// Secret achievements have secret: true → name/description hidden until unlocked

export const ACHIEVEMENT_CATEGORIES = {
    milestones: { name: 'Meilensteine', icon: '🏆', description: 'Fortschritt im Spiel' },
    campaign: { name: 'Kampagne', icon: '🗺️', description: 'Welten erobern' },
    speed: { name: 'Geschwindigkeit', icon: '⚡', description: 'Schneller tippen' },
    accuracy: { name: 'Genauigkeit', icon: '🎯', description: 'Präzise tippen' },
    streak: { name: 'Ausdauer', icon: '🔥', description: 'Regelmäßig üben' },
    combo: { name: 'Combos', icon: '💥', description: 'Fehlerfrei tippen' },
    secret: { name: 'Geheim', icon: '🔮', description: 'Geheimnisse entdecken' },
};

export const ACHIEVEMENTS = {
    // ===================== MEILENSTEINE =====================
    words_25: {
        category: 'milestones',
        name: 'Erste Schritte',
        description: '25 Wörter besiegt',
        icon: '📝',
        check: (stats) => stats.totalWordsDefeated >= 25,
    },
    words_100: {
        category: 'milestones',
        name: 'Wort-Lehrling',
        description: '100 Wörter besiegt',
        icon: '📖',
        check: (stats) => stats.totalWordsDefeated >= 100,
    },
    words_250: {
        category: 'milestones',
        name: 'Wort-Geselle',
        description: '250 Wörter besiegt',
        icon: '📚',
        check: (stats) => stats.totalWordsDefeated >= 250,
    },
    words_1000: {
        category: 'milestones',
        name: 'Wort-Meister',
        description: '1000 Wörter besiegt',
        icon: '🏅',
        check: (stats) => stats.totalWordsDefeated >= 1000,
    },
    words_2500: {
        category: 'milestones',
        name: 'Wort-Legende',
        description: '2500 Wörter besiegt',
        icon: '👑',
        check: (stats) => stats.totalWordsDefeated >= 2500,
    },
    rounds_10: {
        category: 'milestones',
        name: 'Verteidiger',
        description: '10 Runden gespielt',
        icon: '🛡️',
        check: (stats) => stats.totalRounds >= 10,
    },
    rounds_50: {
        category: 'milestones',
        name: 'Burgwächter',
        description: '50 Runden gespielt',
        icon: '⚔️',
        check: (stats) => stats.totalRounds >= 50,
    },
    rounds_200: {
        category: 'milestones',
        name: 'Kriegsherr',
        description: '200 Runden gespielt',
        icon: '🏰',
        check: (stats) => stats.totalRounds >= 200,
    },
    coins_500: {
        category: 'milestones',
        name: 'Sparschwein',
        description: '500 Münzen gesammelt (gesamt)',
        icon: '🐷',
        check: (stats) => stats.totalCoinsEarned >= 500,
    },
    coins_3000: {
        category: 'milestones',
        name: 'Schatzkammer',
        description: '3000 Münzen gesammelt (gesamt)',
        icon: '💰',
        check: (stats) => stats.totalCoinsEarned >= 3000,
    },
    skills_all: {
        category: 'milestones',
        name: 'Alle Finger bereit!',
        description: 'Alle 7 Skills freigeschaltet',
        icon: '🖐️',
        check: (stats) => stats.unlockedSkills >= 7,
    },
    daily_challenge_3: {
        category: 'milestones',
        name: 'Herausforderer',
        description: '3 Tagesherausforderungen gemeistert',
        icon: '📋',
        check: (stats) => stats.dailyChallengesCompleted >= 3,
    },
    daily_challenge_10: {
        category: 'milestones',
        name: 'Aufgaben-Held',
        description: '10 Tagesherausforderungen gemeistert',
        icon: '📝',
        check: (stats) => stats.dailyChallengesCompleted >= 10,
    },
    daily_challenge_25: {
        category: 'milestones',
        name: 'Tagesmeister',
        description: '25 Tagesherausforderungen gemeistert',
        icon: '🗓️',
        check: (stats) => stats.dailyChallengesCompleted >= 25,
    },

    // ===================== GESCHWINDIGKEIT =====================
    wpm_20: {
        category: 'speed',
        name: 'Flotte Finger',
        description: '20 WPM in einer Runde',
        icon: '🐢',
        check: (stats) => stats.bestWPM >= 20,
    },
    wpm_30: {
        category: 'speed',
        name: 'Schnelltipper',
        description: '30 WPM in einer Runde',
        icon: '🐇',
        check: (stats) => stats.bestWPM >= 30,
    },
    wpm_45: {
        category: 'speed',
        name: 'Blitzfinger',
        description: '45 WPM in einer Runde',
        icon: '⚡',
        check: (stats) => stats.bestWPM >= 45,
    },
    wpm_60: {
        category: 'speed',
        name: 'Tipp-Turbo',
        description: '60 WPM in einer Runde',
        icon: '🚀',
        check: (stats) => stats.bestWPM >= 60,
    },
    wpm_80: {
        category: 'speed',
        name: 'Tastatur-Legende',
        description: '80 WPM in einer Runde',
        icon: '🌟',
        check: (stats) => stats.bestWPM >= 80,
    },
    score_1000: {
        category: 'speed',
        name: 'Punktejäger',
        description: '1000 Punkte in einer Runde',
        icon: '💎',
        check: (stats) => stats.bestScore >= 1000,
    },
    score_2500: {
        category: 'speed',
        name: 'Punkte-König',
        description: '2500 Punkte in einer Runde',
        icon: '👑',
        check: (stats) => stats.bestScore >= 2500,
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
    perfect_5: {
        category: 'accuracy',
        name: 'Fünffach perfekt',
        description: '5 Runden mit 100% Genauigkeit',
        icon: '✨',
        check: (stats) => stats.perfectRounds >= 5,
    },
    perfect_20: {
        category: 'accuracy',
        name: 'Makellos',
        description: '20 Runden mit 100% Genauigkeit',
        icon: '🔥',
        check: (stats) => stats.perfectRounds >= 20,
    },
    no_castle_dmg: {
        category: 'accuracy',
        name: 'Unverwundbar',
        description: 'Runde beendet ohne Burgschaden',
        icon: '🏰',
        check: (stats) => stats.roundsNoCastleDamage >= 1,
    },
    no_castle_dmg_10: {
        category: 'accuracy',
        name: 'Eiserne Mauer',
        description: '10 Runden ohne Burgschaden',
        icon: '🧱',
        check: (stats) => stats.roundsNoCastleDamage >= 10,
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
    daily_chest_14: {
        category: 'streak',
        name: 'Truhensammler',
        description: '14 tägliche Truhen geöffnet',
        icon: '🎁',
        check: (stats) => stats.totalDailyChests >= 14,
    },

    // ===================== COMBOS =====================
    combo_15: {
        category: 'combo',
        name: 'Combo-Starter',
        description: '15er Combo erreicht',
        icon: '🔗',
        check: (stats) => stats.bestCombo >= 15,
    },
    combo_30: {
        category: 'combo',
        name: 'Combo-Künstler',
        description: '30er Combo erreicht',
        icon: '⛓️',
        check: (stats) => stats.bestCombo >= 30,
    },
    combo_60: {
        category: 'combo',
        name: 'Combo-Meister',
        description: '60er Combo erreicht',
        icon: '🔥',
        check: (stats) => stats.bestCombo >= 60,
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

    // ===================== KAMPAGNE =====================
    world_1_complete: {
        category: 'campaign',
        name: 'Dorfheld',
        description: 'Welt 1 (Friedliches Dorf) abgeschlossen',
        icon: '🏠',
        check: (stats) => stats.worldsCompleted?.includes('village'),
    },
    world_3_complete: {
        category: 'campaign',
        name: 'Bergbezwinger',
        description: 'Welt 3 (Eisige Berge) abgeschlossen',
        icon: '⛰️',
        check: (stats) => stats.worldsCompleted?.includes('mountains'),
    },
    world_6_complete: {
        category: 'campaign',
        name: 'Drachentöter',
        description: 'Welt 6 (Drachenhöhle) abgeschlossen',
        icon: '🐉',
        check: (stats) => stats.worldsCompleted?.includes('dragon'),
    },
    campaign_complete: {
        category: 'campaign',
        name: 'Legendärer Held',
        description: 'Alle 60 Level abgeschlossen',
        icon: '👑',
        check: (stats) => stats.campaignComplete === true,
    },
    stars_30: {
        category: 'campaign',
        name: 'Sternsammler',
        description: '30 Sterne gesammelt',
        icon: '⭐',
        check: (stats) => stats.totalStars >= 30,
    },
    stars_90: {
        category: 'campaign',
        name: 'Sternenjäger',
        description: '90 Sterne gesammelt',
        icon: '🌟',
        check: (stats) => stats.totalStars >= 90,
    },
    stars_180: {
        category: 'campaign',
        name: 'Perfekter Held',
        description: 'Alle 180 Sterne gesammelt',
        icon: '💫',
        secret: true,
        check: (stats) => stats.totalStars >= 180,
    },
    first_boss: {
        category: 'campaign',
        name: 'Bossbezwinger',
        description: 'Ersten Boss besiegt',
        icon: '🐀',
        check: (stats) => stats.bossDefeated === true,
    },
    boss_no_damage: {
        category: 'campaign',
        name: 'Unberührbar',
        description: 'Einen Boss ohne Burgschaden besiegt',
        icon: '🛡️',
        secret: true,
        check: (stats) => stats.bossDefeated === true && stats.noCastleDamage === true,
    },
    world_3_stars: {
        category: 'campaign',
        name: 'Perfektion',
        description: 'Eine komplette Welt mit 3 Sternen abschließen',
        icon: '✨',
        secret: true,
        check: (stats) => {
            // Check if any world has all 30 stars
            if (!stats.worldsCompleted) return false;
            return stats.totalStars >= 30; // simplified: at least one world at 30 stars
        },
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
