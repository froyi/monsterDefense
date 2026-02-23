// Main game state store
import { create } from 'zustand';
import { generateWaveWords } from '../utils/wordGenerator';
import { calculateWordScore, calculateWPM, getAccuracyMultiplier, getComboMultiplier } from '../utils/scoring';

const ROUND_DURATION = 150; // 2.5 minutes
const WAVES_PER_ROUND = 3;
const MONSTER_BASE_HP = 100;
const CASTLE_MAX_HP = 100;
const MONSTER_SPEED = 0.15; // % per tick (lower = slower)

function createMonster(id, word, waveNum) {
    return {
        id,
        word,
        hp: MONSTER_BASE_HP,
        maxHp: MONSTER_BASE_HP,
        position: 100 + (id % 5) * 8, // start off-screen right, staggered
        typed: 0, // number of characters typed
        defeated: false,
        reachedCastle: false,
        waveNum,
        spawnDelay: (id % 8) * 1.5, // seconds before appearing
        spawned: false,
    };
}

// Find the alive, SPAWNED monster closest to the castle (lowest position)
// Never returns unspawned monsters — they can't be targeted
function findFrontmostMonsterIndex(monsters) {
    let bestIdx = -1;
    let bestPos = Infinity;
    for (let i = 0; i < monsters.length; i++) {
        const m = monsters[i];
        if (m.defeated || m.reachedCastle || !m.spawned) continue;
        if (m.position < bestPos) {
            bestPos = m.position;
            bestIdx = i;
        }
    }
    return bestIdx;
}

