import { useState } from 'react';
import { WORLDS } from '../utils/campaignData';
import useCampaignStore from '../stores/useCampaignStore';
import useProfileStore from '../stores/useProfileStore';
import useRewardStore from '../stores/useRewardStore';
import useDailyChallengeStore from '../stores/useDailyChallengeStore';
import LevelSelect from './LevelSelect';
import DailyChallengePanel from './DailyChallengePanel';

function WorldMap({ onStartLevel, onOpenShop, onOpenStats, onOpenAchievements, onOpenSettings, onOpenCards }) {
    const [selectedWorld, setSelectedWorld] = useState(null);
    const [showDailyChallenge, setShowDailyChallenge] = useState(false);
    const dailyChallenges = useDailyChallengeStore(s => s.challenges);
    const dailyCompletedKeys = useDailyChallengeStore(s => s.completedKeys);
    const dailyBonusClaimed = useDailyChallengeStore(s => s.bonusClaimed);
    const dailyCanClaimBonus = useDailyChallengeStore(s => s.canClaimAllBonus);
    // Subscribe to progress state directly so component re-renders when data loads
    const progress = useCampaignStore(s => s.progress);
    const isWorldUnlocked = useCampaignStore(s => s.isWorldUnlocked);
    const getWorldStars = useCampaignStore(s => s.getWorldStars);
    const getTotalStars = useCampaignStore(s => s.getTotalStars);
    const getCompletionPercent = useCampaignStore(s => s.getCompletionPercent);
    const getNextLevel = useCampaignStore(s => s.getNextLevel);
    const logout = useProfileStore(s => s.logout);
    const coins = useRewardStore(s => s.coins);

    const totalStars = getTotalStars();
    const completion = getCompletionPercent();
    const nextLevel = getNextLevel();

    if (selectedWorld) {
        return (
            <LevelSelect
                worldId={selectedWorld}
                onBack={() => setSelectedWorld(null)}
                onStartLevel={onStartLevel}
            />
        );
    }

    return (
        <div className="world-map">
            <div className="world-map-header">
                <h1 className="world-map-title">
                    <span className="title-icon">🗺️</span>
                    Monster Defense
                </h1>
                <div className="world-map-stats">
                    <span className="stat-badge">⭐ {totalStars}</span>
                    <span className="stat-badge">{completion}%</span>
                    <span className="stat-badge coin-badge">🪙 {coins}</span>
                </div>
            </div>

            {nextLevel && (
                <button
                    className="btn-continue"
                    onClick={() => onStartLevel(nextLevel.worldId, nextLevel.level)}
                >
                    ▶️ Weiter – {WORLDS.find(w => w.id === nextLevel.worldId)?.name} Level {nextLevel.level}
                </button>
            )}

            <div className="world-list">
                {WORLDS.map((world, idx) => {
                    const unlocked = isWorldUnlocked(world.id);
                    const stars = getWorldStars(world.id);

                    return (
                        <button
                            key={world.id}
                            className={`world-card ${unlocked ? 'unlocked' : 'locked'}`}
                            style={{ '--world-color': world.color }}
                            onClick={() => unlocked && setSelectedWorld(world.id)}
                            disabled={!unlocked}
                        >
                            <div className="world-card-emoji">{world.emoji}</div>
                            <div className="world-card-info">
                                <h3 className="world-card-name">{world.name}</h3>
                                <p className="world-card-desc">{world.description}</p>
                                {unlocked ? (
                                    <div className="world-card-stars">
                                        ⭐ {stars} / 30
                                        <div className="star-bar">
                                            <div className="star-bar-fill" style={{ width: `${(stars / 30) * 100}%` }} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="world-card-locked">
                                        🔒 {world.requiredStars} Sterne in Welt {idx} nötig
                                    </div>
                                )}
                            </div>
                            {!unlocked && <div className="world-card-lock-overlay" />}
                        </button>
                    );
                })}
            </div>

            <div className="world-map-nav">
                <button className="btn-nav-sm" onClick={onOpenCards}>🃏 Karten</button>
                <button className="btn-nav-sm" onClick={onOpenShop}>🛍️ Shop</button>
                <button
                    className={`btn-nav-sm${dailyCanClaimBonus?.() ? ' dc-glow' : ''}`}
                    onClick={() => setShowDailyChallenge(true)}
                    id="daily-challenge-btn"
                    style={dailyCanClaimBonus?.() ? { borderColor: 'var(--color-gold-dim)', animation: 'pulseGlow 2s infinite' } : {}}
                >
                    📋 Aufgaben
                    {dailyChallenges.length > 0 && (
                        <span className="dc-progress-badge">
                            {dailyCompletedKeys.length}/{dailyChallenges.length}
                        </span>
                    )}
                    {dailyBonusClaimed && <span className="dc-done-badge">✅</span>}
                </button>
                <button className="btn-nav-sm" onClick={onOpenStats}>📊 Statistik</button>
                <button className="btn-nav-sm" onClick={onOpenAchievements}>🏆 Abzeichen</button>
                <button className="btn-nav-sm" onClick={onOpenSettings}>⚙️</button>
                <button className="btn-nav-sm" onClick={logout}>👤 Wechseln</button>
            </div>

            {showDailyChallenge && <DailyChallengePanel onClose={() => setShowDailyChallenge(false)} />}
        </div>
    );
}

export default WorldMap;
