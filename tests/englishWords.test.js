import { describe, it, expect } from 'vitest';
import {
    wordsByLevel,
    getWordsForLevel,
    levelCharacters,
    allWords,
    getAllowedCharsForLevel,
} from '../src/utils/englishWords';

// ============================================================
// Character Set Definitions
// ============================================================
describe('englishWords – levelCharacters', () => {
    it('has 5 levels of character sets', () => {
        expect(Object.keys(levelCharacters)).toHaveLength(5);
    });

    it('level 1 is QWERTY home row (a s d f g h j k l)', () => {
        expect(levelCharacters[1]).toContain('a');
        expect(levelCharacters[1]).toContain('s');
        expect(levelCharacters[1]).toContain('d');
        expect(levelCharacters[1]).toContain('f');
        expect(levelCharacters[1]).toContain('g');
        expect(levelCharacters[1]).toContain('h');
        expect(levelCharacters[1]).toContain('j');
        expect(levelCharacters[1]).toContain('k');
        expect(levelCharacters[1]).toContain('l');
    });

    it('level 5 has uppercase and punctuation', () => {
        expect(levelCharacters[5]).toContain('A');
        expect(levelCharacters[5]).toContain('.');
        expect(levelCharacters[5]).toContain('!');
    });
});

// ============================================================
// STRICT: Every word uses ONLY characters allowed up to its level
// ============================================================
describe('englishWords – character correctness per level', () => {
    for (let level = 1; level <= 5; level++) {
        it(`Level ${level} words only use characters from levels 1-${level}`, () => {
            const allowed = getAllowedCharsForLevel(level);
            const words = wordsByLevel[level];
            const violations = [];

            for (const word of words) {
                for (const char of word) {
                    if (!allowed.has(char)) {
                        violations.push({ word, char });
                    }
                }
            }

            if (violations.length > 0) {
                const details = violations
                    .slice(0, 10)
                    .map(v => `"${v.word}" has '${v.char}'`)
                    .join(', ');
                expect.fail(
                    `Level ${level} has ${violations.length} violations: ${details}`
                );
            }
        });
    }

    it('Levels 1-4 contain NO uppercase letters', () => {
        for (let level = 1; level <= 4; level++) {
            for (const word of wordsByLevel[level]) {
                if (/[A-Z]/.test(word)) {
                    expect.fail(`Level ${level} word "${word}" has uppercase`);
                }
            }
        }
    });

    it('Levels 1-4 contain NO punctuation', () => {
        for (let level = 1; level <= 4; level++) {
            for (const word of wordsByLevel[level]) {
                if (/[.,!?:;\-]/.test(word)) {
                    expect.fail(`Level ${level} word "${word}" has punctuation`);
                }
            }
        }
    });

    it('Level 1 words use ONLY home row letters (a s d f g h j k l)', () => {
        const allowed = new Set('asdfghjkl'.split(''));
        for (const word of wordsByLevel[1]) {
            for (const char of word) {
                if (!allowed.has(char)) {
                    expect.fail(`Level 1 word "${word}" has '${char}'`);
                }
            }
        }
    });
});

// ============================================================
// Word List Structure
// ============================================================
describe('englishWords – structure', () => {
    it('has 5 levels', () => {
        expect(Object.keys(wordsByLevel)).toHaveLength(5);
    });

    it('each level has at least 20 words', () => {
        for (const [level, words] of Object.entries(wordsByLevel)) {
            expect(words.length, `Level ${level}`).toBeGreaterThanOrEqual(20);
        }
    });

    it('has substantial variety (> 200 total words)', () => {
        expect(allWords.length).toBeGreaterThan(200);
    });
});

// ============================================================
// getWordsForLevel
// ============================================================
describe('englishWords – getWordsForLevel', () => {
    it('returns only level 1 words for level 1', () => {
        expect(getWordsForLevel(1)).toEqual(wordsByLevel[1]);
    });

    it('returns all words for level 5', () => {
        expect(getWordsForLevel(5)).toEqual(allWords);
    });

    it('returns empty for level 0', () => {
        expect(getWordsForLevel(0)).toHaveLength(0);
    });
});
