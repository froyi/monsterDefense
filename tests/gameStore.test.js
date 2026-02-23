import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock supabase before any store imports
vi.mock('../src/utils/supabaseClient', () => ({
    supabase: {
        from: () => ({
            select: () => ({
                eq: () => ({ data: [], error: null }),
                maybeSingle: () => ({ data: null, error: null }),
            }),
            upsert: () => ({ error: null }),
            insert: () => ({ error: null }),
        }),
    },
}));

// Mock storage to avoid Supabase calls
vi.mock('../src/utils/storage', () => ({
    loadLetterStats: vi.fn(() => Promise.resolve({})),
    saveLetterStats: vi.fn(),
    loadHistory: vi.fn(() => Promise.resolve([])),
    saveRoundResult: vi.fn(),
    loadSkills: vi.fn(() => Promise.resolve(null)),
    saveSkills: vi.fn(),
    loadRewards: vi.fn(() => Promise.resolve(null)),
    saveRewards: vi.fn(),
    loadAchievements: vi.fn(() => Promise.resolve([])),
    unlockAchievement: vi.fn(),
    loadDailyChallenge: vi.fn(() => Promise.resolve(null)),
    saveDailyChallenge: vi.fn(),
    countCompletedChallenges: vi.fn(() => Promise.resolve(0)),
    setActiveProfile: vi.fn(),
    getActiveProfile: vi.fn(() => 'test-profile'),
}));

import useGameStore from '../src/stores/useGameStore';

