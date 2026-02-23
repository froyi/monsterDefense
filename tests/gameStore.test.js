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
            // Level 1 has 4 monsters
            expect(useGameStore.getState().monsters).toHaveLength(4);
        });

        it('spawns more monsters at higher levels', () => {
            useGameStore.getState().startLevel('village', 9, 'de');
            // Level 9 has 9 monsters
            expect(useGameStore.getState().monsters).toHaveLength(9);
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
            const boss = useGameStore.getState().monsters[0];
            expect(boss.maxHp).toBe(300); // 3x normal
        });

        it('boss spawns immediately (no delay)', () => {
            useGameStore.getState().startLevel('village', 10, 'de');
            const boss = useGameStore.getState().monsters[0];
            expect(boss.spawnDelay).toBe(0);
        });

        it('level config has isBoss flag', () => {
            useGameStore.getState().startLevel('village', 10, 'de');
            expect(useGameStore.getState().levelConfig.isBoss).toBe(true);
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

        it('returns 1 star for basic completion (low accuracy, took damage)', () => {
            useGameStore.setState({
                monsters: [
                    { word: 'test', hp: 0, maxHp: 100, defeated: true, reachedCastle: false, spawned: true, typed: 4 },
                ],
                castleHp: 50, // took damage
                correctChars: 7,
                errorChars: 3, // 70% accuracy
                totalCharsTyped: 10,
            });
            expect(useGameStore.getState().getStars()).toBe(1);
        });

        it('returns 2 stars for >=90% accuracy', () => {
            useGameStore.setState({
                monsters: [
                    { word: 'test', hp: 0, maxHp: 100, defeated: true, reachedCastle: false, spawned: true, typed: 4 },
                ],
                castleHp: 80, // took some damage
                correctChars: 9,
                errorChars: 1,
                totalCharsTyped: 10,
            });
            expect(useGameStore.getState().getStars()).toBe(2);
        });

        it('returns 3 stars for >=90% accuracy AND no castle damage', () => {
            useGameStore.setState({
                monsters: [
                    { word: 'test', hp: 0, maxHp: 100, defeated: true, reachedCastle: false, spawned: true, typed: 4 },
                ],
                castleHp: 100, // no damage
                correctChars: 9,
                errorChars: 1,
                totalCharsTyped: 10,
            });
            expect(useGameStore.getState().getStars()).toBe(3);
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
