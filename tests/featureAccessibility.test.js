import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * Feature Accessibility Tests
 *
 * These tests ensure that ALL game features have visible entry points
 * in the UI so that users can always find and use every feature.
 * Every navigation button, panel, and screen must be rendered and reachable.
 */

const SRC_DIR = join(import.meta.dirname, '..', 'src');
const readSrc = (relPath) => readFileSync(join(SRC_DIR, relPath), 'utf8');

// ============================================================
// StartScreen: all navigation buttons are always present
// ============================================================
describe('StartScreen – feature buttons', () => {
    const startScreen = readSrc('components/StartScreen.jsx');

    it('always renders "Spiel starten" button', () => {
        expect(startScreen).toContain('id="start-game-btn"');
    });

    it('always renders Skill-Karte button (not conditional)', () => {
        expect(startScreen).toContain('id="skillmap-btn"');
        // Should NOT be wrapped in a conditional
        const line = startScreen.split('\n').find(l => l.includes('id="skillmap-btn"'));
        expect(line).toBeTruthy();
    });

    it('always renders Shop button', () => {
        expect(startScreen).toContain('id="shop-btn"');
    });

    it('always renders Statistik button', () => {
        expect(startScreen).toContain('id="stats-btn"');
    });

    it('always renders Abzeichen button', () => {
        expect(startScreen).toContain('id="achievements-btn"');
    });

    it('always renders Settings button', () => {
        expect(startScreen).toContain('id="settings-btn"');
    });

    it('always renders Daily Challenge button (unconditional in JSX)', () => {
        expect(startScreen).toContain('id="daily-challenge-btn"');
        // Verify it is NOT wrapped in a conditional like {dailyChallenge && (
        // The button should be unconditional (no short-circuit before the <button>)
        const lines = startScreen.split('\n');
        const btnLineIdx = lines.findIndex(l => l.includes('id="daily-challenge-btn"'));
        expect(btnLineIdx).toBeGreaterThan(-1);

        // Lines above the button should NOT have `&& (` pattern indicating a conditional wrapper
        const prevFewLines = lines.slice(Math.max(0, btnLineIdx - 3), btnLineIdx).join('\n');
        expect(prevFewLines).not.toMatch(/dailyChallenge\s*&&/);
    });
});

// ============================================================
// DailyChallengePanel: renders all 3 difficulty tiers
// ============================================================
describe('DailyChallengePanel – renders all difficulties', () => {
    const panel = readSrc('components/DailyChallengePanel.jsx');

    it('renders easy/medium/hard difficulty labels', () => {
        expect(panel).toContain('Leicht');
        expect(panel).toContain('Mittel');
        expect(panel).toContain('Schwer');
    });

    it('renders difficulty badges 🟢🟡🔴', () => {
        expect(panel).toContain('🟢');
        expect(panel).toContain('🟡');
        expect(panel).toContain('🔴');
    });

    it('has a claim button per challenge', () => {
        expect(panel).toContain('onClaim');
        expect(panel).toContain('dc-claim-btn');
    });

    it('has an all-3-bonus claim section', () => {
        expect(panel).toContain('dc-bonus-section');
        expect(panel).toContain('dc-bonus-btn');
        expect(panel).toContain('claimAllBonus');
    });

    it('awards a trading card on all-3 bonus', () => {
        expect(panel).toContain('rollCard');
        expect(panel).toContain('receiveCard');
    });
});

// ============================================================
// ResultsScreen: daily challenge progress is updated after round
// ============================================================
describe('ResultsScreen – daily challenge integration', () => {
    const results = readSrc('components/ResultsScreen.jsx');

    it('imports useDailyChallengeStore', () => {
        expect(results).toContain("import useDailyChallengeStore");
    });

    it('calls updateProgress (or updateDailyProgress) after a round', () => {
        expect(results).toContain('updateDailyProgress');
    });

    it('passes required roundStats fields to updateProgress', () => {
        expect(results).toContain('wordsCompleted');
        expect(results).toContain('accuracy');
        expect(results).toContain('wpm');
        expect(results).toContain('maxCombo');
        expect(results).toContain('score');
        expect(results).toContain('castleHp');
        expect(results).toContain('wave');
        expect(results).toContain('averageWPM');
    });
});

// ============================================================
// App.jsx: daily challenge store is initialized on startup
// ============================================================
describe('App – daily challenge initialization', () => {
    const app = readSrc('App.jsx');

    it('imports useDailyChallengeStore', () => {
        expect(app).toContain("useDailyChallengeStore");
    });

    it('calls reload to initialize daily challenges', () => {
        expect(app).toContain('reloadDailyChallenge');
    });
});

// ============================================================
// WorldMap: daily challenge button in bottom nav
// ============================================================
describe('WorldMap – daily challenge entry point', () => {
    const worldMap = readSrc('components/WorldMap.jsx');

    it('imports DailyChallengePanel', () => {
        expect(worldMap).toContain("import DailyChallengePanel");
    });

    it('imports useDailyChallengeStore', () => {
        expect(worldMap).toContain("useDailyChallengeStore");
    });

    it('has a daily-challenge-btn in the bottom nav', () => {
        expect(worldMap).toContain('id="daily-challenge-btn"');
    });

    it('renders DailyChallengePanel overlay', () => {
        expect(worldMap).toContain('<DailyChallengePanel');
    });

    it('button shows progress badge', () => {
        expect(worldMap).toContain('dc-progress-badge');
    });
});
