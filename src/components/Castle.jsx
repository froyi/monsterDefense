import { useState, useEffect } from 'react';
import useGameStore from '../stores/useGameStore';
import useRewardStore from '../stores/useRewardStore';

const CASTLE_EMOJIS = {
    castle_crystal: '💎',
    castle_volcano: '🌋',
};

function Castle() {
    const castleHp = useGameStore(s => s.castleHp);
    const activeCastleSkin = useRewardStore(s => s.activeCastleSkin);
    const [shaking, setShaking] = useState(false);
    const [prevHp, setPrevHp] = useState(100);

    useEffect(() => {
        if (castleHp < prevHp) {
            setShaking(true);
            setTimeout(() => setShaking(false), 500);
        }
        setPrevHp(castleHp);
    }, [castleHp]);

    const hpPercent = Math.max(0, castleHp);
    const isLow = hpPercent < 30;
    const castleEmoji = activeCastleSkin && CASTLE_EMOJIS[activeCastleSkin] ? CASTLE_EMOJIS[activeCastleSkin] : '🏰';

    return (
        <div className="castle-zone">
            <div className={`castle-emoji ${shaking ? 'shaking' : ''}`}>
                {castleEmoji}
            </div>
            <div className="castle-hp-bar">
                <div
                    className={`castle-hp-fill ${isLow ? 'low' : ''}`}
                    style={{ width: `${hpPercent}%` }}
                />
            </div>
            <span style={{
                fontSize: '12px',
                color: isLow ? 'var(--color-red-soft)' : 'var(--text-muted)',
                marginTop: '4px',
                fontWeight: 600,
            }}>
                {Math.round(hpPercent)} HP
            </span>
        </div>
    );
}

export default Castle;
