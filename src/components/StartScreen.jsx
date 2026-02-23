import { useState } from 'react';
import useGameStore from '../stores/useGameStore';
import useStatsStore from '../stores/useStatsStore';
import useSkillStore from '../stores/useSkillStore';
import useRewardStore from '../stores/useRewardStore';
import useProfileStore from '../stores/useProfileStore';
import useAchievementStore from '../stores/useAchievementStore';
import DailyChest from './DailyChest';

const MONSTER_EMOJIS = ['👾', '👹', '🐉', '🦇', '👻', '🧟', '🐺', '🦑'];

function StartScreen() {
    const setPhase = useGameStore(s => s.setPhase);
    const startGame = useGameStore(s => s.startGame);
    const letterStats = useStatsStore(s => s.letterStats);
    const getCurrentLevel = useSkillStore(s => s.getCurrentLevel);
    const coins = useRewardStore(s => s.coins);
    const streak = useRewardStore(s => s.streak);
    const canClaimDaily = useRewardStore(s => s.canClaimDailyChest);
    const logout = useProfileStore(s => s.logout);
    const profileData = useProfileStore(s => s.getActiveProfileData);
    const activeProfile = profileData();

    const [showChest, setShowChest] = useState(false);
    const unlockedCount = useAchievementStore(s => s.getUnlockedCount);
    const totalCount = useAchievementStore(s => s.getTotalCount);

    const handleStart = () => {
        const level = getCurrentLevel();
        startGame(letterStats, level);
    };

    return (
        <div className="start-screen">
            {/* Profile & Coin indicator */}
            <div className="daily-indicator">
                {activeProfile && (
                    <button className="profile-switch-btn" onClick={logout} title="Profil wechseln">
                        <span>{activeProfile.avatar}</span>
                        <span>{activeProfile.name}</span>
                    </button>
                )}
                <span style={{ fontSize: '20px' }}>🪙</span>
                <span className="coin-display">{coins}</span>
                {streak > 0 && (
                    <span className="streak-badge">🔥 {streak} Tage</span>
                )}
            </div>

            {/* Main content */}
            <div className="start-castle">🏰</div>
            <h1 className="start-title">Monster Defense</h1>
            <p className="start-subtitle">Verteidige deine Burg mit schnellen Fingern!</p>

            <button className="btn-primary" onClick={handleStart} id="start-game-btn">
                ⚔️ Spiel starten
            </button>

            <div className="start-nav">
                <button className="btn-nav" onClick={() => setPhase('skillmap')} id="skillmap-btn">
                    <span className="nav-icon">🗺️</span>
                    Skill-Karte
                </button>
                <button className="btn-nav" onClick={() => setPhase('shop')} id="shop-btn">
                    <span className="nav-icon">🛒</span>
                    Shop
                </button>
                <button className="btn-nav" onClick={() => setPhase('stats')} id="stats-btn">
                    <span className="nav-icon">📊</span>
                    Statistik
                </button>
                <button className="btn-nav" onClick={() => setPhase('achievements')} id="achievements-btn">
                    <span className="nav-icon">🏆</span>
                    Abzeichen
                    <span className="achievement-badge-count">{unlockedCount()}/{totalCount()}</span>
                </button>
                {canClaimDaily() && (
                    <button className="btn-nav" onClick={() => setShowChest(true)} id="chest-btn"
                        style={{ borderColor: 'var(--color-gold-dim)', animation: 'pulseGlow 2s infinite' }}>
                        <span className="nav-icon">🎁</span>
                        Tägliche Truhe
                    </button>
                )}
            </div>

            {/* Floating monster decoration */}
            <div style={{
                position: 'absolute',
                bottom: '15%',
                right: '12%',
                fontSize: '48px',
                animation: 'float 3s ease-in-out infinite',
                animationDelay: '1s',
                opacity: 0.3,
            }}>
                {MONSTER_EMOJIS[Math.floor(Date.now() / 86400000) % MONSTER_EMOJIS.length]}
            </div>
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '8%',
                fontSize: '36px',
                animation: 'float 4s ease-in-out infinite',
                animationDelay: '0.5s',
                opacity: 0.2,
            }}>
                {MONSTER_EMOJIS[(Math.floor(Date.now() / 86400000) + 3) % MONSTER_EMOJIS.length]}
            </div>

            {showChest && <DailyChest onClose={() => setShowChest(false)} />}
        </div>
    );
}

export default StartScreen;