// ============================================================
// Game Store – Monster Creation & Game Init
// ============================================================
describe('useGameStore', () => {
    beforeEach(() => {
        // Reset store to default state
        useGameStore.setState({
            phase: 'menu',
            wave: 0,
            monsters: [],
            activeMonsterIndex: 0,
            timer: 150,
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
        });
    });

    describe('startGame', () => {
        it('sets phase to playing', () => {
            useGameStore.getState().startGame({}, 1);
            expect(useGameStore.getState().phase).toBe('playing');
        });

        it('resets all game state', () => {
            useGameStore.setState({ score: 500, combo: 10 });
            useGameStore.getState().startGame({}, 1);
            expect(useGameStore.getState().score).toBe(0);
            expect(useGameStore.getState().combo).toBe(0);
            expect(useGameStore.getState().castleHp).toBe(100);
        });

        it('spawns initial wave of monsters', () => {
            useGameStore.getState().startGame({}, 1);
            expect(useGameStore.getState().monsters.length).toBeGreaterThan(0);
            expect(useGameStore.getState().wave).toBe(1);
        });
    });

    describe('setPhase', () => {
        it('changes the phase', () => {
            useGameStore.getState().setPhase('results');
            expect(useGameStore.getState().phase).toBe('results');
        });
    });

    describe('getAccuracy', () => {
        it('returns 100 when no errors', () => {
            useGameStore.setState({ correctChars: 20, errorChars: 0 });
            expect(useGameStore.getState().getAccuracy()).toBe(100);
        });

        it('returns 100 when no chars typed (default state)', () => {
            useGameStore.setState({ correctChars: 0, errorChars: 0 });
            // By design: accuracy starts at 100% so players aren't penalized before typing
            expect(useGameStore.getState().getAccuracy()).toBe(100);
        });

        it('calculates accuracy correctly', () => {
            useGameStore.setState({ correctChars: 90, errorChars: 10 });
            expect(useGameStore.getState().getAccuracy()).toBe(90);
        });
    });

    describe('getWPM', () => {
        it('returns 0 when no time elapsed', () => {
            useGameStore.setState({ totalCharsTyped: 50, elapsed: 0 });
            expect(useGameStore.getState().getWPM()).toBe(0);
        });

        it('calculates WPM correctly (uses correctChars)', () => {
            // getWPM uses correctChars, not totalCharsTyped
            useGameStore.setState({ correctChars: 50, elapsed: 60 });
            expect(useGameStore.getState().getWPM()).toBe(10); // 50/5 words / 1 min
        });
    });

    describe('getActiveMonster', () => {
        it('returns the active monster', () => {
            useGameStore.getState().startGame({}, 1);
            const monster = useGameStore.getState().getActiveMonster();
            expect(monster).toBeTruthy();
            expect(monster.word).toBeTruthy();
        });
    });

    describe('typeChar', () => {
        beforeEach(() => {
            useGameStore.getState().startGame({}, 1);
            // Force-spawn the first monster so typeChar tests can interact with it
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

                const wrongChar = char === 'a' ? 'b' : 'a';
                useGameStore.getState().typeChar(wrongChar, monster.word[useGameStore.getState().getActiveMonster()?.charIndex || 0]);
                expect(useGameStore.getState().errorChars).toBe(1);
            }
        });

        it('reduces HP proportionally to word length', () => {
            const monster = useGameStore.getState().getActiveMonster();
            if (monster) {
                const wordLen = monster.word.length;
                const maxHp = monster.maxHp;
                const expectedHpPerChar = maxHp / wordLen;

                // Type first character
                const firstChar = monster.word[0];
                useGameStore.getState().typeChar(firstChar, firstChar);

                const monsterAfter = useGameStore.getState().monsters[useGameStore.getState().activeMonsterIndex];
                // HP should be maxHp - (1 * expectedHpPerChar)
                const expectedHp = Math.max(0, maxHp - expectedHpPerChar);
                expect(monsterAfter.hp).toBeCloseTo(expectedHp, 5);
            }
        });

        it('HP reaches exactly 0 when word is fully typed', () => {
            // Create a controlled monster with a known word
            useGameStore.setState({
                phase: 'playing',
                monsters: [{
                    id: 0,
                    word: 'test',
                    hp: 100,
                    maxHp: 100,
                    position: 50,
                    typed: 0,
                    defeated: false,
                    reachedCastle: false,
                    waveNum: 1,
                    spawnDelay: 0,
                    spawned: true,
                }],
                activeMonsterIndex: 0,
                totalCharsTyped: 0,
                correctChars: 0,
                errorChars: 0,
            });

            // Type each character
            for (const char of 'test') {
                useGameStore.getState().typeChar(char, char);
            }

            const m = useGameStore.getState().monsters[0];
            expect(m.defeated).toBe(true);
            expect(m.hp).toBe(0);
        });

        it('HP decreases evenly for each character', () => {
            useGameStore.setState({
                phase: 'playing',
                monsters: [{
                    id: 0,
                    word: 'abcde',
                    hp: 100,
                    maxHp: 100,
                    position: 50,
                    typed: 0,
                    defeated: false,
                    reachedCastle: false,
                    waveNum: 1,
                    spawnDelay: 0,
                    spawned: true,
                }],
                activeMonsterIndex: 0,
                totalCharsTyped: 0,
                correctChars: 0,
                errorChars: 0,
            });

            // 5 chars, maxHp=100, each char should remove 20 HP
            useGameStore.getState().typeChar('a', 'a');
            expect(useGameStore.getState().monsters[0].hp).toBeCloseTo(80, 5);

            useGameStore.getState().typeChar('b', 'b');
            expect(useGameStore.getState().monsters[0].hp).toBeCloseTo(60, 5);

            useGameStore.getState().typeChar('c', 'c');
            expect(useGameStore.getState().monsters[0].hp).toBeCloseTo(40, 5);

            useGameStore.getState().typeChar('d', 'd');
            expect(useGameStore.getState().monsters[0].hp).toBeCloseTo(20, 5);

            useGameStore.getState().typeChar('e', 'e');
            expect(useGameStore.getState().monsters[0].hp).toBeCloseTo(0, 5);
        });
    });

    describe('tick', () => {
        it('decreases timer', () => {
            useGameStore.getState().startGame({}, 1);
            const timerBefore = useGameStore.getState().timer;
            useGameStore.getState().tick({}, 1);
            // Timer decreases by 1/20th of a second (50ms ticks)
            expect(useGameStore.getState().timer).toBeLessThan(timerBefore);
        });

        it('moves monsters forward', () => {
            useGameStore.getState().startGame({}, 1);
            // Mark first monster as spawned
            const monsters = useGameStore.getState().monsters;
            if (monsters.length > 0 && monsters[0].spawned) {
                const posBefore = monsters[0].position;
                useGameStore.getState().tick({}, 1);
                const posAfter = useGameStore.getState().monsters[0].position;
                expect(posAfter).toBeLessThan(posBefore);
            }
        });
    });

    describe('target locking', () => {
        it('does NOT switch target away from a partially-typed spawned monster', () => {
            // Setup: 2 monsters, both spawned, monster 0 is closer (position 30)
            // but we are typing monster 1 (activeMonsterIndex = 1)
            useGameStore.setState({
                phase: 'playing',
                elapsed: 100,
                timer: 100,
                wave: 1,
                monsters: [
                    { id: 0, word: 'aaa', hp: 100, maxHp: 100, position: 30, typed: 0, defeated: false, reachedCastle: false, waveNum: 1, spawnDelay: 0, spawned: true },
                    { id: 1, word: 'bbb', hp: 100, maxHp: 100, position: 60, typed: 1, defeated: false, reachedCastle: false, waveNum: 1, spawnDelay: 0, spawned: true },
                ],
                activeMonsterIndex: 1, // we are typing monster 1
                totalCharsTyped: 1,
                correctChars: 1,
                errorChars: 0,
            });

            // Tick should NOT switch to monster 0 even though it's closer
            useGameStore.getState().tick({}, 1);
            expect(useGameStore.getState().activeMonsterIndex).toBe(1);
        });

        it('switches target when current target is defeated', () => {
            useGameStore.setState({
                phase: 'playing',
                elapsed: 100,
                timer: 100,
                wave: 1,
                monsters: [
                    { id: 0, word: 'aaa', hp: 100, maxHp: 100, position: 30, typed: 0, defeated: false, reachedCastle: false, waveNum: 1, spawnDelay: 0, spawned: true },
                    { id: 1, word: 'bbb', hp: 0, maxHp: 100, position: 60, typed: 3, defeated: true, reachedCastle: false, waveNum: 1, spawnDelay: 0, spawned: true },
                ],
                activeMonsterIndex: 1, // was typing monster 1, now defeated
                totalCharsTyped: 3,
                correctChars: 3,
                errorChars: 0,
            });

            useGameStore.getState().tick({}, 1);
            // Should switch to monster 0 (the only alive one)
            expect(useGameStore.getState().activeMonsterIndex).toBe(0);
        });

        it('switches target when current target reaches castle', () => {
            useGameStore.setState({
                phase: 'playing',
                elapsed: 100,
                timer: 100,
                wave: 1,
                monsters: [
                    { id: 0, word: 'aaa', hp: 100, maxHp: 100, position: 50, typed: 0, defeated: false, reachedCastle: false, waveNum: 1, spawnDelay: 0, spawned: true },
                    { id: 1, word: 'bbb', hp: 100, maxHp: 100, position: 5, typed: 0, defeated: false, reachedCastle: true, waveNum: 1, spawnDelay: 0, spawned: true },
                ],
                activeMonsterIndex: 1,
                totalCharsTyped: 0,
                correctChars: 0,
                errorChars: 0,
            });

            useGameStore.getState().tick({}, 1);
            expect(useGameStore.getState().activeMonsterIndex).toBe(0);
        });
    });

    describe('spawn-gating', () => {
        it('blocks typeChar on unspawned monsters', () => {
            useGameStore.setState({
                phase: 'playing',
                monsters: [{
                    id: 0, word: 'test', hp: 100, maxHp: 100, position: 80,
                    typed: 0, defeated: false, reachedCastle: false,
                    waveNum: 1, spawnDelay: 999, spawned: false,
                }],
                activeMonsterIndex: 0,
                totalCharsTyped: 0,
                correctChars: 0,
                errorChars: 0,
            });

            // Try to type — should be blocked
            useGameStore.getState().typeChar('t', 't');
            const monster = useGameStore.getState().monsters[0];
            expect(monster.typed).toBe(0); // no change
            expect(useGameStore.getState().totalCharsTyped).toBe(0);
        });

        it('allows typeChar on spawned monsters', () => {
            useGameStore.setState({
                phase: 'playing',
                monsters: [{
                    id: 0, word: 'test', hp: 100, maxHp: 100, position: 80,
                    typed: 0, defeated: false, reachedCastle: false,
                    waveNum: 1, spawnDelay: 0, spawned: true,
                }],
                activeMonsterIndex: 0,
                totalCharsTyped: 0,
                correctChars: 0,
                errorChars: 0,
            });

            useGameStore.getState().typeChar('t', 't');
            expect(useGameStore.getState().monsters[0].typed).toBe(1);
        });

        it('findFrontmostMonsterIndex never returns unspawned monsters', () => {
            useGameStore.setState({
                phase: 'playing',
                elapsed: 0,
                timer: 100,
                wave: 1,
                monsters: [
                    { id: 0, word: 'aaa', hp: 100, maxHp: 100, position: 30, typed: 0, defeated: false, reachedCastle: false, waveNum: 1, spawnDelay: 999, spawned: false },
                    { id: 1, word: 'bbb', hp: 100, maxHp: 100, position: 60, typed: 0, defeated: false, reachedCastle: false, waveNum: 1, spawnDelay: 999, spawned: false },
                ],
                activeMonsterIndex: 0,
                totalCharsTyped: 0,
                correctChars: 0,
                errorChars: 0,
            });

            // Defeat active monster to trigger re-target
            useGameStore.setState((s) => {
                const m = [...s.monsters];
                m[0] = { ...m[0], defeated: true };
                return { monsters: m };
            });

            // Tick should not find any valid target (both unspawned)
            useGameStore.getState().tick({}, 1);
            // If it returns -1 or keeps the same index, activeMonsterIndex shouldn't point to spawned=false
            const idx = useGameStore.getState().activeMonsterIndex;
            const target = useGameStore.getState().monsters[idx];
            // Target should be defeated or unreachable — not an unspawned active target
            if (target && !target.defeated && !target.reachedCastle) {
                expect(target.spawned).toBe(true);
            }
        });
    });

    describe('word uniqueness', () => {
        it('no duplicate words within a single game start', () => {
            useGameStore.getState().startGame({}, 1);
            const words = useGameStore.getState().monsters.map(m => m.word);
            const unique = new Set(words);
            expect(unique.size).toBe(words.length);
        });

        it('usedWords set is initialized on startGame', () => {
            useGameStore.getState().startGame({}, 1);
            const usedWords = useGameStore.getState().usedWords;
            expect(usedWords).toBeInstanceOf(Set);
            expect(usedWords.size).toBe(useGameStore.getState().monsters.length);
        });

        it('usedWords grows when new waves spawn', () => {
            useGameStore.getState().startGame({}, 1);
            const initialSize = useGameStore.getState().usedWords.size;

            // Force wave completion for auto-spawn
            useGameStore.setState(s => ({
                monsters: s.monsters.map(m => ({ ...m, defeated: true })),
                timer: 100,
            }));

            // Tick should auto-spawn next wave
            useGameStore.getState().tick({}, 1);
            const newSize = useGameStore.getState().usedWords.size;
            expect(newSize).toBeGreaterThan(initialSize);
        });

        it('words across waves are unique', () => {
            useGameStore.getState().startGame({}, 1);

            // Collect all words, including after wave clears
            let allWords = useGameStore.getState().monsters.map(m => m.word);

            // Force wave 1 completion
            useGameStore.setState(s => ({
                monsters: s.monsters.map(m => ({ ...m, defeated: true })),
                timer: 100,
            }));

            // Tick to auto-spawn wave 2
            useGameStore.getState().tick({}, 1);

            // Gather new monster words
            const allMonsters = useGameStore.getState().monsters;
            allWords = allMonsters.map(m => m.word);
            const unique = new Set(allWords);
            expect(unique.size).toBe(allWords.length);
        });
    });
});
