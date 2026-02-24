import { useMemo, useEffect } from 'react';
import useGameStore from './stores/useGameStore';
import useProfileStore from './stores/useProfileStore';
import useStatsStore from './stores/useStatsStore';
import useRewardStore from './stores/useRewardStore';
import useAchievementStore from './stores/useAchievementStore';
import useDailyChallengeStore from './stores/useDailyChallengeStore';
import useCampaignStore from './stores/useCampaignStore';
import ProfileScreen from './components/ProfileScreen';
import WorldMap from './components/WorldMap';
import GameScreen from './components/GameScreen';
import StatsScreen from './components/StatsScreen';
import Shop from './components/Shop';
import ResultsScreen from './components/ResultsScreen';
import AchievementWall from './components/AchievementWall';
import AchievementToast from './components/AchievementToast';
import SettingsPanel from './components/SettingsPanel';
import DailyChallengePanel from './components/DailyChallengePanel';
import DailyChest from './components/DailyChest';
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
    const setPhase = useGameStore(s => s.setPhase);
    const startLevel = useGameStore(s => s.startLevel);
    const activeProfileId = useProfileStore(s => s.activeProfileId);
    const reloadStats = useStatsStore(s => s.reload);
    const reloadRewards = useRewardStore(s => s.reload);
    const reloadAchievements = useAchievementStore(s => s.reload);
    const reloadDailyChallenge = useDailyChallengeStore(s => s.reload);
    const loadCampaignProgress = useCampaignStore(s => s.loadProgress);
    const keyboardLayout = useRewardStore(s => s.keyboardLayout);

    // Reload all stores when profile changes, reset when logging out
    useEffect(() => {
        if (activeProfileId) {
            // Profile selected — load all profile-specific data
            reloadStats();
            reloadRewards();
            reloadAchievements();
            reloadDailyChallenge();
            loadCampaignProgress();
            useGameStore.getState().setPhase('menu');
        } else {
            // Logged out — reset all in-memory stores to prevent data leaks
            useCampaignStore.getState().resetState();
            useStatsStore.setState({ letterStats: {}, history: [], lastKeyTime: null });
            useRewardStore.setState({
                coins: 0, totalCoinsEarned: 0, ownedItems: [],
                activeMonsterSkin: null, activeCastleSkin: null,
                activeEffect: null, activeBackground: null,
                lastDailyChest: null, streak: 0, lastPlayDate: null,
                keyboardLayout: 'de',
            });
            useAchievementStore.setState({ unlockedKeys: new Set(), recentUnlocks: [] });
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

    const handleStartLevel = (worldId, level) => {
        startLevel(worldId, level, keyboardLayout);
    };

    const renderScreen = () => {
        switch (phase) {
            case 'menu':
                return (
                    <WorldMap
                        onStartLevel={handleStartLevel}
                        onOpenShop={() => setPhase('shop')}
                        onOpenStats={() => setPhase('stats')}
                        onOpenAchievements={() => setPhase('achievements')}
                        onOpenSettings={() => setPhase('settings')}
                    />
                );
            case 'playing':
                return <GameScreen />;
            case 'results':
                return <ResultsScreen />;
            case 'shop':
                return <Shop />;
            case 'stats':
                return <StatsScreen />;
            case 'achievements':
                return <AchievementWall onClose={() => setPhase('menu')} />;
            case 'settings':
                return <SettingsPanel onClose={() => setPhase('menu')} />;
            default:
                return (
                    <WorldMap
                        onStartLevel={handleStartLevel}
                        onOpenShop={() => setPhase('shop')}
                        onOpenStats={() => setPhase('stats')}
                        onOpenAchievements={() => setPhase('achievements')}
                        onOpenSettings={() => setPhase('settings')}
                    />
                );
        }
    };

    return (
        <div className="app">
            <BackgroundStars />
            {renderScreen()}
            <AchievementToast />
        </div>
    );
}

export default App;
