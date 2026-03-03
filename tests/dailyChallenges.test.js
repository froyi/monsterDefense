import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    DAILY_CHALLENGES,
    CHALLENGES_BY_DIFFICULTY,
    ALL_COMPLETE_BONUS,
    getTodaysChallenges,
    getTodaysChallenge,
    getTodayDateString,
} from '../src/utils/dailyChallenges';

// ============================================================
// Pool validation
// ============================================================
describe('DAILY_CHALLENGES pool', () => {
    it('has exactly 20 challenges', () => {
        expect(DAILY_CHALLENGES).toHaveLength(20);
    });

    it('every challenge has required fields', () => {
        for (const c of DAILY_CHALLENGES) {
            expect(c.key, 'key').toBeTruthy();
            expect(c.name, 'name').toBeTruthy();
            expect(c.description, 'description').toBeTruthy();
            expect(c.icon, 'icon').toBeTruthy();
            expect(c.difficulty, `${c.key}.difficulty`).toBeTruthy();
            expect(c.target, `${c.key}.target`).toBeGreaterThan(0);
            expect(c.reward, `${c.key}.reward`).toBeGreaterThan(0);
            expect(typeof c.getProgress, `${c.key}.getProgress`).toBe('function');
            expect(['single_round', 'cumulative', 'threshold'], `${c.key}.type`).toContain(c.type);
        }
    });

    it('all keys are unique', () => {
        const keys = DAILY_CHALLENGES.map(c => c.key);
        expect(new Set(keys).size).toBe(keys.length);
    });

    it('difficulty values are only easy / medium / hard', () => {
        for (const c of DAILY_CHALLENGES) {
            expect(['easy', 'medium', 'hard'], `${c.key}.difficulty`).toContain(c.difficulty);
        }
    });

    it('pool has at least 1 easy, medium, and hard challenge', () => {
        expect(CHALLENGES_BY_DIFFICULTY.easy.length).toBeGreaterThanOrEqual(1);
        expect(CHALLENGES_BY_DIFFICULTY.medium.length).toBeGreaterThanOrEqual(1);
        expect(CHALLENGES_BY_DIFFICULTY.hard.length).toBeGreaterThanOrEqual(1);
    });

    it('pool has exactly 6 easy, 9 medium, 5 hard challenges', () => {
        expect(CHALLENGES_BY_DIFFICULTY.easy.length).toBe(6);
        expect(CHALLENGES_BY_DIFFICULTY.medium.length).toBe(9);
        expect(CHALLENGES_BY_DIFFICULTY.hard.length).toBe(5);
    });

    it('rewards match difficulty tier', () => {
        for (const c of DAILY_CHALLENGES) {
            if (c.difficulty === 'easy') expect(c.reward).toBe(25);
            if (c.difficulty === 'medium') expect(c.reward).toBe(40);
            if (c.difficulty === 'hard') expect(c.reward).toBe(60);
        }
    });
});

// ============================================================
// ALL_COMPLETE_BONUS
// ============================================================
describe('ALL_COMPLETE_BONUS', () => {
    it('has coins and card flag', () => {
        expect(ALL_COMPLETE_BONUS.coins).toBeGreaterThan(0);
        expect(ALL_COMPLETE_BONUS.card).toBe(true);
    });
});

// ============================================================
// getTodaysChallenges
// ============================================================
describe('getTodaysChallenges', () => {
    it('returns an object with easy, medium, hard keys', () => {
        const result = getTodaysChallenges();
        expect(result).toHaveProperty('easy');
        expect(result).toHaveProperty('medium');
        expect(result).toHaveProperty('hard');
    });

    it('each returned challenge has the correct difficulty', () => {
        const { easy, medium, hard } = getTodaysChallenges();
        expect(easy.difficulty).toBe('easy');
        expect(medium.difficulty).toBe('medium');
        expect(hard.difficulty).toBe('hard');
    });

    it('returns the same challenges when called multiple times on the same day', () => {
        const r1 = getTodaysChallenges();
        const r2 = getTodaysChallenges();
        expect(r1.easy.key).toBe(r2.easy.key);
        expect(r1.medium.key).toBe(r2.medium.key);
        expect(r1.hard.key).toBe(r2.hard.key);
    });

    it('all 3 returned challenges come from the pool', () => {
        const { easy, medium, hard } = getTodaysChallenges();
        expect(DAILY_CHALLENGES.find(c => c.key === easy.key)).toBeTruthy();
        expect(DAILY_CHALLENGES.find(c => c.key === medium.key)).toBeTruthy();
        expect(DAILY_CHALLENGES.find(c => c.key === hard.key)).toBeTruthy();
    });
});

