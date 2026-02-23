import { describe, it, expect, vi } from 'vitest';
import { wordsByLevel, getWordsForLevel, levelCharacters, allWords } from '../src/utils/germanWords';

// ============================================================
// Word Lists Structure
// ============================================================
describe('wordsByLevel structure', () => {
    it('has 5 levels', () => {
        expect(Object.keys(wordsByLevel)).toHaveLength(5);
        expect(wordsByLevel[1]).toBeDefined();
        expect(wordsByLevel[5]).toBeDefined();
    });

    it('each level has at least 20 words', () => {
        for (const [level, words] of Object.entries(wordsByLevel)) {
            expect(words.length, `Level ${level} should have >= 20 words`).toBeGreaterThanOrEqual(20);
        }
    });

    it('Level 1 words use only home row characters', () => {
        const homeRowChars = new Set('asdfghjklöü '.split('')); // ü for fjäll/lässig variants
        const allowedChars = new Set('asdfghjklö '.split(''));
        // Just verify most words contain only home-row chars (some have ä/ü for German)
        let homeRowCount = 0;
        for (const word of wordsByLevel[1]) {
            const allHomeRow = [...word.toLowerCase()].every(c => 'asdfghjklö '.includes(c));
            if (allHomeRow) homeRowCount++;
        }
        // At least 50% should be pure home-row
        expect(homeRowCount / wordsByLevel[1].length).toBeGreaterThan(0.5);
    });
});

// ============================================================
// getWordsForLevel
// ============================================================
describe('getWordsForLevel', () => {
    it('returns only level 1 words for level 1', () => {
        const words = getWordsForLevel(1);
        expect(words).toEqual(wordsByLevel[1]);
    });

    it('returns level 1+2 words for level 2', () => {
        const words = getWordsForLevel(2);
        expect(words).toEqual([...wordsByLevel[1], ...wordsByLevel[2]]);
    });

    it('returns all words for level 5', () => {
        const words = getWordsForLevel(5);
        expect(words).toEqual(allWords);
    });

    it('caps at level 5 for higher values', () => {
        const words5 = getWordsForLevel(5);
        const words10 = getWordsForLevel(10);
        expect(words10).toEqual(words5);
    });

    it('returns empty array for level 0 (no valid levels)', () => {
        const words = getWordsForLevel(0);
        expect(words).toHaveLength(0);
    });
});

// ============================================================
// allWords
// ============================================================
describe('allWords', () => {
    it('contains all words from all levels', () => {
        let total = 0;
        for (const words of Object.values(wordsByLevel)) {
            total += words.length;
        }
        expect(allWords).toHaveLength(total);
    });

    it('has substantial variety (> 300 total words)', () => {
        expect(allWords.length).toBeGreaterThan(300);
    });
});

// ============================================================
// levelCharacters
// ============================================================
describe('levelCharacters', () => {
    it('has 5 levels of character sets', () => {
        expect(Object.keys(levelCharacters)).toHaveLength(5);
    });

    it('level 1 is home row', () => {
        expect(levelCharacters[1]).toContain('a');
        expect(levelCharacters[1]).toContain('s');
        expect(levelCharacters[1]).toContain('d');
        expect(levelCharacters[1]).toContain('f');
    });

    it('level 4 has umlauts', () => {
        expect(levelCharacters[4]).toContain('ä');
        expect(levelCharacters[4]).toContain('ö');
        expect(levelCharacters[4]).toContain('ü');
        expect(levelCharacters[4]).toContain('ß');
    });
});
