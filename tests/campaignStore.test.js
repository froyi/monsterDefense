import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock supabase
vi.mock('../src/utils/supabaseClient', () => ({
    supabase: {
        from: () => ({
            select: () => ({ eq: () => ({ data: [], error: null }) }),
            insert: () => ({ data: null, error: null }),
            update: () => ({ eq: () => ({ data: null, error: null }) }),
            upsert: () => ({ data: null, error: null }),
        }),
        auth: { getSession: () => ({ data: { session: null } }) },
    },
}));

vi.mock('../src/utils/storage', () => ({
    getActiveProfile: vi.fn(() => 'test-profile-123'),
    loadRewards: vi.fn().mockResolvedValue({}),
    saveRewards: vi.fn(),
    loadSkills: vi.fn().mockResolvedValue({}),
    saveSkills: vi.fn(),
}));

import useCampaignStore from '../src/stores/useCampaignStore';

describe('useCampaignStore', () => {
    beforeEach(() => {
        useCampaignStore.getState().resetState();
    });

    // ────────────────────────────────────────────
    // Empty state
    // ────────────────────────────────────────────
    describe('initial state', () => {
        it('has progress for all 6 worlds', () => {
            const progress = useCampaignStore.getState().progress;
            const worldIds = Object.keys(progress);
            expect(worldIds).toHaveLength(6);
            expect(worldIds).toContain('village');
            expect(worldIds).toContain('forest');
            expect(worldIds).toContain('mountains');
            expect(worldIds).toContain('volcano');
            expect(worldIds).toContain('castle');
            expect(worldIds).toContain('dragon');
        });

        it('each world has 10 levels', () => {
            const progress = useCampaignStore.getState().progress;
            for (const worldId of Object.keys(progress)) {
                expect(Object.keys(progress[worldId])).toHaveLength(10);
            }
        });

        it('all levels start uncompleted with 0 stars', () => {
            const progress = useCampaignStore.getState().progress;
            for (const worldId of Object.keys(progress)) {
                for (let i = 1; i <= 10; i++) {
                    expect(progress[worldId][i].stars).toBe(0);
                    expect(progress[worldId][i].completed).toBe(false);
                }
            }
        });

        it('total stars starts at 0', () => {
            expect(useCampaignStore.getState().getTotalStars()).toBe(0);
        });

        it('completion starts at 0%', () => {
            expect(useCampaignStore.getState().getCompletionPercent()).toBe(0);
        });
    });

    // ────────────────────────────────────────────
    // completeLevel
    // ────────────────────────────────────────────
    describe('completeLevel', () => {
        it('marks a level as completed', () => {
            useCampaignStore.getState().completeLevel('village', 1, 2);
            expect(useCampaignStore.getState().isLevelCompleted('village', 1)).toBe(true);
        });

        it('records the star count', () => {
            useCampaignStore.getState().completeLevel('village', 1, 2);
            expect(useCampaignStore.getState().getLevelStars('village', 1)).toBe(2);
        });

        it('only upgrades stars, never downgrades', () => {
            useCampaignStore.getState().completeLevel('village', 1, 3);
            useCampaignStore.getState().completeLevel('village', 1, 1);
            expect(useCampaignStore.getState().getLevelStars('village', 1)).toBe(3);
        });

        it('upgrades stars to higher value', () => {
            useCampaignStore.getState().completeLevel('village', 1, 1);
            useCampaignStore.getState().completeLevel('village', 1, 3);
            expect(useCampaignStore.getState().getLevelStars('village', 1)).toBe(3);
        });

        it('handles completing multiple levels', () => {
            useCampaignStore.getState().completeLevel('village', 1, 3);
            useCampaignStore.getState().completeLevel('village', 2, 2);
            useCampaignStore.getState().completeLevel('village', 3, 1);
            expect(useCampaignStore.getState().getWorldStars('village')).toBe(6);
        });
    });

    // ────────────────────────────────────────────
    // Star counting
    // ────────────────────────────────────────────
    describe('star counting', () => {
        it('getWorldStars returns sum of stars for a world', () => {
            useCampaignStore.getState().completeLevel('village', 1, 3);
            useCampaignStore.getState().completeLevel('village', 2, 2);
            expect(useCampaignStore.getState().getWorldStars('village')).toBe(5);
        });

        it('getTotalStars sums across all worlds', () => {
            useCampaignStore.getState().completeLevel('village', 1, 3);
            useCampaignStore.getState().completeLevel('forest', 1, 2);
            expect(useCampaignStore.getState().getTotalStars()).toBe(5);
        });

        it('getWorldStars returns 0 for unknown world', () => {
            expect(useCampaignStore.getState().getWorldStars('nonexistent')).toBe(0);
        });
    });

    // ────────────────────────────────────────────
    // World unlocking
    // ────────────────────────────────────────────
    describe('isWorldUnlocked', () => {
        it('village is always unlocked', () => {
            expect(useCampaignStore.getState().isWorldUnlocked('village')).toBe(true);
        });

        it('forest is locked by default (needs 15 stars in village)', () => {
            expect(useCampaignStore.getState().isWorldUnlocked('forest')).toBe(false);
        });

        it('forest unlocks with 15 stars in village', () => {
            // Complete 5 levels with 3 stars each = 15 stars
            for (let i = 1; i <= 5; i++) {
                useCampaignStore.getState().completeLevel('village', i, 3);
            }
            expect(useCampaignStore.getState().isWorldUnlocked('forest')).toBe(true);
        });

        it('forest stays locked with 14 stars in village', () => {
            for (let i = 1; i <= 4; i++) {
                useCampaignStore.getState().completeLevel('village', i, 3);
            }
            useCampaignStore.getState().completeLevel('village', 5, 2); // 14 total
            expect(useCampaignStore.getState().isWorldUnlocked('forest')).toBe(false);
        });
    });

    // ────────────────────────────────────────────
    // Level playability
    // ────────────────────────────────────────────
    describe('isLevelPlayable', () => {
        it('village level 1 is always playable', () => {
            expect(useCampaignStore.getState().isLevelPlayable('village', 1)).toBe(true);
        });

        it('village level 2 requires level 1 completed', () => {
            expect(useCampaignStore.getState().isLevelPlayable('village', 2)).toBe(false);
            useCampaignStore.getState().completeLevel('village', 1, 1);
            expect(useCampaignStore.getState().isLevelPlayable('village', 2)).toBe(true);
        });

        it('forest level 1 requires forest to be unlocked', () => {
            expect(useCampaignStore.getState().isLevelPlayable('forest', 1)).toBe(false);
        });
    });

    // ────────────────────────────────────────────
    // Completion / progress
    // ────────────────────────────────────────────
    describe('completion', () => {
        it('getCompletionPercent calculates correctly', () => {
            // 60 levels total, 1 completed = ~1.67% → rounds to 2%
            useCampaignStore.getState().completeLevel('village', 1, 1);
            expect(useCampaignStore.getState().getCompletionPercent()).toBe(2);
        });

        it('getWorldCompletedCount counts completed levels', () => {
            useCampaignStore.getState().completeLevel('village', 1, 1);
            useCampaignStore.getState().completeLevel('village', 2, 2);
            expect(useCampaignStore.getState().getWorldCompletedCount('village')).toBe(2);
        });

        it('isCampaignComplete returns false initially', () => {
            expect(useCampaignStore.getState().isCampaignComplete()).toBe(false);
        });
    });

    // ────────────────────────────────────────────
    // getNextLevel
    // ────────────────────────────────────────────
    describe('getNextLevel', () => {
        it('returns village level 1 initially', () => {
            const next = useCampaignStore.getState().getNextLevel();
            expect(next).toEqual({ worldId: 'village', level: 1 });
        });

        it('advances to level 2 after completing level 1', () => {
            useCampaignStore.getState().completeLevel('village', 1, 1);
            const next = useCampaignStore.getState().getNextLevel();
            expect(next).toEqual({ worldId: 'village', level: 2 });
        });

        it('returns null when campaign is complete', () => {
            // Complete all 60 levels
            const worlds = ['village', 'forest', 'mountains', 'volcano', 'castle', 'dragon'];
            for (const world of worlds) {
                for (let i = 1; i <= 10; i++) {
                    useCampaignStore.getState().completeLevel(world, i, 3);
                }
            }
            expect(useCampaignStore.getState().getNextLevel()).toBeNull();
            expect(useCampaignStore.getState().isCampaignComplete()).toBe(true);
        });
    });

    // ────────────────────────────────────────────
    // resetState
    // ────────────────────────────────────────────
    describe('resetState', () => {
        it('clears all progress', () => {
            useCampaignStore.getState().completeLevel('village', 1, 3);
            useCampaignStore.getState().resetState();
            expect(useCampaignStore.getState().getTotalStars()).toBe(0);
            expect(useCampaignStore.getState().isLevelCompleted('village', 1)).toBe(false);
        });
    });
});
