// Skill progression store
import { create } from 'zustand';
import { loadSkills, saveSkills } from '../utils/storage';

const DEFAULT_SKILLS = {
    homeRow: {
        name: 'Grundreihe',
        description: 'a s d f g h j k l ö',
        chars: 'asdfghjklö',
        unlocked: true, // Always unlocked as starting point
        roundsCompleted: 3,
        requiredRounds: 3,
        level: 1,
        icon: '🏠',
    },
    upperRow: {
        name: 'Obere Reihe',
        description: 'q w e r t z u i o p',
        chars: 'qwertzuiop',
        unlocked: false,
        roundsCompleted: 0,
        requiredRounds: 3,
        level: 2,
        icon: '⬆️',
    },
    lowerRow: {
        name: 'Untere Reihe',
        description: 'y x c v b n m',
        chars: 'yxcvbnm',
        unlocked: false,
        roundsCompleted: 0,
        requiredRounds: 3,
        level: 3,
        icon: '⬇️',
    },
    umlauts: {
        name: 'Umlaute',
        description: 'ä ö ü ß',
        chars: 'äöüß',
        unlocked: false,
        roundsCompleted: 0,
        requiredRounds: 3,
        level: 4,
        icon: '🔤',
    },
    capitalization: {
        name: 'Großschreibung',
        description: 'Shift + Buchstaben',
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        unlocked: false,
        roundsCompleted: 0,
        requiredRounds: 3,
        level: 5,
        icon: '⇧',
    },
    numbers: {
        name: 'Zahlen',
        description: '1 2 3 4 5 6 7 8 9 0',
        chars: '1234567890',
        unlocked: false,
        roundsCompleted: 0,
        requiredRounds: 3,
        level: 6,
        icon: '🔢',
    },
    punctuation: {
        name: 'Satzzeichen',
        description: '. , ! ? : ;',
        chars: '.,!?:;-',
        unlocked: false,
        roundsCompleted: 0,
        requiredRounds: 3,
        level: 7,
        icon: '✏️',
    },
};

const useSkillStore = create((set, get) => ({
    skills: loadSkills() || { ...DEFAULT_SKILLS },

    getCurrentLevel: () => {
        const skills = get().skills;
        let maxLevel = 1;
        for (const skill of Object.values(skills)) {
            if (skill.unlocked && skill.level > maxLevel) {
                maxLevel = skill.level;
            }
        }
        // Return level for word generation (capped at 5 since we only have 5 word levels)
        return Math.min(5, maxLevel);
    },

    getNextSkill: () => {
        const skills = get().skills;
        const entries = Object.entries(skills);
        for (const [key, skill] of entries) {
            if (!skill.unlocked) return { key, ...skill };
        }
        return null; // All unlocked
    },

    checkAndUnlock: (accuracy, wpm, averageWpm, letterStats) => {
        set(s => {
            const skills = { ...s.skills };
            let changed = false;

            // Find the next locked skill
            const entries = Object.entries(skills);
            for (const [key, skill] of entries) {
                if (skill.unlocked) continue;

                // Check previous skill is unlocked
                const prevEntry = entries.find(([, sk]) => sk.level === skill.level - 1);
                if (prevEntry && !prevEntry[1].unlocked) break;

                // Check unlock conditions
                if (accuracy >= 92 && wpm >= averageWpm) {
                    // Check error rate for this skill's characters
                    const chars = skill.chars.split('');
                    let highErrorRate = false;
                    for (const c of chars) {
                        const stat = letterStats[c.toLowerCase()];
                        if (stat && stat.count >= 5 && (stat.errors / stat.count) > 0.3) {
                            highErrorRate = true;
                            break;
                        }
                    }

                    if (!highErrorRate) {
                        skills[key] = { ...skill, roundsCompleted: skill.roundsCompleted + 1 };

                        if (skills[key].roundsCompleted >= skill.requiredRounds) {
                            skills[key].unlocked = true;
                            changed = true;
                        }
                    }
                }
                break; // Only check the next skill in line
            }

            if (changed || skills !== s.skills) {
                saveSkills(skills);
            }

            return { skills };
        });
    },

    resetSkills: () => {
        const fresh = { ...DEFAULT_SKILLS };
        saveSkills(fresh);
        set({ skills: fresh });
    },

    reload: () => set({
        skills: loadSkills() || { ...DEFAULT_SKILLS },
    }),
}));

export default useSkillStore;
