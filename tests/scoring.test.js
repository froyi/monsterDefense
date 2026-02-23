import { describe, it, expect } from 'vitest';
import {
    getAccuracyMultiplier,
    getComboMultiplier,
    calculateWordScore,
    calculateCoins,
    calculateWPM,
} from '../src/utils/scoring';

// ============================================================
// getAccuracyMultiplier
// ============================================================
describe('getAccuracyMultiplier', () => {
    it('returns 1.4 for accuracy >= 98', () => {
        expect(getAccuracyMultiplier(98)).toBe(1.4);
        expect(getAccuracyMultiplier(100)).toBe(1.4);
    });

    it('returns 1.2 for accuracy >= 95 but < 98', () => {
        expect(getAccuracyMultiplier(95)).toBe(1.2);
        expect(getAccuracyMultiplier(97)).toBe(1.2);
    });

    it('returns 1.0 for accuracy >= 90 but < 95', () => {
        expect(getAccuracyMultiplier(90)).toBe(1.0);
        expect(getAccuracyMultiplier(94)).toBe(1.0);
    });

    it('returns 0.7 for accuracy < 90', () => {
        expect(getAccuracyMultiplier(89)).toBe(0.7);
        expect(getAccuracyMultiplier(50)).toBe(0.7);
        expect(getAccuracyMultiplier(0)).toBe(0.7);
    });
});

// ============================================================
// getComboMultiplier
// ============================================================
describe('getComboMultiplier', () => {
    it('returns 1.0 for combo < 10', () => {
        expect(getComboMultiplier(0)).toBe(1.0);
        expect(getComboMultiplier(9)).toBe(1.0);
    });

    it('adds 0.1 per 10 combos', () => {
        expect(getComboMultiplier(10)).toBe(1.1);
        expect(getComboMultiplier(20)).toBe(1.2);
        expect(getComboMultiplier(50)).toBe(1.5);
    });

    it('caps at 2.0', () => {
        expect(getComboMultiplier(100)).toBe(2.0);
        expect(getComboMultiplier(200)).toBe(2.0);
    });
});

// ============================================================
// calculateWordScore
// ============================================================
describe('calculateWordScore', () => {
    it('calculates base score from word length × 10', () => {
        // 5 chars × 10 = 50 base, accuracy 100 → 1.4, combo 0 → 1.0
        expect(calculateWordScore(5, 100, 0)).toBe(70); // 50 * 1.4 * 1.0
    });

    it('applies combo multiplier', () => {
        // 4 chars × 10 = 40 base, accuracy 100 → 1.4, combo 20 → 1.2
        expect(calculateWordScore(4, 100, 20)).toBe(67); // 40 * 1.4 * 1.2 = 67.2 → 67
    });

    it('applies low accuracy penalty', () => {
        // 10 chars × 10 = 100 base, accuracy 80 → 0.7, combo 0 → 1.0
        expect(calculateWordScore(10, 80, 0)).toBe(70); // 100 * 0.7 * 1.0
    });

    it('returns 0 for 0-length word', () => {
        expect(calculateWordScore(0, 100, 0)).toBe(0);
    });
});

// ============================================================
// calculateCoins
// ============================================================
describe('calculateCoins', () => {
    it('gives base coins (score / 100) + accuracy bonus', () => {
        // 500 / 100 = 5 base + 3 accuracy bonus (>= 95)
        expect(calculateCoins(500, 95)).toBe(8);
    });

    it('gives lower bonus for 90-94% accuracy', () => {
        expect(calculateCoins(500, 90)).toBe(7); // 5 + 2
        expect(calculateCoins(500, 94)).toBe(7);
    });

    it('gives no bonus for < 90% accuracy', () => {
        expect(calculateCoins(500, 89)).toBe(5); // 5 + 0
    });

    it('handles 0 score', () => {
        expect(calculateCoins(0, 100)).toBe(3); // 0 + 3
    });
});

// ============================================================
// calculateWPM
// ============================================================
describe('calculateWPM', () => {
    it('calculates WPM correctly (1 word = 5 chars)', () => {
        // 50 chars in 60 seconds = 10 words / 1 min = 10 WPM
        expect(calculateWPM(50, 60)).toBe(10);
    });

    it('handles short time periods', () => {
        // 25 chars in 30 seconds = 5 words / 0.5 min = 10 WPM
        expect(calculateWPM(25, 30)).toBe(10);
    });

    it('returns 0 for 0 elapsed time', () => {
        expect(calculateWPM(100, 0)).toBe(0);
    });

    it('returns 0 for negative elapsed time', () => {
        expect(calculateWPM(100, -5)).toBe(0);
    });
});