// ============================================================
// getTodaysChallenge (legacy)
// ============================================================
describe('getTodaysChallenge (legacy)', () => {
    it('returns a valid easy challenge', () => {
        const c = getTodaysChallenge();
        expect(c).toBeTruthy();
        expect(c.key).toBeTruthy();
        expect(c.difficulty).toBe('easy');
    });
});

// ============================================================
// Challenge getProgress functions
// ============================================================
describe('Challenge getProgress functions', () => {
    const roundStats = {
        wordsCompleted: 12,
        accuracy: 96,
        wpm: 25,
        maxCombo: 18,
        score: 450,
        castleHp: 100,
        wave: 3,
        averageWPM: 20,
    };

    it('words_15 tracks wordsCompleted', () => {
        const c = DAILY_CHALLENGES.find(c => c.key === 'words_15');
        expect(c.getProgress(roundStats)).toBe(12);
    });

    it('accuracy_95 tracks accuracy', () => {
        const c = DAILY_CHALLENGES.find(c => c.key === 'accuracy_95');
        expect(c.getProgress(roundStats)).toBe(96);
    });

    it('wpm_20 tracks WPM', () => {
        const c = DAILY_CHALLENGES.find(c => c.key === 'wpm_20');
        expect(c.getProgress(roundStats)).toBe(25);
    });

    it('no_damage returns 1 when castle has full HP', () => {
        const c = DAILY_CHALLENGES.find(c => c.key === 'no_damage');
        expect(c.getProgress(roundStats)).toBe(1);
        expect(c.getProgress({ ...roundStats, castleHp: 50 })).toBe(0);
    });

    it('play_3_rounds always returns 1', () => {
        const c = DAILY_CHALLENGES.find(c => c.key === 'play_3_rounds');
        expect(c.getProgress(roundStats)).toBe(1);
    });

    it('fast_and_accurate checks both WPM and accuracy', () => {
        const c = DAILY_CHALLENGES.find(c => c.key === 'fast_and_accurate');
        expect(c.getProgress(roundStats)).toBe(1);
        expect(c.getProgress({ ...roundStats, wpm: 15 })).toBe(0);
        expect(c.getProgress({ ...roundStats, accuracy: 85 })).toBe(0);
    });

    it('improve_wpm checks against average', () => {
        const c = DAILY_CHALLENGES.find(c => c.key === 'improve_wpm');
        expect(c.getProgress(roundStats)).toBe(1);
        expect(c.getProgress({ ...roundStats, wpm: 15 })).toBe(0);
    });

    it('survivor checks low HP win', () => {
        const c = DAILY_CHALLENGES.find(c => c.key === 'survivor');
        expect(c.getProgress({ ...roundStats, castleHp: 30 })).toBe(1);
        expect(c.getProgress({ ...roundStats, castleHp: 100 })).toBe(0);
        expect(c.getProgress({ ...roundStats, castleHp: 0 })).toBe(0);
    });
});

// ============================================================
// getTodayDateString
// ============================================================
describe('getTodayDateString', () => {
    it('returns a YYYY-MM-DD string', () => {
        expect(getTodayDateString()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('matches today\'s date', () => {
        const expected = new Date().toISOString().split('T')[0];
        expect(getTodayDateString()).toBe(expected);
    });
});
