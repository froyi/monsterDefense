// Score calculation utility
// Score = BasePoints × AccuracyMultiplier × ComboMultiplier

/**
 * Get accuracy multiplier based on accuracy percentage
 */
export function getAccuracyMultiplier(accuracy) {
    if (accuracy >= 98) return 1.4;
    if (accuracy >= 95) return 1.2;
    if (accuracy >= 90) return 1.0;
    return 0.7;
}

/**
 * Get combo multiplier
 * +0.1 for every 10 correct characters, max 2.0
 */
export function getComboMultiplier(comboCount) {
    const bonus = Math.floor(comboCount / 10) * 0.1;
    return Math.min(2.0, 1.0 + bonus);
}

/**
 * Calculate score for completing a word
 */
export function calculateWordScore(wordLength, accuracy, comboCount) {
    const basePoints = wordLength * 10;
    const accMult = getAccuracyMultiplier(accuracy);
    const comboMult = getComboMultiplier(comboCount);
    return Math.round(basePoints * accMult * comboMult);
}

/**
 * Calculate coins earned from a round
 */
export function calculateCoins(totalScore, accuracy) {
    const base = Math.floor(totalScore / 50);
    const accuracyBonus = accuracy >= 95 ? 5 : accuracy >= 90 ? 3 : 1;
    return base + accuracyBonus;
}

/**
 * Calculate WPM (Words Per Minute)
 */
export function calculateWPM(totalCharsTyped, elapsedSeconds) {
    if (elapsedSeconds <= 0) return 0;
    // Standard: 1 word = 5 characters
    const words = totalCharsTyped / 5;
    const minutes = elapsedSeconds / 60;
    return Math.round(words / minutes);
}
