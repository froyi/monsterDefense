import { useState, useEffect, useRef } from 'react';
import useRewardStore from '../stores/useRewardStore';

const DEFAULT_EMOJIS = ['👾', '👹', '🐉', '🦇', '👻', '🧟', '🐺', '🦑', '🐙', '🦖'];

// Skin-specific emoji sets for variety
const SKIN_EMOJIS = {
    monster_ice: ['🧊', '❄️', '🥶', '⛄', '🌨️', '💎', '🐧', '🦣'],
    monster_fire: ['🔥', '🌋', '☄️', '🐲', '🦎', '👹', '💀', '😈'],
    monster_shadow: ['👤', '👥', '🌑', '🦇', '🕷️', '🫥', '👻', '🌚'],
};

function Monster({ monster, isActive, index }) {
    const activeSkin = useRewardStore(s => s.activeMonsterSkin);
    const activeEffect = useRewardStore(s => s.activeEffect);
    const [isHit, setIsHit] = useState(false);
    const [hitParticles, setHitParticles] = useState([]);
    const prevTyped = useRef(monster.typed);
    const particleId = useRef(0);

    // Detect new character typed (hit effect)
    useEffect(() => {
        if (monster.typed > prevTyped.current && !monster.defeated) {
            setIsHit(true);
            setTimeout(() => setIsHit(false), 300);

            // Spawn hit particles if an effect is active
            if (activeEffect) {
                const effectEmoji = activeEffect === 'effect_lightning' ? '⚡' : activeEffect === 'effect_stars' ? '✨' : null;
                if (effectEmoji) {
                    const newParticles = Array.from({ length: 3 }, () => ({
                        id: particleId.current++,
                        emoji: effectEmoji,
                        x: (Math.random() - 0.5) * 60,
                        y: (Math.random() - 0.5) * 40 - 20,
                    }));
                    setHitParticles(prev => [...prev, ...newParticles]);
                    setTimeout(() => {
                        setHitParticles(prev => prev.filter(p => !newParticles.includes(p)));
                    }, 600);
                }
            }
        }
        prevTyped.current = monster.typed;
    }, [monster.typed, monster.defeated, activeEffect]);

    if (!monster.spawned && !monster.defeated) return null;

    const emojiSet = activeSkin && SKIN_EMOJIS[activeSkin] ? SKIN_EMOJIS[activeSkin] : DEFAULT_EMOJIS;
    const emoji = emojiSet[monster.id % emojiSet.length];
    const hpPercent = (monster.hp / monster.maxHp) * 100;

    // Position: distribute vertically based on index
    const rows = 4;
    const row = index % rows;
    const topPercent = 10 + row * 22; // distribute vertically

    const classNames = [
        'monster',
        isActive ? 'active' : '',
        isHit ? 'hit' : '',
        monster.defeated ? 'defeated' : '',
    ].filter(Boolean).join(' ');

    // Render word characters
    const renderWord = () => {
        return monster.word.split('').map((char, i) => {
            let className = 'char-pending';
            if (i < monster.typed) className = 'char-correct';
            else if (i === monster.typed && isActive) className = 'char-current';

            return (
                <span key={i} className={className}>{char}</span>
            );
        });
    };

    return (
        <div
            className={classNames}
            style={{
                left: `${monster.position}%`,
                top: `${topPercent}%`,
                transform: `translateX(-50%)`,
            }}
        >
            <div className="monster-word">
                {renderWord()}
            </div>
            <span className="monster-emoji">{emoji}</span>
            {!monster.defeated && (
                <div className="monster-hp-bar">
                    <div
                        className="monster-hp-fill"
                        style={{ width: `${hpPercent}%` }}
                    />
                </div>
            )}
            {/* Hit effect particles */}
            {hitParticles.map(p => (
                <span
                    key={p.id}
                    className="hit-particle"
                    style={{
                        '--px': `${p.x}px`,
                        '--py': `${p.y}px`,
                    }}
                >
                    {p.emoji}
                </span>
            ))}
        </div>
    );
}

export default Monster;
