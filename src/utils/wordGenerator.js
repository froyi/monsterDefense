// Adaptive word generator – supports both campaign and legacy modes
import * as germanWords from './germanWords';
import * as englishWords from './englishWords';
import { getWorldChars } from './campaignData';
import useRewardStore from '../stores/useRewardStore';

function getWordModule() {
    const layout = useRewardStore.getState().keyboardLayout || 'de';
    return layout === 'en' ? englishWords : germanWords;
}

/**
 * Generate words for a campaign level.
 * Picks words that only use the allowed characters for the given world.
 * @param {number} count - Number of words to generate
 * @param {string} worldId - World identifier (e.g. 'village', 'forest')
 * @param {string} layout - 'de' or 'en'
 * @param {number[]} wordLengthRange - [min, max] character length
 * @returns {string[]} Array of unique words
 */
export function generateCampaignWords(count, worldId, layout = 'de', wordLengthRange = [3, 8]) {
    const wordModule = layout === 'en' ? englishWords : germanWords;
    const allowedChars = new Set(getWorldChars(worldId, layout).split(''));
    const [minLen, maxLen] = wordLengthRange;

    // Gather ALL words from all levels, then filter by allowed chars and length
    const allWordPool = wordModule.allWords || [];
    const filtered = allWordPool.filter(word => {
        if (word.length < minLen || word.length > maxLen) return false;
        for (const char of word) {
            if (!allowedChars.has(char)) return false;
        }
        return true;
    });

    const words = [];
    const used = new Set();

    for (let i = 0; i < count; i++) {
        let word;
        let attempts = 0;
        const pool = filtered.length > 0 ? filtered : allWordPool;
        do {
            word = pool[Math.floor(Math.random() * pool.length)];
            attempts++;
        } while (used.has(word) && attempts < 50);
        used.add(word);
        words.push(word);
    }

    return words;
}

/**
 * Generate a single long word for boss monsters.
 * Tries to find the longest available words fitting the world's character set.
 * @param {string} worldId - World identifier
 * @param {string} layout - 'de' or 'en'
 * @param {number} worldIndex - 0-5, used to scale boss word length
 * @returns {string} A long word for the boss
 */
export function generateBossWord(worldId, layout = 'de', worldIndex = 0) {
    const wordModule = layout === 'en' ? englishWords : germanWords;
    const allowedChars = new Set(getWorldChars(worldId, layout).split(''));
    const allWordPool = wordModule.allWords || [];

    // Boss word length scales with world: world 1 = 8-12, world 6 = 12-18
    const minLen = 8 + worldIndex;
    const maxLen = 12 + worldIndex * 2;

    // Find long words that fit the world's character set
    const longWords = allWordPool.filter(word => {
        if (word.length < minLen || word.length > maxLen) return false;
        for (const char of word) {
            if (!allowedChars.has(char)) return false;
        }
        return true;
    });

    // If we found long words, pick a random one
    if (longWords.length > 0) {
        return longWords[Math.floor(Math.random() * longWords.length)];
    }

    // Fallback: concatenate two shorter words to make a long compound word
    const mediumWords = allWordPool.filter(word => {
        if (word.length < 4 || word.length > 8) return false;
        for (const char of word) {
            if (!allowedChars.has(char)) return false;
        }
        return true;
    });

    if (mediumWords.length >= 2) {
        const w1 = mediumWords[Math.floor(Math.random() * mediumWords.length)];
        let w2;
        do {
            w2 = mediumWords[Math.floor(Math.random() * mediumWords.length)];
        } while (w2 === w1);
        return w1 + w2;
    }

    // Last resort: pick the longest available word
    const sorted = allWordPool
        .filter(w => [...w].every(c => allowedChars.has(c)))
        .sort((a, b) => b.length - a.length);
    return sorted[0] || 'bossgegner';
}

/**
 * Legacy: Generate words for the old wave-based system (kept for test compatibility)
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

export function generateWord(letterStats, skillLevel) {
    const level = Math.max(1, Math.min(5, skillLevel));
    const wordModule = getWordModule();
    const availableWords = wordModule.getWordsForLevel(level);
    if (!availableWords.length) return 'test';
    return availableWords[Math.floor(Math.random() * availableWords.length)];
}
