import { useEffect, useMemo } from 'react';
import useGameStore from '../stores/useGameStore';
import useStatsStore from '../stores/useStatsStore';
import useSkillStore from '../stores/useSkillStore';
import useRewardStore from '../stores/useRewardStore';
import { calculateCoins } from '../utils/scoring';

function getMotivationalMessage(accuracy, wpm) {
    if (accuracy >= 98 && wpm >= 30) return '🌟 Unglaublich! Du bist ein Tipp-Meister!';
    if (accuracy >= 95) return '🎉 Super gemacht! Weiter so!';
    if (accuracy >= 90) return '👍 Gut gespielt! Du wirst immer besser!';
    if (accuracy >= 80) return '💪 Nicht schlecht! Übung macht den Meister!';
    return '🌱 Jeder Versuch zählt! Du lernst dazu!';
}

function ResultsScreen() {
    const score = useGameStore(s => s.score);
    const maxCombo = useGameStore(s => s.maxCombo);
    const correctChars = useGameStore(s => s.correctChars);
    const errorChars = useGameStore(s => s.errorChars);
    const elapsed = useGameStore(s => s.elapsed);
    const totalErrors = useGameStore(s => s.totalErrors);
    const wordsCompleted = useGameStore(s => s.wordsCompleted);
    const getWPM = useGameStore(s => s.getWPM);
    const getAccuracy = useGameStore(s => s.getAccuracy);
    const setPhase = useGameStore(s => s.setPhase);
    const startGame = useGameStore(s => s.startGame);

    const addRoundResult = useStatsStore(s => s.addRoundResult);
    const letterStats = useStatsStore(s => s.letterStats);
    const getAverageWPM = useStatsStore(s => s.getAverageWPM);

    const checkAndUnlock = useSkillStore(s => s.checkAndUnlock);
    const getNextSkill = useSkillStore(s => s.getNextSkill);
    const getCurrentLevel = useSkillStore(s => s.getCurrentLevel);

    const addCoins = useRewardStore(s => s.addCoins);

    const wpm = getWPM();
    const accuracy = getAccuracy();

    // Calculate results once
    const results = useMemo(() => {
        const coins = calculateCoins(score, accuracy);

        // Top 5 most frequent errors
        const errorCounts = {};
        totalErrors.forEach(c => {
            errorCounts[c] = (errorCounts[c] || 0) + 1;
        });
        const topErrors = Object.entries(errorCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([char, count]) => ({ char, count }));

        return { coins, topErrors };
    }, [score, accuracy, totalErrors]);

    // Save results on mount
    useEffect(() => {
        addRoundResult({
            wpm,
            accuracy,
            highestCombo: maxCombo,
            score,
            wordsCompleted,
            topErrors: results.topErrors,
        });

        addCoins(results.coins);

        // Check skill unlock
        const avgWPM = getAverageWPM();
        checkAndUnlock(accuracy, wpm, avgWPM, letterStats);
    }, []); // Run once on mount

    const nextSkill = getNextSkill();
    const message = getMotivationalMessage(accuracy, wpm);

    const handlePlayAgain = () => {
        const level = getCurrentLevel();
        startGame(letterStats, level);
    };

    return (
        <div className="results-screen">
            <h1 className="results-title">Runde beendet!</h1>

            <div className="results-grid">
                <div className="result-card">
                    <div className="result-card-label">WPM</div>
                    <div className="result-card-value green">{wpm}</div>
                </div>
                <div className="result-card">
                    <div className="result-card-label">Genauigkeit</div>
                    <div className="result-card-value cyan">{accuracy}%</div>
                </div>
                <div className="result-card">
                    <div className="result-card-label">Höchste Combo</div>
                    <div className="result-card-value gold">{maxCombo}</div>
                </div>
                <div className="result-card">
                    <div className="result-card-label">Score</div>
                    <div className="result-card-value purple">{score}</div>
                </div>
            </div>

            {results.topErrors.length > 0 && (
                <div className="results-errors">
                    <div className="results-errors-title">Häufigste Fehler</div>
                    <div className="error-list">
                        {results.topErrors.map((e, i) => (
                            <span key={i} className="error-badge">
                                {e.char === ' ' ? '⎵' : e.char} ({e.count}×)
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {nextSkill && (
                <div className="skill-progress-mini">
                    <div className="skill-progress-label">
                        Nächster Skill: {nextSkill.icon} {nextSkill.name}
                    </div>
                    <div className="skill-progress-bar">
                        <div
                            className="skill-progress-fill"
                            style={{ width: `${(nextSkill.roundsCompleted / nextSkill.requiredRounds) * 100}%` }}
                        />
                    </div>
                    <div className="skill-progress-text">
                        {nextSkill.roundsCompleted} / {nextSkill.requiredRounds} Runden
                    </div>
                </div>
            )}

            <div className="results-coins">
                🪙 +{results.coins} Münzen verdient!
            </div>

            <div className="results-message">{message}</div>

            <div className="results-actions">
                <button className="btn-primary" onClick={handlePlayAgain} id="play-again-btn">
                    ⚔️ Nochmal spielen
                </button>
                <button className="btn-secondary" onClick={() => setPhase('menu')} id="back-menu-btn">
                    Zurück zum Menü
                </button>
            </div>
        </div>
    );
}

export default ResultsScreen;
