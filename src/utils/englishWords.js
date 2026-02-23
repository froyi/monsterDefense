// English words organized by difficulty level for typing practice
// Level 1: Home row only (a s d f g h j k l ;)   → lowercase only
// Level 2: + Upper row (q w e r t y u i o p)      → lowercase only
// Level 3: + Lower row (z x c v b n m)             → lowercase only
// Level 4: + Common multi-char combos (th, sh, ch)  → still lowercase
// Level 5: + Capitalization, punctuation, full sentences

export const wordsByLevel = {
    // ═════════════════════════════════════════════════════════
    // Level 1: ONLY home row chars: a s d f g h j k l
    // ═════════════════════════════════════════════════════════
    1: [
        // Real English words (home row only)
        'add', 'ads', 'all', 'ash', 'ask', 'dad', 'fad', 'gag',
        'gal', 'gas', 'had', 'hag', 'has', 'jag', 'lag', 'lad',
        'lash', 'lass', 'sad', 'sag', 'salad', 'shall', 'slag',
        'slash', 'fall', 'hall', 'lass', 'glad', 'flag', 'flask',
        'half', 'flash', 'glass', 'lass', 'shall', 'dash',
        'gash', 'hash', 'saga', 'gaff', 'skald',
        // Typing drills — home row patterns
        'asdf', 'fdsa', 'ghjk', 'dfgh', 'lkjh', 'jkl',
        'fghj', 'dfjk', 'slkd', 'ghsl', 'ajsl', 'ghal',
        'jfds', 'klsa', 'asjl', 'dkfh', 'glsa', 'fhal',
        'sdlk', 'fghd', 'jkal', 'salg', 'dakl', 'lasd',
        'kadl', 'kjhg', 'dsaf', 'gfds', 'hjkl', 'asda',
    ],
    // ═════════════════════════════════════════════════════════
    // Level 2: Home row + upper row (adds: q w e r t y u i o p)
    // All lowercase. No: z,x,c,v,b,n,m
    // ═════════════════════════════════════════════════════════
    2: [
        // Animals
        'dog', 'fish', 'deer', 'horse', 'goat', 'frog', 'owl',
        'hawk', 'sheep', 'spider', 'tiger', 'otter', 'turtle',
        // Nature
        'tree', 'leaf', 'water', 'fire', 'sky', 'air', 'soil',
        'earth', 'lake', 'sea', 'hill', 'field', 'forest',
        'reef', 'ridge', 'drift', 'frost', 'sleet',
        // Food
        'apple', 'pear', 'date', 'wheat', 'pie', 'stew',
        'fruit', 'tofu', 'garish', 'grill', 'stir', 'roast',
        // Objects
        'ship', 'tower', 'gate', 'door', 'desk', 'rope',
        'sail', 'wheel', 'stair', 'light', 'road', 'tool',
        'sword', 'shield', 'steel', 'gold', 'suit', 'hat',
        // Adjectives
        'quiet', 'wild', 'tall', 'deep', 'great', 'old',
        'fast', 'fresh', 'free', 'fair', 'good', 'super',
        'loud', 'proud', 'still', 'soft', 'worth', 'right',
        // Verbs
        'walk', 'ride', 'fight', 'play', 'read', 'sleep',
        'write', 'speak', 'push', 'pull', 'drop', 'shop',
        'drift', 'leap', 'quest', 'strike', 'quote', 'type',
        // Abstract
        'rule', 'spirit', 'power', 'truth', 'world', 'quest',
        'proof', 'effort', 'goal', 'sport', 'trip', 'risk',
    ],
    // ═════════════════════════════════════════════════════════
    // Level 3: All basic letters (adds: z x c v b n m)
    // All lowercase. No capitals.
    // ═════════════════════════════════════════════════════════
    3: [
        // Animals
        'bunny', 'cobra', 'fox', 'mouse', 'salmon', 'zebra',
        'monkey', 'raven', 'crane', 'camel', 'bison', 'vulture',
        'falcon', 'magpie', 'robin', 'badger', 'beaver',
        // Nature
        'mountain', 'canyon', 'volcano', 'ocean', 'beach', 'snow',
        'bloom', 'vine', 'branch', 'storm', 'sunset', 'dawn',
        'moon', 'sun', 'comet', 'breeze', 'summer', 'winter',
        // Food
        'bacon', 'banana', 'mango', 'lemon', 'melon', 'onion',
        'cream', 'salami', 'crumb', 'muffin', 'candy', 'corn',
        'chicken', 'lamb', 'salmon', 'vanilla', 'noodle',
        // People
        'mother', 'father', 'brother', 'cousin', 'neighbor',
        'clown', 'boxer', 'miner', 'farmer', 'builder',
        'wizard', 'knight', 'monk', 'viking', 'captain',
        // Objects
        'blanket', 'candle', 'basket', 'cabin', 'bench',
        'crown', 'mask', 'banner', 'bridge', 'column',
        'machine', 'motor', 'screen', 'camera', 'button',
        // Adjectives
        'brave', 'calm', 'clever', 'noble', 'broken', 'common',
        'modern', 'ancient', 'vibrant', 'complex', 'maximum',
        // Verbs
        'combat', 'climb', 'vanish', 'bounce', 'combine',
        'examine', 'invent', 'conquer', 'blink', 'dance',
        'march', 'swim', 'jump', 'run', 'begin', 'become',
        // Abstract
        'balance', 'chance', 'number', 'moment', 'symbol',
        'method', 'system', 'concept', 'victory', 'legend',
    ],
    // ═════════════════════════════════════════════════════════
    // Level 4: Common combinations + harder words (still lowercase)
    // ═════════════════════════════════════════════════════════
    4: [
        // th-words
        'the', 'that', 'this', 'them', 'then', 'than', 'thing',
        'think', 'thought', 'together', 'through', 'throughout',
        'thousand', 'theater', 'breathe', 'beneath', 'strength',
        // sh-words
        'shadow', 'shatter', 'shelter', 'shimmer', 'shoulder',
        'shining', 'shuffle', 'fishing', 'pushing', 'washing',
        'wishing', 'rushing', 'brushing', 'vanishing',
        // ch-words
        'change', 'chapter', 'champion', 'chocolate', 'chicken',
        'challenge', 'childhood', 'exchange', 'matching',
        'catching', 'switching', 'merchant',
        // tion/sion
        'action', 'station', 'question', 'solution', 'mission',
        'position', 'condition', 'direction', 'attention',
        'tradition', 'invention', 'expression', 'connection',
        // Longer complex words
        'adventure', 'beautiful', 'butterfly', 'celebrate',
        'dangerous', 'education', 'fantastic', 'generation',
        'happiness', 'important', 'knowledge', 'lightning',
        'mysterious', 'nightmare', 'operation', 'particular',
        'rectangle', 'something', 'traveling', 'understand',
        'wonderful', 'excellent', 'discovery', 'experiment',
        'incredible', 'permission', 'accomplish', 'recognition',
    ],
    // ═════════════════════════════════════════════════════════
    // Level 5: + Capitalization + punctuation + full sentences
    // ═════════════════════════════════════════════════════════
    5: [
        // Short exclamations
        'Hello!', 'Help!', 'Stop!', 'Great!', 'Yes!', 'Bravo!',
        'Awesome!', 'Watch out!', 'Fire!', 'Go ahead!', 'Done!',
        // Questions
        'How are you?', 'What is that?', 'Who was it?',
        'Where are you?', 'Why not?', 'What is your name?',
        'When does it start?', 'Which animal?', 'How much?',
        'Can you do it?', 'Do you have time?', 'Want to play?',
        // Statements
        'That is great!', 'I am ready.', 'Let us go!',
        'All clear.', 'Thank you!', 'You are welcome.',
        'See you later!', 'Good luck!', 'Good night!',
        'This is fun.', 'Keep going!', 'Well done!',
        'Good game!', 'Try again.', 'Keep it up!',
        'Today is Monday.', 'Tomorrow will be better.', 'Never give up!',
        'I am practicing.', 'The castle is safe.', 'Monster defeated!',
        'Type faster!', 'Exactly right.', 'Great job!',
        // Medium sentences
        'The knight fights bravely.', 'The castle stands firm.',
        'A dragon flies overhead.', 'The hero saves the land.',
        'The sword shines bright.', 'The witch brews potions.',
        'The wizard casts a spell.', 'The monster attacks!',
        'The wall holds strong.', 'The tower starts to shake.',
        'Fire and flame!', 'Thunder and lightning!',
        'Courage and bravery.', 'Strength and endurance.',
        // Longer sentences
        'Every day gets better than the last.',
        'Practice makes perfect, believe me!',
        'The quick brown fox jumps high.',
        'The stars are shining in the sky.',
        'Those who are brave will win the game.',
        'Together we are strong enough.',
        'The adventure is waiting for you!',
        'Fast fingers, clear mind.',
        'Show what you are made of!',
        'Faster than lightning!',
    ],
};

// Flat list of all words
export const allWords = Object.values(wordsByLevel).flat();

// Get words available for a given max skill level
export function getWordsForLevel(maxLevel) {
    const words = [];
    for (let i = 1; i <= Math.min(maxLevel, 5); i++) {
        words.push(...wordsByLevel[i]);
    }
    return words;
}

// Characters associated with each skill level (QWERTY layout)
export const levelCharacters = {
    1: 'asdfghjkl '.split(''),
    2: 'qwertyuiop'.split(''),
    3: 'zxcvbnm'.split(''),
    4: 'thshchtion'.split(''), // combos, not unique chars
    5: '.,!?:;-ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
};

// All allowed characters up to a given level
export function getAllowedCharsForLevel(maxLevel) {
    const chars = new Set();
    for (let i = 1; i <= Math.min(maxLevel, 5); i++) {
        for (const c of levelCharacters[i]) {
            chars.add(c);
        }
    }
    return chars;
}
