import { useState } from 'react';
import useAchievementStore from '../stores/useAchievementStore';
import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES, getAchievementsByCategory, TOTAL_ACHIEVEMENTS } from '../utils/achievements';

function AchievementWall({ onClose }) {
    const unlockedKeys = useAchievementStore(s => s.unlockedKeys);
    const [activeCategory, setActiveCategory] = useState('milestones');

    const byCategory = getAchievementsByCategory();
    const unlockedCount = unlockedKeys.size;

    const getCategoryUnlocked = (catKey) => {
        return byCategory[catKey].filter(a => unlockedKeys.has(a.key)).length;
    };

    return (
        <div className="achievement-wall">
            <div className="achievement-header">
                <button className="achievement-back" onClick={onClose}>← Zurück</button>
                <h2 className="achievement-title">🏆 Abzeichen</h2>
                <span className="achievement-counter">{unlockedCount} / {TOTAL_ACHIEVEMENTS}</span>
            </div>

            {/* Category tabs */}
            <div className="achievement-tabs">
                {Object.entries(ACHIEVEMENT_CATEGORIES).map(([catKey, cat]) => (
                    <button
                        key={catKey}
                        className={`achievement-tab${activeCategory === catKey ? ' active' : ''}`}
                        onClick={() => setActiveCategory(catKey)}
                    >
                        <span className="tab-icon">{cat.icon}</span>
                        <span className="tab-name">{cat.name}</span>
                        <span className="tab-count">
                            {getCategoryUnlocked(catKey)}/{byCategory[catKey].length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Achievement grid */}
            <div className="achievement-grid">
                {byCategory[activeCategory].map(achievement => {
                    const unlocked = unlockedKeys.has(achievement.key);
                    const isSecret = achievement.secret && !unlocked;

                    return (
                        <div
                            key={achievement.key}
                            className={`achievement-card${unlocked ? ' unlocked' : ''}${isSecret ? ' secret' : ''}`}
                        >
                            <div className="achievement-icon">
                                {isSecret ? '❓' : achievement.icon}
                            </div>
                            <div className="achievement-info">
                                <div className="achievement-name">
                                    {isSecret ? '???' : achievement.name}
                                </div>
                                <div className="achievement-desc">
                                    {isSecret ? 'Spiele weiter, um dieses Geheimnis zu lüften...' : achievement.description}
                                </div>
                            </div>
                            {unlocked && <div className="achievement-check">✅</div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AchievementWall;
