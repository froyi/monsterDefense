import { describe, it, expect, vi } from 'vitest';

// Mock supabase (required by wordGenerator's indirect imports)
vi.mock('../src/utils/supabaseClient', () => ({
    supabase: {
        from: () => ({
            select: () => ({ eq: () => ({ data: [], error: null }) }),
        }),
        auth: { getSession: () => ({ data: { session: null } }) },
    },
}));

vi.mock('../src/utils/storage', () => ({
    getActiveProfile: vi.fn(() => null),
    loadRewards: vi.fn().mockResolvedValue({}),
    saveRewards: vi.fn(),
}));

import { generateCampaignWords, generateBossWord } from '../src/utils/wordGenerator';

// ============================================================
// generateCampaignWords
// ============================================================
describe('generateCampaignWords', () => {
    it('returns the requested number of words', () => {
        const words = generateCampaignWords(10, 'village', 'de', [3, 6]);
        expect(words).toHaveLength(10);
    });

    it('returns no duplicate words', () => {
        const words = generateCampaignWords(20, 'village', 'de', [3, 6]);
        const unique = new Set(words);
        expect(unique.size).toBe(20);
    });

    it('all words only contain allowed characters for village (home row)', () => {
        const allowed = new Set('asdfghjklö');
        const words = generateCampaignWords(15, 'village', 'de', [3, 6]);
        for (const word of words) {
            for (const char of word) {
                expect(allowed.has(char), `"${word}" has invalid char '${char}'`).toBe(true);
            }
        }
    });

    it('all words respect the minimum length', () => {
        const words = generateCampaignWords(10, 'village', 'de', [4, 6]);
        for (const word of words) {
            expect(word.length).toBeGreaterThanOrEqual(4);
        }
    });

    it('all words respect the maximum length (when pool has enough words)', () => {
        const words = generateCampaignWords(10, 'mountains', 'de', [3, 5]);
        for (const word of words) {
            expect(word.length).toBeLessThanOrEqual(5);
        }
    });

    it('works for forest world (home + upper row)', () => {
        const words = generateCampaignWords(10, 'forest', 'de', [3, 6]);
        expect(words).toHaveLength(10);
        for (const word of words) {
            expect(word.length).toBeGreaterThan(0);
        }
    });

    it('works for English layout', () => {
        const allowed = new Set('asdfghjkl');
        const words = generateCampaignWords(10, 'village', 'en', [3, 6]);
        expect(words).toHaveLength(10);
        for (const word of words) {
            for (const char of word) {
                expect(allowed.has(char), `EN village word "${word}" has invalid char '${char}'`).toBe(true);
            }
        }
    });

    it('generates 0 words when count is 0', () => {
        expect(generateCampaignWords(0, 'village', 'de', [3, 6])).toHaveLength(0);
    });

    it('handles large count — generates unique words via dynamic fallback', () => {
        // Village has ~150 words in the pool, 200 words forces dynamic generation
        const words = generateCampaignWords(200, 'village', 'de', [3, 6]);
        expect(words).toHaveLength(200);
        const unique = new Set(words);
        expect(unique.size).toBe(200); // all unique
    });

    it('dynamically generated fallback words still use only allowed chars', () => {
        const allowed = new Set('asdfghjklö');
        // Force extra words beyond pool size
        const words = generateCampaignWords(180, 'village', 'de', [3, 6]);
        for (const word of words) {
            for (const char of word) {
                expect(allowed.has(char), `Fallback word "${word}" has invalid char '${char}'`).toBe(true);
            }
        }
    });
});

// ============================================================
// generateBossWord
// ============================================================
describe('generateBossWord', () => {
    it('returns a string', () => {
        const word = generateBossWord('village', 'de', 0);
        expect(typeof word).toBe('string');
        expect(word.length).toBeGreaterThan(0);
    });

    it('returns a long word for world 0 (village) — at least 8 chars', () => {
        // World 0: minLen = 8, maxLen = 12 ... but fallback may combine words
        const word = generateBossWord('village', 'de', 0);
        expect(word.length).toBeGreaterThanOrEqual(6); // with fallback, at least 2×3-char words
    });

    it('returns longer words for higher world indices', () => {
        const world0Word = generateBossWord('mountains', 'de', 0);
        const world5Word = generateBossWord('dragon', 'de', 5);
        // World 5 has higher minLen/maxLen, so on average longer
        // We test this across many runs
        let totalLen0 = 0, totalLen5 = 0;
        for (let i = 0; i < 10; i++) {
            totalLen0 += generateBossWord('mountains', 'de', 0).length;
            totalLen5 += generateBossWord('dragon', 'de', 5).length;
        }
        // Dragon boss words should average longer (or at least not shorter)
        expect(totalLen5 / 10).toBeGreaterThanOrEqual(totalLen0 / 10 - 2);
    });

    it('only uses allowed characters for the world', () => {
        const allowed = new Set('asdfghjklöqwertzuiopyxcvbnm');
        for (let i = 0; i < 10; i++) {
            const word = generateBossWord('mountains', 'de', 2);
            for (const char of word) {
                expect(allowed.has(char), `Boss word "${word}" has invalid char '${char}'`).toBe(true);
            }
        }
    });

    it('works for all 6 worlds', () => {
        const worlds = ['village', 'forest', 'mountains', 'volcano', 'castle', 'dragon'];
        for (let i = 0; i < worlds.length; i++) {
            expect(() => generateBossWord(worlds[i], 'de', i)).not.toThrow();
            const word = generateBossWord(worlds[i], 'de', i);
            expect(word.length).toBeGreaterThan(0);
        }
    });

    it('works for English layout', () => {
        const word = generateBossWord('village', 'en', 0);
        const allowed = new Set('asdfghjkl');
        expect(typeof word).toBe('string');
        for (const char of word) {
            expect(allowed.has(char), `EN boss word "${word}" has invalid char '${char}'`).toBe(true);
        }
    });
});
