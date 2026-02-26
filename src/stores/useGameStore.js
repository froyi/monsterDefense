import { create } from 'zustand';
import { generateCampaignWords, generateBossWord } from '../utils/wordGenerator';
import { calculateWordScore, calculateWPM, calculateCoins } from '../utils/scoring';
import { getLevel, getWorld, WORLDS } from '../utils/campaignData';
import useCardStore from './useCardStore';

const ROUND_DURATION = 180; // 3 minutes per level
const MONSTER_BASE_HP = 100;
const CASTLE_MAX_HP = 100;
const MONSTER_BASE_SPEED = 0.25;

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
    comboShields: 0,
    errorShields: 0,

    // Settings
    soundEnabled: true,

    setPhase: (phase) => set({ phase }),
    toggleSound: () => set(s => ({ soundEnabled: !s.soundEnabled })),

    // Start a campaign level
    startLevel: (worldId, levelNum, layout = 'de') => {
        const levelConfig = getLevel(worldId, levelNum);
        if (!levelConfig) return;

        const world = getWorld(worldId);
        const worldIndex = WORLDS.findIndex(w => w.id === worldId);
        const monsterSpeed = MONSTER_BASE_SPEED * levelConfig.speed;

        // Evaluate Passive Card Effects
        const cardStore = useCardStore.getState();
        const baseHpFlat = cardStore.getEffectValue('castle_hp_flat');
        const baseHpPercent = cardStore.getEffectValue('castle_hp_percent');
        const finalMaxHp = (CASTLE_MAX_HP + baseHpFlat) * (1 + baseHpPercent / 100);

        const monsterSlow = cardStore.getEffectValue('monster_slow');
        const bossSlow = cardStore.getEffectValue('boss_slow');

        let monsters;
        let usedWords;

        if (levelConfig.isBoss) {
            // Boss level: minions first, boss spawns LAST
            const minionCount = levelConfig.monsterCount; // minions only
            const minionWords = generateCampaignWords(minionCount, worldId, layout, levelConfig.wordLength);
            usedWords = new Set(minionWords);

            // Create minion monsters with staggered spawns
            const currentSpeed = Math.max(0.01, monsterSpeed * (1 - monsterSlow / 100));
            monsters = minionWords.map((word, i) => createMonster(i, word, currentSpeed));

            // Generate a long boss word and create the boss as the LAST monster
            const bossWord = generateBossWord(worldId, layout, worldIndex);
            const bossId = monsters.length;
            const lastMinionDelay = (minionCount - 1) * 2.0;
            const bSpeed = Math.max(0.01, monsterSpeed * 0.8 * (1 - bossSlow / 100)); // boss slightly slower but tankier
            const bossMonster = createMonster(bossId, bossWord, bSpeed);
            bossMonster.hp = MONSTER_BASE_HP * 3;
            bossMonster.maxHp = MONSTER_BASE_HP * 3;
            bossMonster.spawnDelay = lastMinionDelay + 4; // 4s after last minion
            bossMonster.isBoss = true;
            bossMonster.enraged = false;
            monsters.push(bossMonster);
        } else {
            // Normal level
            const words = generateCampaignWords(levelConfig.monsterCount, worldId, layout, levelConfig.wordLength);
            const currentSpeed = Math.max(0.01, monsterSpeed * (1 - monsterSlow / 100));
            monsters = words.map((word, i) => createMonster(i, word, currentSpeed));
            usedWords = new Set(words);
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
            castleHp: finalMaxHp, // Set to modified max HP
            maxCastleHp: finalMaxHp, // Store max for UI bar percentage
            score: 0,
            combo: 0,
            maxCombo: 0,
            totalCharsTyped: 0,
            correctChars: 0,
            errorChars: 0,
            totalErrors: [],
            wordsCompleted: 0,
            usedWords,
            comboShields: cardStore.getEffectValue('combo_shield'),
            errorShields: cardStore.getEffectValue('forgive_error'),
        });
    },

    tick: () => {
        set(s => {
            const newTimer = Math.max(0, s.timer - 0.05);
            const newElapsed = s.elapsed + 0.05;

            // Boss gate: only spawn boss after all other monsters are defeated
            const allNonBossDefeated = s.monsters
                .filter(m => !m.isBoss)
                .every(m => m.defeated || m.reachedCastle);

            // Move monsters
            const newMonsters = s.monsters.map(m => {
                if (m.defeated || m.reachedCastle) return m;

                // Boss waits until all minions are cleared
                if (m.isBoss && !m.spawned && !allNonBossDefeated) return m;

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
        let isCorrect = char === expectedChar;

        set(s => {
            if (s.phase !== 'playing') return {};

            const monsters = [...s.monsters];
            const activeMonster = monsters[s.activeMonsterIndex];

            if (!activeMonster || activeMonster.defeated || activeMonster.reachedCastle || !activeMonster.spawned) return {};

            // Handle Card Shields
            let consumedErrorShield = false;
            let consumedComboShield = false;

            if (!isCorrect) {
                if (s.errorShields > 0) {
                    // Error Shield ignores the mistake entirely (treats as correct!)
                    isCorrect = true;
                    consumedErrorShield = true;
                } else if (s.comboShields > 0) {
                    // Combo Shield doesn't fix the letter, but it prevents the combo breaking.
                    consumedComboShield = true;
                }
            }

            const newTotalChars = s.totalCharsTyped + 1;
            const newCorrect = isCorrect ? s.correctChars + 1 : s.correctChars;
            const newErrors = isCorrect ? s.errorChars : s.errorChars + 1;

            // Calculate new combo based on correctness and shields
            let newCombo = 0;
            if (isCorrect) {
                newCombo = s.combo + 1;
            } else if (consumedComboShield) {
                newCombo = s.combo; // maintain combo
            } else {
                newCombo = 0; // break combo
            }

            const newMaxCombo = Math.max(s.maxCombo, newCombo);
            const newTotalErrors = isCorrect ? s.totalErrors : [...s.totalErrors, expectedChar];

            // Update Shields State
            const nextErrorShields = consumedErrorShield ? s.errorShields - 1 : s.errorShields;
            const nextComboShields = consumedComboShield ? s.comboShields - 1 : s.comboShields;

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

                    // Only end the game if there are no more monsters to fight
                    // (including unspawned ones still waiting in the queue)
                    const hasUnspawnedMonsters = monsters.some(m => !m.spawned && !m.defeated && !m.reachedCastle);
                    const gameOver = nextIdx === -1 && !hasUnspawnedMonsters;

                    return {
                        monsters,
                        combo: newCombo,
                        maxCombo: newMaxCombo,
                        totalCharsTyped: newTotalChars,
                        correctChars: newCorrect,
                        errorChars: newErrors,
                        totalErrors: newTotalErrors,
                        score: s.score + wordScore,
                        activeMonsterIndex: nextIdx,
                        comboShields: nextComboShields,
                        errorShields: nextErrorShields,
                        phase: gameOver ? 'results' : 'playing',
                        wordsCompleted: s.wordsCompleted + 1,
                    };
                }

                return {
                    monsters,
                    combo: newCombo,
                    maxCombo: newMaxCombo,
                    totalCharsTyped: newTotalChars,
                    correctChars: newCorrect,
                    errorChars: newErrors,
                    totalErrors: newTotalErrors,
                    comboShields: nextComboShields,
                    errorShields: nextErrorShields,
                };
            }

            // Incorrect character typed (but not shielded by error shield)
            // Punishment: double the active monster's speed
            monsters[s.activeMonsterIndex] = {
                ...activeMonster,
                speed: activeMonster.speed * 2,
            };

            return {
                monsters,
                combo: newCombo,
                totalCharsTyped: newTotalChars,
                errorChars: newErrors,
                totalErrors: newTotalErrors,
                comboShields: nextComboShields,
                errorShields: nextErrorShields,
            };
        });
    },

    getAccuracy: () => {
        const s = get();
        const total = s.correctChars + s.errorChars;
        if (total === 0) return 0;
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
    // ⭐⭐⭐ = survived + accuracy >= 90% + no castle damage (respects max HP boost)
    getStars: () => {
        const s = get();
        const allDefeated = s.monsters.every(m => m.defeated);
        const accuracy = s.getAccuracy();
        if (!allDefeated || s.castleHp <= 0) return 0; // lost

        let stars = 1; // survived
        if (accuracy >= 90) {
            stars = 2; // good accuracy
            // Check against dynamic max HP from card buffs
            if (s.castleHp >= s.maxCastleHp) {
                stars = 3; // perfect: high accuracy AND no damage
            }
        }

        return stars;
    },

    // Calculate coins earned (includes passive card bonuses)
    getCoinsEarned: () => {
        const s = get();
        const stars = get().getStars();
        if (stars === 0) return 0; // no coins for losing

        const baseCoins = calculateCoins(s.score, s.getAccuracy());
        const world = getWorld(s.worldId);
        const multiplier = world?.coinMultiplier || 1;

        // Apply card bonus effects
        const cardStore = useCardStore.getState();
        const bonusCoins = cardStore.getEffectValue('bonus_coins');       // e.g. +10%
        const bonusBoth = cardStore.getEffectValue('bonus_coins_xp');     // e.g. +20% on both

        const totalBonus = 1 + (bonusCoins + bonusBoth) / 100;
        return Math.round(baseCoins * multiplier * totalBonus);
    }
}));

export default useGameStore;
