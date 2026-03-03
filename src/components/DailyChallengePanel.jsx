import { useState } from 'react';
import useDailyChallengeStore from '../stores/useDailyChallengeStore';
import useRewardStore from '../stores/useRewardStore';
import useCardStore from '../stores/useCardStore';
import { rollCard, rollRarity } from '../utils/tradingCards';

const DIFFICULTY_LABELS = {
    easy: { label: 'Leicht', badge: '🟢', color: '#22c55e' },
    medium: { label: 'Mittel', badge: '🟡', color: '#eab308' },
    hard: { label: 'Schwer', badge: '🔴', color: '#ef4444' },
};

function ChallengeCard({ challenge, progress, completed, claimed, onClaim }) {
    if (!challenge) return null;

    const diff = DIFFICULTY_LABELS[challenge.difficulty] || DIFFICULTY_LABELS.easy;
    const pct = Math.min(100, Math.round((progress / challenge.target) * 100));

    return (
        <div className={`dc-card${completed ? ' dc-card--done' : ''}`}>
            <div className="dc-card-header">
                <span className="dc-card-icon">{challenge.icon}</span>
                <div className="dc-card-info">
                    <div className="dc-card-name">{challenge.name}</div>
                    <div className="dc-card-desc">{challenge.description}</div>
                </div>
                <span
                    className="dc-difficulty-badge"
                    style={{ color: diff.color }}
                    title={diff.label}
                >
                    {diff.badge}
                </span>
            </div>

            <div className="dc-progress-bar">
                <div
                    className={`dc-progress-fill${completed ? ' dc-progress-fill--done' : ''}`}
                    style={{ width: `${pct}%` }}
                />
            </div>

            <div className="dc-card-footer">
                <span className="dc-reward-badge">🪙 {challenge.reward}</span>
                {completed && !claimed && (
                    <button className="btn-primary dc-claim-btn" onClick={() => onClaim(challenge.key)}>
                        🎁 Abholen
                    </button>
                )}
                {claimed && (
                    <span className="dc-claimed-tag">✅ Erhalten</span>
                )}
                {!completed && (
                    <span className="dc-progress-text">{progress} / {challenge.target}</span>
                )}
            </div>
        </div>
    );
}

function DailyChallengePanel({ onClose }) {
    const challenges = useDailyChallengeStore(s => s.challenges);
    const progresses = useDailyChallengeStore(s => s.progresses);
    const completedKeys = useDailyChallengeStore(s => s.completedKeys);
    const claimedKeys = useDailyChallengeStore(s => s.claimedKeys);
    const bonusClaimed = useDailyChallengeStore(s => s.bonusClaimed);
    const totalCompleted = useDailyChallengeStore(s => s.totalCompleted);
    const claimReward = useDailyChallengeStore(s => s.claimReward);
    const claimAllBonus = useDailyChallengeStore(s => s.claimAllBonus);
    const canClaimBonus = useDailyChallengeStore(s => s.canClaimAllBonus);

    const addCoins = useRewardStore(s => s.addCoins);
    const receiveCard = useCardStore(s => s.receiveCard);

    const [toast, setToast] = useState(null); // { text }
    const [bonusCard, setBonusCard] = useState(null); // card definition

    const showToast = (text) => {
        setToast({ text });
        setTimeout(() => setToast(null), 2500);
    };

    const handleClaim = (key) => {
        const coins = claimReward(key);
        if (coins > 0) {
            addCoins(coins);
            showToast(`🪙 +${coins} Münzen!`);
        }
    };

    const handleBonusClaim = () => {
        const bonus = claimAllBonus();
        if (!bonus) return;

        // Add bonus coins
        addCoins(bonus.coins);

        // Award a random card
        const card = rollCard(null, rollRarity());
        receiveCard(card.id);
        setBonusCard(card);

        showToast(`🎉 +${bonus.coins} Münzen + Karte!`);
    };

    const completedCount = completedKeys.length;
    const allDone = challenges.length > 0 && completedCount >= challenges.length;

    return (
        <div className="daily-challenge-overlay" onClick={onClose}>
            <div className="daily-challenge-panel" onClick={e => e.stopPropagation()}>
                <button className="daily-challenge-close" onClick={onClose}>✕</button>

                {/* Header */}
                <div className="daily-challenge-header">
                    <span className="daily-challenge-icon">📋</span>
                    <div>
                        <h2 className="daily-challenge-title">Tagesherausforderungen</h2>
                        <div className="dc-subtitle">{completedCount}/{challenges.length} erledigt</div>
                    </div>
                </div>

                {/* 3 Challenge Cards */}
                <div className="dc-cards-list">
                    {challenges.map(c => (
                        <ChallengeCard
                            key={c.key}
                            challenge={c}
                            progress={progresses[c.key] || 0}
                            completed={completedKeys.includes(c.key)}
                            claimed={claimedKeys.includes(c.key)}
                            onClaim={handleClaim}
                        />
                    ))}
                </div>

                {/* All-3 Bonus */}
                <div className={`dc-bonus-section${allDone ? ' dc-bonus-section--active' : ''}`}>
                    <div className="dc-bonus-title">🎖️ Alle 3 erledigt</div>
                    <div className="dc-bonus-rewards">+25 🪙 &amp; 1 Karte 🃏</div>
                    {allDone && !bonusClaimed && (
                        <button className="btn-primary dc-bonus-btn" onClick={handleBonusClaim}>
                            Bonus abholen!
                        </button>
                    )}
                    {(bonusClaimed || bonusCard) && (
                        <div className="dc-bonus-done">
                            ✅ Abgeholt
                            {bonusCard && (
                                <span className="dc-bonus-card">
                                    {' '}· {bonusCard.emoji} {bonusCard.name}
                                </span>
                            )}
                        </div>
                    )}
                    {!allDone && !bonusClaimed && (
                        <div className="dc-bonus-hint">
                            Noch {challenges.length - completedCount} Challenge(s) offen
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="dc-stats">
                    🏅 {totalCompleted} Herausforderungen gemeistert gesamt
                </div>

                {/* Toast notification */}
                {toast && (
                    <div className="dc-toast">{toast.text}</div>
                )}
            </div>
        </div>
    );
}

export default DailyChallengePanel;
