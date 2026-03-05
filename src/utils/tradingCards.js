// Trading Cards Data Structure
// Defines rarities, drop rates, and the actual cards.

export const RARITIES = {
    common: { id: 'common', name: 'Häufig', color: '#94a3b8', dropWeight: 70, maxLevel: 3, duplicatesNeeded: [0, 2, 5] },
    rare: { id: 'rare', name: 'Selten', color: '#3b82f6', dropWeight: 20, maxLevel: 3, duplicatesNeeded: [0, 1, 3] },
    epic: { id: 'epic', name: 'Episch', color: '#a855f7', dropWeight: 8, maxLevel: 3, duplicatesNeeded: [0, 1, 2] },
    legendary: { id: 'legendary', name: 'Legendär', color: '#eab308', dropWeight: 2, maxLevel: 3, duplicatesNeeded: [0, 1, 1] }
};

// Returns random rarity based on weights
// boostRare = true → guaranteed rare+ (for guaranteed slots)
// megaBoost = true → 2× epic/legendary odds (for Mega Pack)
export function rollRarity(boostRare = false, megaBoost = false) {
    let weights;
    if (boostRare) {
        weights = { common: 0, rare: 75, epic: 20, legendary: 5 }; // Guaranteed rare+
    } else if (megaBoost) {
        weights = { common: 54, rare: 20, epic: 16, legendary: 4 }; // 2× epic/legendary
    } else {
        weights = { common: 70, rare: 20, epic: 8, legendary: 2 }; // Normal odds
    }

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
        description: 'Weiß alles über die Burg.',
        effectType: 'spawn_delay', effectValues: [2, 4, 6], effectText: '+{val}% mehr Zeit zwischen Monstern.'
    },
    {
        id: 'w1_c2', world: 'village', rarity: 'common', name: 'Dorfköter', emoji: '🐕',
        description: 'Bellt laut, beißt aber nicht.',
        effectType: 'extra_time', effectValues: [3, 5, 8], effectText: '+{val} Sekunden Levelzeit.'
    },
    {
        id: 'w1_c3', world: 'village', rarity: 'common', name: 'Kürbismonster', emoji: '🎃',
        description: 'Riecht nach Herbst.',
        effectType: 'boss_slow', effectValues: [1, 2, 3], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w1_c4', world: 'village', rarity: 'common', name: 'Gartenzwerg', emoji: '🧙‍♂️',
        description: 'Steht einfach nur da.',
        effectType: 'spawn_delay', effectValues: [2, 4, 6], effectText: '+{val}% mehr Zeit zwischen Monstern.'
    },
    {
        id: 'w1_c5', world: 'village', rarity: 'common', name: 'Wildschwein', emoji: '🐗',
        description: 'Auf der Suche nach Eicheln.',
        effectType: 'monster_slow', effectValues: [1, 2, 3], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w1_c6', world: 'village', rarity: 'common', name: 'Feldmaus', emoji: '🐭',
        description: 'Huscht schnell vorbei.',
        effectType: 'bonus_score', effectValues: [2, 4, 6], effectText: '+{val}% mehr Score.'
    },
    {
        id: 'w1_c7', world: 'village', rarity: 'common', name: 'Wütendes Huhn', emoji: '🐔',
        description: 'Pickt dich, wenn du nicht aufpasst.',
        effectType: 'bonus_score', effectValues: [2, 4, 6], effectText: '+{val}% mehr Score.'
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
        description: 'Uralte Waffe der Riesen.',
        effectType: 'extra_time', effectValues: [8, 12, 18], effectText: '+{val} Sekunden Levelzeit.'
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
        effectType: 'extra_time', effectValues: [8, 12, 18], effectText: '+{val} Sekunden Levelzeit.'
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
        effectType: 'bonus_coins', effectValues: [20, 35, 50], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w1_l2', world: 'village', rarity: 'legendary', name: 'Goldenes Hufeisen', emoji: '🧲',
        description: 'Ein Artefakt grenzenlosen Glücks.',
        effectType: 'card_drop_chance', effectValues: [5, 10, 15], effectText: '+{val}% Chance auf Karten-Drops.'
    },

    // ==========================================
    // World 2: Zauberwald (20 Cards)
    // ==========================================

    // -- Common (10) --
    {
        id: 'w2_c1', world: 'forest', rarity: 'common', name: 'Glühwürmchen', emoji: '✨',
        description: 'Tanzt im Mondlicht zwischen den Bäumen.',
        effectType: 'spawn_delay', effectValues: [2, 4, 6], effectText: '+{val}% mehr Zeit zwischen Monstern.'
    },
    {
        id: 'w2_c2', world: 'forest', rarity: 'common', name: 'Waldpilz', emoji: '🍄',
        description: 'Giftig oder heilsam? Wer weiß...',
        effectType: 'bonus_coins', effectValues: [3, 5, 8], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w2_c3', world: 'forest', rarity: 'common', name: 'Moosgolem', emoji: '🌿',
        description: 'Ein wandelnder Haufen Moos und Erde.',
        effectType: 'boss_slow', effectValues: [1, 2, 4], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w2_c4', world: 'forest', rarity: 'common', name: 'Eichhörnchen', emoji: '🐿️',
        description: 'Schmilzt nie, brennt immer.',
        effectType: 'spawn_delay', effectValues: [5, 8, 12], effectText: '+{val}% mehr Zeit zwischen Monstern.'
    },
    {
        id: 'w2_c5', world: 'forest', rarity: 'common', name: 'Baumgeist', emoji: '🌲',
        description: 'Flüstert Geheimnisse im Wind.',
        effectType: 'monster_slow', effectValues: [1, 3, 4], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w2_c6', world: 'forest', rarity: 'common', name: 'Feenstaub', emoji: '🧚',
        description: 'Glitzert und kitzelt in der Nase.',
        effectType: 'extra_time', effectValues: [3, 5, 8], effectText: '+{val} Sekunden Levelzeit.'
    },
    {
        id: 'w2_c7', world: 'forest', rarity: 'common', name: 'Giftranke', emoji: '🕸️',
        description: 'Eine Spinne hat ihr Netz gespannt.',
        effectType: 'boss_slow', effectValues: [1, 2, 4], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w2_c8', world: 'forest', rarity: 'common', name: 'Waldfrosch', emoji: '🐸',
        description: 'Quakt laut bei Vollmond.',
        effectType: 'monster_slow', effectValues: [1, 3, 4], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w2_c9', world: 'forest', rarity: 'common', name: 'Magische Beere', emoji: '🫐',
        description: 'Heilt kleine Wunden.',
        effectType: 'castle_hp_flat', effectValues: [5, 10, 18], effectText: 'Burg hat +{val} HP.'
    },
    {
        id: 'w2_c10', world: 'forest', rarity: 'common', name: 'Zauberrabe', emoji: '🐦‍⬛',
        description: 'Zauberhafter Waldbewohner.',
        effectType: 'bonus_score', effectValues: [2, 4, 6], effectText: '+{val}% mehr Score.'
    },

    // -- Rare (5) --
    {
        id: 'w2_r1', world: 'forest', rarity: 'rare', name: 'Elfenkriegerin', emoji: '🧝‍♀️',
        description: 'Beschützt den Wald mit ihrem Bogen.',
        effectType: 'spawn_delay', effectValues: [5, 8, 12], effectText: '+{val}% mehr Zeit zwischen Monstern.'
    },
    {
        id: 'w2_r2', world: 'forest', rarity: 'rare', name: 'Rankenwächter', emoji: '🌱',
        description: 'Hält Eindringlinge mit Dornen fest.',
        effectType: 'monster_slow', effectValues: [5, 7, 10], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w2_r3', world: 'forest', rarity: 'rare', name: 'Irrlichter', emoji: '🔮',
        description: 'Führen Wanderer in die Irre.',
        effectType: 'boss_slow', effectValues: [4, 6, 9], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w2_r4', world: 'forest', rarity: 'rare', name: 'Pilzritter', emoji: '🛡️',
        description: 'Ein tapferer Kämpfer aus Pilz und Moos.',
        effectType: 'castle_hp_flat', effectValues: [20, 35, 50], effectText: 'Burg hat +{val} HP.'
    },
    {
        id: 'w2_r5', world: 'forest', rarity: 'rare', name: 'Einhorn-Fohlen', emoji: '🦄',
        description: 'Sein Horn leuchtet sanft im Dunkel.',
        effectType: 'bonus_coins', effectValues: [12, 18, 24], effectText: '+{val}% Münzen nach dem Level.'
    },

    // -- Epic (3) --
    {
        id: 'w2_e1', world: 'forest', rarity: 'epic', name: 'Waldgeist', emoji: '👻',
        description: 'Der uralte Hüter des Zauberwalds.',
        effectType: 'forgive_error', effectValues: [1, 2, 3], effectText: 'Ignoriert {val} Tippfehler pro Level.'
    },
    {
        id: 'w2_e2', world: 'forest', rarity: 'epic', name: 'Lebensbaumherz', emoji: '💚',
        description: 'Das schlagende Herz des Waldes.',
        effectType: 'castle_hp_percent', effectValues: [12, 22, 35], effectText: 'Burg hat +{val}% maximale HP.'
    },
    {
        id: 'w2_e3', world: 'forest', rarity: 'epic', name: 'Trollschamane', emoji: '🧌',
        description: 'Braut mächtige Tränke aus Wurzeln.',
        effectType: 'combo_shield', effectValues: [1, 2, 3], effectText: 'Schützt deine Combo {val}-mal vor Abbruch.'
    },

    // -- Legendary (2) --
    {
        id: 'w2_l1', world: 'forest', rarity: 'legendary', name: 'Weltenesche', emoji: '🌳',
        description: 'Der Baum, der alles verbindet. Uralt und mächtig.',
        effectType: 'bonus_coins', effectValues: [22, 38, 55], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w2_l2', world: 'forest', rarity: 'legendary', name: 'Smaragd-Phönix', emoji: '🦚',
        description: 'Ein mythischer Vogel aus reiner Waldmagie.',
        effectType: 'card_drop_chance', effectValues: [6, 12, 18], effectText: '+{val}% Chance auf Karten-Drops.'
    },

    // ==========================================
    // World 3: Eisige Berge (20 Cards)
    // ==========================================

    // -- Common (10) --
    {
        id: 'w3_c1', world: 'mountains', rarity: 'common', name: 'Schneefuchs', emoji: '🦊',
        description: 'Weißes Fell, scharfe Augen.',
        effectType: 'bonus_coins', effectValues: [3, 6, 9], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w3_c2', world: 'mountains', rarity: 'common', name: 'Eiszapfen', emoji: '🧊',
        description: 'Hängt überall an den Felswänden.',
        effectType: 'boss_slow', effectValues: [2, 3, 4], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w3_c3', world: 'mountains', rarity: 'common', name: 'Schnee-Eule', emoji: '🦉',
        description: 'Schützt vor der Kälte.',
        effectType: 'bonus_score', effectValues: [3, 6, 9], effectText: '+{val}% mehr Score.'
    },
    {
        id: 'w3_c4', world: 'mountains', rarity: 'common', name: 'Gletscherkäfer', emoji: '🪲',
        description: 'Lebt unter dem ewigen Eis.',
        effectType: 'monster_slow', effectValues: [2, 3, 5], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w3_c5', world: 'mountains', rarity: 'common', name: 'Bergziege', emoji: '🐐',
        description: 'Klettert mühelos die steilsten Hänge.',
        effectType: 'bonus_coins', effectValues: [3, 6, 9], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w3_c6', world: 'mountains', rarity: 'common', name: 'Frostfledermaus', emoji: '🦇',
        description: 'Jagt Insekten in eisigen Höhlen.',
        effectType: 'bonus_coins', effectValues: [3, 6, 9], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w3_c7', world: 'mountains', rarity: 'common', name: 'Schneeball-Geist', emoji: '⛄',
        description: 'Wirft Schneebälle auf Wanderer.',
        effectType: 'boss_slow', effectValues: [2, 3, 4], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w3_c8', world: 'mountains', rarity: 'common', name: 'Eisblume', emoji: '❄️',
        description: 'Wächst nur bei minus 30 Grad.',
        effectType: 'castle_hp_flat', effectValues: [6, 12, 18], effectText: 'Burg hat +{val} HP.'
    },
    {
        id: 'w3_c9', world: 'mountains', rarity: 'common', name: 'Schneewolf', emoji: '🐺',
        description: 'Streift in Rudeln durch den Schneesturm.',
        effectType: 'monster_slow', effectValues: [2, 3, 5], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w3_c10', world: 'mountains', rarity: 'common', name: 'Mammut-Baby', emoji: '🦣',
        description: 'Klein, flauschig und extrem tapsig.',
        effectType: 'bonus_coins', effectValues: [3, 6, 9], effectText: '+{val}% Münzen nach dem Level.'
    },

    // -- Rare (5) --
    {
        id: 'w3_r1', world: 'mountains', rarity: 'rare', name: 'Frosthexe', emoji: '🧙‍♀️',
        description: 'Ihr Atem gefriert die Luft.',
        effectType: 'monster_slow', effectValues: [5, 8, 12], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w3_r2', world: 'mountains', rarity: 'rare', name: 'Kristall-Golem', emoji: '💎',
        description: 'Aus ewigem Eis und Bergkristall geformt.',
        effectType: 'castle_hp_flat', effectValues: [25, 40, 55], effectText: 'Burg hat +{val} HP.'
    },
    {
        id: 'w3_r3', world: 'mountains', rarity: 'rare', name: 'Lawinenläufer', emoji: '🏔️',
        description: 'Magisches Holz aus der Tiefe des Waldes.',
        effectType: 'spawn_delay', effectValues: [5, 8, 12], effectText: '+{val}% mehr Zeit zwischen Monstern.'
    },
    {
        id: 'w3_r4', world: 'mountains', rarity: 'rare', name: 'Polarfuchs', emoji: '🐾',
        description: 'Unsichtbar im Schneesturm.',
        effectType: 'item_discount', effectValues: [5, 10, 15], effectText: '{val}% Rabatt auf Shop-Items.'
    },
    {
        id: 'w3_r5', world: 'mountains', rarity: 'rare', name: 'Gipfelwächter', emoji: '⚔️',
        description: 'Enthält die Macht eines Drachen.',
        effectType: 'spawn_delay', effectValues: [5, 8, 12], effectText: '+{val}% mehr Zeit zwischen Monstern.'
    },

    // -- Epic (3) --
    {
        id: 'w3_e1', world: 'mountains', rarity: 'epic', name: 'Eisriese', emoji: '🏔️',
        description: 'Ein Berg, der zum Leben erwacht ist.',
        effectType: 'forgive_error', effectValues: [1, 2, 4], effectText: 'Ignoriert {val} Tippfehler pro Level.'
    },
    {
        id: 'w3_e2', world: 'mountains', rarity: 'epic', name: 'Nordlicht-Geist', emoji: '🌌',
        description: 'Tanzt am Himmel über den Gipfeln.',
        effectType: 'combo_shield', effectValues: [1, 2, 3], effectText: 'Schützt deine Combo {val}-mal vor Abbruch.'
    },
    {
        id: 'w3_e3', world: 'mountains', rarity: 'epic', name: 'Frostdrache', emoji: '🐲',
        description: 'Sein Atem verwandelt alles in Eis.',
        effectType: 'castle_hp_percent', effectValues: [12, 24, 35], effectText: 'Burg hat +{val}% maximale HP.'
    },

    // -- Legendary (2) --
    {
        id: 'w3_l1', world: 'mountains', rarity: 'legendary', name: 'Yeti-König', emoji: '🦍',
        description: 'Der Herrscher der ewigen Gletscher. Furchteinflößend.',
        effectType: 'bonus_coins', effectValues: [25, 40, 60], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w3_l2', world: 'mountains', rarity: 'legendary', name: 'Diamantherz', emoji: '💠',
        description: 'Ein Kristall aus dem Kern des Berges. Unzerstörbar.',
        effectType: 'card_drop_chance', effectValues: [7, 13, 20], effectText: '+{val}% Chance auf Karten-Drops.'
    },

    // ==========================================
    // World 4: Feuervulkan (20 Cards)
    // ==========================================

    // -- Common (10) --
    {
        id: 'w4_c1', world: 'volcano', rarity: 'common', name: 'Magmawurm', emoji: '🪱',
        description: 'Lebt in glühender Lava.',
        effectType: 'bonus_coins', effectValues: [4, 7, 10], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w4_c2', world: 'volcano', rarity: 'common', name: 'Aschevogel', emoji: '🐦',
        description: 'Pirscht durch das Unterholz.',
        effectType: 'spawn_delay', effectValues: [2, 4, 6], effectText: '+{val}% mehr Zeit zwischen Monstern.'
    },
    {
        id: 'w4_c3', world: 'volcano', rarity: 'common', name: 'Feuergeist', emoji: '🔥',
        description: 'Eine tanzende Flamme mit eigenem Willen.',
        effectType: 'boss_slow', effectValues: [2, 3, 5], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w4_c4', world: 'volcano', rarity: 'common', name: 'Obsidian-Skorpion', emoji: '🦂',
        description: 'Sein Stachel glüht in der Hitze.',
        effectType: 'monster_slow', effectValues: [2, 4, 5], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w4_c5', world: 'volcano', rarity: 'common', name: 'Lavaschleimer', emoji: '🫠',
        description: 'Glibbert und glüht zugleich.',
        effectType: 'spawn_delay', effectValues: [2, 4, 6], effectText: '+{val}% mehr Zeit zwischen Monstern.'
    },
    {
        id: 'w4_c6', world: 'volcano', rarity: 'common', name: 'Feuerkäfer', emoji: '🐞',
        description: 'Sein Panzer ist feuerrot und heiß.',
        effectType: 'extra_time', effectValues: [3, 5, 8], effectText: '+{val} Sekunden Levelzeit.'
    },
    {
        id: 'w4_c7', world: 'volcano', rarity: 'common', name: 'Rauchschlange', emoji: '🐍',
        description: 'Schlängelt sich durch heißen Dampf.',
        effectType: 'monster_slow', effectValues: [2, 4, 5], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w4_c8', world: 'volcano', rarity: 'common', name: 'Glutstein', emoji: '🪨',
        description: 'Ein Stein, der niemals abkühlt.',
        effectType: 'castle_hp_flat', effectValues: [8, 14, 20], effectText: 'Burg hat +{val} HP.'
    },
    {
        id: 'w4_c9', world: 'volcano', rarity: 'common', name: 'Flammensalamander', emoji: '🦎',
        description: 'Badet zum Spaß in Lava.',
        effectType: 'boss_slow', effectValues: [2, 3, 5], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w4_c10', world: 'volcano', rarity: 'common', name: 'Vulkankröte', emoji: '🐸',
        description: 'Wacht über die Mauern.',
        effectType: 'extra_time', effectValues: [3, 5, 8], effectText: '+{val} Sekunden Levelzeit.'
    },

    // -- Rare (5) --
    {
        id: 'w4_r1', world: 'volcano', rarity: 'rare', name: 'Lavabiest', emoji: '👹',
        description: 'Aus dem Krater geboren, aus Wut geformt.',
        effectType: 'bonus_coins', effectValues: [14, 20, 28], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w4_r2', world: 'volcano', rarity: 'rare', name: 'Feuerschmied', emoji: '⚒️',
        description: 'Schmiedet Waffen in der Glut des Vulkans.',
        effectType: 'item_discount', effectValues: [6, 12, 18], effectText: '{val}% Rabatt auf Shop-Items.'
    },
    {
        id: 'w4_r3', world: 'volcano', rarity: 'rare', name: 'Magmagolem', emoji: '🗿',
        description: 'Ein wandelnder Berg aus flüssigem Gestein.',
        effectType: 'castle_hp_flat', effectValues: [25, 42, 60], effectText: 'Burg hat +{val} HP.'
    },
    {
        id: 'w4_r4', world: 'volcano', rarity: 'rare', name: 'Aschedrache', emoji: '🐉',
        description: 'Spuckt Glutwolken statt Flammen.',
        effectType: 'boss_slow', effectValues: [5, 8, 11], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w4_r5', world: 'volcano', rarity: 'rare', name: 'Eruptionselementar', emoji: '🌋',
        description: 'Explodiert gerne – und oft.',
        effectType: 'bonus_coins', effectValues: [14, 20, 28], effectText: '+{val}% Münzen nach dem Level.'
    },

    // -- Epic (3) --
    {
        id: 'w4_e1', world: 'volcano', rarity: 'epic', name: 'Phönix-Küken', emoji: '🐥',
        description: 'Wird aus seiner eigenen Asche wiedergeboren.',
        effectType: 'forgive_error', effectValues: [2, 3, 4], effectText: 'Ignoriert {val} Tippfehler pro Level.'
    },
    {
        id: 'w4_e2', world: 'volcano', rarity: 'epic', name: 'Obsidian-Rüstung', emoji: '🛡️',
        description: 'Geschmiedet im Herzen des Vulkans.',
        effectType: 'castle_hp_percent', effectValues: [15, 25, 38], effectText: 'Burg hat +{val}% maximale HP.'
    },
    {
        id: 'w4_e3', world: 'volcano', rarity: 'epic', name: 'Flammengeist', emoji: '👺',
        description: 'Ein rachsüchtiger Geist aus purem Feuer.',
        effectType: 'combo_shield', effectValues: [1, 2, 4], effectText: 'Schützt deine Combo {val}-mal vor Abbruch.'
    },

    // -- Legendary (2) --
    {
        id: 'w4_l1', world: 'volcano', rarity: 'legendary', name: 'Vulkan-Titan', emoji: '🌋',
        description: 'Der Vulkan selbst hat ein Bewusstsein. Vernichtend.',
        effectType: 'bonus_coins', effectValues: [28, 45, 65], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w4_l2', world: 'volcano', rarity: 'legendary', name: 'Ewige Flamme', emoji: '🕯️',
        description: 'Brennt seit Anbeginn der Zeit. Unauslöschlich.',
        effectType: 'card_drop_chance', effectValues: [8, 14, 22], effectText: '+{val}% Chance auf Karten-Drops.'
    },

    // ==========================================
    // World 5: Dunkle Burg (20 Cards)
    // ==========================================

    // -- Common (10) --
    {
        id: 'w5_c1', world: 'castle', rarity: 'common', name: 'Burgfledermaus', emoji: '🦇',
        description: 'Ein mysteriöser Schlüssel.',
        effectType: 'bonus_score', effectValues: [4, 8, 11], effectText: '+{val}% mehr Score.'
    },
    {
        id: 'w5_c2', world: 'castle', rarity: 'common', name: 'Knochenkrieger', emoji: '💀',
        description: 'Klappern gehört zum Handwerk.',
        effectType: 'extra_time', effectValues: [3, 5, 8], effectText: '+{val} Sekunden Levelzeit.'
    },
    {
        id: 'w5_c3', world: 'castle', rarity: 'common', name: 'Kettengeist', emoji: '👻',
        description: 'Rasselt nachts durch die Korridore.',
        effectType: 'boss_slow', effectValues: [2, 4, 5], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w5_c4', world: 'castle', rarity: 'common', name: 'Giftige Ratte', emoji: '🐀',
        description: 'Wuselt durch die dunklen Gänge.',
        effectType: 'monster_slow', effectValues: [2, 4, 6], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w5_c5', world: 'castle', rarity: 'common', name: 'Steingargoyle', emoji: '🗿',
        description: 'Tagsüber Stein, nachts lebendig.',
        effectType: 'castle_hp_flat', effectValues: [8, 15, 22], effectText: 'Burg hat +{val} HP.'
    },
    {
        id: 'w5_c6', world: 'castle', rarity: 'common', name: 'Kerzengeist', emoji: '🕯️',
        description: 'Flackert unheimlich in den Hallen.',
        effectType: 'bonus_score', effectValues: [4, 8, 11], effectText: '+{val}% mehr Score.'
    },
    {
        id: 'w5_c7', world: 'castle', rarity: 'common', name: 'Burgspinne', emoji: '🕷️',
        description: 'Webt riesige Netze in den Türmen.',
        effectType: 'monster_slow', effectValues: [2, 4, 6], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w5_c8', world: 'castle', rarity: 'common', name: 'Rostiger Helm', emoji: '⛑️',
        description: 'Gehörte einst einem tapferen Ritter.',
        effectType: 'boss_slow', effectValues: [2, 4, 5], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w5_c9', world: 'castle', rarity: 'common', name: 'Irrwisch', emoji: '💫',
        description: 'Ein verwirrender Lichtball in der Dunkelheit.',
        effectType: 'bonus_coins', effectValues: [4, 8, 11], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w5_c10', world: 'castle', rarity: 'common', name: 'Schattenratte', emoji: '🐁',
        description: 'Verschwindet im eigenen Schatten.',
        effectType: 'bonus_coins', effectValues: [4, 8, 11], effectText: '+{val}% Münzen nach dem Level.'
    },

    // -- Rare (5) --
    {
        id: 'w5_r1', world: 'castle', rarity: 'rare', name: 'Geisterritter', emoji: '🤺',
        description: 'Rüstung aus einem anderen Zeitalter.',
        effectType: 'extra_time', effectValues: [8, 12, 18], effectText: '+{val} Sekunden Levelzeit.'
    },
    {
        id: 'w5_r2', world: 'castle', rarity: 'rare', name: 'Vampirfürst', emoji: '🧛',
        description: 'Herrscht über die Nacht.',
        effectType: 'castle_hp_flat', effectValues: [28, 45, 65], effectText: 'Burg hat +{val} HP.'
    },
    {
        id: 'w5_r3', world: 'castle', rarity: 'rare', name: 'Schattendolch', emoji: '🗡️',
        description: 'Sticht zu, bevor man ihn sieht.',
        effectType: 'boss_slow', effectValues: [5, 9, 12], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w5_r4', world: 'castle', rarity: 'rare', name: 'Turm-Banshee', emoji: '😱',
        description: 'Ihr Schrei lähmt die Feinde.',
        effectType: 'monster_slow', effectValues: [6, 9, 13], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w5_r5', world: 'castle', rarity: 'rare', name: 'Nekromant', emoji: '🧙',
        description: 'Erweckt Gefallene aus ihren Gräbern.',
        effectType: 'bonus_coins', effectValues: [15, 22, 30], effectText: '+{val}% Münzen nach dem Level.'
    },

    // -- Epic (3) --
    {
        id: 'w5_e1', world: 'castle', rarity: 'epic', name: 'Schwarzer Ritter', emoji: '♟️',
        description: 'Der gefürchtetste Krieger der Burg.',
        effectType: 'forgive_error', effectValues: [2, 3, 5], effectText: 'Ignoriert {val} Tippfehler pro Level.'
    },
    {
        id: 'w5_e2', world: 'castle', rarity: 'epic', name: 'Seelenspiegel', emoji: '🪞',
        description: 'Zeigt die wahre Gestalt der Feinde.',
        effectType: 'combo_shield', effectValues: [2, 3, 4], effectText: 'Schützt deine Combo {val}-mal vor Abbruch.'
    },
    {
        id: 'w5_e3', world: 'castle', rarity: 'epic', name: 'Thronsaal-Golem', emoji: '🏰',
        description: 'Die lebende Verteidigung der Burg.',
        effectType: 'castle_hp_percent', effectValues: [15, 28, 40], effectText: 'Burg hat +{val}% maximale HP.'
    },

    // -- Legendary (2) --
    {
        id: 'w5_l1', world: 'castle', rarity: 'legendary', name: 'Ewiger König', emoji: '👑',
        description: 'Herrscht seit tausend Jahren über die Dunkle Burg.',
        effectType: 'bonus_coins', effectValues: [30, 48, 70], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w5_l2', world: 'castle', rarity: 'legendary', name: 'Verderbtes Artefakt', emoji: '💍',
        description: 'Ein Ring, der alles korrumpiert – außer dein Glück.',
        effectType: 'card_drop_chance', effectValues: [9, 16, 24], effectText: '+{val}% Chance auf Karten-Drops.'
    },

    // ==========================================
    // World 6: Drachenhöhle (20 Cards)
    // ==========================================

    // -- Common (10) --
    {
        id: 'w6_c1', world: 'dragon', rarity: 'common', name: 'Drachenbaby', emoji: '🐣',
        description: 'Frisch geschlüpft und neugierig.',
        effectType: 'bonus_coins', effectValues: [5, 9, 13], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w6_c2', world: 'dragon', rarity: 'common', name: 'Goldmünze', emoji: '🪙',
        description: 'Aus dem Hort des Drachen gestohlen.',
        effectType: 'bonus_score', effectValues: [5, 9, 13], effectText: '+{val}% mehr Score.'
    },
    {
        id: 'w6_c3', world: 'dragon', rarity: 'common', name: 'Drachenschuppe', emoji: '🛡️',
        description: 'Härter als Stahl.',
        effectType: 'castle_hp_flat', effectValues: [10, 18, 25], effectText: 'Burg hat +{val} HP.'
    },
    {
        id: 'w6_c4', world: 'dragon', rarity: 'common', name: 'Höhlenkobold', emoji: '👺',
        description: 'Klaut gerne glänzende Dinge.',
        effectType: 'bonus_coins', effectValues: [5, 9, 13], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w6_c5', world: 'dragon', rarity: 'common', name: 'Feuerechse', emoji: '🦎',
        description: 'Ein kleiner Verwandter der Drachen.',
        effectType: 'monster_slow', effectValues: [3, 5, 7], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w6_c6', world: 'dragon', rarity: 'common', name: 'Drachenei', emoji: '🥚',
        description: 'Warm und vibrierend. Es rührt sich etwas.',
        effectType: 'boss_slow', effectValues: [3, 4, 6], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w6_c7', world: 'dragon', rarity: 'common', name: 'Schatztruhe', emoji: '🧳',
        description: 'Enthält Goldmünzen und alte Relikte.',
        effectType: 'bonus_coins', effectValues: [5, 9, 13], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w6_c8', world: 'dragon', rarity: 'common', name: 'Höhlenfledermaus', emoji: '🦇',
        description: 'Fliegt im Zickzack durch die Dunkelheit.',
        effectType: 'bonus_coins', effectValues: [5, 9, 13], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w6_c9', world: 'dragon', rarity: 'common', name: 'Glühende Rune', emoji: '🔶',
        description: 'Ein uraltes Symbol an der Höhlenwand.',
        effectType: 'monster_slow', effectValues: [3, 5, 7], effectText: 'Normale Gegner {val}% langsamer.'
    },
    {
        id: 'w6_c10', world: 'dragon', rarity: 'common', name: 'Stalaktit', emoji: '🪨',
        description: 'Könnte jederzeit herunterfallen.',
        effectType: 'boss_slow', effectValues: [3, 4, 6], effectText: 'Bosse sind {val}% langsamer.'
    },

    // -- Rare (5) --
    {
        id: 'w6_r1', world: 'dragon', rarity: 'rare', name: 'Drachenzähmer', emoji: '🧑‍🤝‍🧑',
        description: 'Hat einen Pakt mit den Drachen geschlossen.',
        effectType: 'bonus_coins', effectValues: [16, 24, 32], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w6_r2', world: 'dragon', rarity: 'rare', name: 'Hort-Wächter', emoji: '🐲',
        description: 'Bewacht den Goldberg mit Feuer und Krallen.',
        effectType: 'castle_hp_flat', effectValues: [30, 50, 70], effectText: 'Burg hat +{val} HP.'
    },
    {
        id: 'w6_r3', world: 'dragon', rarity: 'rare', name: 'Drachenatem-Zauberstab', emoji: '🪄',
        description: 'Kanalisiert die Macht der Drachen.',
        effectType: 'boss_slow', effectValues: [6, 10, 14], effectText: 'Bosse sind {val}% langsamer.'
    },
    {
        id: 'w6_r4', world: 'dragon', rarity: 'rare', name: 'Wyrmling', emoji: '🐍',
        description: 'Ein junger Drache, der fliegen lernt.',
        effectType: 'bonus_coins', effectValues: [16, 24, 32], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w6_r5', world: 'dragon', rarity: 'rare', name: 'Feuer-Opal', emoji: '💎',
        description: 'Funkelt in allen Farben des Feuers.',
        effectType: 'item_discount', effectValues: [7, 13, 20], effectText: '{val}% Rabatt auf Shop-Items.'
    },

    // -- Epic (3) --
    {
        id: 'w6_e1', world: 'dragon', rarity: 'epic', name: 'Drachenrüstung', emoji: '⚔️',
        description: 'Aus den Schuppen eines uralten Drachen geschmiedet.',
        effectType: 'castle_hp_percent', effectValues: [18, 30, 45], effectText: 'Burg hat +{val}% maximale HP.'
    },
    {
        id: 'w6_e2', world: 'dragon', rarity: 'epic', name: 'Zeitdrache', emoji: '⏳',
        description: 'Kann die Zeit verlangsamen.',
        effectType: 'combo_shield', effectValues: [2, 3, 5], effectText: 'Schützt deine Combo {val}-mal vor Abbruch.'
    },
    {
        id: 'w6_e3', world: 'dragon', rarity: 'epic', name: 'Drachenkrone', emoji: '👑',
        description: 'Verleiht dem Träger die Aura eines Drachen.',
        effectType: 'forgive_error', effectValues: [2, 4, 6], effectText: 'Ignoriert {val} Tippfehler pro Level.'
    },

    // -- Legendary (2) --
    {
        id: 'w6_l1', world: 'dragon', rarity: 'legendary', name: 'Uralter Drache', emoji: '🐉',
        description: 'Der mächtigste aller Drachen. Tausend Jahre alt.',
        effectType: 'bonus_coins', effectValues: [35, 55, 80], effectText: '+{val}% Münzen nach dem Level.'
    },
    {
        id: 'w6_l2', world: 'dragon', rarity: 'legendary', name: 'Drachenherz', emoji: '❤️‍🔥',
        description: 'Das schlagende Herz des letzten Drachen. Pures Glück.',
        effectType: 'card_drop_chance', effectValues: [10, 18, 28], effectText: '+{val}% Chance auf Karten-Drops.'
    }
];

