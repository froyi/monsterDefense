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
        bossName: 'Ratten-König',
        bossEmoji: '🐀',
    },
    {
        id: 'forest',
        name: 'Zauberwald',
        emoji: '🌳',
        description: 'Die obere Tastenreihe erwacht zum Leben!',
        color: '#22c55e', // dark green
        requiredStars: 15,
        coinMultiplier: 1.2,
        bossName: 'Waldgeist',
        bossEmoji: '👻',
    },
    {
        id: 'mountains',
        name: 'Eisige Berge',
        emoji: '⛰️',
        description: 'Die untere Reihe – jetzt nutzt du die ganze Tastatur!',
        color: '#60a5fa', // blue
        requiredStars: 15,
        coinMultiplier: 1.5,
        bossName: 'Eisriese',
        bossEmoji: '🧊',
    },
    {
        id: 'volcano',
        name: 'Feuervulkan',
        emoji: '🌋',
        description: 'Umlaute und Sonderzeichen fordern dich heraus!',
        color: '#f97316', // orange
        requiredStars: 15,
        coinMultiplier: 2.0,
        bossName: 'Lavabiest',
        bossEmoji: '🔥',
    },
    {
        id: 'castle',
        name: 'Dunkle Burg',
        emoji: '🏰',
        description: 'Groß- und Kleinschreibung – die Shift-Taste wird dein Freund.',
        color: '#8b5cf6', // purple
        requiredStars: 15,
        coinMultiplier: 2.5,
        bossName: 'Schwarzer Ritter',
        bossEmoji: '⚔️',
    },
    {
        id: 'dragon',
        name: 'Drachenhöhle',
        emoji: '🐉',
        description: 'Satzzeichen und ganze Sätze – die ultimative Prüfung!',
        color: '#ef4444', // red
        requiredStars: 15,
        coinMultiplier: 3.0,
        bossName: 'Drache',
        bossEmoji: '🐉',
    },
];

// Character sets for each world (cumulative – each world adds to previous)
// DE = German QWERTZ, EN = English QWERTY
export const WORLD_CHARS = {
    de: {
        village: 'asdfghjklö',
        forest: 'asdfghjklöqwertzuiop',
        mountains: 'asdfghjklöqwertzuiopyxcvbnm',
        volcano: 'asdfghjklöqwertzuiopyxcvbnmäüß',
        castle: 'asdfghjklöqwertzuiopyxcvbnmäüßABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ',
        dragon: 'asdfghjklöqwertzuiopyxcvbnmäüßABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ.,!? ',
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
function makeLevels(worldId) {
    return [
        { level: 1, monsterCount: 4, speed: 0.6, wordLength: [3, 4], isBoss: false },
        { level: 2, monsterCount: 4, speed: 0.65, wordLength: [3, 4], isBoss: false },
        { level: 3, monsterCount: 5, speed: 0.7, wordLength: [3, 5], isBoss: false },
        { level: 4, monsterCount: 5, speed: 0.8, wordLength: [4, 5], isBoss: false },
        { level: 5, monsterCount: 6, speed: 0.85, wordLength: [4, 6], isBoss: false },
        { level: 6, monsterCount: 6, speed: 0.9, wordLength: [4, 6], isBoss: false },
        { level: 7, monsterCount: 7, speed: 1.0, wordLength: [5, 7], isBoss: false },
        { level: 8, monsterCount: 8, speed: 1.05, wordLength: [5, 8], isBoss: false },
        { level: 9, monsterCount: 9, speed: 1.1, wordLength: [5, 8], isBoss: false },
        { level: 10, monsterCount: 4, speed: 0.9, wordLength: [8, 15], isBoss: true },
    ].map(l => ({ ...l, worldId }));
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
export const TOTAL_STARS = TOTAL_LEVELS * 3;
