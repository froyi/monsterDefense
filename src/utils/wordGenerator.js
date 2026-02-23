// Adaptive word generator
// 70% normal words for current level, 30% targeting weak characters

import * as germanWords from './germanWords';
import * as englishWords from './englishWords';
import useRewardStore from '../stores/useRewardStore';

function getWordModule() {
    const layout = useRewardStore.getState().keyboardLayout || 'de';
    return layout === 'en' ? englishWords : germanWords;
}


/**
 * Calculate weakness weight for a character
 * weight = errorRate * 0.6 + slowRate * 0.4
 */
function getCharWeakness(charStats) {
    if (!charStats || charStats.count < 3) return 0;
    const errorRate = charStats.errors / charStats.count;
    const avgReaction = charStats.avgReactionMs || 500;
    // Normalize slow rate: anything above 800ms is considered slow
    const slowRate = Math.min(1, Math.max(0, (avgReaction - 300) / 700));
    return errorRate * 0.6 + slowRate * 0.4;
}

/**
 * Get the weakest characters from stats
 */
function getWeakCharacters(letterStats, topN = 5) {
    const entries = Object.entries(letterStats)
        .map(([char, stats]) => ({ char, weakness: getCharWeakness(stats) }))
        .filter(e => e.weakness > 0.1)
        .sort((a, b) => b.weakness - a.weakness);
    return entries.slice(0, topN).map(e => e.char);
}

/**
 * Score a word based on how many weak characters it contains
 */
function scoreWordForWeakness(word, weakChars) {
    let score = 0;
    const lower = word.toLowerCase();
    for (const char of lower) {
        if (weakChars.includes(char)) {
            score += 1;
        }
    }
    return score;
}

/**
 * Generate a word for a monster
 * @param {Object} letterStats - Per-character statistics
 * @param {number} skillLevel - Current max unlocked skill level (1-5)
 * @returns {string} A word to type
 */
export function generateWord(letterStats, skillLevel) {
    const level = Math.max(1, Math.min(5, skillLevel));
    const wordModule = getWordModule();
    const availableWords = wordModule.getWordsForLevel(level);

    if (!availableWords.length) return 'test';

    // 30% chance to target weak characters
    const targetWeakness = Math.random() < 0.3;

    if (targetWeakness && letterStats && Object.keys(letterStats).length > 0) {
        const weakChars = getWeakCharacters(letterStats);
        if (weakChars.length > 0) {
            // Score all words and pick from the top weak-character words
            const scored = availableWords
                .map(w => ({ word: w, score: scoreWordForWeakness(w, weakChars) }))
                .filter(w => w.score > 0)
                .sort((a, b) => b.score - a.score);

            if (scored.length > 0) {
                // Pick randomly from top 30% of weak-character words
                const topCount = Math.max(3, Math.floor(scored.length * 0.3));
                const top = scored.slice(0, topCount);
                return top[Math.floor(Math.random() * top.length)].word;
            }
        }
    }

    // 70% normal: pick a random word from available pool
    return availableWords[Math.floor(Math.random() * availableWords.length)];
}

/**
 * Generate words for an entire wave of monsters
 * @param {number} count - Number of words to generate
 * @param {Object} letterStats - Per-character statistics
 * @param {number} skillLevel - Current max skill level
 * @param {Set} [excludeWords] - Words already used (cross-wave dedup)
 */
export function generateWaveWords(count, letterStats, skillLevel, excludeWords) {
    const words = [];
    const used = new Set(excludeWords || []);
    for (let i = 0; i < count; i++) {
        let word;
        let attempts = 0;
        do {
            word = generateWord(letterStats, skillLevel);
            attempts++;
        } while (used.has(word) && attempts < 50);
        used.add(word);
        words.push(word);
    }
    return words;
}
