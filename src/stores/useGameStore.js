// Main game state store – Campaign mode (level-based)
import { create } from 'zustand';
import { generateCampaignWords } from '../utils/wordGenerator';
import { calculateWordScore, calculateWPM, calculateCoins } from '../utils/scoring';
import { getLevel, getWorld } from '../utils/campaignData';

const ROUND_DURATION = 180; // 3 minutes per level
const MONSTER_BASE_HP = 100;
const CASTLE_MAX_HP = 100;
const MONSTER_BASE_SPEED = 0.15;

function createMonster(id, word, speed) {
    return {
        id,
        word,
        hp: MONSTER_BASE_HP,
        maxHp: MONSTER_BASE_HP,
        position: 100 + (id % 5) * 8,
        typed: 0,
        defeated: false,
        reachedCastle: false,
        spawnDelay: id * 2.0, // stagger spawns further apart in campaign
        spawned: false,
        speed, // per-monster speed (scaled by level)
    };
}

// Find the alive, spawned monster closest to the castle
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
    phase: 'menu', // 'menu' | 'playing' | 'results'

    // Campaign context
    worldId: null,
    levelNum: null,
    levelConfig: null,

    // Game state
    monsters: [],
    activeMonsterIndex: 0,
    timer: ROUND_DURATION,
    elapsed: 0,
    castleHp: CASTLE_MAX_HP,
    usedWords: new Set(),

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

    setPhase: (phase) => set({ phase }),
    toggleSound: () => set(s => ({ soundEnabled: !s.soundEnabled })),

    // Start a campaign level
    startLevel: (worldId, levelNum, layout = 'de') => {
        const levelConfig = getLevel(worldId, levelNum);
        if (!levelConfig) return;

        const world = getWorld(worldId);
        const monsterCount = levelConfig.monsterCount;
        const words = generateCampaignWords(monsterCount, worldId, layout, levelConfig.wordLength);
        const monsterSpeed = MONSTER_BASE_SPEED * levelConfig.speed;
        const monsters = words.map((word, i) => createMonster(i, word, monsterSpeed));
        const usedWords = new Set(words);

        // Boss level: first monster gets extra HP and boss flag
        if (levelConfig.isBoss && monsters.length > 0) {
            monsters[0].hp = MONSTER_BASE_HP * 3;
            monsters[0].maxHp = MONSTER_BASE_HP * 3;
            monsters[0].spawnDelay = 0; // boss appears immediately
            monsters[0].isBoss = true;
            monsters[0].enraged = false;
        }

        set({
            phase: 'playing',
            worldId,
            levelNum,
            levelConfig,
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

    tick: () => {
        set(s => {
            const newTimer = Math.max(0, s.timer - 0.05);
            const newElapsed = s.elapsed + 0.05;

            // Move monsters
            const newMonsters = s.monsters.map(m => {
                if (m.defeated || m.reachedCastle) return m;
                if (!m.spawned && newElapsed < m.spawnDelay) return m;
                if (!m.spawned) return { ...m, spawned: true };

                const newPos = m.position - m.speed;
                if (newPos <= 5) {
                    return { ...m, position: 5, reachedCastle: true };
                }

                // Boss enrage: speed doubles when below 50% HP
                if (m.isBoss && !m.enraged && m.hp <= m.maxHp * 0.5 && m.hp > 0) {
                    return { ...m, position: newPos, speed: m.speed * 2, enraged: true };
                }

                return { ...m, position: newPos };
            });

            // Check castle damage
            let castleDmg = 0;
            newMonsters.forEach(m => {
                if (m.reachedCastle && !m.defeated) {
                    castleDmg += 10;
                    m.defeated = true;
                }
            });

            const newCastleHp = Math.max(0, s.castleHp - castleDmg);

            // Target locking: keep current target if still valid
            let activeIdx = s.activeMonsterIndex;
            const currentTarget = newMonsters[activeIdx];
            const currentTargetValid = currentTarget
                && !currentTarget.defeated
                && !currentTarget.reachedCastle
                && currentTarget.spawned;

            if (!currentTargetValid) {
                activeIdx = findFrontmostMonsterIndex(newMonsters);
            }

            // Game over: all monsters done, castle destroyed, or time up
            const allDone = newMonsters.every(m => m.defeated || m.reachedCastle);
            const timeUp = newTimer <= 0;
            const castleDestroyed = newCastleHp <= 0;
            const gameOver = timeUp || allDone || castleDestroyed;

            return {
                timer: newTimer,
                elapsed: newElapsed,
                monsters: newMonsters,
                castleHp: newCastleHp,
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

            const monsters = [...s.monsters];
            const activeMonster = monsters[s.activeMonsterIndex];

            if (!activeMonster || activeMonster.defeated || activeMonster.reachedCastle || !activeMonster.spawned) return {};

            if (isCorrect) {
                const newTyped = activeMonster.typed + 1;
                const accuracy = (newCorrect / newTotalChars) * 100;

                const dmgPerChar = activeMonster.maxHp / activeMonster.word.length;
                const newHp = Math.max(0, activeMonster.maxHp - newTyped * dmgPerChar);

                monsters[s.activeMonsterIndex] = {
                    ...activeMonster,
                    typed: newTyped,
                    hp: newHp,
                };

                const wordComplete = newTyped >= activeMonster.word.length;
                if (wordComplete) {
                    monsters[s.activeMonsterIndex].defeated = true;
                    const wordScore = calculateWordScore(
                        activeMonster.word.length,
                        accuracy,
                        newCombo
                    );

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

    // Calculate stars earned for the current level
    // ⭐ = all monsters defeated (survived)
    // ⭐⭐ = survived + accuracy >= 90%
    // ⭐⭐⭐ = survived + accuracy >= 90% + no castle damage
    getStars: () => {
        const s = get();
        const allDefeated = s.monsters.every(m => m.defeated);
        const accuracy = s.getAccuracy();
        if (!allDefeated || s.castleHp <= 0) return 0; // lost

        let stars = 1; // survived
        if (accuracy >= 90) {
            stars = 2; // good accuracy
            if (s.castleHp >= CASTLE_MAX_HP) {
                stars = 3; // perfect: high accuracy AND no damage
            }
        }

        return stars;
    },

    // Calculate coins earned
    getCoinsEarned: () => {
        const s = get();
        const stars = get().getStars();
        if (stars === 0) return 0; // no coins for losing

        const baseCoins = calculateCoins(s.score, s.getAccuracy());
        const world = getWorld(s.worldId);
        const multiplier = world?.coinMultiplier || 1;
        return Math.round(baseCoins * multiplier);
    },
}));

export default useGameStore;
