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
    it('has 7 categories', () => {
        expect(Object.keys(ACHIEVEMENT_CATEGORIES)).toHaveLength(7);
    });

    it('includes all expected categories', () => {
        const expected = ['milestones', 'campaign', 'speed', 'accuracy', 'streak', 'combo', 'secret'];
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
    it('has at least 45 achievements', () => {
        expect(Object.keys(ACHIEVEMENTS).length).toBeGreaterThanOrEqual(45);
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
// Achievement Check Functions (with rebalanced thresholds)
// ============================================================
describe('Achievement check functions', () => {
    it('words_25 unlocks at 25 words', () => {
        expect(ACHIEVEMENTS.words_25.check({ totalWordsDefeated: 24 })).toBe(false);
        expect(ACHIEVEMENTS.words_25.check({ totalWordsDefeated: 25 })).toBe(true);
    });

    it('words_1000 unlocks at 1000 words', () => {
        expect(ACHIEVEMENTS.words_1000.check({ totalWordsDefeated: 999 })).toBe(false);
        expect(ACHIEVEMENTS.words_1000.check({ totalWordsDefeated: 1000 })).toBe(true);
    });

    it('rounds_10 unlocks at 10 rounds', () => {
        expect(ACHIEVEMENTS.rounds_10.check({ totalRounds: 9 })).toBe(false);
        expect(ACHIEVEMENTS.rounds_10.check({ totalRounds: 10 })).toBe(true);
    });

    it('wpm_30 unlocks at 30 WPM', () => {
        expect(ACHIEVEMENTS.wpm_30.check({ bestWPM: 29 })).toBe(false);
        expect(ACHIEVEMENTS.wpm_30.check({ bestWPM: 30 })).toBe(true);
    });

    it('wpm_80 unlocks at 80 WPM', () => {
        expect(ACHIEVEMENTS.wpm_80.check({ bestWPM: 79 })).toBe(false);
        expect(ACHIEVEMENTS.wpm_80.check({ bestWPM: 80 })).toBe(true);
    });

    it('accuracy_100 unlocks at 100%', () => {
        expect(ACHIEVEMENTS.accuracy_100.check({ bestAccuracy: 99 })).toBe(false);
        expect(ACHIEVEMENTS.accuracy_100.check({ bestAccuracy: 100 })).toBe(true);
    });

    it('streak_7 unlocks at 7-day streak', () => {
        expect(ACHIEVEMENTS.streak_7.check({ currentStreak: 6 })).toBe(false);
        expect(ACHIEVEMENTS.streak_7.check({ currentStreak: 7 })).toBe(true);
    });

    it('combo_60 unlocks at 60 combo', () => {
        expect(ACHIEVEMENTS.combo_60.check({ bestCombo: 59 })).toBe(false);
        expect(ACHIEVEMENTS.combo_60.check({ bestCombo: 60 })).toBe(true);
    });

    it('night_owl unlocks when played late', () => {
        expect(ACHIEVEMENTS.night_owl.check({ playedLateNight: false })).toBe(false);
        expect(ACHIEVEMENTS.night_owl.check({ playedLateNight: true })).toBe(true);
    });

    it('first_game unlocks after 1 round', () => {
        expect(ACHIEVEMENTS.first_game.check({ totalRounds: 0 })).toBe(false);
        expect(ACHIEVEMENTS.first_game.check({ totalRounds: 1 })).toBe(true);
    });

    it('daily_challenge_3 unlocks after 3 completed challenges', () => {
        expect(ACHIEVEMENTS.daily_challenge_3.check({ dailyChallengesCompleted: 2 })).toBe(false);
        expect(ACHIEVEMENTS.daily_challenge_3.check({ dailyChallengesCompleted: 3 })).toBe(true);
    });

    it('coins_500 unlocks at 500 total coins', () => {
        expect(ACHIEVEMENTS.coins_500.check({ totalCoinsEarned: 499 })).toBe(false);
        expect(ACHIEVEMENTS.coins_500.check({ totalCoinsEarned: 500 })).toBe(true);
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
        expect(Object.keys(grouped)).toHaveLength(7);
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
