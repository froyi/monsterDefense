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
