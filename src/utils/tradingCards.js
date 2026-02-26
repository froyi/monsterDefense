// Trading Cards Data Structure
// Defines rarities, drop rates, and the actual cards.

export const RARITIES = {
    common: { id: 'common', name: 'Häufig', color: '#94a3b8', dropWeight: 70, maxLevel: 3, duplicatesNeeded: [0, 2, 5] },
    rare: { id: 'rare', name: 'Selten', color: '#3b82f6', dropWeight: 20, maxLevel: 3, duplicatesNeeded: [0, 1, 3] },
    epic: { id: 'epic', name: 'Episch', color: '#a855f7', dropWeight: 8, maxLevel: 3, duplicatesNeeded: [0, 1, 2] },
    legendary: { id: 'legendary', name: 'Legendär', color: '#eab308', dropWeight: 2, maxLevel: 3, duplicatesNeeded: [0, 1, 1] }
};

// Returns random rarity based on weights
export function rollRarity(boostRare = false) {
    const weights = boostRare
        ? { common: 0, rare: 75, epic: 20, legendary: 5 } // Guaranteed rare+ (e.g. for boosters)
        : { common: 70, rare: 20, epic: 8, legendary: 2 };

    const rand = Math.random() * 100;
    if (rand < weights.legendary) return 'legendary';
    if (rand < weights.legendary + weights.epic) return 'epic';
    if (rand < weights.legendary + weights.epic + weights.rare) return 'rare';
    return 'common';
}

// All 120 Cards (MVP currently just has World 1)
export const CARDS = [
    // ==========================================
    // World 1: Friedliches Dorf (20 Cards)
    // ==========================================

    // -- Common (10) --
    {
        id: 'w1_c1', world: 'village', rarity: 'common', name: 'Heugabel', emoji: '🔱',
        description: 'Ein einfaches Werkzeug.',
        effectType: 'bonus_coins', effectValues: [2, 4, 6], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w1_c2', world: 'village', rarity: 'common', name: 'Dorfköter', emoji: '🐕',
        description: 'Bellt laut, beißt aber nicht.',
        effectType: 'bonus_xp', effectValues: [2, 4, 6], effectText: '+{val}% XP nach dem Level.'
    },
    {
        id: 'w1_c3', world: 'village', rarity: 'common', name: 'Kürbismonster', emoji: '🎃',
        description: 'Riecht nach Herbst.',
        effectType: 'boss_slow', effectValues: [1, 2, 3], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w1_c4', world: 'village', rarity: 'common', name: 'Gartenzwerg', emoji: '🧙‍♂️',
        description: 'Steht einfach nur da.',
        effectType: 'bonus_coins', effectValues: [2, 4, 6], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w1_c5', world: 'village', rarity: 'common', name: 'Wildschwein', emoji: '🐗',
        description: 'Auf der Suche nach Eicheln.',
        effectType: 'monster_slow', effectValues: [1, 2, 3], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w1_c6', world: 'village', rarity: 'common', name: 'Feldmaus', emoji: '🐭',
        description: 'Huscht schnell vorbei.',
        effectType: 'bonus_xp', effectValues: [2, 4, 6], effectText: '+{val}% XP nach dem Level.'
    },
    {
        id: 'w1_c7', world: 'village', rarity: 'common', name: 'Wütendes Huhn', emoji: '🐔',
        description: 'Pickt dich, wenn du nicht aufpasst.',
        effectType: 'bonus_coins', effectValues: [2, 4, 6], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w1_c8', world: 'village', rarity: 'common', name: 'Vogelscheuche', emoji: '🕴️',
        description: 'Hält dumme Vögel fern.',
        effectType: 'boss_slow', effectValues: [1, 2, 3], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w1_c9', world: 'village', rarity: 'common', name: 'Schleimbo', emoji: '🦠',
        description: 'Glibberig und klebrig.',
        effectType: 'monster_slow', effectValues: [1, 2, 3], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w1_c10', world: 'village', rarity: 'common', name: 'Bauernbrot', emoji: '🍞',
        description: 'Stärkt für den Kampf.',
        effectType: 'castle_hp_flat', effectValues: [5, 10, 15], effectText: 'Burg hat +{val} HP.'
    },

    // -- Rare (5) --
    {
        id: 'w1_r1', world: 'village', rarity: 'rare', name: 'Troll der Brücke', emoji: '🧌',
        description: 'Will Wegzoll haben.',
        effectType: 'bonus_coins', effectValues: [10, 15, 20], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w1_r2', world: 'village', rarity: 'rare', name: 'Goblin-Dieb', emoji: '🦹',
        description: 'Klaut, was nicht niet- und nagelfest ist.',
        effectType: 'item_discount', effectValues: [5, 10, 15], effectText: '{val}% Rabatt auf Shop-Items.'
    },
    {
        id: 'w1_r3', world: 'village', rarity: 'rare', name: 'Riesenkröte', emoji: '🐸',
        description: 'Verschluckt Fliegen im Ganzen.',
        effectType: 'monster_slow', effectValues: [4, 6, 8], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w1_r4', world: 'village', rarity: 'rare', name: 'Windmühlen-Rad', emoji: '🎡',
        description: 'Dreht sich unaufhörlich.',
        effectType: 'bonus_xp', effectValues: [10, 15, 20], effectText: '+{val}% XP nach dem Level.'
    },
    {
        id: 'w1_r5', world: 'village', rarity: 'rare', name: 'Dorfgarde', emoji: '💂',
        description: 'Schützt das Dorf vor Plünderern.',
        effectType: 'castle_hp_flat', effectValues: [20, 30, 40], effectText: 'Burg hat +{val} HP.'
    },

    // -- Epic (3) --
    {
        id: 'w1_e1', world: 'village', rarity: 'epic', name: 'Schwarzer Ritter', emoji: '🤺',
        description: 'Ein Ausgestoßener aus der fernen Burg.',
        effectType: 'forgive_error', effectValues: [1, 2, 3], effectText: 'Ignoriert {val} Tippfehler pro Level.'
    },
    {
        id: 'w1_e2', world: 'village', rarity: 'epic', name: 'Alpha-Leitwolf', emoji: '🐺',
        description: 'Führt das Rudel in der Nacht an.',
        effectType: 'combo_shield', effectValues: [1, 2, 3], effectText: 'Schützt deine Combo {val}-mal vor Abbruch.'
    },
    {
        id: 'w1_e3', world: 'village', rarity: 'epic', name: 'Verzauberter Golem', emoji: '🗿',
        description: 'Aus Lehm und Magie geformt.',
        effectType: 'castle_hp_percent', effectValues: [10, 20, 30], effectText: 'Burg hat +{val}% maximale HP.'
    },

    // -- Legendary (2) --
    {
        id: 'w1_l1', world: 'village', rarity: 'legendary', name: 'Ratten-König', emoji: '🐀',
        description: 'Der Herrscher der Kanalisation. Gierig und listig.',
        effectType: 'bonus_coins_xp', effectValues: [20, 35, 50], effectText: '+{val}% auf Münzen UND XP!'
    },
    {
        id: 'w1_l2', world: 'village', rarity: 'legendary', name: 'Goldenes Hufeisen', emoji: '🧲',
        description: 'Ein Artefakt grenzenlosen Glücks.',
        effectType: 'card_drop_chance', effectValues: [5, 10, 15], effectText: '+{val}% Chance auf Karten-Drops.'
    }
];

