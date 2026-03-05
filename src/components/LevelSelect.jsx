import { WORLDS, getLevelsForWorld, getWorld } from '../utils/campaignData';
import useCampaignStore from '../stores/useCampaignStore';

function LevelSelect({ worldId, onBack, onStartLevel }) {
    const world = getWorld(worldId);
    const levels = getLevelsForWorld(worldId);
    const isLevelPlayable = useCampaignStore(s => s.isLevelPlayable);
    const getLevelStars = useCampaignStore(s => s.getLevelStars);
    const isLevelCompleted = useCampaignStore(s => s.isLevelCompleted);
    const getWorldStars = useCampaignStore(s => s.getWorldStars);

    const worldStars = getWorldStars(worldId);

    return (
        <div className="level-select" style={{ '--world-color': world.color }}>
            <button className="btn-back" onClick={onBack}>← Zurück</button>
            <div className="level-select-header">
                <div className="level-select-title">
                    <span className="level-world-emoji">{world.emoji}</span>
                    <h2>{world.name}</h2>
                </div>
                <div className="level-select-stars">⭐ {worldStars} / 50</div>
            </div>

            <div className="level-grid">
                {levels.map(level => {
                    const playable = isLevelPlayable(worldId, level.level);
                    const completed = isLevelCompleted(worldId, level.level);
                    const stars = getLevelStars(worldId, level.level);

                    return (
                        <button
                            key={level.level}
                            className={`level-node ${playable ? 'playable' : 'locked'} ${completed ? 'completed' : ''} ${level.isBoss ? 'boss' : ''}`}
                            onClick={() => playable && onStartLevel(worldId, level.level)}
                            disabled={!playable}
                        >
                            <span className="level-number">
                                {level.isBoss ? world.bossEmoji || '🐉' : level.level}
                            </span>
                            <div className="level-stars">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <span key={s} className={`star ${s <= stars ? 'earned' : 'empty'}`}>
                                        {s <= stars ? '⭐' : '☆'}
                                    </span>
                                ))}
                            </div>
                            {!playable && <span className="level-lock">🔒</span>}
                            {level.isBoss && <span className="boss-label">BOSS</span>}
                        </button>
                    );
                })}
            </div>

            <div className="level-select-info">
                <p className="world-desc">{world.description}</p>
                {world.bossName && (
                    <p className="boss-info">
                        Boss: {world.bossEmoji} {world.bossName}
                    </p>
                )}
            </div>
        </div>
    );
}

export default LevelSelect;
