import { useEffect, useRef } from 'react';
import useGameStore from '../stores/useGameStore';
import useStatsStore from '../stores/useStatsStore';
import useSkillStore from '../stores/useSkillStore';
import HUD from './HUD';
import Castle from './Castle';
import Monster from './Monster';
import TypingInput from './TypingInput';

function GameScreen() {
    const tick = useGameStore(s => s.tick);
    const phase = useGameStore(s => s.phase);
    const monsters = useGameStore(s => s.monsters);
    const activeMonsterIndex = useGameStore(s => s.activeMonsterIndex);
    const letterStats = useStatsStore(s => s.letterStats);
    const getCurrentLevel = useSkillStore(s => s.getCurrentLevel);
    const resetLastKeyTime = useStatsStore(s => s.resetLastKeyTime);

    const tickRef = useRef(null);
    const letterStatsRef = useRef(letterStats);
    const levelRef = useRef(getCurrentLevel());

    // Keep refs in sync with latest values
    useEffect(() => {
        letterStatsRef.current = letterStats;
    }, [letterStats]);

    useEffect(() => {
        levelRef.current = getCurrentLevel();
    }, [getCurrentLevel]);

    useEffect(() => {
        resetLastKeyTime();

        tickRef.current = setInterval(() => {
            tick(letterStatsRef.current, levelRef.current);
        }, 50); // 20 fps

        return () => {
            if (tickRef.current) clearInterval(tickRef.current);
        };
    }, []);

    // Stop ticking when game ends
    useEffect(() => {
        if (phase !== 'playing' && tickRef.current) {
            clearInterval(tickRef.current);
            tickRef.current = null;
        }
    }, [phase]);

    // Filter visible monsters (spawned, not yet fully defeated animation)
    const visibleMonsters = monsters.filter(m => m.spawned || m.position < 100);

    return (
        <div className="game-screen">
            <HUD />
            <div className="battlefield">
                <Castle />
                <div className="monster-field">
                    {visibleMonsters.map((monster, idx) => (
                        <Monster
                            key={monster.id}
                            monster={monster}
                            isActive={monsters.indexOf(monster) === activeMonsterIndex}
                            index={idx}
                        />
                    ))}
                </div>
            </div>
            <TypingInput />
        </div>
    );
}

export default GameScreen;
