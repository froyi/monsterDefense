import { useCallback, useEffect, useRef, useState } from 'react';
import useGameStore from '../stores/useGameStore';
import useStatsStore from '../stores/useStatsStore';
import useRewardStore from '../stores/useRewardStore';
import useAchievementStore from '../stores/useAchievementStore';
import useCampaignStore from '../stores/useCampaignStore';
import useCardStore from '../stores/useCardStore';
import { getWorld, getLevel, WORLDS } from '../utils/campaignData';
import { rollCard, RARITIES, getCardById } from '../utils/tradingCards';
import { playLevelComplete, playLevelFail } from '../utils/soundEngine';

function ResultsScreen() {
    const setPhase = useGameStore(s => s.setPhase);
    const score = useGameStore(s => s.score);
    const wordsCompleted = useGameStore(s => s.wordsCompleted);
    const maxCombo = useGameStore(s => s.maxCombo);
    const totalErrors = useGameStore(s => s.totalErrors);
    const getAccuracy = useGameStore(s => s.getAccuracy);
    const getWPM = useGameStore(s => s.getWPM);
    const getStars = useGameStore(s => s.getStars);
    const getCoinsEarned = useGameStore(s => s.getCoinsEarned);
    const soundEnabled = useGameStore(s => s.soundEnabled);
    const castleHp = useGameStore(s => s.castleHp);
    const worldId = useGameStore(s => s.worldId);
    const levelNum = useGameStore(s => s.levelNum);
    const startLevel = useGameStore(s => s.startLevel);
    const monsters = useGameStore(s => s.monsters);

    const addRoundResult = useStatsStore(s => s.addRoundResult);
    const addCoins = useRewardStore(s => s.addCoins);
    const keyboardLayout = useRewardStore(s => s.keyboardLayout);
    const checkAchievements = useAchievementStore(s => s.checkAchievements);
    const completeLevel = useCampaignStore(s => s.completeLevel);
    const saveCampaignProgress = useCampaignStore(s => s.saveProgress);
    const getNextLevel = useCampaignStore(s => s.getNextLevel);
    const getTotalStars = useCampaignStore(s => s.getTotalStars);
    const receiveCard = useCardStore(s => s.receiveCard);

    const setHighlightedCardId = useCardStore(s => s.setHighlightedCardId);

    const world = getWorld(worldId);
    const wpm = getWPM();
    const accuracy = getAccuracy();
    const stars = getStars();
    const coins = getCoinsEarned();
    const won = stars > 0;

    const savedRef = useRef(false);
    const [droppedCard, setDroppedCard] = useState(null);
    const [cardResult, setCardResult] = useState(null);
    const [showCardToast, setShowCardToast] = useState(false);

    // Save results once
    useEffect(() => {
        if (savedRef.current) return;
        savedRef.current = true;

        // Save stats
        addRoundResult({
            wpm,
            accuracy,
            highestCombo: maxCombo,
            score,
            wordsCompleted,
            topErrors: totalErrors.slice(0, 5),
        });

        // Award coins
        if (coins > 0) addCoins(coins);

        // Save campaign progress
        if (won) {
            completeLevel(worldId, levelNum, stars);
            saveCampaignProgress();
        }

        // Play sound
        if (soundEnabled) {
            if (won) playLevelComplete();
            else playLevelFail();
        }

        // Card drop logic (only on win)
        if (won) {
            const cardDropBonus = useCardStore.getState().getEffectValue('card_drop_chance');
            const dropChance = 15 + (stars * 5) + cardDropBonus;
            const roll = Math.random() * 100;

            if (roll < dropChance) {
                const card = rollCard(worldId);
                if (card) {
                    const result = receiveCard(card.id);
                    setDroppedCard(card);
                    setCardResult(result);
                    setTimeout(() => setShowCardToast(true), 800);
                    // Auto-dismiss toast after 5 seconds
                    setTimeout(() => setShowCardToast(false), 6000);
                }
            }
        }

        // Check achievements
        const history = useStatsStore.getState().history;
        const totalStars = getTotalStars();
        const campaignStore = useCampaignStore.getState();

        checkAchievements({
            totalWordsDefeated: history.reduce((sum, r) => sum + (r.wordsCompleted || 0), 0),
            totalRounds: history.length,
            bestWPM: Math.max(...history.map(r => r.wpm || 0), 0),
            bestScore: Math.max(...history.map(r => r.score || 0), 0),
            bestAccuracy: Math.max(...history.map(r => r.accuracy || 0), 0),
            bestCombo: Math.max(...history.map(r => r.highestCombo || 0), 0),
            totalCoinsEarned: useRewardStore.getState().totalCoinsEarned,
            totalItemsBought: useRewardStore.getState().ownedItems.length,
            currentStreak: useRewardStore.getState().streak,
            totalStars,
            campaignComplete: campaignStore.isCampaignComplete(),
            worldsCompleted: WORLDS.filter(w => campaignStore.getWorldCompletedCount(w.id) >= 10).map(w => w.id),
            bossDefeated: levelNum === 10 && won,
            noCastleDamage: castleHp >= 100,
            playedLateNight: new Date().getHours() >= 22,
            playedEarlyMorning: new Date().getHours() < 7,
        });
    }, []);

    const handleNextLevel = useCallback(() => {
        const next = getNextLevel();
        if (next) {
            startLevel(next.worldId, next.level, keyboardLayout);
        } else {
            setPhase('menu');
        }
    }, [getNextLevel, startLevel, keyboardLayout, setPhase]);

    const handleRetry = useCallback(() => {
        startLevel(worldId, levelNum, keyboardLayout);
    }, [startLevel, worldId, levelNum, keyboardLayout]);

    // Enter key triggers the primary action (next level or retry)
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (won) handleNextLevel();
                else handleRetry();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [won, handleNextLevel, handleRetry]);

    // Get card info for toast
    const cardDef = droppedCard ? getCardById(droppedCard.id || droppedCard) : null;
    const rarityInfo = cardDef ? RARITIES[cardDef.rarity] : null;

    return (
        <div className="results-screen">
            {/* Card Drop Toast */}
            {showCardToast && cardDef && (
                <div
                    className="card-drop-toast"
                    style={{ '--rarity-color': rarityInfo?.color || '#94a3b8' }}
                    onClick={() => {
                        setHighlightedCardId(cardDef.id);
                        setPhase('collection');
                    }}
                >
                    <span className="card-drop-toast-emoji">{cardDef.emoji}</span>
                    <div className="card-drop-toast-info">
                        <div className="card-drop-toast-label">
                            🃏 Neue Karte!
                            {cardResult?.upgraded && <span className="card-drop-toast-upgrade"> ⬆️</span>}
                        </div>
                        <div className="card-drop-toast-name" style={{ color: rarityInfo?.color }}>
                            {cardDef.name}
                        </div>
                        <div className="card-drop-toast-rarity">
                            {rarityInfo?.name}
                        </div>
                    </div>
                </div>
            )}

            <div className="results-card">
                {/* Header */}
                <div className="results-header" style={{ '--world-color': world?.color || '#8b5cf6' }}>
                    <span className="results-emoji">{won ? '🎉' : '💀'}</span>
                    <h1 className="results-title">
                        {won ? 'Level geschafft!' : 'Verloren!'}
                    </h1>
                    <p className="results-level">
                        {world?.emoji} {world?.name} – Level {levelNum}
                    </p>
                </div>

                {/* Stars */}
                <div className="results-stars">
                    {[1, 2, 3].map(s => (
                        <span key={s} className={`result-star ${s <= stars ? 'earned' : 'empty'}`}>
                            {s <= stars ? '⭐' : '☆'}
                        </span>
                    ))}
                </div>
                <div className="star-criteria">
                    <span className={stars >= 1 ? 'met' : ''}>⭐ Bestanden</span>
                    <span className={stars >= 2 ? 'met' : ''}>⭐ ≥90% Genauigkeit</span>
                    <span className={stars >= 3 ? 'met' : ''}>⭐ Kein Burgschaden</span>
                </div>

                {/* Stats Grid */}
                <div className="results-grid">
                    <div className="result-stat">
                        <span className="stat-label">🎯 Genauigkeit</span>
                        <span className="stat-value">{accuracy}%</span>
                    </div>
                    <div className="result-stat">
                        <span className="stat-label">⚡ WPM</span>
                        <span className="stat-value">{wpm}</span>
                    </div>
                    <div className="result-stat">
                        <span className="stat-label">🏆 Punkte</span>
                        <span className="stat-value">{score}</span>
                    </div>
                    <div className="result-stat">
                        <span className="stat-label">💥 Max Combo</span>
                        <span className="stat-value">{maxCombo}</span>
                    </div>
                    <div className="result-stat">
                        <span className="stat-label">📝 Wörter</span>
                        <span className="stat-value">{wordsCompleted}</span>
                    </div>
                    <div className="result-stat">
                        <span className="stat-label">🪙 Münzen</span>
                        <span className="stat-value highlight">+{coins}</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="results-actions">
                    {won ? (
                        <button className="btn-primary" onClick={handleNextLevel}>
                            ▶️ Nächstes Level
                        </button>
                    ) : (
                        <button className="btn-primary" onClick={handleRetry}>
                            🔄 Nochmal versuchen
                        </button>
                    )}
                    <button className="btn-secondary" onClick={handleRetry}>
                        🔁 Level wiederholen
                    </button>
                    <button className="btn-secondary" onClick={() => setPhase('menu')}>
                        🗺️ Zurück zur Weltkarte
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultsScreen;
