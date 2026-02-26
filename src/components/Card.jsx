import React from 'react';
import { getEffectDescription, getCardById, RARITIES } from '../utils/tradingCards';

export default function Card({ cardId, level = 1, duplicates = 0, isNew = false, isHighlighted = false, onClick, className = '' }) {
    const isObject = typeof cardId === 'object';
    const cardDef = isObject ? cardId : getCardById(cardId);

    if (!cardDef) return null;

    const rarityDef = RARITIES[cardDef.rarity] || RARITIES.common;
    const isMaxLevel = level >= rarityDef.maxLevel;
    const duplicatesNeeded = rarityDef.duplicatesNeeded[level] || 1;

    return (
        <div
            className={`card-item card-rarity-${cardDef.rarity} ${onClick ? 'card-clickable' : ''} ${isHighlighted ? 'card-highlight-glow' : ''} ${className}`}
            onClick={onClick}
        >
            {/* New Badge */}
            {isNew && (
                <div className="card-new-badge">NEU!</div>
            )}

            {/* Rarity Label */}
            <div className="card-rarity-label">{rarityDef.name}</div>

            {/* Emoji */}
            <div className={`card-emoji ${cardDef.rarity === 'epic' || cardDef.rarity === 'legendary' ? 'card-emoji-glow' : ''}`}>
                {cardDef.emoji}
            </div>

            {/* Name */}
            <div className="card-name">{cardDef.name}</div>

            {/* Effect Description */}
            <div className="card-effect">
                {getEffectDescription(cardDef.id, level)}
            </div>

            {/* Level & Progress */}
            <div className="card-level-section">
                <div className="card-level-info">
                    <span>Lvl {level}</span>
                    <span>{isMaxLevel ? 'MAX' : `${duplicates}/${duplicatesNeeded}`}</span>
                </div>
                {!isMaxLevel && (
                    <div className="card-progress-bar">
                        <div
                            className="card-progress-fill"
                            style={{ width: `${(duplicates / duplicatesNeeded) * 100}%` }}
                        />
                    </div>
                )}
            </div>

            {/* Shine effect overlay for Epic/Legendary */}
            {(cardDef.rarity === 'epic' || cardDef.rarity === 'legendary') && (
                <div className="card-shine-overlay card-shine-anim" />
            )}
        </div>
    );
}
