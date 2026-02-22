import { useMemo, useEffect } from 'react';
import useGameStore from './stores/useGameStore';
import useProfileStore from './stores/useProfileStore';
import useStatsStore from './stores/useStatsStore';
import useSkillStore from './stores/useSkillStore';
import useRewardStore from './stores/useRewardStore';
import ProfileScreen from './components/ProfileScreen';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import StatsScreen from './components/StatsScreen';
import SkillMap from './components/SkillMap';
import Shop from './components/Shop';
import ResultsScreen from './components/ResultsScreen';
import './App.css';

// Generate background stars
function BackgroundStars() {
    const stars = useMemo(() => {
        return Array.from({ length: 60 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: `${2 + Math.random() * 4}s`,
            delay: `${Math.random() * 3}s`,
            size: `${2 + Math.random() * 2}px`,
        }));
    }, []);

    return (
        <div className="bg-stars">
            {stars.map(s => (
                <div
                    key={s.id}
                    className="bg-star"
                    style={{
                        left: s.left,
                        top: s.top,
                        width: s.size,
                        height: s.size,
                        '--duration': s.duration,
                        '--delay': s.delay,
                    }}
                />
            ))}
        </div>
    );
}

function App() {
    const phase = useGameStore(s => s.phase);
    const activeProfileId = useProfileStore(s => s.activeProfileId);
    const reloadStats = useStatsStore(s => s.reload);
    const reloadSkills = useSkillStore(s => s.reload);
    const reloadRewards = useRewardStore(s => s.reload);

    // Reload all stores when profile changes
    useEffect(() => {
        if (activeProfileId) {
            reloadStats();
            reloadSkills();
            reloadRewards();
            useGameStore.getState().setPhase('menu');
        }
    }, [activeProfileId]);

    // Show profile picker if no profile selected
    if (!activeProfileId) {
        return (
            <div className="app">
                <BackgroundStars />
                <ProfileScreen />
            </div>
        );
    }

    const renderScreen = () => {
        switch (phase) {
            case 'menu':
                return <StartScreen />;
            case 'playing':
                return <GameScreen />;
            case 'results':
                return <ResultsScreen />;
            case 'skillmap':
                return <SkillMap />;
            case 'shop':
                return <Shop />;
            case 'stats':
                return <StatsScreen />;
            default:
                return <StartScreen />;
        }
    };

    return (
        <div className="app">
            <BackgroundStars />
            {renderScreen()}
        </div>
    );
}

export default App;