export function getCardById(id) {
    return CARDS.find(c => c.id === id);
}

export function getCardsByWorld(worldId) {
    return CARDS.filter(c => c.world === worldId);
}

export function rollCard(worldId, forcedRarity = null) {
    const rarity = forcedRarity || rollRarity();
    const pool = CARDS.filter(c => (worldId ? c.world === worldId : true) && c.rarity === rarity);

    // If pool is empty (e.g. asking for legendary when none exists yet), fallback
    if (pool.length === 0) {
        const anyPool = CARDS.filter(c => worldId ? c.world === worldId : true);
        return anyPool[Math.floor(Math.random() * anyPool.length)];
    }

    return pool[Math.floor(Math.random() * pool.length)];
}

// Generates a Pack of 3 cards. 
// At least one card is guaranteed to be 'rare' or better.
export function openBoosterPack() {
    const cards = [];
    // Card 1: Guaranteed rare+
    cards.push(rollCard(null, rollRarity(true)));
    // Card 2 & 3: Normal odds
    cards.push(rollCard(null, rollRarity(false)));
    cards.push(rollCard(null, rollRarity(false)));
    return cards;
}

// Computes the formatted effect text based on a card's ID and level
export function getEffectDescription(cardId, level) {
    const card = getCardById(cardId);
    if (!card) return '';
    // Level is 1-indexed (1, 2, or 3)
    const val = card.effectValues[Math.max(0, level - 1)];
    return card.effectText.replace('{val}', val);
}
