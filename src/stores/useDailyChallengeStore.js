// Daily Challenge store (Zustand + Supabase)
import { create } from 'zustand';
import { getTodaysChallenge, getTodayDateString, DAILY_CHALLENGES } from '../utils/dailyChallenges';
import { loadDailyChallenge, saveDailyChallenge, countCompletedChallenges } from '../utils/storage';

const useDailyChallengeStore = create((set, get) => ({
    // Today's challenge state
    challenge: null,        // The challenge definition
    progress: 0,
    target: 0,
    completed: false,
    rewardClaimed: false,
    totalCompleted: 0,      // All-time completed count
    loading: false,

    // Load today's challenge for the active profile
    reload: async () => {
        set({ loading: true });
        const todayStr = getTodayDateString();
        const todayChallenge = getTodaysChallenge();

        // Load existing progress from DB
        const existing = await loadDailyChallenge(todayStr);
        const total = await countCompletedChallenges();

        if (existing) {
            // Resume today's challenge
            const challengeDef = DAILY_CHALLENGES.find(c => c.key === existing.challenge_key) || todayChallenge;
            set({
                challenge: challengeDef,
                progress: existing.progress || 0,
                target: existing.target || challengeDef.target,
                completed: existing.completed || false,
                rewardClaimed: existing.reward_claimed || false,
                totalCompleted: total,
                loading: false,
            });
        } else {
            // Fresh day — initialize with today's challenge
            set({
                challenge: todayChallenge,
                progress: 0,
                target: todayChallenge.target,
                completed: false,
                rewardClaimed: false,
                totalCompleted: total,
                loading: false,
            });
            // Save initial state so the challenge is locked in for today
            saveDailyChallenge(todayStr, todayChallenge.key, 0, todayChallenge.target, false, false);
        }
    },

    // Update progress after a round
    updateProgress: (roundStats) => {
        const state = get();
        if (!state.challenge || state.completed) return;

        const challenge = state.challenge;
        const progressIncrement = challenge.getProgress(roundStats);

        let newProgress;
        if (challenge.type === 'cumulative') {
            newProgress = state.progress + progressIncrement;
        } else if (challenge.type === 'threshold') {
            // For threshold: take the max (best attempt)
            newProgress = Math.max(state.progress, progressIncrement);
        } else if (challenge.type === 'single_round') {
            // Single round: take the best single-round value
            newProgress = Math.max(state.progress, progressIncrement);
        } else {
            newProgress = state.progress + progressIncrement;
        }

        const isCompleted = newProgress >= state.target;

        set({
            progress: Math.min(newProgress, state.target),
            completed: isCompleted,
        });

        // Persist to Supabase
        const todayStr = getTodayDateString();
        saveDailyChallenge(
            todayStr,
            challenge.key,
            Math.min(newProgress, state.target),
            state.target,
            isCompleted,
            state.rewardClaimed
        );
    },

    // Claim reward after completing the challenge
    claimReward: () => {
        const state = get();
        if (!state.completed || state.rewardClaimed) return 0;

        const reward = state.challenge?.reward || 0;
        set(s => ({
            rewardClaimed: true,
            totalCompleted: s.totalCompleted + 1,
        }));

        // Persist
        const todayStr = getTodayDateString();
        saveDailyChallenge(
            todayStr,
            state.challenge.key,
            state.progress,
            state.target,
            true,
            true
        );

        return reward;
    },

    // Check if today's challenge is active (not yet completed)
    isActive: () => {
        const s = get();
        return s.challenge && !s.completed;
    },

    // Check if reward is available to claim
    canClaimReward: () => {
        const s = get();
        return s.completed && !s.rewardClaimed;
    },
}));

export default useDailyChallengeStore;
