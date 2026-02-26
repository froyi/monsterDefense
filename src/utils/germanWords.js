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
        // More home-row patterns (3 char)
        'adf', 'fhj', 'ghd', 'jkl', 'sdk', 'hjk', 'dfs', 'lkj',
        'fgh', 'shd', 'adj', 'kfd', 'ghl', 'jds', 'slk', 'dhf',
        'ksd', 'lhg', 'fjk', 'gds', 'hkl', 'jfg', 'dkl', 'sha',
        // Home-row patterns (4 char)
        'asdf', 'fdsa', 'ghjk', 'dfgh', 'lkjh', 'jklö', 'jkds',
        'fghj', 'dfjk', 'slkd', 'ghsl', 'ajsl', 'ghal', 'fjds',
        'jfds', 'klsa', 'asjl', 'dkfh', 'glsa', 'fhal', 'dgsa',
        'sdlk', 'fghd', 'jkal', 'salg', 'dakl', 'lasd', 'hfgd',
        'kadl', 'kjhg', 'dsaf', 'gfds', 'hjkl', 'asda', 'jfkl',
        'gsdl', 'fkdh', 'ljds', 'ahdf', 'sgkl', 'dfkj', 'hagl',
        'kjfs', 'ldgh', 'sfaj', 'dhlk', 'ghak', 'jslf', 'kgdh',
        'aghj', 'sdgh', 'flkj', 'djas', 'halk', 'gjsd', 'fldh',
        // Home-row patterns (5 char)
        'halsg', 'falgs', 'akdls', 'gjhds', 'saflk', 'dalhg',
        'lahgs', 'jfalk', 'ghasd', 'kdsla', 'sfgla', 'dkhla',
        'fjdks', 'slahg', 'ghfad', 'dhfka', 'jlsak', 'flaks',
        'asjkl', 'dfghj', 'sdklh', 'fghjk', 'asdfl', 'ghjds',
        'lkghd', 'jsdfa', 'hgfds', 'kljhg', 'dsfgh', 'hjklö',
        'sdfhg', 'jklas', 'ghdsf', 'flghd', 'sdajk', 'hfkdl',
        // Home-row patterns (6-7 char)
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
        // ── 3-4 letter words ──
        'art', 'kuh', 'uhr', 'tor', 'rot', 'gut', 'irre', 'los',
        'das', 'der', 'die', 'ist', 'aus', 'weg', 'alt', 'reh',
        'koi', 'eis', 'see', 'hai', 'wut', 'tod', 'hut', 'rad',
        'ort', 'rat', 'fut', 'pur', 'wir', 'ihr', 'dir', 'per',
        'auf', 'wie', 'tat', 'per', 'jod', 'ode', 'lot', 'sog',
        'ost', 'tee', 'phi', 'pik', 'psi', 'tau', 'tip', 'eid',
        'seit', 'weil', 'dort', 'hier', 'fair', 'teil', 'reis',
        'werk', 'hart', 'wort', 'dose', 'post', 'haie', 'last',
        'just', 'paar', 'kalt', 'gurt', 'pfad', 'grad', 'held',
        'frei', 'fort', 'weit', 'trug', 'lust', 'gold', 'stil',
        'rose', 'lied', 'tier', 'riss', 'luft', 'ward', 'rief',
        'tief', 'gier', 'fest', 'ritt', 'gast', 'trug', 'spuk',
        'zier', 'ritt', 'pott', 'spur', 'ross', 'rost', 'ruhe',
        'jagd', 'wirr', 'flog', 'floh', 'sorte',
        // ── 5 letter words ──
        'treue', 'ideal', 'kleid', 'frost', 'teils',
        'torte', 'salat', 'quark', 'sirup', 'sosse',
        'store', 'hotel', 'total', 'pilot', 'radio',
        'stufe', 'weise', 'steif', 'greis', 'reist',
        'liege', 'riefe', 'stieg', 'reise', 'seite',
        'walde', 'fried', 'liste', 'geist', 'phase',
        'preis', 'kreis', 'stahl', 'platz', 'draht',
        'kraft', 'flirt', 'drift', 'orgel', 'polka',
        'zopfe', 'truhe', 'reise', 'pflug', 'zeile',
        'frage', 'leise', 'stolz', 'fluid', 'regel',
        'stoff', 'gleis', 'zitat', 'regal', 'irdis',
        'saldo', 'ruhig', 'aster', 'horde', 'droge',
        // ── 6+ letter words ──
        'leiter', 'polster', 'poster', 'koffer', 'filter',
        'gitter', 'stiefel', 'durstig', 'ritter', 'wetter',
        'dieter', 'zeiger', 'speise', 'puzzle', 'flieder',
        'quaste', 'kupfer', 'tropfe', 'tropik', 'europa',
        'freude', 'kugel', 'staude', 'gipfel', 'spiegel',
        'liefert', 'stiefel', 'leistug', 'erpaste', 'wartest',
        'siedler', 'spitzer', 'griffel', 'gefieder', 'spitze',
        'aufsteig', 'gepflegt', 'zitruspf', 'stolpere', 'spielte',
        'tapferei', 'diskrete', 'kreislig', 'dressier', 'sprudelt',
        'feuerrot', 'tiefgrau', 'gigawatt', 'proteste', 'zufriele',
        'geduldest', 'aufgeklar', 'geldspiel', 'zeitreise', 'ratespiel',
        'gutherzig', 'pfadfirst', 'sportauto', 'ortskraft', 'frostiger',
        'drohkeit', 'sorgfalt', 'zulieger', 'plakates', 'dialekte',
        'operiert', 'kapriole', 'rapporter', 'populiste',
    ],
    // ═════════════════════════════════════════════════════════
    // Level 3: All basic letters (adds: y x c v b n m)
    // All lowercase. No: ä ü ß, no capitals
    // ═════════════════════════════════════════════════════════
    3: [
        // ── Animals ──
        'biene', 'vogel', 'fuchs', 'schwan', 'marder',
        'biber', 'falke', 'dachs', 'luchs', 'barsch',
        'muschel', 'spinne', 'bremse', 'libelle', 'hamster',
        'panther', 'storch', 'wespe', 'hummel', 'schwalbe',
        'pinguin', 'elefant', 'giraffe', 'leopard', 'mammut',
        'papagei', 'chamele', 'kolibri', 'delfin', 'seehund',
        'forelle', 'lachs', 'hornisse', 'krebs', 'schlange',
        // ── Nature ──
        'blume', 'nebel', 'sonne', 'mond', 'nacht', 'morgen',
        'abend', 'blitz', 'donner', 'sommer', 'herbst', 'schnee',
        'flocke', 'strand', 'vulkan', 'berge', 'insel', 'bucht',
        'schlamm', 'moos', 'blatt', 'stamm', 'rinde', 'wolke',
        'regen', 'fluss', 'strom', 'bach', 'quelle', 'hafen',
        'ozean', 'welle', 'brand', 'sturm', 'wind', 'boden',
        'schlucht', 'bergwerk', 'lavastrom', 'gebirge', 'mondschein',
        'sonnenauf', 'nordwind', 'schneefall', 'windhauch', 'sandstrand',
        // ── Food ──
        'banane', 'mango', 'melone', 'birne', 'mandel', 'butter',
        'braten', 'bonbon', 'schinken', 'kuchen', 'creme', 'milch',
        'vanille', 'brezel', 'marmelade', 'nudel', 'becher', 'brunch',
        'muffin', 'suppe', 'lachs', 'tomate', 'schokolade', 'sahne',
        'pflaume', 'ananas', 'avocado', 'erdbeere', 'himbeere', 'nuss',
        'brokkoli', 'bohne', 'karotte', 'sellerie', 'erbse', 'linse',
        'spinat', 'champignon', 'basilikum', 'ingwer', 'knoblauch',
        // ── People ──
        'mutter', 'vater', 'bruder', 'nachbar', 'bauer', 'clown',
        'maler', 'mechanik', 'magier', 'boxer', 'vampir', 'monster',
        'krieger', 'schmied', 'bischof', 'meister', 'wanderer',
        'jungfrau', 'soldat', 'matrose', 'prinz', 'prinzessin',
        'handwerker', 'bettler', 'monarch', 'samurai', 'novize',
        // ── Objects ──
        'mantel', 'fenster', 'bunker', 'decke', 'lampe', 'kammer',
        'bombe', 'messer', 'anker', 'balken', 'bank', 'schirm',
        'maske', 'becken', 'flamme', 'kabel', 'kompass', 'brunnen',
        'hammer', 'amboss', 'fackel', 'schaufel', 'pflanze', 'spiegel',
        'truhe', 'korb', 'flasche', 'glocke', 'kessel', 'laterne',
        'schachtel', 'werkzeug', 'schrauben', 'zahnrad', 'fernrohr',
        'pergament', 'briefkasten', 'windmuehle', 'wanduhr', 'kommode',
        // ── Adjectives ──
        'mutig', 'brav', 'nett', 'clever', 'schmal', 'blank',
        'bunt', 'dumm', 'sanft', 'gemein', 'nackt', 'mager',
        'normle', 'simpel', 'robust', 'komplex', 'modern',
        'massiv', 'exotisch', 'markant', 'bombig', 'elegant',
        'chaotisch', 'monumental', 'optimisch', 'nervlich', 'mystisch',
        // ── Verbs ──
        'mixen', 'boxen', 'campen', 'binden', 'finden', 'nennen',
        'rennen', 'kennen', 'messen', 'denken', 'merken', 'planen',
        'schwimmen', 'springen', 'klettern', 'wandern', 'schaffen',
        'schreiben', 'besuchen', 'bewegen', 'beginnen', 'vergessen',
        'sammeln', 'basteln', 'schnitzen', 'polieren', 'erkunden',
        'entdecken', 'verwandeln', 'verbinden', 'beschirmen', 'betrachten',
        // ── Abstract / Fantasy ──
        'drachen', 'hexe', 'nixe', 'zwerg', 'burg', 'schwert',
        'magie', 'zaubern', 'kobold', 'schild', 'verlies', 'macht',
        'kristall', 'amulett', 'elixier', 'feuerball', 'schatten',
        'nummer', 'examen', 'chance', 'bonus', 'comic', 'bild',
        'nutzen', 'menge', 'cent', 'bronze', 'methode', 'moment',
        'verb', 'symbol', 'syntax', 'system', 'maxime', 'emblem',
        'dimension', 'expedition', 'kommando', 'strategie', 'algorithm',
        'abenteuer', 'verwunsche', 'drachenhort', 'bannspruch', 'zauberstab',
        'schwerthieb', 'kampfkunst', 'schildwall', 'ruestung', 'bogenschuss',
        'festung', 'eroberung', 'koenigreich', 'schlachtfeld', 'belagerung',
    ],
    // ═════════════════════════════════════════════════════════
    // Level 4: + Umlauts (ä ö ü ß) — still all lowercase
    // ═════════════════════════════════════════════════════════
    4: [
        // ── ü-words ──
        'über', 'müde', 'kühl', 'glück', 'stück', 'brücke', 'hütte',
        'hübsch', 'würfel', 'flüsse', 'schlüssel', 'füße', 'tür',
        'hügel', 'büffel', 'küste', 'wüste', 'düne', 'lücke',
        'mühle', 'gürtel', 'blüte', 'übung', 'rücken', 'kürbis',
        'münster', 'schüler', 'bücher', 'küche', 'gemüse', 'grüße',
        'fühlen', 'prüfen', 'spülen', 'würzen', 'schütteln',
        'flüstern', 'überlegen', 'wünschen', 'bügeln', 'züchten',
        'schlüpfen', 'spüren', 'grübeln', 'vergnügen', 'berühmt',
        'gemütlich', 'natürlich', 'glücklich', 'verblüfft', 'plündern',
        'ausrüstung', 'frühstück', 'überrascht', 'zerstückeln',
        'unterstützung', 'verführung', 'entmündigung', 'berührung',
        'beglückt', 'vergnüglich', 'unverblümt', 'glühwürmchen',
        // ── ä-words ──
        'bär', 'käse', 'säge', 'träne', 'ärger', 'äpfel', 'kälte',
        'bäcker', 'gärten', 'hände', 'kräfte', 'mäuse', 'räder',
        'stärke', 'wärme', 'bänke', 'fächer', 'gläser', 'blätter',
        'mädchen', 'nähe', 'zähne', 'fähre', 'krähen', 'stätte',
        'gewässer', 'schädel', 'wäsche', 'knäuel', 'käfig',
        'wählen', 'erzählen', 'kämpfen', 'jäten', 'blättern',
        'rätsel', 'ärmel', 'bäume', 'gänse', 'schläfe', 'schwäche',
        'ähnlich', 'fähigkeit', 'verständlich', 'märchen', 'hähne',
        'erklärung', 'veränderung', 'gedächtnis', 'geräusch', 'gefährlich',
        'alltäglich', 'ausländisch', 'empfänglich', 'gleichmäßig',
        'zusammenhängend', 'außergewöhnlich', 'unverändert',
        // ── ö-words ──
        'öl', 'böse', 'größe', 'hörner', 'löffel', 'möhre',
        'öffnung', 'löwe', 'höhle', 'vögel', 'könige', 'flöte',
        'böden', 'wörter', 'nöte', 'töne', 'größen', 'höhen',
        'söhne', 'knöpfe', 'schöpfer', 'stöcke', 'blöcke',
        'mögen', 'hören', 'stören', 'zögern', 'fördern',
        'bögen', 'dörfer', 'götter', 'klöster', 'möbel', 'röhre',
        'schönheit', 'fröhlich', 'göttlich', 'königlich', 'höflich',
        'persönlich', 'gewöhnlich', 'schrödinger', 'möglich', 'störung',
        'versöhnung', 'strömen', 'befördern', 'vergrößern',
        // ── ß-words ──
        'straße', 'fußball', 'maße', 'spaß', 'grüße', 'fuß',
        'gruß', 'floß', 'stoß', 'soße', 'groß', 'weiß', 'heiß',
        'süß', 'fleißig', 'draußen', 'außen', 'mäßig',
        'reißen', 'beißen', 'genießen', 'schließen', 'gießen',
        'beschließen', 'verdrießen', 'erließen', 'gewissenheiß',
        'fußgänger', 'straßenbahn', 'fließband', 'außenseiter',
        'großartig', 'weißglut', 'süßigkeit', 'heißluftballon',
        // ── Combined / longer words ──
        'frühstück', 'ausrüstung', 'vergnügen',
        'überraschung', 'verständnis', 'erklärung', 'äußerung',
        'veränderung', 'geräusch', 'eigentümer',
        'handtücher', 'schlüsselbund', 'müllabfuhr', 'kühlschrank',
        'blütenpracht', 'würdevoll', 'übelkeit', 'zärtlichkeit',
        'ölgemälde', 'höhlenforsch', 'größenwahn', 'strömungslehre',
        'süßwasser', 'fußballfeld', 'straßenkreuz', 'außenbezirke',
    ],
    // ═════════════════════════════════════════════════════════
    // Level 5: + Capitalization + punctuation + full sentences
    // This is the ONLY level where uppercase letters appear
    // ═════════════════════════════════════════════════════════
    5: [
        // ── Short exclamations ──
        'Hallo!', 'Hilfe!', 'Stopp!', 'Super!', 'Jawohl!', 'Bravo!',
        'Hurra!', 'Achtung!', 'Feuer!', 'Weiter!', 'Fertig!',
        'Panik!', 'Stark!', 'Klasse!', 'Gratuliere!', 'Beifall!',
        // ── Single capitalized words ──
        'Apfel', 'Birne', 'Drache', 'Einhorn', 'Flamme', 'Geist',
        'Hammer', 'Igel', 'Jaguar', 'Krone', 'Laterne', 'Meister',
        'Nebel', 'Ozean', 'Palast', 'Quelle', 'Ritter', 'Schwert',
        'Turm', 'Ufer', 'Vulkan', 'Wappen', 'Xenon', 'Yak', 'Zauber',
        'Abenteuer', 'Berggipfel', 'Charakter', 'Diamant', 'Elfenbein',
        'Festung', 'Galaxie', 'Horizont', 'Inventar', 'Juwelier',
        'Karawane', 'Labyrinth', 'Monument', 'Navigator', 'Observatorium',
        'Pyramide', 'Quartett', 'Roulette', 'Strategie', 'Teleskop',
        'Universum', 'Vegetation', 'Windmesser',
        // ── Questions ──
        'Wie geht es dir?', 'Was ist das?', 'Wer war das?',
        'Wo bist du?', 'Warum nicht?', 'Wie heißt du?',
        'Wann fängt es an?', 'Welches Tier?', 'Wie viel?',
        'Kannst du das?', 'Hast du Zeit?', 'Spielst du mit?',
        'Wohin gehst du?', 'Was denkst du?', 'Wer kommt mit?',
        'Seit wann?', 'Wie weit noch?', 'Was fehlt dir?',
        // ── Statements ──
        'Das ist toll!', 'Ich bin bereit.', 'Los geht es!',
        'Alles klar.', 'Danke schön!', 'Bitte sehr.',
        'Auf Wiedersehen!', 'Viel Erfolg!', 'Gute Nacht!',
        'Das macht Spaß.', 'Weiter so!', 'Super gemacht!',
        'Gut gespielt!', 'Noch ein Versuch.', 'Mach weiter!',
        'Heute ist Montag.', 'Morgen wird besser.', 'Nicht aufgeben!',
        'Ich übe fleißig.', 'Die Burg ist sicher.', 'Monster besiegt!',
        'Schnell tippen!', 'Genau richtig.', 'Prima Leistung!',
        'Sieg oder Niederlage.', 'Kein Zweifel!', 'Volltreffer!',
        'Herausforderung!', 'Unglaublich!', 'Fantastisch!',
        // ── Medium sentences ──
        'Der Ritter kämpft mutig.', 'Die Burg steht fest.',
        'Ein Drache fliegt vorbei.', 'Der Held rettet das Land.',
        'Das Schwert leuchtet hell.', 'Die Hexe braut Tränke.',
        'Der Zauberer wirkt Magie.', 'Das Monster greift an!',
        'Die Mauer hält stand.', 'Der Turm wackelt stark.',
        'Feuer und Flamme!', 'Blitz und Donner!',
        'Mut und Tapferkeit.', 'Stärke und Ausdauer.',
        'Die Sonne scheint warm.', 'Der Mond leuchtet hell.',
        'Das Schiff segelt fort.', 'Der Wind weht stark.',
        'Die Katze schleicht leise.', 'Der Hund bellte laut.',
        'Ein Stern fällt herab.', 'Der Berg ist steil.',
        'Das Wasser fließt schnell.', 'Der Adler kreist hoch.',
        // ── Longer sentences ──
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
        'Der König regiert das Land mit Weisheit.',
        'Die Prinzessin befreite den Drachen.',
        'Alle Ritter versammelten sich zur Schlacht.',
        'Der Schatz war tief im Berg verborgen.',
        'Ein neuer Tag bringt neue Hoffnung.',
        'Die Festung wurde nie erobert.',
        'Tapferkeit braucht keine Zuschauer.',
        'Im Dunkeln liegt die Wahrheit verborgen.',
        'Schneller, höher, weiter!',
        'Gib niemals auf, egal was passiert.',
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
