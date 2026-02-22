// Skill progression store (Supabase backend)
import { create } from 'zustand';
import { loadSkills, saveSkills } from '../utils/storage';

const DEFAULT_SKILLS = {
    homeRow: {
        name: 'Grundreihe',
        description: 'a s d f g h j k l ö',
        chars: 'asdfghjklö',
        unlocked: true,
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

// Merge DB data into defaults (DB only stores unlocked + roundsCompleted)
function mergeSkills(dbData) {
    const merged = {};
    for (const [key, def] of Object.entries(DEFAULT_SKILLS)) {
        merged[key] = { ...def };
        if (dbData && dbData[key]) {
            merged[key].unlocked = dbData[key].unlocked;
            merged[key].roundsCompleted = dbData[key].roundsCompleted;
        }
    }
    return merged;
}

const useSkillStore = create((set, get) => ({
    skills: { ...DEFAULT_SKILLS },

    getCurrentLevel: () => {
        const skills = get().skills;
        let maxLevel = 1;
        for (const skill of Object.values(skills)) {
            if (skill.unlocked && skill.level > maxLevel) {
                maxLevel = skill.level;
            }
        }
        return Math.min(5, maxLevel);
    },

    getNextSkill: () => {
        const skills = get().skills;
        const entries = Object.entries(skills);
        for (const [key, skill] of entries) {
            if (!skill.unlocked) return { key, ...skill };
        }
        return null;
    },

    checkAndUnlock: (accuracy, wpm, averageWpm, letterStats) => {
        set(s => {
            const skills = { ...s.skills };
            let changed = false;

            const entries = Object.entries(skills);
            for (const [key, skill] of entries) {
                if (skill.unlocked) continue;

                const prevEntry = entries.find(([, sk]) => sk.level === skill.level - 1);
                if (prevEntry && !prevEntry[1].unlocked) break;

                if (accuracy >= 92 && wpm >= averageWpm) {
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
                break;
            }

            if (changed || skills !== s.skills) {
                // Fire-and-forget save
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

    reload: async () => {
        const dbData = await loadSkills();
        set({ skills: mergeSkills(dbData) });
    },
}));

export default useSkillStore;
