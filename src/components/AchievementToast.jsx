import { useEffect, useState } from 'react';
import useAchievementStore from '../stores/useAchievementStore';
import useGameStore from '../stores/useGameStore';
import { ACHIEVEMENTS } from '../utils/achievements';
import { playAchievementUnlock } from '../utils/soundEngine';

function AchievementToast() {
    const recentUnlocks = useAchievementStore(s => s.recentUnlocks);
    const dismissRecent = useAchievementStore(s => s.dismissRecent);
    const soundEnabled = useGameStore(s => s.soundEnabled);
    const [visible, setVisible] = useState([]);

    useEffect(() => {
        if (recentUnlocks.length > 0) {
            // Show the first new unlock
            const key = recentUnlocks[0];
            if (!visible.includes(key)) {
                setVisible(v => [...v, key]);
                if (soundEnabled) playAchievementUnlock();
                // Auto-dismiss after 4 seconds
                setTimeout(() => {
                    setVisible(v => v.filter(k => k !== key));
                    dismissRecent(key);
                }, 4000);
            }
        }
    }, [recentUnlocks]);

    if (visible.length === 0) return null;

    return (
        <div className="achievement-toast-container">
            {visible.map(key => {
                const achievement = ACHIEVEMENTS[key];
                if (!achievement) return null;
                return (
                    <div key={key} className="achievement-toast">
                        <div className="toast-icon">{achievement.icon}</div>
                        <div className="toast-content">
                            <div className="toast-label">🏆 Abzeichen freigeschaltet!</div>
                            <div className="toast-name">{achievement.name}</div>
                            <div className="toast-desc">{achievement.description}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default AchievementToast;
