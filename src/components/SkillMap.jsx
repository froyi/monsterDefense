import useGameStore from '../stores/useGameStore';
import useSkillStore from '../stores/useSkillStore';

function SkillMap() {
    const setPhase = useGameStore(s => s.setPhase);
    const skills = useSkillStore(s => s.skills);

    return (
        <div className="skillmap-screen">
            <button className="btn-back" onClick={() => setPhase('menu')}>
                ← Zurück
            </button>

            <h1 className="skillmap-title">🗺️ Skill-Karte</h1>

            <div className="skillmap-grid">
                {Object.entries(skills).map(([key, skill], index) => {
                    const isUnlocked = skill.unlocked;
                    const progress = skill.roundsCompleted / skill.requiredRounds;

                    return (
                        <div
                            key={key}
                            className={`skill-node ${isUnlocked ? 'unlocked' : 'locked'}`}
                        >
                            <div className="skill-icon">{skill.icon}</div>
                            <div className="skill-info">
                                <div className="skill-name">{skill.name}</div>
                                <div className="skill-desc">{skill.description}</div>
                                {!isUnlocked && (
                                    <div className="skill-progress-inline">
                                        <div
                                            className="skill-progress-inline-fill"
                                            style={{ width: `${progress * 100}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={`skill-status ${isUnlocked ? 'complete' : progress > 0 ? 'progress' : 'locked'}`}>
                                {isUnlocked
                                    ? '✅ Freigeschaltet'
                                    : progress > 0
                                        ? `${skill.roundsCompleted}/${skill.requiredRounds}`
                                        : '🔒 Gesperrt'}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SkillMap;
