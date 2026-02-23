import { useState } from 'react';
import useDailyChallengeStore from '../stores/useDailyChallengeStore';
import useRewardStore from '../stores/useRewardStore';

function DailyChallengePanel({ onClose }) {
    const challenge = useDailyChallengeStore(s => s.challenge);
    const progress = useDailyChallengeStore(s => s.progress);
    const target = useDailyChallengeStore(s => s.target);
    const completed = useDailyChallengeStore(s => s.completed);
    const rewardClaimed = useDailyChallengeStore(s => s.rewardClaimed);
    const claimReward = useDailyChallengeStore(s => s.claimReward);
    const totalCompleted = useDailyChallengeStore(s => s.totalCompleted);
    const addCoins = useRewardStore(s => s.addCoins);

    const [showClaimed, setShowClaimed] = useState(false);
    const [rewardAmount, setRewardAmount] = useState(0);

    if (!challenge) return null;

    const progressPct = Math.min(100, Math.round((progress / target) * 100));

    const handleClaim = () => {
        const coins = claimReward();
        if (coins > 0) {
            addCoins(coins);
            setRewardAmount(coins);
            setShowClaimed(true);
        }
    };

    return (
        <div className="daily-challenge-overlay">
            <div className="daily-challenge-panel">
                <button className="daily-challenge-close" onClick={onClose}>✕</button>

                <div className="daily-challenge-header">
                    <span className="daily-challenge-icon">📋</span>
                    <h2 className="daily-challenge-title">Tagesherausforderung</h2>
                </div>

                <div className="daily-challenge-card">
                    <div className="dc-challenge-icon">{challenge.icon}</div>
                    <div className="dc-challenge-info">
                        <div className="dc-challenge-name">{challenge.name}</div>
                        <div className="dc-challenge-desc">{challenge.description}</div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="dc-progress-section">
                    <div className="dc-progress-bar">
                        <div
                            className={`dc-progress-fill${completed ? ' completed' : ''}`}
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>
                    <div className="dc-progress-text">
                        {completed ? (
                            <span className="dc-complete">✅ Geschafft!</span>
                        ) : (
                            <span>{progress} / {target}</span>
                        )}
                    </div>
                </div>

                {/* Reward section */}
                <div className="dc-reward-section">
                    <span className="dc-reward-label">Belohnung:</span>
                    <span className="dc-reward-value">🪙 {challenge.reward} Münzen</span>
                </div>

                {/* Action button */}
                {completed && !rewardClaimed && !showClaimed && (
                    <button className="btn-primary dc-claim-btn" onClick={handleClaim}>
                        🎁 Belohnung abholen!
                    </button>
                )}

                {showClaimed && (
                    <div className="dc-claimed-message">
                        🎉 +{rewardAmount} Münzen erhalten!
                    </div>
                )}

                {rewardClaimed && !showClaimed && (
                    <div className="dc-already-claimed">
                        ✅ Belohnung bereits abgeholt
                    </div>
                )}

                {!completed && (
                    <div className="dc-hint">
                        Spiele eine Runde, um Fortschritt zu machen!
                    </div>
                )}

                {/* Stats */}
                <div className="dc-stats">
                    <span>🏅 {totalCompleted} Herausforderungen gemeistert</span>
                </div>
            </div>
        </div>
    );
}

export default DailyChallengePanel;
