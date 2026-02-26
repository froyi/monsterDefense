import { describe, it, expect, vi } from 'vitest';
import { CARDS, RARITIES, rollRarity, rollCard, openBoosterPack, getCardById, getCardsByWorld, getEffectDescription } from '../src/utils/tradingCards';

const WORLD_IDS = ['village', 'forest', 'mountains', 'volcano', 'castle', 'dragon'];

describe('tradingCards', () => {
    describe('CARDS data', () => {
        it('should have exactly 120 cards total (6 worlds × 20)', () => {
            expect(CARDS.length).toBe(120);
        });

        it.each(WORLD_IDS)('should have 20 cards for world "%s"', (worldId) => {
            const worldCards = CARDS.filter(c => c.world === worldId);
            expect(worldCards.length).toBe(20);
        });

        it.each(WORLD_IDS)('should have correct rarity distribution for world "%s" (10/5/3/2)', (worldId) => {
            const worldCards = CARDS.filter(c => c.world === worldId);
            expect(worldCards.filter(c => c.rarity === 'common').length).toBe(10);
            expect(worldCards.filter(c => c.rarity === 'rare').length).toBe(5);
            expect(worldCards.filter(c => c.rarity === 'epic').length).toBe(3);
            expect(worldCards.filter(c => c.rarity === 'legendary').length).toBe(2);
        });

        it('all cards should have required fields', () => {
            CARDS.forEach(card => {
                expect(card.id).toBeTruthy();
                expect(card.world).toBeTruthy();
                expect(card.rarity).toBeTruthy();
                expect(card.name).toBeTruthy();
                expect(card.emoji).toBeTruthy();
                expect(card.description).toBeTruthy();
                expect(card.effectType).toBeTruthy();
                expect(card.effectValues).toBeInstanceOf(Array);
                expect(card.effectValues.length).toBe(3);
                expect(card.effectText).toContain('{val}');
            });
        });

        it('all card IDs should be unique', () => {
            const ids = CARDS.map(c => c.id);
            expect(new Set(ids).size).toBe(ids.length);
        });

        it('all card worlds should be valid world IDs', () => {
            CARDS.forEach(card => {
                expect(WORLD_IDS).toContain(card.world);
            });
        });
    });

    describe('RARITIES', () => {
        it('should define 4 rarities', () => {
            expect(Object.keys(RARITIES).length).toBe(4);
            expect(RARITIES.common).toBeDefined();
            expect(RARITIES.rare).toBeDefined();
            expect(RARITIES.epic).toBeDefined();
            expect(RARITIES.legendary).toBeDefined();
        });

        it('each rarity should have maxLevel 3', () => {
            Object.values(RARITIES).forEach(r => {
                expect(r.maxLevel).toBe(3);
            });
        });
    });

    describe('rollRarity', () => {
        it('should return a valid rarity string', () => {
            for (let i = 0; i < 50; i++) {
                const rarity = rollRarity();
                expect(['common', 'rare', 'epic', 'legendary']).toContain(rarity);
            }
        });

        it('boosted roll should never return common', () => {
            for (let i = 0; i < 100; i++) {
                const rarity = rollRarity(true);
                expect(rarity).not.toBe('common');
            }
        });
    });

    describe('rollCard', () => {
        it('should return a valid card object', () => {
            const card = rollCard('village');
            expect(card).toBeDefined();
            expect(card.id).toBeTruthy();
            expect(card.world).toBe('village');
        });

        it.each(WORLD_IDS)('should only return cards from world "%s" when filtered', (worldId) => {
            for (let i = 0; i < 20; i++) {
                const card = rollCard(worldId);
                expect(card.world).toBe(worldId);
            }
        });

        it('should respect forced rarity', () => {
            for (let i = 0; i < 20; i++) {
                const card = rollCard('village', 'legendary');
                expect(card.rarity).toBe('legendary');
            }
        });

        it('should return any card when worldId is null', () => {
            const card = rollCard(null);
            expect(card).toBeDefined();
            expect(card.id).toBeTruthy();
        });
    });

    describe('openBoosterPack', () => {
        it('should return exactly 3 cards', () => {
            const pack = openBoosterPack();
            expect(pack.length).toBe(3);
        });

        it('the first card should be rare or better (guaranteed)', () => {
            for (let i = 0; i < 30; i++) {
                const pack = openBoosterPack();
                expect(['rare', 'epic', 'legendary']).toContain(pack[0].rarity);
            }
        });

        it('all cards should be valid card objects', () => {
            const pack = openBoosterPack();
            pack.forEach(card => {
                expect(card.id).toBeTruthy();
                expect(card.name).toBeTruthy();
                expect(card.rarity).toBeTruthy();
            });
        });

        it('booster pack can contain cards from different worlds', () => {
            // Run enough packs to have a high probability of seeing multiple worlds
            const worlds = new Set();
            for (let i = 0; i < 100; i++) {
                const pack = openBoosterPack();
                pack.forEach(c => worlds.add(c.world));
            }
            expect(worlds.size).toBeGreaterThan(1);
        });
    });

    describe('getCardById', () => {
        it('should return card by ID', () => {
            const card = getCardById('w1_c1');
            expect(card).toBeDefined();
            expect(card.name).toBe('Heugabel');
        });

        it('should return undefined for invalid ID', () => {
            const card = getCardById('nonexistent');
            expect(card).toBeUndefined();
        });

        it.each([
            ['w2_c1', 'Glühwürmchen'],
            ['w3_c1', 'Schneefuchs'],
            ['w4_c1', 'Magmawurm'],
            ['w5_c1', 'Burgfledermaus'],
            ['w6_c1', 'Drachenbaby'],
        ])('should find card %s (%s)', (id, name) => {
            const card = getCardById(id);
            expect(card).toBeDefined();
            expect(card.name).toBe(name);
        });
    });

    describe('getCardsByWorld', () => {
        it.each(WORLD_IDS)('should return 20 cards for world "%s"', (worldId) => {
            const cards = getCardsByWorld(worldId);
            expect(cards.length).toBe(20);
            cards.forEach(c => expect(c.world).toBe(worldId));
        });

        it('should return empty array for unknown world', () => {
            const cards = getCardsByWorld('unknown_world');
            expect(cards.length).toBe(0);
        });
    });

    describe('getEffectDescription', () => {
        it('should return formatted effect text for level 1', () => {
            const desc = getEffectDescription('w1_c1', 1);
            expect(desc).toContain('2'); // effectValues[0] = 2
            expect(desc).toContain('Münzen');
        });

        it('should return formatted effect text for level 3', () => {
            const desc = getEffectDescription('w1_c1', 3);
            expect(desc).toContain('6'); // effectValues[2] = 6
        });

        it('should return empty string for invalid card', () => {
            expect(getEffectDescription('fake', 1)).toBe('');
        });
    });
});
