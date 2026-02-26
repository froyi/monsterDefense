import { describe, it, expect, vi } from 'vitest';
import { CARDS, RARITIES, rollRarity, rollCard, openBoosterPack, getCardById, getCardsByWorld, getEffectDescription } from '../src/utils/tradingCards';

describe('tradingCards', () => {
    describe('CARDS data', () => {
        it('should have 20 cards for World 1', () => {
            const world1 = CARDS.filter(c => c.world === 'village');
            expect(world1.length).toBe(20);
        });

        it('should have correct rarity distribution (10 common, 5 rare, 3 epic, 2 legendary)', () => {
            const world1 = CARDS.filter(c => c.world === 'village');
            expect(world1.filter(c => c.rarity === 'common').length).toBe(10);
            expect(world1.filter(c => c.rarity === 'rare').length).toBe(5);
            expect(world1.filter(c => c.rarity === 'epic').length).toBe(3);
            expect(world1.filter(c => c.rarity === 'legendary').length).toBe(2);
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
    });

    describe('getCardsByWorld', () => {
        it('should return all village cards', () => {
            const cards = getCardsByWorld('village');
            expect(cards.length).toBe(20);
            cards.forEach(c => expect(c.world).toBe('village'));
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
