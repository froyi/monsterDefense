import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock supabase and storage
vi.mock('../src/utils/supabaseClient', () => ({
    supabase: {
        from: () => ({
            select: () => ({ eq: () => ({ data: [], error: null }) }),
        }),
    },
}));
vi.mock('../src/utils/storage', () => ({
    loadRewards: vi.fn(() => Promise.resolve(null)),
    saveRewards: vi.fn(),
}));

import useRewardStore from '../src/stores/useRewardStore';

describe('useRewardStore', () => {
    beforeEach(() => {
        useRewardStore.setState({
            coins: 500,
            totalCoinsEarned: 500,
            ownedItems: [],
            activeMonsterSkin: null,
            activeCastleSkin: null,
            activeEffect: null,
            activeBackground: null,
            lastDailyChest: null,
            streak: 0,
            lastPlayDate: null,
        });
    });

    describe('buyItem', () => {
        it('deducts coins on purchase', () => {
            useRewardStore.getState().buyItem('monster_ice'); // 50 coins
            expect(useRewardStore.getState().coins).toBe(450);
        });

        it('adds item to ownedItems', () => {
            useRewardStore.getState().buyItem('monster_ice');
            expect(useRewardStore.getState().ownedItems).toContain('monster_ice');
        });

        it('prevents buying already owned item', () => {
            useRewardStore.getState().buyItem('monster_ice');
            const result = useRewardStore.getState().buyItem('monster_ice');
            expect(result).toBe(false);
            expect(useRewardStore.getState().coins).toBe(450); // no double charge
        });

        it('prevents buying when insufficient coins', () => {
            useRewardStore.setState({ coins: 10 });
            const result = useRewardStore.getState().buyItem('monster_ice'); // costs 50
            expect(result).toBe(false);
        });

        it('returns false for invalid item', () => {
            const result = useRewardStore.getState().buyItem('nonexistent');
            expect(result).toBe(false);
        });
    });

    describe('equipItem', () => {
        it('equips monster skin', () => {
            useRewardStore.getState().equipItem('monster_ice');
            expect(useRewardStore.getState().activeMonsterSkin).toBe('monster_ice');
        });

        it('equips castle skin', () => {
            useRewardStore.getState().equipItem('castle_crystal');
            expect(useRewardStore.getState().activeCastleSkin).toBe('castle_crystal');
        });

        it('equips effect', () => {
            useRewardStore.getState().equipItem('effect_lightning');
            expect(useRewardStore.getState().activeEffect).toBe('effect_lightning');
        });

        it('equips background', () => {
            useRewardStore.getState().equipItem('bg_forest');
            expect(useRewardStore.getState().activeBackground).toBe('bg_forest');
        });

        it('replacing skin updates the active skin', () => {
            useRewardStore.getState().equipItem('monster_ice');
            useRewardStore.getState().equipItem('monster_fire');
            expect(useRewardStore.getState().activeMonsterSkin).toBe('monster_fire');
        });
    });

    describe('shop items', () => {
        it('has 10 shop items total', () => {
            expect(useRewardStore.getState().shopItems).toHaveLength(10);
        });

        it('all items have id, name, category, price, and emoji', () => {
            for (const item of useRewardStore.getState().shopItems) {
                expect(item.id).toBeTruthy();
                expect(item.name).toBeTruthy();
                expect(item.category).toBeTruthy();
                expect(item.price).toBeGreaterThan(0);
                expect(item.emoji).toBeTruthy();
            }
        });

        it('covers all 4 categories', () => {
            const categories = new Set(useRewardStore.getState().shopItems.map(i => i.category));
            expect(categories).toContain('monster');
            expect(categories).toContain('castle');
            expect(categories).toContain('effect');
            expect(categories).toContain('background');
        });
    });

    describe('addCoins', () => {
        it('adds coins to balance', () => {
            useRewardStore.getState().addCoins(100);
            expect(useRewardStore.getState().coins).toBe(600);
        });

        it('tracks total coins earned', () => {
            useRewardStore.getState().addCoins(100);
            expect(useRewardStore.getState().totalCoinsEarned).toBe(600);
        });
    });
});
