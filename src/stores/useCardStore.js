import { create } from 'zustand';
import { getActiveProfile, loadCards as loadCardsFromDB, saveCards as saveCardsToDB } from '../utils/storage';
import { CARDS, RARITIES } from '../utils/tradingCards';

// Shape of ownedCards:
// {
//    'w1_c1': { level: 1, duplicates: 0 },
//    ...
// }

const useCardStore = create((set, get) => ({
    ownedCards: {},
    equippedCards: [null, null, null], // Max 3 cards equipped
    highlightedCardId: null,
    loading: false,

    // Add a single card to collection
    // Returns { upgraded: boolean, newLevel: number, isNew: boolean, dustEarned: number }
    receiveCard: (cardId) => {
        let result = { upgraded: false, newLevel: 1, isNew: false, dustEarned: 0 };

        set(s => {
            const cardDef = CARDS.find(c => c.id === cardId);
            if (!cardDef) return {}; // safety

            const rarityDef = RARITIES[cardDef.rarity];
            const owned = { ...(s.ownedCards[cardId] || { level: 0, duplicates: 0 }) };

            // First time receiving?
            if (owned.level === 0) {
                owned.level = 1;
                owned.duplicates = 0;
                result.isNew = true;
            } else {
                // Already owned, add duplicate
                if (owned.level < rarityDef.maxLevel) {
                    owned.duplicates += 1;
                    const needed = rarityDef.duplicatesNeeded[owned.level];

                    if (owned.duplicates >= needed) {
                        owned.level += 1;
                        owned.duplicates = 0; // reset for next level, or let it overflow?
                        // Let's reset for simplicity
                        result.upgraded = true;
                        result.newLevel = owned.level;
                    }
                } else {
                    // Max level reached -> converts to dust/coins (handled by caller, but we return amount)
                    result.dustEarned = rarityDef.dropWeight; // temp logic for dust value
                }
            }

            return {
                ownedCards: { ...s.ownedCards, [cardId]: owned }
            };
        });

        get().saveCards();
        return result;
    },

    // Receive multiple cards (e.g. from a booster)
    receiveCards: (cardIds) => {
        const results = cardIds.map(id => get().receiveCard(id));
        return results;
    },

    // Equip a card into a specific slot (0, 1, or 2)
    equipCard: (cardId, slotIndex) => {
        set(s => {
            const equipped = [...s.equippedCards];

            // If card is already equipped elsewhere, remove it there first
            const existingIndex = equipped.indexOf(cardId);
            if (existingIndex !== -1) {
                equipped[existingIndex] = null;
            }

            equipped[slotIndex] = cardId;
            return { equippedCards: equipped };
        });
        get().saveCards();
    },

    // Unequip a slot
    unequipCard: (slotIndex) => {
        set(s => {
            const equipped = [...s.equippedCards];
            equipped[slotIndex] = null;
            return { equippedCards: equipped };
        });
        get().saveCards();
    },

    // Get all active effects of currently equipped cards
    // Returns an array: [{ type: 'bonus_coins', value: 10 }, ...]
    getActiveEffects: () => {
        const s = get();
        const effects = [];

        for (const cardId of s.equippedCards) {
            if (!cardId) continue;

            const cardDef = CARDS.find(c => c.id === cardId);
            const owned = s.ownedCards[cardId];
            if (!cardDef || !owned) continue;

            // Level is 1-indexed (1, 2, or 3)
            const val = cardDef.effectValues[Math.max(0, owned.level - 1)];

            // If the same effect type is equipped multiple times, we sum them
            const existing = effects.find(e => e.type === cardDef.effectType);
            if (existing) {
                existing.value += val;
            } else {
                effects.push({ type: cardDef.effectType, value: val });
            }
        }

        return effects;
    },

    // Check if a specific effect type is active, returns sum of values
    getEffectValue: (effectType) => {
        const effects = get().getActiveEffects();
        const effect = effects.find(e => e.type === effectType);
        return effect ? effect.value : 0;
    },

    // Persistence
    saveCards: () => {
        saveCardsToDB({
            ownedCards: get().ownedCards,
            equippedCards: get().equippedCards
        });
    },

    loadCards: async () => {
        set({ loading: true });
        const data = await loadCardsFromDB();
        if (data) {
            set({
                ownedCards: data.ownedCards || {},
                equippedCards: data.equippedCards || [null, null, null],
                loading: false
            });
        } else {
            set({ ownedCards: {}, equippedCards: [null, null, null], loading: false });
        }
    },

    setHighlightedCardId: (id) => set({ highlightedCardId: id }),

    resetState: () => {
        set({ ownedCards: {}, equippedCards: [null, null, null] });
    }
}));

export default useCardStore;
