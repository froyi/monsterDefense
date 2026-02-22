import { useState, useEffect, useRef } from 'react';

const MONSTER_EMOJIS = ['👾', '👹', '🐉', '🦇', '👻', '🧟', '🐺', '🦑', '🐙', '🦖'];

function Monster({ monster, isActive, index }) {
    const [isHit, setIsHit] = useState(false);
    const prevTyped = useRef(monster.typed);

    // Detect new character typed (hit effect)
    useEffect(() => {
        if (monster.typed > prevTyped.current && !monster.defeated) {
            setIsHit(true);
            setTimeout(() => setIsHit(false), 300);
        }
        prevTyped.current = monster.typed;
    }, [monster.typed, monster.defeated]);

    if (!monster.spawned && !monster.defeated) return null;

    const emoji = MONSTER_EMOJIS[monster.id % MONSTER_EMOJIS.length];
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
        </div>
    );
}

export default Monster;
