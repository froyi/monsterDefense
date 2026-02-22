// Reward system store - coins, skins, daily chest, streaks
import { create } from 'zustand';
import { loadRewards, saveRewards } from '../utils/storage';

const SHOP_ITEMS = [
    // Monster Skins
    { id: 'monster_ice', name: 'Eis-Monster', category: 'monster', price: 50, emoji: '🧊' },
    { id: 'monster_fire', name: 'Feuer-Monster', category: 'monster', price: 80, emoji: '🔥' },
    { id: 'monster_shadow', name: 'Schatten-Monster', category: 'monster', price: 120, emoji: '👤' },
    // Castle Skins
    { id: 'castle_crystal', name: 'Kristallburg', category: 'castle', price: 100, emoji: '💎' },
    { id: 'castle_volcano', name: 'Vulkanburg', category: 'castle', price: 150, emoji: '🌋' },
    // Effects
    { id: 'effect_lightning', name: 'Blitz-Effekt', category: 'effect', price: 60, emoji: '⚡' },
    { id: 'effect_stars', name: 'Sternenstaub', category: 'effect', price: 70, emoji: '✨' },
    // Backgrounds
    { id: 'bg_forest', name: 'Zauberwald', category: 'background', price: 90, emoji: '🌲' },
    { id: 'bg_space', name: 'Weltraum', category: 'background', price: 110, emoji: '🚀' },
    { id: 'bg_underwater', name: 'Unterwasser', category: 'background', price: 130, emoji: '🌊' },
];

const DEFAULT_REWARDS = {
    coins: 0,
    totalCoinsEarned: 0,
    ownedItems: [],
    activeMonsterSkin: null,
    activeCastleSkin: null,
    activeEffect: null,
    activeBackground: null,
    lastDailyChest: null, // ISO date string
    streak: 0,
    lastPlayDate: null,
};

function isSameDay(d1, d2) {
    if (!d1 || !d2) return false;
    const a = new Date(d1);
    const b = new Date(d2);
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

function isYesterday(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return d.getFullYear() === yesterday.getFullYear() &&
        d.getMonth() === yesterday.getMonth() &&
        d.getDate() === yesterday.getDate();
}

const useRewardStore = create((set, get) => ({
    ...DEFAULT_REWARDS,
    ...(loadRewards() || {}),
    shopItems: SHOP_ITEMS,

    addCoins: (amount) => {
        set(s => {
            const updated = {
                coins: s.coins + amount,
                totalCoinsEarned: s.totalCoinsEarned + amount,
                lastPlayDate: new Date().toISOString(),
            };

            // Update streak
            if (s.lastPlayDate) {
                if (isYesterday(s.lastPlayDate)) {
                    updated.streak = s.streak + 1;
                } else if (!isSameDay(s.lastPlayDate, new Date().toISOString())) {
                    updated.streak = 1;
                }
            } else {
                updated.streak = 1;
            }

            const newState = { ...s, ...updated };
            saveRewards(newState);
            return updated;
        });
    },

    buyItem: (itemId) => {
        const state = get();
        const item = SHOP_ITEMS.find(i => i.id === itemId);
        if (!item) return false;
        if (state.coins < item.price) return false;
        if (state.ownedItems.includes(itemId)) return false;

        set(s => {
            const updated = {
                coins: s.coins - item.price,
                ownedItems: [...s.ownedItems, itemId],
            };
            const newState = { ...s, ...updated };
            saveRewards(newState);
            return updated;
        });
        return true;
    },

    equipItem: (itemId) => {
        const item = SHOP_ITEMS.find(i => i.id === itemId);
        if (!item) return;

        set(s => {
            const updated = {};
            if (item.category === 'monster') updated.activeMonsterSkin = itemId;
            if (item.category === 'castle') updated.activeCastleSkin = itemId;
            if (item.category === 'effect') updated.activeEffect = itemId;
            if (item.category === 'background') updated.activeBackground = itemId;

            const newState = { ...s, ...updated };
            saveRewards(newState);
            return updated;
        });
    },

    canClaimDailyChest: () => {
        const s = get();
        if (!s.lastDailyChest) return true;
        return !isSameDay(s.lastDailyChest, new Date().toISOString());
    },

    claimDailyChest: () => {
        const state = get();
        if (!state.canClaimDailyChest()) return 0;

        const baseReward = 15;
        const streakBonus = Math.min(state.streak * 3, 30);
        const reward = baseReward + streakBonus;

        set(s => {
            const updated = {
                coins: s.coins + reward,
                totalCoinsEarned: s.totalCoinsEarned + reward,
                lastDailyChest: new Date().toISOString(),
            };
            const newState = { ...s, ...updated };
            saveRewards(newState);
            return updated;
        });

        return reward;
    },

    getStreak: () => get().streak,

    reload: () => set({
        ...DEFAULT_REWARDS,
        ...(loadRewards() || {}),
    }),
}));

export default useRewardStore;
