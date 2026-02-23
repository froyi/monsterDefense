import useGameStore from '../stores/useGameStore';
import { getWorld } from '../utils/campaignData';

function HUD() {
    const score = useGameStore(s => s.score);
    const combo = useGameStore(s => s.combo);
    const timer = useGameStore(s => s.timer);
    const worldId = useGameStore(s => s.worldId);
    const levelNum = useGameStore(s => s.levelNum);
    const levelConfig = useGameStore(s => s.levelConfig);
    const getWPM = useGameStore(s => s.getWPM);
    const getAccuracy = useGameStore(s => s.getAccuracy);

    const world = getWorld(worldId);

    const minutes = Math.floor(timer / 60);
    const seconds = Math.floor(timer % 60);
    const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    const isLow = timer < 30;

    const wpm = getWPM();
    const accuracy = getAccuracy();

    return (
        <div className="hud">
            <div className="hud-left">
                <div className="hud-stat">
                    <span className="hud-stat-label">Score</span>
                    <span className="hud-stat-value gold">{score}</span>
                </div>
                <div className={`hud-stat combo-display ${combo >= 10 ? 'active' : ''}`}>
                    <span className="hud-stat-label">Combo</span>
                    <span className="hud-stat-value cyan">{combo}</span>
                    {combo >= 10 && <span className="combo-fire">🔥</span>}
                </div>
            </div>

            <div className="hud-center">
                <span className={`timer-display ${isLow ? 'low' : ''}`}>{timeStr}</span>
                <span className="wave-indicator">
                    {world?.emoji} Level {levelNum}
                    {levelConfig?.isBoss && ' 🐉 BOSS'}
                </span>
            </div>

            <div className="hud-right">
                <div className="hud-stat">
                    <span className="hud-stat-label">WPM</span>
                    <span className="hud-stat-value green">{wpm}</span>
                </div>
                <div className="hud-stat">
                    <span className="hud-stat-label">Genauigkeit</span>
                    <span className="hud-stat-value">{accuracy}%</span>
                </div>
            </div>
        </div>
    );
}

export default HUD;
