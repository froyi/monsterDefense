// German words organized by difficulty level for typing practice
// Level 1: Home row only (a s d f g h j k l ö)         → lowercase only
// Level 2: + Upper row (q w e r t z u i o p)            → lowercase only
// Level 3: + Lower row (y x c v b n m)                  → lowercase only
// Level 4: + Umlauts (ä ö ü ß)                          → lowercase only
// Level 5: + Capitalization, punctuation, full sentences

export const wordsByLevel = {
    // ═════════════════════════════════════════════════════════
    // Level 1: ONLY home row chars: a s d f g h j k l ö
    // All lowercase. No: e,r,t,z,u,i,o,p,q,w,y,x,c,v,b,n,m
    // ═════════════════════════════════════════════════════════
    1: [
        // Real German words (lowercase only, home row only: a s d f g h j k l ö)
        'das', 'als', 'lag', 'gal', 'aal', 'aas', 'gas', 'all',
        'fall', 'half', 'hall', 'lass', 'glas', 'kahl', 'fahl',
        'jagd', 'fass', 'saal', 'saga', 'falk', 'hals',
        'salsa', 'falls', 'dass', 'flag', 'glad', 'alfa',
        // More home-row patterns (3 chars)
        'adf', 'fhj', 'ghd', 'jkl', 'sdk', 'hjk', 'dfs', 'lkj',
        'fgh', 'shd', 'adj', 'kfd', 'ghl', 'jds', 'slk', 'dhf',
        'ksd', 'lhg', 'fjk', 'gds', 'hkl', 'jfg', 'dkl', 'sha',
        // Home-row patterns (4 chars)
        'asdf', 'fdsa', 'ghjk', 'dfgh', 'lkjh', 'jklö', 'jkds',
        'fghj', 'dfjk', 'slkd', 'ghsl', 'ajsl', 'ghal', 'fjds',
        'jfds', 'klsa', 'asjl', 'dkfh', 'glsa', 'fhal', 'dgsa',
        'sdlk', 'fghd', 'jkal', 'salg', 'dakl', 'lasd', 'hfgd',
        'kadl', 'kjhg', 'dsaf', 'gfds', 'hjkl', 'asda', 'jfkl',
        'gsdl', 'fkdh', 'ljds', 'ahdf', 'sgkl', 'dfkj', 'hagl',
        'kjfs', 'ldgh', 'sfaj', 'dhlk', 'ghak', 'jslf', 'kgdh',
        'aghj', 'sdgh', 'flkj', 'djas', 'halk', 'gjsd', 'fldh',
        // Home-row patterns (5 chars)
        'halsg', 'falgs', 'akdls', 'gjhds', 'saflk', 'dalhg',
        'lahgs', 'jfalk', 'ghasd', 'kdsla', 'sfgla', 'dkhla',
        'fjdks', 'slahg', 'ghfad', 'dhfka', 'jlsak', 'flaks',
        'asjkl', 'dfghj', 'sdklh', 'fghjk', 'asdfl', 'ghjds',
        'lkghd', 'jsdfa', 'hgfds', 'kljhg', 'dsfgh', 'hjklö',
        'sdfhg', 'jklas', 'ghdsf', 'flghd', 'sdajk', 'hfkdl',
        // Home-row patterns (6-7 chars)
        'khalsg', 'sldhfg', 'fjkalg', 'dslakh', 'ghjkls', 'asdfjk',
        'fghdsl', 'jklghd', 'sdafgh', 'lkjhgf', 'dfjkls', 'ghasdl',
        'hgfdsa', 'jklöas', 'dfghjs', 'slkjhg', 'aghfds', 'kdsflg',
        'jfghkl', 'sdlkhg', 'fjasdl', 'ghklad', 'djfkls', 'alsgfd',
        'hfjdks', 'gkladf', 'sfdjkl', 'kjghds', 'dflkjh', 'asghfl',
    ],
    // ═════════════════════════════════════════════════════════
    // Level 2: Home row + upper row (adds: q w e r t z u i o p)
    // All lowercase. No capitals! No: y,x,c,v,b,n,m,ä,ü,ß
    // ═════════════════════════════════════════════════════════
    2: [
        // Simple words (all lowercase, no y/x/c/v/b/n/m/ä/ü/ß)
        'art', 'kuh', 'irre', 'uhr', 'tor', 'los', 'rot', 'gut',
        'das', 'der', 'die', 'ist', 'aus', 'weg', 'alt',
        'reh', 'koi', 'eis', 'see', 'hai',
        'wut', 'tod', 'lied', 'reis', 'risi', 'sold',
        'treue', 'ideal', 'kleid', 'platz', 'wasser',
        // Nature
        'wald', 'erde', 'luft', 'frost', 'teig', 'heit',
        'rost', 'staude', 'topf', 'gras', 'sturz', 'rad',
        // Food
        'reis', 'torte', 'salat', 'sosse', 'tee', 'sirup',
        'quark', 'pilz', 'saft', 'wurst', 'lauge',
        // Objects
        'rohr', 'rad', 'hut', 'gold', 'teil', 'kiste',
        'leiter', 'polster', 'poster', 'koffer', 'uhr',
        'truhe', 'gitter', 'eifer', 'filter', 'stoff',
        // Adjectives
        'leise', 'stolz', 'wild', 'froh', 'still', 'weit',
        'tief', 'grau', 'klug', 'roh', 'steif',
        'frei', 'super', 'positir', 'plus', 'platt',
        // Verbs (no b/n/m/c/v/x/y)
        'laufe', 'steige', 'rufe', 'teile', 'rette',
        'spielte', 'zeige', 'drehe', 'sugrade', 'frage',
        'reise', 'leiste', 'wiege', 'weiss', 'sattle',
        'spitze', 'stolpere', 'sitze', 'liege', 'ziehe',
        'stehe', 'sitze', 'deute', 'greife', 'foehlte',
        // Abstract
        'zeit', 'ziel', 'kraft', 'eid', 'gleis', 'preis',
        'kreis', 'pflug', 'quote', 'route', 'sport', 'quiz',
        // More
        'ritter', 'wetter', 'dieter', 'peter', 'ruder', 'zeiger',
        'speise', 'kleid', 'feder', 'lupe', 'list',
        'poet', 'geist', 'rest', 'test', 'festig',
        'spur', 'stiefel', 'durst', 'herde',
    ],
    // ═════════════════════════════════════════════════════════
    // Level 3: All basic letters (adds: y x c v b n m)
    // All lowercase. No: ä ü ß, no capitals
    // ═════════════════════════════════════════════════════════
    3: [
        // Animals
        'biene', 'vogel', 'fuchs', 'schwan', 'marder',
        'biber', 'falke', 'dachs', 'luchs', 'barsch',
        'muschel', 'spinne', 'bremse', 'libelle',
        // Nature
        'blume', 'nebel', 'sonne', 'mond', 'nacht', 'morgen',
        'abend', 'blitz', 'donner', 'sommer', 'herbst', 'schnee',
        'flocke', 'strand', 'vulkan', 'berge', 'insel',
        'bucht', 'schlamm', 'moos', 'blatt', 'stamm', 'rinde',
        // Food
        'banane', 'mango', 'melone', 'birne', 'mandel', 'butter',
        'braten', 'bonbon', 'schinken', 'kuchen', 'creme', 'milch',
        'vanille', 'brezel', 'marmelade', 'nudel', 'becher',
        // People
        'mutter', 'vater', 'bruder', 'nachbar', 'bauer', 'clown',
        'maler', 'mechanik', 'magier', 'boxer', 'vampir',
        'monster', 'krieger', 'ritter',
        // Objects
        'mantel', 'fenster', 'bunker', 'decke', 'lampe',
        'kammer', 'bombe', 'messer', 'anker', 'balken', 'bank',
        'schirm', 'maske', 'becken', 'flamme', 'kabel',
        // Adjectives
        'mutig', 'brav', 'nett', 'clever', 'schmal',
        'blank', 'bunt', 'dumm', 'sanft', 'gemein', 'nackt',
        // Verbs
        'mixen', 'boxen', 'campen', 'binden', 'finden', 'nennen',
        'rennen', 'kennen', 'messen', 'denken', 'merken',
        'schwimmen', 'springen', 'klettern', 'wandern',
        // Abstract
        'nummer', 'examen', 'chance', 'bonus', 'comic', 'bild',
        'nutzen', 'menge', 'cent', 'bronze', 'methode', 'moment',
        'verb', 'symbol', 'syntax', 'system', 'maxime',
        // Fantasy
        'drachen', 'hexe', 'nixe', 'zwerg', 'burg', 'schwert',
        'magie', 'zaubern', 'kobold', 'schild', 'verlies', 'macht',
        'kristall', 'amulett', 'elixier', 'feuerball', 'schatten',
    ],
    // ═════════════════════════════════════════════════════════
    // Level 4: + Umlauts (ä ö ü ß) — still all lowercase
    // ═════════════════════════════════════════════════════════
    4: [
        // ü-words
        'über', 'müde', 'kühl', 'glück', 'stück', 'brücke', 'hütte',
        'hübsch', 'würfel', 'flüsse', 'schlüssel', 'füße', 'tür',
        'hügel', 'büffel', 'küste', 'wüste', 'düne', 'lücke',
        'mühle', 'gürtel', 'blüte', 'übung', 'rücken', 'kürbis',
        'münster', 'schüler', 'bücher', 'küche', 'gemüse', 'grüße',
        'fühlen', 'prüfen', 'spülen', 'würzen', 'schütteln',
        'flüstern', 'überlegen', 'wünschen',
        // ä-words
        'bär', 'käse', 'säge', 'träne', 'ärger', 'äpfel', 'kälte',
        'bäcker', 'gärten', 'hände', 'kräfte', 'mäuse', 'räder',
        'stärke', 'wärme', 'bänke', 'fächer', 'gläser', 'blätter',
        'mädchen', 'nähe', 'zähne', 'fähre', 'krähen', 'stätte',
        'gewässer', 'schädel', 'wäsche', 'knäuel', 'käfig',
        'wählen', 'erzählen', 'kämpfen', 'jäten', 'blättern',
        // ö-words
        'öl', 'böse', 'größe', 'hörner', 'löffel', 'möhre',
        'öffnung', 'löwe', 'höhle', 'vögel', 'könige', 'flöte',
        'böden', 'wörter', 'nöte', 'töne', 'größen', 'höhen',
        'söhne', 'knöpfe', 'schöpfer', 'stöcke', 'blöcke',
        'mögen', 'hören', 'stören', 'zögern', 'fördern',
        // ß-words
        'straße', 'fußball', 'maße', 'spaß', 'grüße', 'fuß',
        'gruß', 'floß', 'stoß', 'soße', 'groß', 'weiß', 'heiß',
        'süß', 'fleißig', 'draußen', 'außen', 'mäßig',
        'reißen', 'beißen', 'genießen', 'schließen', 'gießen',
        // Combined
        'frühstück', 'ausrüstung', 'gemütlich', 'vergnügen',
        'überraschung', 'verständnis', 'erklärung', 'äußerung',
        'veränderung', 'geräusch', 'eigentümer',
    ],
    // ═════════════════════════════════════════════════════════
    // Level 5: + Capitalization + punctuation + full sentences
    // This is the ONLY level where uppercase letters appear
    // ═════════════════════════════════════════════════════════
    5: [
        // Short exclamations
        'Hallo!', 'Hilfe!', 'Stopp!', 'Super!', 'Jawohl!', 'Bravo!',
        'Hurra!', 'Achtung!', 'Feuer!', 'Weiter!', 'Fertig!',
        // Questions
        'Wie geht es dir?', 'Was ist das?', 'Wer war das?',
        'Wo bist du?', 'Warum nicht?', 'Wie heißt du?',
        'Wann fängt es an?', 'Welches Tier?', 'Wie viel?',
        'Kannst du das?', 'Hast du Zeit?', 'Spielst du mit?',
        // Statements
        'Das ist toll!', 'Ich bin bereit.', 'Los geht es!',
        'Alles klar.', 'Danke schön!', 'Bitte sehr.',
        'Auf Wiedersehen!', 'Viel Erfolg!', 'Gute Nacht!',
        'Das macht Spaß.', 'Weiter so!', 'Super gemacht!',
        'Gut gespielt!', 'Noch ein Versuch.', 'Mach weiter!',
        'Heute ist Montag.', 'Morgen wird besser.', 'Nicht aufgeben!',
        'Ich übe fleißig.', 'Die Burg ist sicher.', 'Monster besiegt!',
        'Schnell tippen!', 'Genau richtig.', 'Prima Leistung!',
        // Medium sentences
        'Der Ritter kämpft mutig.', 'Die Burg steht fest.',
        'Ein Drache fliegt vorbei.', 'Der Held rettet das Land.',
        'Das Schwert leuchtet hell.', 'Die Hexe braut Tränke.',
        'Der Zauberer wirkt Magie.', 'Das Monster greift an!',
        'Die Mauer hält stand.', 'Der Turm wackelt stark.',
        'Feuer und Flamme!', 'Blitz und Donner!',
        'Mut und Tapferkeit.', 'Stärke und Ausdauer.',
        // Longer sentences
        'Jeder Tag wird besser als der letzte.',
        'Übung macht den Meister, glaub mir!',
        'Der schnelle Fuchs springt hoch.',
        'Die Sterne leuchten am Himmel.',
        'Wer mutig ist, gewinnt das Spiel.',
        'Zusammen sind wir stark genug.',
        'Das Abenteuer wartet auf dich!',
        'Schnelle Finger, klarer Kopf.',
        'Zeige, was du drauf hast!',
        'Schneller als der Blitz!',
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

// All allowed characters up to (and including) a given level
export function getAllowedCharsForLevel(maxLevel) {
    const chars = new Set();
    for (let i = 1; i <= Math.min(maxLevel, 5); i++) {
        for (const c of levelCharacters[i]) {
            chars.add(c);
        }
    }
    return chars;
}
