// English words organized by difficulty level for typing practice
// Level 1: Home row only (a s d f g h j k l)           → lowercase only
// Level 2: + Upper row (q w e r t y u i o p)            → lowercase only
// Level 3: + Lower row (z x c v b n m)                  → lowercase only
// Level 4: + Common combos / longer words (still lowercase, all letters)
// Level 5: + Capitalization, punctuation, full sentences

export const wordsByLevel = {
    // ═════════════════════════════════════════════════════════
    // Level 1: ONLY home row chars: a s d f g h j k l
    // No: q,w,e,r,t,y,u,i,o,p,z,x,c,v,b,n,m
    // ═════════════════════════════════════════════════════════
    1: [
        // Real English words (home row only: a s d f g h j k l)
        'add', 'ads', 'all', 'ash', 'ask', 'dad', 'fad', 'gag',
        'gal', 'gas', 'had', 'hag', 'has', 'jag', 'lag', 'lad',
        'lash', 'lass', 'sad', 'sag', 'salad', 'shall', 'slag',
        'slash', 'fall', 'hall', 'glad', 'flag', 'flask',
        'half', 'flash', 'glass', 'dash', 'gash', 'hash',
        'saga', 'gaff', 'skald', 'alas', 'alga', 'gala',
        'dahl', 'lass',
        // More real home-row words
        'shag', 'shah', 'sash', 'salsa', 'sass', 'lass',
        'algal', 'allas', 'falls', 'halls', 'slags',
        'dads', 'fads', 'gags', 'hags', 'jags', 'lags', 'lads',
        'flags', 'flak', 'flaks', 'flask', 'galls', 'asks',
        // Typing drills — home row patterns (3 char)
        'adf', 'fhj', 'ghd', 'jkl', 'sdk', 'hjk', 'dfs', 'lkj',
        'fgh', 'shd', 'adj', 'kfd', 'ghl', 'jds', 'slk', 'dhf',
        'ksd', 'lhg', 'fjk', 'gds', 'hkl', 'jfg', 'dkl', 'sha',
        // Home-row patterns (4 char)
        'asdf', 'fdsa', 'ghjk', 'dfgh', 'lkjh', 'jkds',
        'fghj', 'dfjk', 'slkd', 'ghsl', 'ajsl', 'ghal', 'fjds',
        'jfds', 'klsa', 'asjl', 'dkfh', 'glsa', 'fhal', 'dgsa',
        'sdlk', 'fghd', 'jkal', 'salg', 'dakl', 'lasd', 'hfgd',
        'kadl', 'kjhg', 'dsaf', 'gfds', 'hjkl', 'asda', 'jfkl',
        // Home-row patterns (5 char)
        'halsg', 'falgs', 'akdls', 'gjhds', 'saflk', 'dalhg',
        'lahgs', 'jfalk', 'ghasd', 'kdsla', 'sfgla', 'dkhla',
        'fjdks', 'slahg', 'ghfad', 'dhfka', 'jlsak', 'flaks',
        'asjkl', 'dfghj', 'sdklh', 'fghjk', 'asdfl', 'ghjds',
        // Home-row patterns (6-7 char)
        'khalsg', 'sldhfg', 'fjkalg', 'dslakh', 'ghjkls', 'asdfjk',
        'fghdsl', 'jklghd', 'sdafgh', 'lkjhgf', 'dfjkls', 'ghasdl',
        'hgfdsa', 'jklsda', 'dfghjs', 'slkjhg', 'aghfds', 'kdsflg',
    ],
    // ═════════════════════════════════════════════════════════
    // Level 2: Home row + upper row (adds: q w e r t y u i o p)
    // All lowercase. No: z,x,c,v,b,n,m
    // ═════════════════════════════════════════════════════════
    2: [
        // ── 3-letter words ──
        'age', 'ape', 'are', 'art', 'ate', 'dew', 'die', 'dig',
        'dip', 'dog', 'dot', 'dry', 'due', 'dug', 'ear', 'eat',
        'egg', 'elf', 'eye', 'far', 'fat', 'fed', 'few', 'fig',
        'fit', 'fly', 'fog', 'for', 'fur', 'gap', 'get', 'god',
        'got', 'gig', 'glow', 'grip', 'gut', 'guy', 'hay', 'her',
        'hid', 'hip', 'hit', 'hot', 'how', 'hug', 'hut',
        'ill', 'irk', 'its', 'jar', 'jet', 'jig', 'joy', 'jug',
        'key', 'kid', 'kit', 'lap', 'law', 'lay', 'led', 'leg',
        'let', 'lid', 'lie', 'lip', 'lit', 'log', 'lot', 'low',
        'oil', 'old', 'ore', 'our', 'out', 'owe', 'owl', 'pad',
        'pal', 'pay', 'peg', 'pet', 'pie', 'pig', 'pit', 'ply',
        'pot', 'pry', 'pug', 'put', 'rag', 'rat', 'raw', 'ray',
        'red', 'rig', 'rip', 'rod', 'rot', 'row', 'rug', 'rut',
        'set', 'she', 'shy', 'sip', 'sir', 'sit', 'sky', 'sly',
        'sow', 'spy', 'tag', 'tap', 'tar', 'tea', 'the', 'tie',
        'tip', 'toe', 'too', 'top', 'tow', 'toy', 'try', 'tug',
        'two', 'use', 'wag', 'war', 'way', 'wet', 'who', 'why',
        'wig', 'wit', 'yak', 'yap', 'yew',
        // ── 4-letter words ──
        'also', 'area', 'away', 'dare', 'dark', 'dear', 'deer',
        'desk', 'dish', 'door', 'dose', 'drop', 'drug', 'dust',
        'duty', 'ease', 'edit', 'else', 'fair', 'fake',
        'fear', 'feed', 'feel', 'file', 'fire', 'fish', 'fold',
        'food', 'foot', 'fork', 'fort', 'foul', 'free', 'frog',
        'fuel', 'full', 'fury', 'fuse', 'gate', 'gear', 'gift',
        'girl', 'gist', 'glow', 'glue', 'goat', 'goes', 'gold',
        'good', 'gray', 'grew', 'grit', 'grow', 'gulp', 'gust',
        'hair', 'half', 'hard', 'hate', 'haul', 'head', 'heap',
        'heat', 'heel', 'held', 'help', 'here', 'hero', 'hide',
        'high', 'hike', 'hill', 'hold', 'hole', 'hook', 'hope',
        'host', 'hour', 'huge', 'hull', 'idea', 'just', 'keep',
        'kept', 'kite', 'lake', 'laid', 'late', 'lead', 'leaf',
        'leak', 'leap', 'left', 'less', 'life', 'lift', 'like',
        'list', 'load', 'logo', 'look', 'loop', 'lord', 'lose',
        'loss', 'loud', 'lure', 'lush', 'lyse', 'ought',
        'page', 'pair', 'pale', 'path', 'peak', 'peer', 'pile',
        'pipe', 'play', 'plot', 'plus', 'pole', 'poll', 'pool',
        'poor', 'port', 'pose', 'post', 'pour', 'prey', 'prop',
        'pull', 'pure', 'push', 'quit', 'rage', 'raid', 'rail',
        'rare', 'rate', 'read', 'real', 'rely', 'rest', 'ride',
        'riff', 'rise', 'risk', 'road', 'role', 'roll', 'roof',
        'root', 'rope', 'rose', 'rude', 'rule', 'rush', 'safe',
        'said', 'sail', 'sale', 'salt', 'seed', 'self', 'shed',
        'ship', 'shoe', 'shop', 'shut', 'side', 'sigh', 'sift',
        'silk', 'site', 'skip', 'slip', 'slop',
        'slot', 'slow', 'slug', 'soil', 'sole', 'sold', 'sort',
        'soul', 'sour', 'spit', 'spot', 'star', 'stay', 'step',
        'stew', 'stir', 'stop', 'suit', 'sure', 'swap', 'tail',
        'take', 'tale', 'talk', 'tall', 'tape', 'task', 'tear',
        'tell', 'test', 'that', 'they', 'this', 'tide', 'tile',
        'till', 'tilt', 'tire', 'toad', 'toil', 'told', 'toll',
        'tool', 'tour', 'trap', 'tree', 'trek', 'trip', 'trot',
        'true', 'tusk', 'type', 'ugly', 'urge', 'wait', 'wake',
        'walk', 'wall', 'ward', 'ware', 'wash', 'weak', 'wear',
        'week', 'weed', 'weep', 'well', 'what', 'wide', 'wife',
        'wild', 'will', 'wilt', 'wise', 'wish', 'with', 'woke',
        'wolf', 'wood', 'word', 'wore', 'work', 'writ', 'yell',
        // ── 5-letter words ──
        'after', 'aisle', 'alert', 'alley', 'aside',
        'dairy', 'dealt', 'depth', 'digit', 'dirty', 'draft',
        'dread', 'dried', 'drift', 'drill', 'drool', 'dwarf',
        'eager', 'early', 'earth', 'eight', 'equal', 'erupt',
        'faith', 'feast', 'field', 'fifty', 'fight', 'float',
        'flood', 'floor', 'fluid', 'forge', 'forth',
        'forty', 'fresh', 'fried', 'frost', 'fruit',
        'gauge', 'ghost', 'glory', 'gorge', 'grade',
        'graft', 'grasp', 'greed', 'grill', 'gripe', 'grist',
        'grout', 'group', 'guard', 'guess', 'guide', 'guild',
        'guilt', 'happy', 'haste', 'heart', 'heist', 'hoist',
        'horse', 'hotel', 'house', 'ideal', 'jolly',
        'joust', 'layer',
        'ledge', 'legal', 'light', 'loose',
        'lotus', 'lower', 'loyal', 'offer', 'opera',
        'order', 'other', 'outer', 'party', 'paste',
        'pearl', 'phase', 'pilot',
        'plaid', 'plate', 'plead', 'plier', 'plush',
        'poker', 'polar', 'poser', 'power',
        'press', 'pride', 'proof', 'prose', 'proud',
        'pupil', 'purse', 'quake', 'quart', 'query',
        'quest', 'queue', 'quiet', 'quill', 'quirk',
        'quite', 'quota', 'quote', 'rally', 'rapid', 'ratio',
        'ready', 'repay', 'reply',
        'rider', 'rigid', 'rigor', 'risky',
        'roast', 'rouge', 'rough', 'route', 'royal',
        'salad', 'salty', 'shaft', 'shake',
        'shape', 'share', 'sharp', 'sheer', 'shelf', 'shell',
        'shift', 'shire', 'shirt', 'shore', 'shout',
        'siege', 'sight', 'skill', 'slate', 'sleep', 'slide',
        'slope', 'solar', 'solid', 'south', 'spare',
        'spark', 'speak', 'spear', 'speed', 'spell', 'spill',
        'spoke', 'spore', 'sport', 'spray', 'staff', 'stage',
        'stair', 'stake', 'stale', 'stall', 'stare', 'start',
        'state', 'stays', 'steal', 'steel', 'steep',
        'steer', 'still', 'stole', 'stood',
        'stool', 'store', 'story', 'stout', 'stray', 'strip',
        'study', 'stuff', 'style', 'sugar', 'super', 'surge',
        'swear', 'sweet', 'swept', 'swift', 'swirl', 'sword',
        'syrup', 'third', 'those', 'three', 'throw', 'tight',
        'tiger', 'title', 'toast', 'today', 'total', 'tower',
        'trade', 'trail', 'trait', 'trash', 'treat', 'triad',
        'trial', 'troop', 'trout', 'truly', 'trust',
        'truth', 'tulip', 'tutor', 'twist', 'ultra', 'upset',
        'usual', 'utter', 'water', 'weary', 'weird', 'wheat',
        'wheel', 'where', 'while', 'whole', 'worth', 'would',
        'wrath', 'write', 'wrote', 'youth',
        // ── 6+ letter words ──
        'depart', 'desert', 'detail', 'digest', 'dipole', 'dislike',
        'editor', 'effort', 'eraser', 'fidget', 'filter', 'flight',
        'forget', 'fought', 'fourth', 'gather', 'geyser', 'glider',
        'gopher', 'gospel', 'guitar', 'height', 'holder', 'hustle',
        'jester', 'jogger', 'joyful', 'kipper', 'ladder', 'lather',
        'leader', 'ledger', 'litter', 'logger', 'loiter', 'lustre',
        'pirate', 'pledge', 'pliers', 'poised', 'polite', 'poster',
        'potter', 'priest', 'prodigy', 'profit', 'purple', 'pursue',
        'quaker', 'rafter', 'rattle', 'regard', 'relief', 'repair',
        'riddle', 'ripple', 'roguish', 'roster', 'rudder', 'rustle',
        'saddle', 'sailor', 'sister', 'slight', 'slipper', 'spider',
        'spirit', 'stagger', 'stealth', 'stopper', 'storage', 'striker',
        'swifter', 'topside', 'twitter', 'whisper', 'whistle', 'withered',
    ],
    // ═════════════════════════════════════════════════════════
    // Level 3: All basic letters (adds: z x c v b n m)
    // All lowercase. No capitals, no punctuation.
    // ═════════════════════════════════════════════════════════
    3: [
        // ── Animals ──
        'bunny', 'cobra', 'fox', 'mouse', 'salmon', 'zebra',
        'monkey', 'raven', 'crane', 'camel', 'bison', 'vulture',
        'falcon', 'magpie', 'robin', 'badger', 'beaver', 'panther',
        'dolphin', 'penguin', 'lobster', 'mantis', 'minnow', 'condor',
        'buffalo', 'gazelle', 'hamster', 'iguana', 'jackal', 'lemming',
        'mackerel', 'sparrow', 'wombat', 'coyote', 'baboon', 'cheetah',
        // ── Nature ──
        'mountain', 'canyon', 'volcano', 'ocean', 'beach', 'snow',
        'bloom', 'vine', 'branch', 'storm', 'sunset', 'dawn',
        'moon', 'sun', 'comet', 'breeze', 'summer', 'winter',
        'autumn', 'blizzard', 'cavern', 'crystal', 'ember', 'meadow',
        'glacier', 'nebula', 'pebble', 'stream', 'timber', 'tundra',
        'monsoon', 'rainbow', 'boulder', 'bonfire', 'sandbar', 'volcano',
        // ── Food ──
        'bacon', 'banana', 'mango', 'lemon', 'melon', 'onion',
        'cream', 'crumb', 'muffin', 'candy', 'corn', 'lamb',
        'chicken', 'vanilla', 'noodle', 'biscuit', 'cabbage',
        'broccoli', 'cucumber', 'mushroom', 'pumpkin', 'avocado',
        'coconut', 'cashew', 'almond', 'walnut', 'nutmeg', 'cinnamon',
        'cranberry', 'blueberry', 'brownie', 'pancake', 'pretzel',
        // ── People ──
        'mother', 'father', 'brother', 'cousin', 'neighbor',
        'clown', 'boxer', 'miner', 'farmer', 'builder',
        'wizard', 'knight', 'monk', 'viking', 'captain',
        'merchant', 'servant', 'champion', 'villain', 'bandit',
        'blacksmith', 'commander', 'craftsman', 'guardian', 'wanderer',
        // ── Objects ──
        'blanket', 'candle', 'basket', 'cabin', 'bench',
        'crown', 'mask', 'banner', 'bridge', 'column',
        'machine', 'motor', 'screen', 'camera', 'button',
        'compass', 'lantern', 'magnet', 'anvil', 'chisel',
        'backpack', 'bookmark', 'cabinet', 'curtain', 'toolbox',
        'notebook', 'envelope', 'umbrella', 'binocular', 'windmill',
        // ── Adjectives ──
        'brave', 'calm', 'clever', 'noble', 'broken', 'common',
        'modern', 'ancient', 'vibrant', 'complex', 'maximum',
        'cunning', 'elegant', 'massive', 'nimble', 'obscure',
        'bizarre', 'crimson', 'nervous', 'obvious', 'content',
        'magnetic', 'dominant', 'uncommon', 'volcanic', 'majestic',
        // ── Verbs ──
        'combat', 'climb', 'vanish', 'bounce', 'combine',
        'examine', 'invent', 'conquer', 'blink', 'dance',
        'march', 'swim', 'jump', 'run', 'begin', 'become',
        'abandon', 'bargain', 'capture', 'deliver', 'embrace',
        'furnish', 'harvest', 'imagine', 'mention', 'observe',
        'plunder', 'reclaim', 'summon', 'venture', 'wander',
        // ── Abstract / Fantasy ──
        'balance', 'chance', 'number', 'moment', 'symbol',
        'method', 'system', 'concept', 'victory', 'legend',
        'kingdom', 'monster', 'dungeon', 'enchant', 'sorcery',
        'alchemy', 'conjure', 'phantom', 'mystical', 'emblem',
        'dimension', 'expedition', 'command', 'conquest', 'ambition',
        'adventure', 'invention', 'discovery', 'labyrinth', 'companion',
    ],
    // ═════════════════════════════════════════════════════════
    // Level 4: Common combos + longer/harder words (still lowercase)
    // All 26 letters available. Focus on challenging vocabulary.
    // ═════════════════════════════════════════════════════════
    4: [
        // ── th-words ──
        'the', 'that', 'this', 'them', 'then', 'than', 'thing',
        'think', 'thought', 'together', 'through', 'throughout',
        'thousand', 'theater', 'breathe', 'beneath', 'strength',
        'thorough', 'therapy', 'thankful', 'thriving', 'throttle',
        'thumbnail', 'thicket', 'threshold', 'theoretical',
        // ── sh-words ──
        'shadow', 'shatter', 'shelter', 'shimmer', 'shoulder',
        'shining', 'shuffle', 'fishing', 'pushing', 'washing',
        'wishing', 'rushing', 'brushing', 'vanishing', 'showdown',
        'shipwreck', 'shortcut', 'shutdown', 'shrouded', 'splashing',
        // ── ch-words ──
        'change', 'chapter', 'champion', 'chocolate', 'chicken',
        'challenge', 'childhood', 'exchange', 'matching',
        'catching', 'switching', 'merchant', 'checklist',
        'chronicle', 'chivalry', 'charcoal', 'checkmate',
        // ── tion/sion ──
        'action', 'station', 'question', 'solution', 'mission',
        'position', 'condition', 'direction', 'attention',
        'tradition', 'invention', 'expression', 'connection',
        'revolution', 'exhibition', 'ammunition', 'fascination',
        'composition', 'recognition', 'exploration', 'imagination',
        // ── Longer complex words ──
        'adventure', 'beautiful', 'butterfly', 'celebrate',
        'dangerous', 'education', 'fantastic', 'generation',
        'happiness', 'important', 'knowledge', 'lightning',
        'mysterious', 'nightmare', 'operation', 'particular',
        'rectangle', 'something', 'traveling', 'understand',
        'wonderful', 'excellent', 'discovery', 'experiment',
        'incredible', 'permission', 'accomplish', 'recognition',
        // ── More complex vocabulary ──
        'abundance', 'atmosphere', 'background', 'battlefield',
        'boulevard', 'breathtaking', 'catastrophe', 'circumstance',
        'consequence', 'competitive', 'contemporary', 'contribution',
        'controversial', 'correspond', 'demonstrate', 'distinguish',
        'earthquake', 'environment', 'extraordinary', 'fundamental',
        'headquarters', 'hemisphere', 'independent', 'infrastructure',
        'investigation', 'magnificent', 'neighborhood', 'nevertheless',
        'overwhelming', 'phenomenon', 'professional', 'quarterback',
        'requirement', 'scholarship', 'significance', 'sophisticated',
        'spectacular', 'surveillance', 'thunderstorm', 'transformation',
        'unforgettable', 'volunteering', 'vulnerability', 'waterfront',
    ],
    // ═════════════════════════════════════════════════════════
    // Level 5: + Capitalization + punctuation + full sentences
    // This is the ONLY level where uppercase letters appear.
    // ═════════════════════════════════════════════════════════
    5: [
        // ── Short exclamations ──
        'Hello!', 'Help!', 'Stop!', 'Great!', 'Yes!', 'Bravo!',
        'Awesome!', 'Watch out!', 'Fire!', 'Go ahead!', 'Done!',
        'Hurry!', 'Amazing!', 'Danger!', 'Retreat!', 'Forward!',
        'Charge!', 'Victory!', 'Brilliant!', 'Fantastic!',
        // ── Single capitalized words ──
        'Apple', 'Bridge', 'Castle', 'Dragon', 'Eagle', 'Falcon',
        'Glacier', 'Hammer', 'Island', 'Jaguar', 'Kernel', 'Lantern',
        'Mountain', 'Neptune', 'Oracle', 'Phoenix', 'Quiver', 'Ranger',
        'Scepter', 'Thunder', 'Unicorn', 'Volcano', 'Whisper', 'Xenon',
        'Yonder', 'Zenith', 'Amazon', 'Beacon', 'Compass', 'Diamond',
        'Eclipse', 'Fortress', 'Gargoyle', 'Horizon', 'Inferno',
        'Jubilee', 'Kingdom', 'Labyrinth', 'Monument', 'Nebula',
        'Obsidian', 'Pyramid', 'Quantum', 'Raptor', 'Sapphire',
        'Tempest', 'Universe', 'Vanguard', 'Warlock', 'Zephyr',
        // ── Questions ──
        'How are you?', 'What is that?', 'Who was it?',
        'Where are you?', 'Why not?', 'What is your name?',
        'When does it start?', 'Which animal?', 'How much?',
        'Can you do it?', 'Do you have time?', 'Want to play?',
        'Where did it go?', 'What happened?', 'Who goes there?',
        'How far is it?', 'Are you ready?', 'What comes next?',
        'Shall we begin?', 'Did you see that?',
        // ── Statements ──
        'That is great!', 'I am ready.', 'Let us go!',
        'All clear.', 'Thank you!', 'You are welcome.',
        'See you later!', 'Good luck!', 'Good night!',
        'This is fun.', 'Keep going!', 'Well done!',
        'Good game!', 'Try again.', 'Keep it up!',
        'Today is Monday.', 'Tomorrow will be better.', 'Never give up!',
        'I am practicing.', 'The castle is safe.', 'Monster defeated!',
        'Type faster!', 'Exactly right.', 'Great job!',
        'Stay focused.', 'Almost there!', 'One more try.',
        'Believe in yourself.', 'Time is running out!',
        // ── Medium sentences ──
        'The knight fights bravely.', 'The castle stands firm.',
        'A dragon flies overhead.', 'The hero saves the land.',
        'The sword shines bright.', 'The witch brews potions.',
        'The wizard casts a spell.', 'The monster attacks!',
        'The wall holds strong.', 'The tower starts to shake.',
        'Fire and flame!', 'Thunder and lightning!',
        'Courage and bravery.', 'Strength and endurance.',
        'The ship sails at dawn.', 'The eagle soars above.',
        'The fox runs through the woods.', 'The moon lights the way.',
        'A storm is brewing.', 'The treasure awaits below.',
        'The bridge collapsed!', 'Darkness fills the room.',
        // ── Longer sentences ──
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
        'The king rules the land with wisdom.',
        'The princess freed the dragon.',
        'All knights gathered for the battle.',
        'The treasure was hidden deep in the cave.',
        'A new day brings new hope.',
        'The fortress was never conquered.',
        'Bravery needs no audience.',
        'In darkness lies the truth.',
        'Higher, faster, stronger!',
        'Never give up, no matter what happens.',
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

// Characters associated with each skill level (QWERTY layout)
export const levelCharacters = {
    1: 'asdfghjkl '.split(''),
    2: 'qwertyuiop'.split(''),
    3: 'zxcvbnm'.split(''),
    4: 'thshchtion'.split(''), // combos, not unique chars — all already in levels 1-3
    5: '.,!?:;-ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
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
