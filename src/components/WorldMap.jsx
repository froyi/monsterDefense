import { useState } from 'react';
import { WORLDS } from '../utils/campaignData';
import useCampaignStore from '../stores/useCampaignStore';
import LevelSelect from './LevelSelect';

function WorldMap({ onStartLevel, onOpenShop, onOpenStats, onOpenAchievements, onOpenSettings }) {
    const [selectedWorld, setSelectedWorld] = useState(null);
    const isWorldUnlocked = useCampaignStore(s => s.isWorldUnlocked);
    const getWorldStars = useCampaignStore(s => s.getWorldStars);
    const getTotalStars = useCampaignStore(s => s.getTotalStars);
    const getCompletionPercent = useCampaignStore(s => s.getCompletionPercent);
    const getNextLevel = useCampaignStore(s => s.getNextLevel);

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
                <button className="btn-nav-sm" onClick={onOpenShop}>🛍️ Shop</button>
                <button className="btn-nav-sm" onClick={onOpenStats}>📊 Statistik</button>
                <button className="btn-nav-sm" onClick={onOpenAchievements}>🏆 Abzeichen</button>
                <button className="btn-nav-sm" onClick={onOpenSettings}>⚙️</button>
            </div>
        </div>
    );
}

export default WorldMap;
