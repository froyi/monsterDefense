import { describe, it, expect } from 'vitest';
import {
    WORLDS,
    WORLD_CHARS,
    ALL_LEVELS,
    TOTAL_LEVELS,
    TOTAL_STARS,
    getWorld,
    getWorldIndex,
    getLevelsForWorld,
    getLevel,
    getWorldChars,
} from '../src/utils/campaignData';

// ============================================================
// World definitions
// ============================================================
describe('WORLDS', () => {
    it('has exactly 6 worlds', () => {
        expect(WORLDS).toHaveLength(6);
    });

    it('worlds have correct IDs in order', () => {
        const ids = WORLDS.map(w => w.id);
        expect(ids).toEqual(['village', 'forest', 'mountains', 'volcano', 'castle', 'dragon']);
    });

    it('every world has all required fields', () => {
        for (const w of WORLDS) {
            expect(w.id).toBeTruthy();
            expect(w.name).toBeTruthy();
            expect(w.emoji).toBeTruthy();
            expect(w.description).toBeTruthy();
            expect(w.color).toBeTruthy();
            expect(typeof w.requiredStars).toBe('number');
            expect(typeof w.coinMultiplier).toBe('number');
            expect(w.bossName).toBeTruthy();
            expect(w.bossEmoji).toBeTruthy();
        }
    });

    it('first world requires 0 stars', () => {
        expect(WORLDS[0].requiredStars).toBe(0);
    });

    it('coin multiplier increases with world progression', () => {
        for (let i = 1; i < WORLDS.length; i++) {
            expect(WORLDS[i].coinMultiplier).toBeGreaterThanOrEqual(WORLDS[i - 1].coinMultiplier);
        }
    });
});

// ============================================================
// Level generation
// ============================================================
describe('ALL_LEVELS', () => {
    it('has exactly 60 levels (6 worlds × 10 levels)', () => {
        expect(ALL_LEVELS).toHaveLength(60);
        expect(TOTAL_LEVELS).toBe(60);
    });

    it('TOTAL_STARS is 180 (60 × 3)', () => {
        expect(TOTAL_STARS).toBe(180);
    });

    it('every level has required fields', () => {
        for (const l of ALL_LEVELS) {
            expect(l.worldId).toBeTruthy();
            expect(typeof l.level).toBe('number');
            expect(typeof l.monsterCount).toBe('number');
            expect(typeof l.speed).toBe('number');
            expect(l.wordLength).toHaveLength(2);
            expect(typeof l.isBoss).toBe('boolean');
        }
    });

    it('each world has levels 1-10', () => {
        for (const world of WORLDS) {
            const levels = getLevelsForWorld(world.id);
            expect(levels).toHaveLength(10);
            const nums = levels.map(l => l.level).sort((a, b) => a - b);
            expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        }
    });

    it('level 10 of every world is a boss level', () => {
        for (const world of WORLDS) {
            const boss = getLevel(world.id, 10);
            expect(boss.isBoss, `${world.id} level 10 should be boss`).toBe(true);
        }
    });

    it('levels 1-9 are not boss levels', () => {
        for (const world of WORLDS) {
            for (let i = 1; i <= 9; i++) {
                const level = getLevel(world.id, i);
                expect(level.isBoss, `${world.id} level ${i} should not be boss`).toBe(false);
            }
        }
    });

    it('monster count increases with level within each world', () => {
        for (const world of WORLDS) {
            const levels = getLevelsForWorld(world.id).filter(l => !l.isBoss);
            for (let i = 1; i < levels.length; i++) {
                expect(levels[i].monsterCount).toBeGreaterThanOrEqual(levels[i - 1].monsterCount);
            }
        }
    });

    it('speed increases with level within each world (non-boss)', () => {
        for (const world of WORLDS) {
            const levels = getLevelsForWorld(world.id).filter(l => !l.isBoss);
            for (let i = 1; i < levels.length; i++) {
                expect(levels[i].speed).toBeGreaterThanOrEqual(levels[i - 1].speed);
            }
        }
    });

    it('later worlds have more base monsters than earlier worlds', () => {
        const firstWorldL1 = getLevel('village', 1);
        const lastWorldL1 = getLevel('dragon', 1);
        expect(lastWorldL1.monsterCount).toBeGreaterThan(firstWorldL1.monsterCount);
    });

    it('later worlds are faster than earlier worlds', () => {
        const firstWorldL1 = getLevel('village', 1);
        const lastWorldL1 = getLevel('dragon', 1);
        expect(lastWorldL1.speed).toBeGreaterThan(firstWorldL1.speed);
    });
});

// ============================================================
// Character sets
// ============================================================
describe('WORLD_CHARS', () => {
    it('has DE and EN layouts', () => {
        expect(WORLD_CHARS.de).toBeDefined();
        expect(WORLD_CHARS.en).toBeDefined();
    });

    it('every world has a character set in DE', () => {
        for (const w of WORLDS) {
            expect(WORLD_CHARS.de[w.id], `DE chars for ${w.id}`).toBeTruthy();
        }
    });

    it('every world has a character set in EN', () => {
        for (const w of WORLDS) {
            expect(WORLD_CHARS.en[w.id], `EN chars for ${w.id}`).toBeTruthy();
        }
    });

    it('character sets are cumulative (each world adds chars)', () => {
        const worldIds = WORLDS.map(w => w.id);
        for (let i = 1; i < worldIds.length; i++) {
            const prevChars = new Set(WORLD_CHARS.de[worldIds[i - 1]]);
            const currChars = new Set(WORLD_CHARS.de[worldIds[i]]);
            // Every char in previous world should be in current world
            for (const char of prevChars) {
                expect(currChars.has(char), `${worldIds[i]} DE missing '${char}' from ${worldIds[i - 1]}`).toBe(true);
            }
            // Current world should have at least as many chars
            expect(currChars.size).toBeGreaterThanOrEqual(prevChars.size);
        }
    });

    it('village (DE) only has home row chars', () => {
        const homeRow = new Set('asdfghjklö');
        for (const char of WORLD_CHARS.de.village) {
            expect(homeRow.has(char), `Village char '${char}' not in home row`).toBe(true);
        }
    });
});

// ============================================================
// Helper functions
// ============================================================
describe('helper functions', () => {
    it('getWorld returns correct world', () => {
        const world = getWorld('forest');
        expect(world.name).toBe('Zauberwald');
    });

    it('getWorld returns undefined for invalid id', () => {
        expect(getWorld('nonexistent')).toBeUndefined();
    });

    it('getWorldIndex returns correct index', () => {
        expect(getWorldIndex('village')).toBe(0);
        expect(getWorldIndex('dragon')).toBe(5);
    });

    it('getWorldIndex returns -1 for invalid id', () => {
        expect(getWorldIndex('nonexistent')).toBe(-1);
    });

    it('getLevel returns correct level config', () => {
        const level = getLevel('village', 5);
        expect(level.worldId).toBe('village');
        expect(level.level).toBe(5);
    });

    it('getLevel returns undefined for invalid combination', () => {
        expect(getLevel('village', 11)).toBeUndefined();
        expect(getLevel('nonexistent', 1)).toBeUndefined();
    });

    it('getWorldChars returns chars for valid world and layout', () => {
        expect(getWorldChars('village', 'de')).toBe('asdfghjklö');
        expect(getWorldChars('village', 'en')).toBe('asdfghjkl');
    });

    it('getWorldChars falls back to DE for unknown layout', () => {
        expect(getWorldChars('village', 'fr')).toBe('asdfghjklö');
    });
});
