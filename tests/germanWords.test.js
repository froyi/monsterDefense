import { describe, it, expect } from 'vitest';
import {
    wordsByLevel,
    getWordsForLevel,
    levelCharacters,
    allWords,
    getAllowedCharsForLevel,
} from '../src/utils/germanWords';

// ============================================================
// Character Set Definitions
// ============================================================
describe('levelCharacters', () => {
    it('has 5 levels of character sets', () => {
        expect(Object.keys(levelCharacters)).toHaveLength(5);
    });

    it('level 1 is home row (a s d f g h j k l ö)', () => {
        const expected = 'asdfghjklö '.split('');
        expect(levelCharacters[1]).toEqual(expected);
    });

    it('level 2 is upper row (q w e r t z u i o p)', () => {
        expect(levelCharacters[2]).toContain('q');
        expect(levelCharacters[2]).toContain('w');
        expect(levelCharacters[2]).toContain('e');
        expect(levelCharacters[2]).toContain('r');
        expect(levelCharacters[2]).toContain('t');
    });

    it('level 3 is lower row (y x c v b n m)', () => {
        expect(levelCharacters[3]).toContain('y');
        expect(levelCharacters[3]).toContain('x');
        expect(levelCharacters[3]).toContain('b');
        expect(levelCharacters[3]).toContain('n');
        expect(levelCharacters[3]).toContain('m');
    });

    it('level 4 has umlauts (ä ö ü ß)', () => {
        expect(levelCharacters[4]).toContain('ä');
        expect(levelCharacters[4]).toContain('ö');
        expect(levelCharacters[4]).toContain('ü');
        expect(levelCharacters[4]).toContain('ß');
    });

    it('level 5 has uppercase and punctuation', () => {
        expect(levelCharacters[5]).toContain('A');
        expect(levelCharacters[5]).toContain('Z');
        expect(levelCharacters[5]).toContain('.');
        expect(levelCharacters[5]).toContain('!');
        expect(levelCharacters[5]).toContain('?');
    });
});

// ============================================================
// STRICT: Every word uses ONLY characters allowed up to its level
// ============================================================
describe('Word-character correctness per level', () => {
    for (let level = 1; level <= 5; level++) {
        it(`Level ${level} words only use characters from levels 1-${level}`, () => {
            const allowed = getAllowedCharsForLevel(level);
            const words = wordsByLevel[level];
            const violations = [];

            for (const word of words) {
                for (const char of word) {
                    if (!allowed.has(char)) {
                        violations.push({ word, char, charCode: char.charCodeAt(0) });
                    }
                }
            }

            if (violations.length > 0) {
                const details = violations
                    .slice(0, 10)
                    .map(v => `"${v.word}" has '${v.char}'`)
                    .join(', ');
                expect.fail(
                    `Level ${level} has ${violations.length} character violations: ${details}`
                );
            }
        });
    }

    it('Levels 1-4 contain NO uppercase letters', () => {
        for (let level = 1; level <= 4; level++) {
            for (const word of wordsByLevel[level]) {
                const hasUppercase = /[A-ZÄÖÜ]/.test(word);
                if (hasUppercase) {
                    expect.fail(
                        `Level ${level} word "${word}" contains uppercase — capitals only allowed at Level 5`
                    );
                }
            }
        }
    });

    it('Levels 1-4 contain NO punctuation', () => {
        for (let level = 1; level <= 4; level++) {
            for (const word of wordsByLevel[level]) {
                const hasPunctuation = /[.,!?:;\-]/.test(word);
                if (hasPunctuation) {
                    expect.fail(
                        `Level ${level} word "${word}" contains punctuation — only allowed at Level 5`
                    );
                }
            }
        }
    });

    it('Level 1 words use ONLY home row letters (a s d f g h j k l ö)', () => {
        const allowed = new Set('asdfghjklö'.split(''));
        for (const word of wordsByLevel[1]) {
            for (const char of word) {
                if (!allowed.has(char)) {
                    expect.fail(
                        `Level 1 word "${word}" has '${char}' — only asdfghjklö allowed`
                    );
                }
            }
        }
    });

    it('Level 2 words use only home + upper row letters (no b,n,m,c,v,x,y,ä,ü,ß)', () => {
        const forbidden = new Set('yxcvbnmäüßYXCVBNMÄÜ'.split(''));
        for (const word of wordsByLevel[2]) {
            for (const char of word) {
                if (forbidden.has(char)) {
                    expect.fail(
                        `Level 2 word "${word}" has '${char}' — lower row and umlauts not allowed`
                    );
                }
            }
        }
    });

    it('Level 3 words use no umlauts (ä ü ß, but ö is allowed from level 1)', () => {
        const forbidden = new Set('äüßÄÜ'.split(''));
        for (const word of wordsByLevel[3]) {
            for (const char of word) {
                if (forbidden.has(char)) {
                    expect.fail(
                        `Level 3 word "${word}" has '${char}' — umlauts ä/ü/ß only at Level 4+`
                    );
                }
            }
        }
    });
});

// ============================================================
// Word List Structure
// ============================================================
describe('wordsByLevel structure', () => {
    it('has 5 levels', () => {
        expect(Object.keys(wordsByLevel)).toHaveLength(5);
    });

    it('each level has at least 30 words', () => {
        for (const [level, words] of Object.entries(wordsByLevel)) {
            expect(words.length, `Level ${level} should have >= 30 words`).toBeGreaterThanOrEqual(30);
        }
    });

    it('has substantial variety (> 300 total words)', () => {
        expect(allWords.length).toBeGreaterThan(300);
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
// getAllowedCharsForLevel
// ============================================================
describe('getAllowedCharsForLevel', () => {
    it('level 1 allows only home row + space', () => {
        const chars = getAllowedCharsForLevel(1);
        expect(chars.has('a')).toBe(true);
        expect(chars.has('s')).toBe(true);
        expect(chars.has('ö')).toBe(true);
        expect(chars.has('e')).toBe(false); // upper row
        expect(chars.has('b')).toBe(false); // lower row
    });

    it('level 2 adds upper row', () => {
        const chars = getAllowedCharsForLevel(2);
        expect(chars.has('a')).toBe(true); // still has level 1
        expect(chars.has('e')).toBe(true);
        expect(chars.has('w')).toBe(true);
        expect(chars.has('b')).toBe(false); // lower row, level 3
    });

    it('level 3 adds lower row', () => {
        const chars = getAllowedCharsForLevel(3);
        expect(chars.has('b')).toBe(true);
        expect(chars.has('n')).toBe(true);
        expect(chars.has('m')).toBe(true);
        expect(chars.has('ä')).toBe(false); // umlauts, level 4
    });

    it('level 4 adds umlauts', () => {
        const chars = getAllowedCharsForLevel(4);
        expect(chars.has('ä')).toBe(true);
        expect(chars.has('ü')).toBe(true);
        expect(chars.has('ß')).toBe(true);
        expect(chars.has('A')).toBe(false); // capitals, level 5
    });

    it('level 5 adds capitals and punctuation', () => {
        const chars = getAllowedCharsForLevel(5);
        expect(chars.has('A')).toBe(true);
        expect(chars.has('Z')).toBe(true);
        expect(chars.has('.')).toBe(true);
        expect(chars.has('!')).toBe(true);
    });
});
