// German words organized by difficulty level for typing practice
// Level 1: Home row only (a s d f g h j k l ö)
// Level 2: + Upper row (q w e r t z u i o p)
// Level 3: + Lower row (y x c v b n m)
// Level 4: + Umlauts (ä ö ü ß)
// Level 5: + Capitalization, punctuation, full sentences

export const wordsByLevel = {
    // Level 1: ONLY uses home row chars: a s d f g h j k l ö
    1: [
        // 3-letter
        'das', 'als', 'had', 'lag', 'lad', 'gal', 'das', 'aal', 'ahs',
        'alk', 'all', 'aas', 'gag', 'gas', 'hag', 'jak', 'sad',
        // 4-letter
        'fall', 'half', 'hall', 'lass', 'glas', 'kahl', 'fahl', 'gala',
        'jagd', 'fass', 'haff', 'kaff', 'saal', 'saga', 'falk',
        'flag', 'glad', 'alga', 'alfa', 'jfds', 'haff', 'lass',
        'soll', 'jaja', 'doof', 'lash',
        // 5-letter
        'falls', 'salsa', 'kafka', 'kogda', 'sahsa', 'glasl',
        'flash', 'lakhs', 'salah', 'galas', 'halag', 'falks',
        'goals', 'fjäll', 'skala', 'kloss', 'dass', 'hals',
        // 6-letter
        'schall', 'lässig', 'hallsg', 'saaldg',
        // Übungskombinationen (einfache Muster zum Üben)
        'asdf', 'fdsa', 'jklö', 'ghjk', 'dfgh', 'lkjh',
        'asdfjklö', 'fghj', 'dfjk', 'slkd', 'ghsl',
        'ajsl', 'dkfö', 'ghal', 'jfds', 'klsa',
        'asjl', 'dkfh', 'glsa', 'jödk', 'fhal',
        'sdlk', 'fghd', 'jkal', 'salg', 'dakl',
        'lasd', 'kadl', 'fölk', 'kjhg', 'dsaf',
        'ölkj', 'gfds', 'hjkl', 'asda', 'löka',
        'gladd', 'kalds', 'falld', 'hallf', 'jfdk',
        'lahgs', 'falgs', 'akdls', 'gjhds', 'lökaf',
    ],
    // Level 2: Home row + upper row (adds: q w e r t z u i o p)
    2: [
        // Tiere
        'Tier', 'Reiher', 'Wolf', 'Pferd', 'Eule', 'Ziege', 'Tiger',
        'Otter', 'Ratte', 'Igel', 'Stier', 'Geier', 'Kreuz',
        // Natur
        'Wolke', 'Wiese', 'Sturz', 'Regen', 'Teich', 'Stein', 'Holz',
        'Erde', 'Wald', 'Luft', 'Welt', 'Frost', 'Reif', 'Quelle',
        'Gras', 'Strauch',
        // Essen
        'Torte', 'Reis', 'Wurst', 'Topf', 'Suppe', 'Salat', 'Pilz',
        'Soße', 'Zucker', 'Quark', 'Sahne', 'Frucht', 'Kruste',
        'Tropfen', 'Gurke', 'Lauge',
        // Haus & Dinge
        'Turm', 'Dach', 'Rohr', 'Tisch', 'Stuhl', 'Tasse', 'Kiste',
        'Leiter', 'Polster', 'Schale', 'Poster', 'Koffer', 'Puppe',
        'Eimer', 'Spiegel', 'Uhr', 'Truhe', 'Kerze', 'Gitter',
        // Adjektive
        'leise', 'stolz', 'wild', 'froh', 'super', 'plus', 'frei',
        'zart', 'still', 'weit', 'tief', 'grau', 'klug', 'roh',
        'spitz', 'steif', 'locker', 'sicher', 'ehrlich',
        // Verben
        'laufe', 'steige', 'rufe', 'teile', 'rette', 'spiele',
        'schreie', 'zeige', 'drehe', 'suche', 'frage', 'reise',
        'treffe', 'werfe', 'pflege', 'lausche',
        // abstrakt
        'Zeit', 'Ziel', 'Kraft', 'Recht', 'Gleis', 'Preis', 'Platz',
        'Punkt', 'Kreis', 'Stolz', 'Pflicht', 'Schutz', 'Feier',
        'Quote', 'Route', 'Power', 'Sport', 'Quiz',
        // Weitere
        'Ritter', 'Wetter', 'Dieter', 'Peter', 'Ruder', 'Zeiger',
        'Speise', 'Kleid', 'Feder', 'Lupe', 'Litze', 'List',
        'Poet', 'Trick', 'Strip', 'Drift', 'Frost', 'Geist',
        'Durst', 'Flucht', 'Furcht', 'Frucht', 'Rest', 'Test',
        'Fest', 'Gericht', 'Spur', 'Eifer', 'Filter', 'Stoff',
    ],
    // Level 3: Alle Buchstaben (adds: y x c v b n m)
    3: [
        // Tiere
        'Biene', 'Vogel', 'Fuchs', 'Schwan', 'Chamäleon', 'Marder',
        'Biber', 'Falke', 'Möwe', 'Dachs', 'Luchs', 'Barsch',
        'Muschel', 'Spinne', 'Mücke', 'Bremse', 'Libelle',
        // Natur
        'Blume', 'Nebel', 'Sonne', 'Mond', 'Nacht', 'Morgen',
        'Abend', 'Blitz', 'Donner', 'Sommer', 'Herbst', 'Schnee',
        'Flocke', 'Strand', 'Vulkan', 'Gebirge', 'Berge', 'Insel',
        'Bucht', 'Schlamm', 'Moos', 'Blatt', 'Stamm', 'Rinde',
        // Essen & Trinken
        'Banane', 'Mango', 'Melone', 'Birne', 'Mandel', 'Butter',
        'Braten', 'Bonbon', 'Schinken', 'Kuchen', 'Creme', 'Milch',
        'Vanille', 'Brezel', 'Marmelade', 'Nudel', 'Becher',
        // Menschen & Berufe
        'Mutter', 'Vater', 'Bruder', 'Nachbar', 'Bauer', 'Clown',
        'Maler', 'Bäcker', 'Mechanik', 'Magier', 'Boxer', 'Vampir',
        'Monster', 'Krieger', 'Ritter', 'Bürger',
        // Dinge
        'Mantel', 'Fenster', 'Bunker', 'Decke', 'Lampe', 'Münze',
        'Kammer', 'Bombe', 'Messer', 'Anker', 'Balken', 'Bank',
        'Brücke', 'Schirm', 'Maske', 'Becken', 'Flamme', 'Kabel',
        // Adjektive & Verben
        'mutig', 'brav', 'nett', 'clever', 'böse', 'schmal',
        'blank', 'bunt', 'dumm', 'sanft', 'gemein', 'nackt',
        'mixen', 'boxen', 'campen', 'binden', 'finden', 'nennen',
        'rennen', 'kennen', 'können', 'messen', 'denken', 'merken',
        // Abstrakt
        'Nummer', 'Examen', 'Chance', 'Bonus', 'Comic', 'Bild',
        'Nutzen', 'Menge', 'Cent', 'Bronze', 'Methode', 'Moment',
        'Verb', 'Symbol', 'Syntax', 'System', 'Maxime', 'Manöver',
        // Fantasy
        'Drachen', 'Hexe', 'Nixe', 'Zwerg', 'Burg', 'Schwert',
        'Magie', 'Zaubern', 'Kobold', 'Schild', 'Verlies', 'Macht',
        'Kristall', 'Amulett', 'Elixier', 'Feuerball', 'Schatten',
    ],
    // Level 4: + Umlauts (ä ö ü ß)
    4: [
        // ü-Wörter
        'über', 'müde', 'kühl', 'Glück', 'Stück', 'Brücke', 'Hütte',
        'hübsch', 'Würfel', 'Flüsse', 'Schlüssel', 'Füße', 'Tür',
        'Hügel', 'Büffel', 'Küste', 'Wüste', 'Düne', 'Lücke',
        'Mühle', 'Gürtel', 'Blüte', 'Übung', 'Rücken', 'Kürbis',
        'Münster', 'Schüler', 'Bücher', 'Küche', 'Gemüse', 'Grüße',
        'fühlen', 'prüfen', 'spülen', 'würzen', 'schütteln',
        'flüstern', 'überlegen', 'wünschen',
        // ä-Wörter
        'Bär', 'Käse', 'Säge', 'Träne', 'Ärger', 'Äpfel', 'Kälte',
        'Bäcker', 'Gärten', 'Hände', 'Kräfte', 'Mäuse', 'Räder',
        'Stärke', 'Wärme', 'Bänke', 'Fächer', 'Gläser', 'Blätter',
        'Mädchen', 'Nähe', 'Zähne', 'Fähre', 'Krähen', 'Stätte',
        'Gewässer', 'Schädel', 'Wäsche', 'Knäuel', 'Käfig',
        'wählen', 'erzählen', 'kämpfen', 'jäten', 'blättern',
        // ö-Wörter
        'Öl', 'böse', 'Größe', 'Hörner', 'Löffel', 'Möhre',
        'Öffnung', 'Löwe', 'Höhle', 'Vögel', 'Könige', 'Flöte',
        'Böden', 'Wörter', 'Nöte', 'Töne', 'Größen', 'Höhen',
        'Söhne', 'Knöpfe', 'Schöpfer', 'Stöcke', 'Blöcke',
        'mögen', 'hören', 'stören', 'zögern', 'fördern',
        // ß-Wörter
        'Straße', 'Fußball', 'Maße', 'Spaß', 'Grüße', 'Fuß',
        'Gruß', 'Floß', 'Stoß', 'Soße', 'groß', 'weiß', 'heiß',
        'süß', 'fleißig', 'draußen', 'außen', 'mäßig',
        'reißen', 'beißen', 'genießen', 'schließen', 'gießen',
        // Kombinations-Wörter
        'Frühstück', 'Ausrüstung', 'Gemütlich', 'Vergnügen',
        'Überraschung', 'Verständnis', 'Erklärung', 'Äußerung',
        'Veränderung', 'Geräusch', 'Eigentümer',
    ],
    // Level 5: + Großschreibung + Satzzeichen + ganze Sätze
    5: [
        // Kurze Ausrufe
        'Hallo!', 'Hilfe!', 'Stopp!', 'Super!', 'Jawohl!', 'Bravo!',
        'Hurra!', 'Achtung!', 'Feuer!', 'Weiter!', 'Fertig!',
        // Fragen
        'Wie geht es dir?', 'Was ist das?', 'Wer war das?',
        'Wo bist du?', 'Warum nicht?', 'Wie heißt du?',
        'Wann fängt es an?', 'Welches Tier?', 'Wie viel?',
        'Kannst du das?', 'Hast du Zeit?', 'Spielst du mit?',
        // Aussagen
        'Das ist toll!', 'Ich bin bereit.', 'Los geht es!',
        'Alles klar.', 'Danke schön!', 'Bitte sehr.',
        'Auf Wiedersehen!', 'Viel Erfolg!', 'Gute Nacht!',
        'Das macht Spaß.', 'Weiter so!', 'Super gemacht!',
        'Gut gespielt!', 'Noch ein Versuch.', 'Mach weiter!',
        'Heute ist Montag.', 'Morgen wird besser.', 'Nicht aufgeben!',
        'Ich übe fleißig.', 'Die Burg ist sicher.', 'Monster besiegt!',
        'Schnell tippen!', 'Genau richtig.', 'Prima Leistung!',
        // Mittellange Sätze
        'Der Ritter kämpft mutig.', 'Die Burg steht fest.',
        'Ein Drache fliegt vorbei.', 'Der Held rettet das Land.',
        'Das Schwert leuchtet hell.', 'Die Hexe braut Tränke.',
        'Der Zauberer wirkt Magie.', 'Das Monster greift an!',
        'Die Mauer hält stand.', 'Der Turm wackelt stark.',
        'Feuer und Flamme!', 'Blitz und Donner!',
        'Mut und Tapferkeit.', 'Stärke und Ausdauer.',
        // Längere Sätze
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
