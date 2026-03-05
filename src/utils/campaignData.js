// Campaign Data – 6 Worlds × 10 Levels
// Each world introduces new keyboard areas, replacing the old skill system.

export const WORLDS = [
    {
        id: 'village',
        name: 'Friedliches Dorf',
        emoji: '🏠',
        description: 'Lerne die Grundreihe – die Heimat deiner Finger.',
        color: '#4ade80', // green
        requiredStars: 0, // first world, always open
        coinMultiplier: 1.0,
        monsterDamage: 20,
        spawnInterval: 1.8,
        bossName: 'Ratten-König',
        bossEmoji: '🐀',
    },
    {
        id: 'forest',
        name: 'Zauberwald',
        emoji: '🌳',
        description: 'Die obere Tastenreihe erwacht zum Leben!',
        color: '#22c55e', // dark green
        requiredStars: 25,
        coinMultiplier: 1.2,
        monsterDamage: 24,
        spawnInterval: 1.6,
        bossName: 'Waldgeist',
        bossEmoji: '👻',
    },
    {
        id: 'mountains',
        name: 'Eisige Berge',
        emoji: '⛰️',
        description: 'Die untere Reihe – jetzt nutzt du die ganze Tastatur!',
        color: '#60a5fa', // blue
        requiredStars: 25,
        coinMultiplier: 1.5,
        monsterDamage: 28,
        spawnInterval: 1.4,
        bossName: 'Eisriese',
        bossEmoji: '🧊',
    },
    {
        id: 'volcano',
        name: 'Feuervulkan',
        emoji: '🌋',
        description: 'Umlaute und Sonderzeichen fordern dich heraus!',
        color: '#f97316', // orange
        requiredStars: 25,
        coinMultiplier: 2.0,
        monsterDamage: 32,
        spawnInterval: 1.3,
        bossName: 'Lavabiest',
        bossEmoji: '🔥',
    },
    {
        id: 'castle',
        name: 'Dunkle Burg',
        emoji: '🏰',
        description: 'Groß- und Kleinschreibung – die Shift-Taste wird dein Freund.',
        color: '#8b5cf6', // purple
        requiredStars: 25,
        coinMultiplier: 2.5,
        monsterDamage: 36,
        spawnInterval: 1.2,
        bossName: 'Schwarzer Ritter',
        bossEmoji: '⚔️',
    },
    {
        id: 'dragon',
        name: 'Drachenhöhle',
        emoji: '🐉',
        description: 'Satzzeichen und ganze Sätze – die ultimative Prüfung!',
        color: '#ef4444', // red
        requiredStars: 25,
        coinMultiplier: 3.0,
        monsterDamage: 40,
        spawnInterval: 1.0,
        bossName: 'Drache',
        bossEmoji: '🐉',
    },
];

// Character sets for each world (cumulative – each world adds to previous)
// DE = German QWERTZ, EN = English QWERTY
export const WORLD_CHARS = {
    de: {
        village: 'asdfghjkl',
        forest: 'asdfghjklqwertzuiop',
        mountains: 'asdfghjklqwertzuiopyxcvbnm',
        volcano: 'asdfghjklqwertzuiopyxcvbnmäöüß',
        castle: 'asdfghjklqwertzuiopyxcvbnmäöüßABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ',
        dragon: 'asdfghjklqwertzuiopyxcvbnmäöüßABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ.,!? ',
    },
    en: {
        village: 'asdfghjkl',
        forest: 'asdfghjklqwertyuiop',
        mountains: 'asdfghjklqwertyuiopzxcvbnm',
        volcano: 'asdfghjklqwertyuiopzxcvbnm',  // EN has no umlauts → longer/harder words
        castle: 'asdfghjklqwertyuiopzxcvbnmABCDEFGHIJKLMNOPQRSTUVWXYZ',
        dragon: 'asdfghjklqwertyuiopzxcvbnmABCDEFGHIJKLMNOPQRSTUVWXYZ.,!? ',
    },
};

// Level templates within each world
// speed: monster movement speed multiplier (1.0 = normal)
// monsterCount: number of monsters in the level
// wordLength: [min, max] characters
// isBoss: boss level flag
//
// Difficulty scales with BOTH level number and world index:
//   World 1 starts gentle, World 6 is intense.
//   Within each world, levels 1→9 ramp up, level 10 = boss.
function makeLevels(worldId) {
    const wi = WORLDS.findIndex(w => w.id === worldId); // 0-5

    // Per-world base offsets (stacks on top of level scaling)
    const monsterBase = 8 + wi * 2;      // world 1: 8,  world 6: 18
    const speedBase = 0.7 + wi * 0.12;   // world 1: 0.7, world 6: 1.30
    const wordMinBase = 3 + Math.floor(wi * 0.5); // 3→5
    const wordMaxBase = 5 + wi;                    // 5→10

    // Per-level scaling within a world
    const templates = [
        { level: 1, mc: 0, sp: 0, wMin: 0, wMax: 0, isBoss: false },
        { level: 2, mc: 1, sp: 0.03, wMin: 0, wMax: 0, isBoss: false },
        { level: 3, mc: 2, sp: 0.06, wMin: 0, wMax: 1, isBoss: false },
        { level: 4, mc: 3, sp: 0.09, wMin: 0, wMax: 1, isBoss: false },
        { level: 5, mc: 4, sp: 0.12, wMin: 1, wMax: 1, isBoss: false },
        { level: 6, mc: 5, sp: 0.15, wMin: 1, wMax: 2, isBoss: false },
        { level: 7, mc: 7, sp: 0.18, wMin: 1, wMax: 2, isBoss: false },
        { level: 8, mc: 9, sp: 0.22, wMin: 1, wMax: 3, isBoss: false },
        { level: 9, mc: 12, sp: 0.26, wMin: 2, wMax: 3, isBoss: false },
        { level: 10, mc: 10, sp: 0.20, wMin: 3, wMax: 6, isBoss: true },
    ];

    return templates.map(t => ({
        level: t.level,
        monsterCount: monsterBase + t.mc,
        speed: Math.round((speedBase + t.sp) * 100) / 100,
        wordLength: [wordMinBase + t.wMin, wordMaxBase + t.wMax],
        isBoss: t.isBoss,
        worldId,
    }));
}

// Full level list: 60 levels
export const ALL_LEVELS = WORLDS.flatMap(w => makeLevels(w.id));

// Helpers
export function getWorld(worldId) {
    return WORLDS.find(w => w.id === worldId);
}

export function getWorldIndex(worldId) {
    return WORLDS.findIndex(w => w.id === worldId);
}

export function getLevelsForWorld(worldId) {
    return ALL_LEVELS.filter(l => l.worldId === worldId);
}

export function getLevel(worldId, levelNum) {
    return ALL_LEVELS.find(l => l.worldId === worldId && l.level === levelNum);
}

export function getWorldChars(worldId, layout = 'de') {
    return WORLD_CHARS[layout]?.[worldId] || WORLD_CHARS.de[worldId];
}

export const TOTAL_LEVELS = ALL_LEVELS.length;
export const TOTAL_STARS = TOTAL_LEVELS * 5;
