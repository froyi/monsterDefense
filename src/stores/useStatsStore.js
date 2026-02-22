// Statistics store - per-letter stats and round history
import { create } from 'zustand';
import { loadLetterStats, saveLetterStats, loadHistory, saveHistory } from '../utils/storage';

const useStatsStore = create((set, get) => ({
    // Per-letter statistics: { [char]: { count, errors, avgReactionMs, streak } }
    letterStats: loadLetterStats(),

    // Round history: [{ date, wpm, accuracy, highestCombo, topErrors, score, wave }]
    history: loadHistory(),

    // Track reaction time for current character
    lastKeyTime: null,

    recordKeypress: (char, isCorrect) => {
        const now = Date.now();

        set(s => {
            const stats = { ...s.letterStats };
            const lowerChar = char.toLowerCase();

            if (!stats[lowerChar]) {
                stats[lowerChar] = { count: 0, errors: 0, avgReactionMs: 500, streak: 0 };
            }

            const entry = { ...stats[lowerChar] };
            entry.count += 1;

            if (!isCorrect) {
                entry.errors += 1;
                entry.streak = 0;
            } else {
                entry.streak += 1;
            }

            // Update reaction time
            if (s.lastKeyTime) {
                const reactionMs = now - s.lastKeyTime;
                if (reactionMs < 5000) { // ignore pauses
                    entry.avgReactionMs = Math.round(
                        entry.avgReactionMs * 0.8 + reactionMs * 0.2
                    );
                }
            }

            stats[lowerChar] = entry;
            saveLetterStats(stats);

            return { letterStats: stats, lastKeyTime: now };
        });
    },

    addRoundResult: (result) => {
        set(s => {
            const history = [...s.history, {
                date: new Date().toISOString(),
                ...result,
            }];
            saveHistory(history);
            return { history };
        });
    },

    getWeeklyStats: () => {
        const history = get().history;
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        return history.filter(r => new Date(r.date) >= weekAgo);
    },

    getAverageWPM: () => {
        const history = get().history;
        if (history.length === 0) return 0;
        const last10 = history.slice(-10);
        return Math.round(last10.reduce((sum, r) => sum + (r.wpm || 0), 0) / last10.length);
    },

    getTopErrors: (n = 5) => {
        const stats = get().letterStats;
        return Object.entries(stats)
            .map(([char, s]) => ({
                char,
                errorRate: s.count > 0 ? s.errors / s.count : 0,
                count: s.count,
            }))
            .filter(e => e.count >= 3 && e.errorRate > 0)
            .sort((a, b) => b.errorRate - a.errorRate)
            .slice(0, n);
    },

    resetLastKeyTime: () => set({ lastKeyTime: null }),

    reload: () => set({
        letterStats: loadLetterStats(),
        history: loadHistory(),
        lastKeyTime: null,
    }),
}));

export default useStatsStore;
