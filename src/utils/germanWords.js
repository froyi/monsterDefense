// German words organized by difficulty level for typing practice
// Level 1: Home row (asdf jklö)
// Level 2: + Upper row (qwert zuiop)
// Level 3: + Lower row (yxcvb nm)
// Level 4: + Umlauts (ä ö ü ß)
// Level 5: + Capitalization, punctuation

export const wordsByLevel = {
    1: [
        'das', 'als', 'fall', 'half', 'all', 'lass', 'sass', 'da', 'ja',
        'fad', 'lad', 'kahl', 'salsa', 'kafka', 'skala', 'flash', 'kal',
        'falls', 'hall', 'schall', 'lässt', 'dass', 'hals', 'saal',
        'jak', 'alfa', 'alsdann', 'had', 'fadds', 'fjäll',
        'klass', 'lass', 'lässt', 'lass', 'falk', 'alk',
    ],
    2: [
        'Tier', 'Wort', 'dort', 'oder', 'Zeit', 'Ware', 'Tiere', 'Weit',
        'Ruhe', 'Zeile', 'Leiter', 'Polster', 'Reihe', 'Wolke', 'Puppe',
        'Reporter', 'Tropfen', 'Quelle', 'Rolle', 'Wiese', 'Turm',
        'Wetter', 'Ritter', 'Eule', 'Torte', 'plus', 'drei', 'Wurst',
        'Topf', 'Reis', 'Putz', 'leise', 'Winter', 'Quest', 'Ziel',
        'Rose', 'Tipp', 'wild', 'Rohr', 'Ruder', 'Poet', 'Lupe',
        'Route', 'Quote', 'Power', 'Turm', 'Reihe', 'Zeiger',
    ],
    3: [
        'Bild', 'Milch', 'Nacht', 'Blume', 'Freund', 'Grund', 'Mund',
        'Brücke', 'Menge', 'Vater', 'Mutter', 'Bruder', 'Nummer',
        'Nixe', 'Examen', 'Hexe', 'Boxer', 'Vampir', 'Gemüse',
        'Nebel', 'Mantel', 'Fenster', 'Bunker', 'Drachen', 'Burg',
        'Blitz', 'Clown', 'Monster', 'Münze', 'Nachbar', 'Nutzen',
        'Flamme', 'Blick', 'Bronze', 'Xylo', 'Cent', 'Fuchs',
        'Comic', 'Vogel', 'Wandern', 'Norden', 'Mango', 'Banane',
    ],
    4: [
        'über', 'böse', 'Größe', 'Tür', 'müde', 'kühl', 'Öl', 'Süden',
        'Glück', 'Stück', 'Brücke', 'Hütte', 'hübsch', 'Würfel',
        'Flüsse', 'Schlüssel', 'Bär', 'Käse', 'Säge', 'Träne',
        'Hörner', 'Löffel', 'Möhre', 'Ärger', 'Übung', 'Straße',
        'Fußball', 'Maße', 'Spaß', 'Grüße', 'Größe', 'Füße',
        'Äpfel', 'Öffnung', 'Überall', 'Müller', 'Bücher', 'Küche',
        'Nüsse', 'Kälte', 'Wüste', 'Bäcker',
    ],
    5: [
        'Hallo!', 'Guten Tag!', 'Wie geht es dir?', 'Alles klar.',
        'Das ist toll!', 'Ich bin bereit.', 'Los geht es!',
        'Heute ist Montag.', 'Morgen wird besser.', 'Danke schön!',
        'Bitte sehr.', 'Auf Wiedersehen!', 'Viel Erfolg!',
        'Das macht Spaß.', 'Weiter so!', 'Super gemacht!',
        'Ich übe fleißig.', 'Die Burg ist sicher.', 'Monster besiegt!',
        'Schnell tippen!', 'Genau richtig.', 'Noch ein Versuch.',
    ],
};

// Flat list of all words for quick access
export const allWords = Object.values(wordsByLevel).flat();

// Get words available for a given max skill level
export function getWordsForLevel(maxLevel) {
    const words = [];
    for (let i = 1; i <= Math.min(maxLevel, 5); i++) {
        words.push(...wordsByLevel[i]);
    }
    return words;
}

// Characters associated with each skill level
export const levelCharacters = {
    1: 'asdfghjklö '.split(''),
    2: 'qwertzuiop'.split(''),
    3: 'yxcvbnm'.split(''),
    4: 'äöüß'.split(''),
    5: '.,!?:;-ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ'.split(''),
};
