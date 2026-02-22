import { useState } from 'react';
import useRewardStore from '../stores/useRewardStore';

function DailyChest({ onClose }) {
    const canClaimDailyChest = useRewardStore(s => s.canClaimDailyChest);
    const claimDailyChest = useRewardStore(s => s.claimDailyChest);
    const streak = useRewardStore(s => s.streak);

    const [claimed, setClaimed] = useState(false);
    const [reward, setReward] = useState(0);
    const [opening, setOpening] = useState(false);

    const handleClaim = () => {
        if (!canClaimDailyChest()) return;

        setOpening(true);
        setTimeout(() => {
            const coins = claimDailyChest();
            setReward(coins);
            setClaimed(true);
            setOpening(false);
        }, 800);
    };

    return (
        <div className="daily-chest-overlay" onClick={onClose}>
            <div className="daily-chest-modal" onClick={(e) => e.stopPropagation()}>
                <span className={`chest-emoji ${!claimed ? 'bouncing' : ''} ${opening ? 'opening' : ''}`}>
                    {claimed ? '🎉' : '🎁'}
                </span>

                <h2 className="chest-title">
                    {claimed ? 'Belohnung erhalten!' : 'Tägliche Truhe'}
                </h2>

                {!claimed ? (
                    <>
                        <p className="chest-desc">
                            Öffne deine tägliche Truhe und erhalte Münzen!
                        </p>
                        {streak > 0 && (
                            <p className="chest-streak">
                                🔥 {streak} Tage Streak – Extra-Bonus!
                            </p>
                        )}
                        <button className="btn-primary" onClick={handleClaim} style={{ fontSize: '18px' }}>
                            Truhe öffnen ✨
                        </button>
                    </>
                ) : (
                    <>
                        <div className="chest-reward">
                            🪙 +{reward} Münzen!
                        </div>
                        {streak > 0 && (
                            <p className="chest-streak">
                                🔥 Streak-Bonus aktiv! Spiele morgen wieder!
                            </p>
                        )}
                        <button className="btn-primary" onClick={onClose} style={{ fontSize: '18px' }}>
                            Super! 🎮
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default DailyChest;
