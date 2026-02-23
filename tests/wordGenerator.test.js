import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock supabaseClient before importing modules that use it
vi.mock('../src/utils/supabaseClient', () => ({
    supabase: {
        from: () => ({
            select: () => ({ eq: () => ({ data: [], error: null }) }),
        }),
    },
}));

import { generateWord, generateWaveWords } from '../src/utils/wordGenerator';
import { getWordsForLevel } from '../src/utils/germanWords';

// ============================================================
// generateWord
// ============================================================
describe('generateWord', () => {
    it('returns a string', () => {
        const word = generateWord({}, 1);
        expect(typeof word).toBe('string');
        expect(word.length).toBeGreaterThan(0);
    });

    it('returns words from the correct level pool', () => {
        const availableWords = getWordsForLevel(1);
        for (let i = 0; i < 20; i++) {
            const word = generateWord({}, 1);
            expect(availableWords, `"${word}" should be in level 1 pool`).toContain(word);
        }
    });

    it('returns words from combined pool for higher levels', () => {
        const availableWords = getWordsForLevel(3);
        for (let i = 0; i < 20; i++) {
            const word = generateWord({}, 3);
            expect(availableWords).toContain(word);
        }
    });

    it('targets weak characters when letterStats are provided', () => {
        // Create stats where 'a' has high error rate
        const letters = {
            a: { count: 100, errors: 80, avgReactionMs: 800, streak: 0 },
        };

        // Run many times — at least some should contain 'a'
        let containsA = 0;
        for (let i = 0; i < 50; i++) {
            const word = generateWord(letters, 1);
            if (word.toLowerCase().includes('a')) containsA++;
        }
        // With 30% weakness targeting, 'a' words should appear frequently
        expect(containsA).toBeGreaterThan(5);
    });

    it('handles empty letterStats gracefully', () => {
        expect(() => generateWord({}, 1)).not.toThrow();
        expect(() => generateWord(null, 1)).not.toThrow();
    });
});

// ============================================================
// generateWaveWords
// ============================================================
describe('generateWaveWords', () => {
    it('generates the requested number of words', () => {
        const words = generateWaveWords(5, {}, 1);
        expect(words).toHaveLength(5);
    });

    it('generates unique words within a wave (with best effort)', () => {
        const words = generateWaveWords(10, {}, 3);
        const unique = new Set(words);
        // Most should be unique (at least 70% with large pool)
        expect(unique.size / words.length).toBeGreaterThanOrEqual(0.7);
    });

    it('generates 0 words when count is 0', () => {
        const words = generateWaveWords(0, {}, 1);
        expect(words).toHaveLength(0);
    });

    it('all words are from the correct level pool', () => {
        const words = generateWaveWords(10, {}, 2);
        const pool = getWordsForLevel(2);
        for (const word of words) {
            expect(pool).toContain(word);
        }
    });
});
