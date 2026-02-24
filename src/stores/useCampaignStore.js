// Campaign progress store – tracks stars, world unlocks, current position
import { create } from 'zustand';
import { WORLDS, TOTAL_LEVELS, getWorldIndex } from '../utils/campaignData';
import { getActiveProfile } from '../utils/storage';

// Progress shape: { [worldId]: { [levelNum]: { stars: 0-3, completed: bool } } }
function createEmptyProgress() {
    const progress = {};
    for (const world of WORLDS) {
        progress[world.id] = {};
        for (let i = 1; i <= 10; i++) {
            progress[world.id][i] = { stars: 0, completed: false };
        }
    }
    return progress;
}

const useCampaignStore = create((set, get) => ({
    progress: createEmptyProgress(),
    currentWorldId: 'village',
    currentLevel: 1,
    loading: false,

    // Set the level to play
    selectLevel: (worldId, level) => {
        set({ currentWorldId: worldId, currentLevel: level });
    },

    // Record result of a completed level
    completeLevel: (worldId, levelNum, stars) => {
        set(s => {
            const progress = JSON.parse(JSON.stringify(s.progress)); // deep clone
            const existing = progress[worldId]?.[levelNum];
            if (!existing) return {};

            // Only upgrade stars, never downgrade
            progress[worldId][levelNum] = {
                completed: true,
                stars: Math.max(existing.stars, stars),
            };

            return { progress };
        });
    },

    // Get star count for a specific world
    getWorldStars: (worldId) => {
        const worldProgress = get().progress[worldId];
        if (!worldProgress) return 0;
        return Object.values(worldProgress).reduce((sum, l) => sum + l.stars, 0);
    },

    // Get total stars across all worlds
    getTotalStars: () => {
        let total = 0;
        for (const world of WORLDS) {
            total += get().getWorldStars(world.id);
        }
        return total;
    },

    // Get count of completed levels in a world
    getWorldCompletedCount: (worldId) => {
        const worldProgress = get().progress[worldId];
        if (!worldProgress) return 0;
        return Object.values(worldProgress).filter(l => l.completed).length;
    },

    // Check if a world is unlocked
    isWorldUnlocked: (worldId) => {
        const worldIdx = getWorldIndex(worldId);
        if (worldIdx === 0) return true; // first world always unlocked

        // Need enough stars from the PREVIOUS world
        const prevWorld = WORLDS[worldIdx - 1];
        const prevStars = get().getWorldStars(prevWorld.id);
        const world = WORLDS[worldIdx];
        return prevStars >= world.requiredStars;
    },

    // Check if a specific level is playable
    isLevelPlayable: (worldId, levelNum) => {
        if (!get().isWorldUnlocked(worldId)) return false;
        if (levelNum === 1) return true;
        // Must have completed previous level
        const prev = get().progress[worldId]?.[levelNum - 1];
        return prev?.completed === true;
    },

    // Get the level result (stars) for display
    getLevelStars: (worldId, levelNum) => {
        return get().progress[worldId]?.[levelNum]?.stars || 0;
    },

    // Is level completed?
    isLevelCompleted: (worldId, levelNum) => {
        return get().progress[worldId]?.[levelNum]?.completed === true;
    },

    // Get overall campaign completion percentage
    getCompletionPercent: () => {
        let completed = 0;
        for (const world of WORLDS) {
            completed += get().getWorldCompletedCount(world.id);
        }
        return Math.round((completed / TOTAL_LEVELS) * 100);
    },

    // Has the player finished ALL 60 levels?
    isCampaignComplete: () => {
        for (const world of WORLDS) {
            if (get().getWorldCompletedCount(world.id) < 10) return false;
        }
        return true;
    },

    // Determine next level to play (for "Continue" button)
    getNextLevel: () => {
        for (const world of WORLDS) {
            if (!get().isWorldUnlocked(world.id)) continue;
            for (let i = 1; i <= 10; i++) {
                if (!get().isLevelCompleted(world.id, i)) {
                    return { worldId: world.id, level: i };
                }
            }
        }
        return null; // campaign complete
    },

    // Persistence – profile-scoped localStorage
    saveProgress: () => {
        const profileId = getActiveProfile();
        if (!profileId) return;
        try {
            localStorage.setItem(`campaign_progress_${profileId}`, JSON.stringify(get().progress));
        } catch { /* ignore */ }
    },

    loadProgress: () => {
        const profileId = getActiveProfile();
        if (!profileId) {
            // No profile – reset to empty
            set({ progress: createEmptyProgress() });
            return;
        }
        try {
            const saved = localStorage.getItem(`campaign_progress_${profileId}`);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Merge with empty progress to ensure all worlds/levels exist
                const full = createEmptyProgress();
                for (const worldId of Object.keys(parsed)) {
                    if (full[worldId]) {
                        for (const [lvl, data] of Object.entries(parsed[worldId])) {
                            if (full[worldId][lvl]) {
                                full[worldId][lvl] = data;
                            }
                        }
                    }
                }
                set({ progress: full });
            } else {
                // New profile with no saved progress
                set({ progress: createEmptyProgress() });
            }
        } catch {
            set({ progress: createEmptyProgress() });
        }
    },

    // Reset all progress (for settings or profile deletion)
    resetProgress: () => {
        const profileId = getActiveProfile();
        set({ progress: createEmptyProgress(), currentWorldId: 'village', currentLevel: 1 });
        if (profileId) {
            try {
                localStorage.removeItem(`campaign_progress_${profileId}`);
            } catch { /* ignore */ }
        }
    },

    // Reset in-memory state (used when logging out / switching profiles)
    resetState: () => {
        set({ progress: createEmptyProgress(), currentWorldId: 'village', currentLevel: 1 });
    },
}));

export default useCampaignStore;