export function getCardById(id) {
    return CARDS.find(c => c.id === id);
}

export function getCardsByWorld(worldId) {
    return CARDS.filter(c => c.world === worldId);
}

// worldId can be: a single world string, an array of world strings, or null (all worlds)
export function rollCard(worldId, forcedRarity = null) {
    const rarity = forcedRarity || rollRarity();
    const matchesWorld = (c) => {
        if (Array.isArray(worldId)) return worldId.includes(c.world);
        if (worldId) return c.world === worldId;
        return true;
    };
    const pool = CARDS.filter(c => matchesWorld(c) && c.rarity === rarity);

    // If pool is empty (e.g. asking for legendary when none exists yet), fallback
    if (pool.length === 0) {
        const anyPool = CARDS.filter(matchesWorld);
        return anyPool[Math.floor(Math.random() * anyPool.length)];
    }

    return pool[Math.floor(Math.random() * pool.length)];
}

// Generates a Pack of 3 cards. 
// At least one card is guaranteed to be 'rare' or better.
// allowedWorlds: array of unlocked world IDs (null = all worlds)
export function openBoosterPack(allowedWorlds = null) {
    const cards = [];
    // Card 1: Guaranteed rare+
    cards.push(rollCard(allowedWorlds, rollRarity(true)));
    // Card 2 & 3: Normal odds
    cards.push(rollCard(allowedWorlds, rollRarity(false)));
    cards.push(rollCard(allowedWorlds, rollRarity(false)));
    return cards;
}

// Generates a Mega Pack of 4 cards.
// At least one card is guaranteed to be 'rare' or better.
// Epic and legendary odds are doubled (2×) for non-guaranteed cards.
// allowedWorlds: array of unlocked world IDs (null = all worlds)
export function openMegaPack(allowedWorlds = null) {
    const cards = [];
    // Card 1: Guaranteed rare+
    cards.push(rollCard(allowedWorlds, rollRarity(true)));
    // Cards 2–4: 2× epic/legendary odds
    cards.push(rollCard(allowedWorlds, rollRarity(false, true)));
    cards.push(rollCard(allowedWorlds, rollRarity(false, true)));
    cards.push(rollCard(allowedWorlds, rollRarity(false, true)));
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
