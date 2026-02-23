import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DAILY_CHALLENGES, getTodaysChallenge, getTodayDateString } from '../src/utils/dailyChallenges';

// ============================================================
// Challenge Definitions
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

    it('rewards are between 20 and 50', () => {
        for (const c of DAILY_CHALLENGES) {
            expect(c.reward, `${c.key}.reward`).toBeGreaterThanOrEqual(20);
            expect(c.reward, `${c.key}.reward`).toBeLessThanOrEqual(50);
        }
    });
});

// ============================================================
// Challenge Progress Functions
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
        expect(c.getProgress(roundStats)).toBe(1); // 25 WPM >= 20, 96% >= 90
        expect(c.getProgress({ ...roundStats, wpm: 15 })).toBe(0); // WPM too low
        expect(c.getProgress({ ...roundStats, accuracy: 85 })).toBe(0); // accuracy too low
    });

    it('improve_wpm checks against average', () => {
        const c = DAILY_CHALLENGES.find(c => c.key === 'improve_wpm');
        expect(c.getProgress(roundStats)).toBe(1); // 25 > 20
        expect(c.getProgress({ ...roundStats, wpm: 15 })).toBe(0); // 15 < 20
    });

    it('survivor checks low HP win', () => {
        const c = DAILY_CHALLENGES.find(c => c.key === 'survivor');
        expect(c.getProgress({ ...roundStats, castleHp: 30 })).toBe(1);
        expect(c.getProgress({ ...roundStats, castleHp: 100 })).toBe(0);
        expect(c.getProgress({ ...roundStats, castleHp: 0 })).toBe(0); // dead = no survivor
    });
});

// ============================================================
// getTodaysChallenge
// ============================================================
describe('getTodaysChallenge', () => {
    it('returns a valid challenge', () => {
        const challenge = getTodaysChallenge();
        expect(challenge).toBeTruthy();
        expect(challenge.key).toBeTruthy();
        expect(challenge.name).toBeTruthy();
    });

    it('returns the same challenge when called multiple times on the same day', () => {
        const c1 = getTodaysChallenge();
        const c2 = getTodaysChallenge();
        expect(c1.key).toBe(c2.key);
    });

    it('returns a challenge from the pool', () => {
        const challenge = getTodaysChallenge();
        const found = DAILY_CHALLENGES.find(c => c.key === challenge.key);
        expect(found).toBeTruthy();
    });
});

// ============================================================
// getTodayDateString
// ============================================================
describe('getTodayDateString', () => {
    it('returns a YYYY-MM-DD string', () => {
        const dateStr = getTodayDateString();
        expect(dateStr).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('matches today\'s date', () => {
        const today = new Date();
        const expected = today.toISOString().split('T')[0];
        expect(getTodayDateString()).toBe(expected);
    });
});
