import React, { useState } from 'react';
import useCardStore from '../stores/useCardStore';
import { CARDS, RARITIES } from '../utils/tradingCards';
import { WORLDS } from '../utils/campaignData';
import Card from './Card';

export default function CardCollectionScreen({ onBack }) {
    const { ownedCards, equippedCards, equipCard, unequipCard, highlightedCardId, setHighlightedCardId } = useCardStore();
    const [selectedWorld, setSelectedWorld] = useState('village');

    // Handle automated world switching and highlight clearing
    React.useEffect(() => {
        if (highlightedCardId) {
            const cardDef = CARDS.find(c => c.id === highlightedCardId);
            if (cardDef && cardDef.world !== selectedWorld) {
                setSelectedWorld(cardDef.world);
            }

            // Clear highlight after 3 seconds
            const timer = setTimeout(() => {
                setHighlightedCardId(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [highlightedCardId]);

    const world = WORLDS.find(w => w.id === selectedWorld);

    // Sort cards by rarity, then name
    const worldCards = CARDS.filter(c => c.world === selectedWorld).sort((a, b) => {
        const order = { 'common': 1, 'rare': 2, 'epic': 3, 'legendary': 4 };
        if (order[a.rarity] !== order[b.rarity]) return order[a.rarity] - order[b.rarity];
        return a.name.localeCompare(b.name);
    });

    // Statistics
    const totalWorldCards = worldCards.length;
    const ownedWorldCards = worldCards.filter(c => ownedCards[c.id]).length;
    const totalAllCards = CARDS.length;
    const ownedAllCards = CARDS.filter(c => ownedCards[c.id]).length;

    // Loadout logic
    const handleCardClick = (cardId) => {
        const isEquipped = equippedCards.includes(cardId);

        if (isEquipped) {
            const index = equippedCards.indexOf(cardId);
            unequipCard(index);
        } else {
            const emptyIndex = equippedCards.indexOf(null);
            if (emptyIndex !== -1) {
                equipCard(cardId, emptyIndex);
            } else {
                equipCard(cardId, 0);
            }
        }
    };

    return (
        <div className="collection-screen">
            {/* Header */}
            <div className="collection-header">
                <div>
                    <h1 className="collection-title">🃏 Kartensammlung</h1>
                    <p className="collection-subtitle">
                        Gesamt: {ownedAllCards} / {totalAllCards} gesammelt
                    </p>
                </div>
                <button className="btn-back" onClick={onBack}>← Zurück</button>
            </div>

            {/* Loadout Section */}
            <div className="loadout-section">
                <h2 className="loadout-title">Aktives Deck (Max 3)</h2>
                <div className="loadout-slots">
                    {[0, 1, 2].map(slotIndex => {
                        const cardId = equippedCards[slotIndex];
                        const ownedData = cardId ? ownedCards[cardId] : null;

                        return (
                            <div
                                key={slotIndex}
                                className={`loadout-slot ${cardId ? 'loadout-slot-filled' : ''}`}
                                onClick={() => cardId && unequipCard(slotIndex)}
                            >
                                {cardId && ownedData ? (
                                    <Card
                                        cardId={cardId}
                                        level={ownedData.level}
                                        duplicates={ownedData.duplicates}
                                    />
                                ) : (
                                    <span className="loadout-slot-empty">Leerer Slot</span>
                                )}
                            </div>
                        );
                    })}
                </div>
                <p className="loadout-hint">
                    Tippe auf eine Karte, um sie auszurüsten. Ausgerüstete Karten geben dir passive Boni!
                </p>
            </div>

            {/* World Tabs */}
            <div className="collection-world-tabs">
                {WORLDS.map(w => {
                    const wCards = CARDS.filter(c => c.world === w.id);
                    const wOwned = wCards.filter(c => ownedCards[c.id]).length;
                    return (
                        <button
                            key={w.id}
                            className={`collection-world-tab ${selectedWorld === w.id ? 'active' : ''}`}
                            style={{ '--tab-color': w.color }}
                            onClick={() => setSelectedWorld(w.id)}
                        >
                            <span className="tab-emoji">{w.emoji}</span>
                            <span className="tab-name">{w.name}</span>
                            <span className="tab-count">{wOwned}/{wCards.length}</span>
                        </button>
                    );
                })}
            </div>

            {/* Collection Grid */}
            <div className="collection-grid-section">
                <h2 className="collection-world-title">
                    {world?.emoji} {world?.name}: {ownedWorldCards} / {totalWorldCards}
                </h2>

                <div className="collection-grid">
                    {worldCards.map(cardDef => {
                        const ownedData = ownedCards[cardDef.id];
                        const isOwned = !!ownedData;
                        const isEquipped = equippedCards.includes(cardDef.id);

                        return (
                            <div key={cardDef.id} className="collection-card-wrapper">
                                {isEquipped && (
                                    <div className="card-equipped-badge">✓</div>
                                )}

                                {isOwned ? (
                                    <Card
                                        cardId={cardDef.id}
                                        level={ownedData.level}
                                        duplicates={ownedData.duplicates}
                                        onClick={() => handleCardClick(cardDef.id)}
                                        className={isEquipped ? 'card-equipped-ring' : ''}
                                        isHighlighted={highlightedCardId === cardDef.id}
                                    />
                                ) : (
                                    /* Silhouette for unowned cards */
                                    <div className="card-silhouette">
                                        <div className="card-silhouette-emoji">{cardDef.emoji}</div>
                                        <div className="card-silhouette-name">{cardDef.name}</div>
                                        <div className="card-silhouette-rarity">
                                            {RARITIES[cardDef.rarity].name}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Rarity Legend */}
            <div className="collection-legend">
                <span style={{ color: RARITIES.common.color }}>● Häufig (70%)</span>
                <span style={{ color: RARITIES.rare.color }}>● Selten (20%)</span>
                <span style={{ color: RARITIES.epic.color }}>● Episch (8%)</span>
                <span style={{ color: RARITIES.legendary.color }}>● Legendär (2%)</span>
            </div>
        </div>
    );
}
