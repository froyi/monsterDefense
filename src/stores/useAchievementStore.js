// Achievement tracking store (Supabase backend)
import { create } from 'zustand';
import { ACHIEVEMENTS } from '../utils/achievements';
import { loadAchievements, unlockAchievement as dbUnlock } from '../utils/storage';

const useAchievementStore = create((set, get) => ({
    // Set of unlocked achievement keys
    unlockedKeys: new Set(),
    // Recently unlocked (for toast notifications)
    recentUnlocks: [],
    loading: false,

    // Load unlocked achievements from Supabase
    reload: async () => {
        set({ loading: true });
        const data = await loadAchievements();
        const keys = new Set(data.map(a => a.achievement_key));
        set({ unlockedKeys: keys, loading: false });
    },

    // Check all achievements against current stats & unlock any new ones
    checkAchievements: (stats) => {
        const { unlockedKeys } = get();
        const newUnlocks = [];

        for (const [key, achievement] of Object.entries(ACHIEVEMENTS)) {
            if (unlockedKeys.has(key)) continue; // already unlocked
            try {
                if (achievement.check(stats)) {
                    newUnlocks.push(key);
                }
            } catch {
                // ignore check errors
            }
        }

        if (newUnlocks.length > 0) {
            set(s => {
                const newSet = new Set(s.unlockedKeys);
                newUnlocks.forEach(k => newSet.add(k));
                return {
                    unlockedKeys: newSet,
                    recentUnlocks: [...s.recentUnlocks, ...newUnlocks],
                };
            });

            // Persist to Supabase (fire-and-forget)
            newUnlocks.forEach(key => dbUnlock(key));
        }

        return newUnlocks;
    },

    // Dismiss a recent unlock notification
    dismissRecent: (key) => {
        set(s => ({
            recentUnlocks: s.recentUnlocks.filter(k => k !== key),
        }));
    },

    dismissAllRecent: () => set({ recentUnlocks: [] }),

    // Get count of unlocked achievements
    getUnlockedCount: () => get().unlockedKeys.size,
    getTotalCount: () => Object.keys(ACHIEVEMENTS).length,

    isUnlocked: (key) => get().unlockedKeys.has(key),
}));

export default useAchievementStore;
