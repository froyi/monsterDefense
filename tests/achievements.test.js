import { describe, it, expect } from 'vitest';
import {
    ACHIEVEMENTS,
    ACHIEVEMENT_CATEGORIES,
    getAchievementsByCategory,
    TOTAL_ACHIEVEMENTS,
} from '../src/utils/achievements';

// ============================================================
// Achievement Definitions
// ============================================================
describe('ACHIEVEMENT_CATEGORIES', () => {
    it('has 6 categories', () => {
        expect(Object.keys(ACHIEVEMENT_CATEGORIES)).toHaveLength(6);
    });

    it('includes all expected categories', () => {
        const expected = ['milestones', 'speed', 'accuracy', 'streak', 'combo', 'secret'];
        for (const cat of expected) {
            expect(ACHIEVEMENT_CATEGORIES[cat]).toBeDefined();
        }
    });

    it('each category has name, icon, and description', () => {
        for (const [key, cat] of Object.entries(ACHIEVEMENT_CATEGORIES)) {
            expect(cat.name, `${key}.name`).toBeTruthy();
            expect(cat.icon, `${key}.icon`).toBeTruthy();
            expect(cat.description, `${key}.description`).toBeTruthy();
        }
    });
});

describe('ACHIEVEMENTS', () => {
    it('has at least 40 achievements', () => {
        expect(Object.keys(ACHIEVEMENTS).length).toBeGreaterThanOrEqual(40);
    });

    it('TOTAL_ACHIEVEMENTS matches actual count', () => {
        expect(TOTAL_ACHIEVEMENTS).toBe(Object.keys(ACHIEVEMENTS).length);
    });

    it('every achievement has required fields', () => {
        for (const [key, a] of Object.entries(ACHIEVEMENTS)) {
            expect(a.category, `${key}.category`).toBeTruthy();
            expect(a.name, `${key}.name`).toBeTruthy();
            expect(a.description, `${key}.description`).toBeTruthy();
            expect(a.icon, `${key}.icon`).toBeTruthy();
            expect(typeof a.check, `${key}.check`).toBe('function');
        }
    });

    it('every achievement category is a valid category', () => {
        const validCategories = Object.keys(ACHIEVEMENT_CATEGORIES);
        for (const [key, a] of Object.entries(ACHIEVEMENTS)) {
            expect(validCategories, `${key} has invalid category "${a.category}"`).toContain(a.category);
        }
    });

    it('secret achievements have secret: true', () => {
        const secretAchievements = Object.entries(ACHIEVEMENTS)
            .filter(([, a]) => a.category === 'secret');
        expect(secretAchievements.length).toBeGreaterThan(0);
        for (const [key, a] of secretAchievements) {
            expect(a.secret, `Secret achievement ${key} should have secret: true`).toBe(true);
        }
    });
});

// ============================================================
// Achievement Check Functions
// ============================================================
describe('Achievement check functions', () => {
    it('words_10 unlocks at 10 words', () => {
        expect(ACHIEVEMENTS.words_10.check({ totalWordsDefeated: 9 })).toBe(false);
        expect(ACHIEVEMENTS.words_10.check({ totalWordsDefeated: 10 })).toBe(true);
    });

    it('wpm_25 unlocks at 25 WPM', () => {
        expect(ACHIEVEMENTS.wpm_25.check({ bestWPM: 24 })).toBe(false);
        expect(ACHIEVEMENTS.wpm_25.check({ bestWPM: 25 })).toBe(true);
    });

    it('accuracy_100 unlocks at 100%', () => {
        expect(ACHIEVEMENTS.accuracy_100.check({ bestAccuracy: 99 })).toBe(false);
        expect(ACHIEVEMENTS.accuracy_100.check({ bestAccuracy: 100 })).toBe(true);
    });

    it('streak_7 unlocks at 7-day streak', () => {
        expect(ACHIEVEMENTS.streak_7.check({ currentStreak: 6 })).toBe(false);
        expect(ACHIEVEMENTS.streak_7.check({ currentStreak: 7 })).toBe(true);
    });

    it('combo_50 unlocks at 50 combo', () => {
        expect(ACHIEVEMENTS.combo_50.check({ bestCombo: 49 })).toBe(false);
        expect(ACHIEVEMENTS.combo_50.check({ bestCombo: 50 })).toBe(true);
    });

    it('night_owl unlocks when played late', () => {
        expect(ACHIEVEMENTS.night_owl.check({ playedLateNight: false })).toBe(false);
        expect(ACHIEVEMENTS.night_owl.check({ playedLateNight: true })).toBe(true);
    });

    it('first_game unlocks after 1 round', () => {
        expect(ACHIEVEMENTS.first_game.check({ totalRounds: 0 })).toBe(false);
        expect(ACHIEVEMENTS.first_game.check({ totalRounds: 1 })).toBe(true);
    });

    it('daily_challenge_1 unlocks after 1 completed challenge', () => {
        expect(ACHIEVEMENTS.daily_challenge_1.check({ dailyChallengesCompleted: 0 })).toBe(false);
        expect(ACHIEVEMENTS.daily_challenge_1.check({ dailyChallengesCompleted: 1 })).toBe(true);
    });

    it('skills_all unlocks with 7 skills', () => {
        expect(ACHIEVEMENTS.skills_all.check({ unlockedSkills: 6 })).toBe(false);
        expect(ACHIEVEMENTS.skills_all.check({ unlockedSkills: 7 })).toBe(true);
    });

    it('all check functions handle missing stats gracefully', () => {
        for (const [key, a] of Object.entries(ACHIEVEMENTS)) {
            expect(() => a.check({}), `${key}.check({}) should not throw`).not.toThrow();
        }
    });
});

// ============================================================
// getAchievementsByCategory
// ============================================================
describe('getAchievementsByCategory', () => {
    it('returns all categories', () => {
        const grouped = getAchievementsByCategory();
        expect(Object.keys(grouped)).toHaveLength(6);
    });

    it('every achievement appears in exactly one category', () => {
        const grouped = getAchievementsByCategory();
        let total = 0;
        for (const achievements of Object.values(grouped)) {
            total += achievements.length;
        }
        expect(total).toBe(TOTAL_ACHIEVEMENTS);
    });

    it('each item has a key property', () => {
        const grouped = getAchievementsByCategory();
        for (const [cat, achievements] of Object.entries(grouped)) {
            for (const a of achievements) {
                expect(a.key, `Achievement in ${cat} should have a key`).toBeTruthy();
            }
        }
    });
});