const useGameStore = create((set, get) => ({
    // Screens: 'menu' | 'playing' | 'results' | 'skillmap' | 'shop' | 'stats'
    phase: 'menu',

    // Game state
    wave: 0,
    monsters: [],
    activeMonsterIndex: 0,
    timer: ROUND_DURATION,
    elapsed: 0,
    castleHp: CASTLE_MAX_HP,
    gameTickInterval: null,
    usedWords: new Set(), // Track ALL words used across the entire round

    // Scoring
    score: 0,
    combo: 0,
    maxCombo: 0,
    totalCharsTyped: 0,
    correctChars: 0,
    errorChars: 0,
    totalErrors: [],
    wordsCompleted: 0,

    // Settings
    soundEnabled: true,

    // Computed
    get accuracy() {
        const s = get();
        const total = s.correctChars + s.errorChars;
        if (total === 0) return 100;
        return Math.round((s.correctChars / total) * 1000) / 10;
    },

    setPhase: (phase) => set({ phase }),
    toggleSound: () => set(s => ({ soundEnabled: !s.soundEnabled })),

    startGame: (letterStats, skillLevel) => {
        const monstersPerWave = 5 + Math.floor(Math.random() * 4); // 5-8
        const words = generateWaveWords(monstersPerWave, letterStats, skillLevel);
        const monsters = words.map((word, i) => createMonster(i, word, 1));
        const usedWords = new Set(words);

        set({
            phase: 'playing',
            wave: 1,
            monsters,
            activeMonsterIndex: 0,
            timer: ROUND_DURATION,
            elapsed: 0,
            castleHp: CASTLE_MAX_HP,
            score: 0,
            combo: 0,
            maxCombo: 0,
            totalCharsTyped: 0,
            correctChars: 0,
            errorChars: 0,
            totalErrors: [],
            wordsCompleted: 0,
            usedWords,
        });
    },

    spawnNextWave: (letterStats, skillLevel) => {
        const state = get();
        const newWave = state.wave + 1;
        if (newWave > WAVES_PER_ROUND) return false;

        const monstersPerWave = 5 + Math.floor(Math.random() * 4);
        const words = generateWaveWords(monstersPerWave, letterStats, skillLevel, state.usedWords);
        const startId = state.monsters.length;
        const newMonsters = words.map((word, i) =>
            createMonster(startId + i, word, newWave)
        );

        // Track new words
        const updatedUsedWords = new Set(state.usedWords);
        words.forEach(w => updatedUsedWords.add(w));

        set(s => ({
            wave: newWave,
            monsters: [...s.monsters, ...newMonsters],
            usedWords: updatedUsedWords,
            activeMonsterIndex: s.monsters.findIndex(m => !m.defeated && !m.reachedCastle) >= 0
                ? s.activeMonsterIndex
                : s.monsters.length, // point to first new monster
        }));
        return true;
    },

    tick: (letterStats, skillLevel) => {
        set(s => {
            const newTimer = Math.max(0, s.timer - 0.05);
            const newElapsed = s.elapsed + 0.05;

            // Move monsters
            const newMonsters = s.monsters.map(m => {
                if (m.defeated || m.reachedCastle) return m;
                if (!m.spawned && newElapsed < m.spawnDelay) return m;
                if (!m.spawned) return { ...m, spawned: true };

                const newPos = m.position - MONSTER_SPEED;
                if (newPos <= 5) {
                    return { ...m, position: 5, reachedCastle: true };
                }
                return { ...m, position: newPos };
            });

            // Check castle damage
            let castleDmg = 0;
            newMonsters.forEach(m => {
                if (m.reachedCastle && !m.defeated) {
                    castleDmg += 10;
                    m.defeated = true; // remove after hitting
                }
            });

            const newCastleHp = Math.max(0, s.castleHp - castleDmg);

            // Check if wave is cleared
            const activeInWave = newMonsters.filter(
                m => m.waveNum === s.wave && !m.defeated && !m.reachedCastle
            );

            let wave = s.wave;
            let monsters = newMonsters;
            let usedWords = s.usedWords;

            // Auto-spawn next wave if current is cleared
            if (activeInWave.length === 0 && s.wave < WAVES_PER_ROUND && newTimer > 10) {
                const nextWave = s.wave + 1;
                const monstersPerWave = 5 + Math.floor(Math.random() * 4);
                const words = generateWaveWords(monstersPerWave, letterStats, skillLevel, usedWords);
                const startId = newMonsters.length;
                const waveMonsters = words.map((word, i) =>
                    createMonster(startId + i, word, nextWave)
                );
                monsters = [...newMonsters, ...waveMonsters];
                wave = nextWave;

                // Track new words
                usedWords = new Set(usedWords);
                words.forEach(w => usedWords.add(w));
            }

            // TARGET LOGIC: Don't switch away from a partially-typed, alive, spawned monster
            let activeIdx = s.activeMonsterIndex;
            const currentTarget = monsters[activeIdx];
            const currentTargetValid = currentTarget
                && !currentTarget.defeated
                && !currentTarget.reachedCastle
                && currentTarget.spawned;

            // Only re-target if current target is invalid (dead, reached castle, or not yet spawned)
            if (!currentTargetValid) {
                activeIdx = findFrontmostMonsterIndex(monsters);
            }

            // Game over conditions
            const allDone = monsters.every(m => m.defeated || m.reachedCastle);
            const timeUp = newTimer <= 0;
            const gameOver = timeUp || (allDone && wave >= WAVES_PER_ROUND);

            return {
                timer: newTimer,
                elapsed: newElapsed,
                monsters,
                castleHp: newCastleHp,
                wave,
                usedWords,
                activeMonsterIndex: activeIdx,
                phase: gameOver ? 'results' : 'playing',
            };
        });
    },

    typeChar: (char, expectedChar) => {
        const isCorrect = char === expectedChar;

        set(s => {
            if (s.phase !== 'playing') return {};

            const newTotalChars = s.totalCharsTyped + 1;
            const newCorrect = isCorrect ? s.correctChars + 1 : s.correctChars;
            const newErrors = isCorrect ? s.errorChars : s.errorChars + 1;
            const newCombo = isCorrect ? s.combo + 1 : 0;
            const newMaxCombo = Math.max(s.maxCombo, newCombo);
            const newTotalErrors = isCorrect ? s.totalErrors : [...s.totalErrors, expectedChar];

            // Update active monster
            const monsters = [...s.monsters];
            const activeMonster = monsters[s.activeMonsterIndex];

            // Block typing if monster is not spawned, already defeated, or reached castle
            if (!activeMonster || activeMonster.defeated || activeMonster.reachedCastle || !activeMonster.spawned) return {};

            if (isCorrect) {
                const newTyped = activeMonster.typed + 1;
                const accuracy = (newCorrect / newTotalChars) * 100;

                // Proportional HP: each char removes exactly (maxHp / wordLength) HP
                const dmgPerChar = activeMonster.maxHp / activeMonster.word.length;
                const newHp = Math.max(0, activeMonster.maxHp - newTyped * dmgPerChar);

                monsters[s.activeMonsterIndex] = {
                    ...activeMonster,
                    typed: newTyped,
                    hp: newHp,
                };

                // Check if word complete
                const wordComplete = newTyped >= activeMonster.word.length;
                if (wordComplete) {
                    monsters[s.activeMonsterIndex].defeated = true;
                    const wordScore = calculateWordScore(
                        activeMonster.word.length,
                        accuracy,
                        newCombo
                    );

                    // Find frontmost alive monster as next target
                    const nextIdx = findFrontmostMonsterIndex(monsters);

                    return {
                        monsters,
                        combo: newCombo,
                        maxCombo: newMaxCombo,
                        totalCharsTyped: newTotalChars,
                        correctChars: newCorrect,
                        errorChars: newErrors,
                        totalErrors: newTotalErrors,
                        score: s.score + wordScore,
                        wordsCompleted: s.wordsCompleted + 1,
                        activeMonsterIndex: nextIdx >= 0 ? nextIdx : s.activeMonsterIndex,
                    };
                }
            }

            return {
                monsters,
                combo: newCombo,
                maxCombo: newMaxCombo,
                totalCharsTyped: newTotalChars,
                correctChars: newCorrect,
                errorChars: newErrors,
                totalErrors: newTotalErrors,
            };
        });
    },

    getAccuracy: () => {
        const s = get();
        const total = s.correctChars + s.errorChars;
        if (total === 0) return 100;
        return Math.round((s.correctChars / total) * 1000) / 10;
    },

    getWPM: () => {
        const s = get();
        return calculateWPM(s.correctChars, s.elapsed);
    },

    getActiveMonster: () => {
        const s = get();
        const m = s.monsters[s.activeMonsterIndex];
        if (!m || m.defeated || m.reachedCastle) return null;
        return m;
    },
}));

export default useGameStore;
