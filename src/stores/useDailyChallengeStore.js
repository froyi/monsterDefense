// Daily Challenge store (Zustand + Supabase)
// Manages 3 simultaneous challenges per day: easy / medium / hard
import { create } from 'zustand';
import { getTodaysChallenges, getTodayDateString, DAILY_CHALLENGES, ALL_COMPLETE_BONUS } from '../utils/dailyChallenges';
import { loadDailyChallenge, saveDailyChallenge, countCompletedChallenges } from '../utils/storage';

const useDailyChallengeStore = create((set, get) => ({
    // Array of the 3 today's challenge definitions
    challenges: [],         // [easy, medium, hard]
    progresses: {},         // { [key]: number }
    completedKeys: [],      // keys of completed challenges
    claimedKeys: [],        // keys where reward was already claimed
    bonusClaimed: false,    // true when the all-3 bonus was claimed
    totalCompleted: 0,      // all-time completed count
    loading: false,

    // Load today's 3 challenges for the active profile
    reload: async () => {
        set({ loading: true });
        const todayStr = getTodayDateString();
        const todaySet = getTodaysChallenges(); // { easy, medium, hard }
        const dailyThree = [todaySet.easy, todaySet.medium, todaySet.hard];

        const total = await countCompletedChallenges();

        // Try to restore each challenge's progress from storage
        const progresses = {};
        const completedKeys = [];
        const claimedKeys = [];

        for (const challenge of dailyThree) {
            const existing = await loadDailyChallenge(`${todayStr}_${challenge.key}`);
            if (existing) {
                progresses[challenge.key] = existing.progress || 0;
                if (existing.completed) completedKeys.push(challenge.key);
                if (existing.reward_claimed) claimedKeys.push(challenge.key);
            } else {
                progresses[challenge.key] = 0;
                // Don't save to Supabase here — upsert would overwrite existing progress
                // with 0 if load failed (e.g. network error). New entries are created
                // on first real progress via updateProgress().
            }
        }

        // Check if all-3 bonus was claimed
        const bonusEntry = await loadDailyChallenge(`${todayStr}_bonus`);
        const bonusClaimed = bonusEntry?.reward_claimed || false;

        set({
            challenges: dailyThree,
            progresses,
            completedKeys,
            claimedKeys,
            bonusClaimed,
            totalCompleted: total,
            loading: false,
        });
    },

    // Update progress after a round — applied to all 3 active challenges
    updateProgress: (roundStats) => {
        const state = get();
        if (!state.challenges.length) return;

        const todayStr = getTodayDateString();
        const newProgresses = { ...state.progresses };
        const newCompleted = [...state.completedKeys];

        for (const challenge of state.challenges) {
            // Skip already-completed challenges
            if (state.completedKeys.includes(challenge.key)) continue;

            const increment = challenge.getProgress(roundStats);
            let newProgress;

            if (challenge.type === 'cumulative') {
                newProgress = (newProgresses[challenge.key] || 0) + increment;
            } else {
                // threshold / single_round: take the best value
                newProgress = Math.max(newProgresses[challenge.key] || 0, increment);
            }

            newProgress = Math.min(newProgress, challenge.target);
            newProgresses[challenge.key] = newProgress;

            const isCompleted = newProgress >= challenge.target;
            if (isCompleted && !newCompleted.includes(challenge.key)) {
                newCompleted.push(challenge.key);
            }

            // Persist
            saveDailyChallenge(
                `${todayStr}_${challenge.key}`,
                challenge.key,
                newProgress,
                challenge.target,
                isCompleted,
                state.claimedKeys.includes(challenge.key)
            );
        }

        set({ progresses: newProgresses, completedKeys: newCompleted });
    },

    // Claim the reward for one specific challenge key; returns coins amount
    claimReward: (key) => {
        const state = get();
        if (!state.completedKeys.includes(key)) return 0;
        if (state.claimedKeys.includes(key)) return 0;

        const challenge = state.challenges.find(c => c.key === key);
        if (!challenge) return 0;

        const reward = challenge.reward;
        const todayStr = getTodayDateString();
        const newClaimedKeys = [...state.claimedKeys, key];

        set({ claimedKeys: newClaimedKeys });

        // Persist reward_claimed = true
        saveDailyChallenge(
            `${todayStr}_${key}`,
            key,
            state.progresses[key] || challenge.target,
            challenge.target,
            true,
            true
        );

        // Increment all-time counter
        set(s => ({ totalCompleted: s.totalCompleted + 1 }));

        return reward;
    },

    // Claim the bonus for completing all 3 challenges;
    // Returns { coins, card: true } or null if not eligible
    claimAllBonus: () => {
        const state = get();
        if (state.bonusClaimed) return null;

        const allCompleted = state.challenges.every(c => state.completedKeys.includes(c.key));
        if (!allCompleted) return null;

        const todayStr = getTodayDateString();
        set({ bonusClaimed: true });
        saveDailyChallenge(`${todayStr}_bonus`, 'bonus', 1, 1, true, true);

        return { coins: ALL_COMPLETE_BONUS.coins, card: ALL_COMPLETE_BONUS.card };
    },

    // True if all 3 challenges are completed but bonus not yet claimed
    canClaimAllBonus: () => {
        const s = get();
        if (s.bonusClaimed) return false;
        return s.challenges.every(c => s.completedKeys.includes(c.key));
    },

    // Legacy helper: returns the first (easy) challenge
    get challenge() {
        return get().challenges[0] || null;
    },
}));

export default useDailyChallengeStore;
