import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock modules
vi.mock('../src/utils/supabaseClient', () => ({
    supabase: {
        from: () => ({
            select: () => ({ data: [], error: null }),
            insert: () => ({ data: null, error: null }),
            update: () => ({ data: null, error: null }),
            upsert: () => ({ data: null, error: null }),
        }),
        auth: { getSession: () => ({ data: { session: null } }) },
    },
}));

vi.mock('../src/utils/storage', () => ({
    loadRewards: vi.fn().mockResolvedValue({}),
    saveRewards: vi.fn(),
    loadSkills: vi.fn().mockResolvedValue({}),
    saveSkills: vi.fn(),
}));

import useGameStore from '../src/stores/useGameStore';

describe('useGameStore – Campaign Mode', () => {
    beforeEach(() => {
        useGameStore.setState({
            phase: 'menu',
            monsters: [],
            activeMonsterIndex: 0,
            timer: 180,
            elapsed: 0,
            castleHp: 100,
            score: 0,
            combo: 0,
            maxCombo: 0,
            totalCharsTyped: 0,
            correctChars: 0,
            errorChars: 0,
            totalErrors: [],
            wordsCompleted: 0,
            worldId: null,
            levelNum: null,
            levelConfig: null,
            usedWords: new Set(),
        });
    });

    describe('startLevel', () => {
        it('sets phase to playing', () => {
            useGameStore.getState().startLevel('village', 1, 'de');
            expect(useGameStore.getState().phase).toBe('playing');
        });

        it('sets worldId and levelNum', () => {
            useGameStore.getState().startLevel('village', 1, 'de');
            expect(useGameStore.getState().worldId).toBe('village');
            expect(useGameStore.getState().levelNum).toBe(1);
        });

        it('spawns correct number of monsters for level', () => {
            useGameStore.getState().startLevel('village', 1, 'de');
            // Level 1 village: monsterBase(8) + mc(0) = 8 monsters
            expect(useGameStore.getState().monsters).toHaveLength(8);
        });

        it('spawns more monsters at higher levels', () => {
            useGameStore.getState().startLevel('village', 9, 'de');
            // Level 9 village: monsterBase(8) + mc(12) = 20 monsters
            expect(useGameStore.getState().monsters).toHaveLength(20);
        });

        it('resets all scoring', () => {
            useGameStore.getState().startLevel('village', 1, 'de');
            expect(useGameStore.getState().score).toBe(0);
            expect(useGameStore.getState().combo).toBe(0);
            expect(useGameStore.getState().correctChars).toBe(0);
            expect(useGameStore.getState().errorChars).toBe(0);
        });
    });

    describe('boss level', () => {
        it('gives boss monster 3x HP', () => {
            useGameStore.getState().startLevel('village', 10, 'de');
            const monsters = useGameStore.getState().monsters;
            const boss = monsters.find(m => m.isBoss);
            expect(boss).toBeDefined();
            expect(boss.maxHp).toBe(300); // 3x normal
        });

        it('boss uses boss-gate instead of spawnDelay', () => {
            useGameStore.getState().startLevel('village', 10, 'de');
            const monsters = useGameStore.getState().monsters;
            const boss = monsters.find(m => m.isBoss);
            // Boss spawnDelay should be 0 — boss gate controls timing, not spawnDelay
            expect(boss.spawnDelay).toBe(0);
        });

        it('level config has isBoss flag', () => {
            useGameStore.getState().startLevel('village', 10, 'de');
            expect(useGameStore.getState().levelConfig.isBoss).toBe(true);
        });

        it('boss spawns immediately after all minions defeated (regression: no artificial delay)', () => {
            useGameStore.getState().startLevel('village', 10, 'de');
            const state = useGameStore.getState();
            const minions = state.monsters.filter(m => !m.isBoss);
            const boss = state.monsters.find(m => m.isBoss);

            // Simulate: all minions defeated, very little time elapsed
            useGameStore.setState({
                elapsed: 2.0, // only 2 seconds passed
                monsters: state.monsters.map(m =>
                    m.isBoss ? m : { ...m, spawned: true, defeated: true }
                ),
            });

            // Tick should spawn the boss even though elapsed (2s) is much less
            // than what the old spawnDelay would have been (20+ seconds)
            useGameStore.getState().tick();
            const bossAfterTick = useGameStore.getState().monsters.find(m => m.isBoss);
            expect(bossAfterTick.spawned).toBe(true);
        });

        it('boss monster has world-specific bossEmoji', () => {
            // Zauberwald (forest) boss should be 👻 (Waldgeist)
            useGameStore.getState().startLevel('forest', 10, 'de');
            const forestBoss = useGameStore.getState().monsters.find(m => m.isBoss);
            expect(forestBoss.bossEmoji).toBe('👻');

            // Dorf (village) boss should be 🐀 (Ratten-König)
            useGameStore.getState().startLevel('village', 10, 'de');
            const villageBoss = useGameStore.getState().monsters.find(m => m.isBoss);
            expect(villageBoss.bossEmoji).toBe('🐀');
        });
    });

    describe('tick', () => {
        it('decreases timer', () => {
            useGameStore.getState().startLevel('village', 1, 'de');
            useGameStore.getState().tick();
            expect(useGameStore.getState().timer).toBeLessThan(180);
        });

        it('moves spawned monsters forward', () => {
            useGameStore.getState().startLevel('village', 10, 'de');
            // Boss spawns immediately (spawnDelay = 0)
            useGameStore.getState().tick();
            const boss = useGameStore.getState().monsters[0];
            expect(boss.spawned).toBe(true);
        });
    });

    describe('typeChar', () => {
        beforeEach(() => {
            useGameStore.getState().startLevel('village', 1, 'de');
            // Force-spawn first monster
            useGameStore.setState(s => ({
                monsters: s.monsters.map((m, i) => i === 0 ? { ...m, spawned: true } : m),
            }));
        });

        it('increments combo on correct char', () => {
            const monster = useGameStore.getState().getActiveMonster();
            if (monster) {
                const char = monster.word[0];
                useGameStore.getState().typeChar(char, char);
                expect(useGameStore.getState().combo).toBeGreaterThanOrEqual(1);
            }
        });

        it('resets combo on incorrect char', () => {
            useGameStore.setState({ combo: 5 });
            const monster = useGameStore.getState().getActiveMonster();
            if (monster) {
                const wrongChar = monster.word[0] === 'a' ? 'b' : 'a';
                useGameStore.getState().typeChar(wrongChar, monster.word[0]);
                expect(useGameStore.getState().combo).toBe(0);
            }
        });

        it('tracks correct and error chars', () => {
            const monster = useGameStore.getState().getActiveMonster();
            if (monster) {
                const char = monster.word[0];
                useGameStore.getState().typeChar(char, char);
                expect(useGameStore.getState().correctChars).toBe(1);
                expect(useGameStore.getState().errorChars).toBe(0);

                // After typing 1 correct char, the next expected char is at index 1
                const nextMonster = useGameStore.getState().getActiveMonster();
                const nextExpected = nextMonster?.word[nextMonster?.typed || 0];
                const wrongChar = nextExpected === 'a' ? 'b' : 'a';
                useGameStore.getState().typeChar(wrongChar, nextExpected);
                expect(useGameStore.getState().errorChars).toBe(1);
            }
        });

        it('blocks typeChar on unspawned monsters', () => {
            // Reset monsters to unspawned
            useGameStore.setState(s => ({
                monsters: s.monsters.map(m => ({ ...m, spawned: false })),
            }));
            const comboBefore = useGameStore.getState().combo;
            useGameStore.getState().typeChar('a', 'a');
            expect(useGameStore.getState().correctChars).toBe(0);
        });
    });

    describe('getStars', () => {
        it('returns 0 if not all monsters defeated', () => {
            useGameStore.getState().startLevel('village', 1, 'de');
            expect(useGameStore.getState().getStars()).toBe(0);
        });

        it('returns 1 star for basic completion (low accuracy, took damage, slow, low combo)', () => {
            useGameStore.setState({
                worldId: 'village',
                monsters: [
                    { word: 'test', hp: 0, maxHp: 100, defeated: true, reachedCastle: false, spawned: true, typed: 4 },
                ],
                castleHp: 50, // took damage
                maxCastleHp: 100,
                correctChars: 7,
                errorChars: 3, // 70% accuracy
                totalCharsTyped: 10,
                wordsCompleted: 10,
                maxCombo: 2, // low combo
                elapsed: 120, // slow → ~0.7 WPM (well under 15)
            });
            expect(useGameStore.getState().getStars()).toBe(1);
        });

        it('returns 2 stars for 100% accuracy (took damage, slow, low combo)', () => {
            useGameStore.setState({
                worldId: 'village',
                monsters: [
                    { word: 'test', hp: 0, maxHp: 100, defeated: true, reachedCastle: false, spawned: true, typed: 4 },
                ],
                castleHp: 50, // took damage
                maxCastleHp: 100,
                correctChars: 10,
                errorChars: 0, // 100% accuracy
                totalCharsTyped: 10,
                wordsCompleted: 10,
                maxCombo: 2, // low combo
                elapsed: 120, // slow → ~1 WPM (well under 15)
            });
            expect(useGameStore.getState().getStars()).toBe(2);
        });

        it('returns 2 stars for no damage but low accuracy (independent stars)', () => {
            useGameStore.setState({
                worldId: 'village',
                monsters: [
                    { word: 'test', hp: 0, maxHp: 100, defeated: true, reachedCastle: false, spawned: true, typed: 4 },
                ],
                castleHp: 100, // no damage
                maxCastleHp: 100,
                correctChars: 7,
                errorChars: 3, // 70% accuracy
                totalCharsTyped: 10,
                wordsCompleted: 10,
                maxCombo: 2,
                elapsed: 120,
            });
            // 1 (survived) + 1 (no damage) = 2 stars
            expect(useGameStore.getState().getStars()).toBe(2);
        });

        it('returns 5 stars for perfect run (100% accuracy, no damage, fast, high combo)', () => {
            useGameStore.setState({
                worldId: 'village', // speedStarWPM = 15
                monsters: [
                    { word: 'test', hp: 0, maxHp: 100, defeated: true, reachedCastle: false, spawned: true, typed: 4 },
                ],
                castleHp: 100,
                maxCastleHp: 100,
                correctChars: 40,
                errorChars: 0, // 100%
                totalCharsTyped: 40,
                wordsCompleted: 10,
                maxCombo: 8, // >= 50% of 10
                elapsed: 15, // 40/5 / (15/60) = 32 WPM > 15
            });
            expect(useGameStore.getState().getStars()).toBe(5);
        });
    });

    describe('getActiveMonster', () => {
        it('returns the active monster', () => {
            useGameStore.getState().startLevel('village', 1, 'de');
            useGameStore.setState(s => ({
                monsters: s.monsters.map((m, i) => i === 0 ? { ...m, spawned: true } : m),
            }));
            const monster = useGameStore.getState().getActiveMonster();
            expect(monster).toBeTruthy();
            expect(monster.word).toBeTruthy();
        });
    });
});
