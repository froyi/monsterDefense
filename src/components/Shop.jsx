import { useState } from 'react';
import useGameStore from '../stores/useGameStore';
import useRewardStore from '../stores/useRewardStore';
import useCardStore from '../stores/useCardStore';
import useCampaignStore from '../stores/useCampaignStore';
import { openBoosterPack, openMegaPack, rollCard, RARITIES } from '../utils/tradingCards';
import { WORLDS } from '../utils/campaignData';
import Card from './Card';

const CATEGORY_LABELS = {
    boosters: '🃏 Booster-Packs',
    monster: '👾 Monster-Skins',
    castle: '🏰 Burg-Skins',
    effect: '✨ Effekte',
    background: '🌄 Hintergründe',
};

const BOOSTER_PACKS = [
    { id: 'booster_basic', name: 'Basis-Pack', emoji: '📦', price: 100, description: '3 Karten (mind. 1 Seltene)', packType: 'basic' },
    { id: 'booster_premium', name: 'Premium-Pack', emoji: '🎁', price: 250, description: '3 Karten (mind. 1 Epische)', packType: 'premium' },
    { id: 'booster_mega', name: 'Mega-Pack', emoji: '💎', price: 300, description: '4 Karten (mind. 1 Seltene, 2× Episch/Legendär)', packType: 'mega' },
];

function Shop() {
    const setPhase = useGameStore(s => s.setPhase);
    const coins = useRewardStore(s => s.coins);
    const ownedItems = useRewardStore(s => s.ownedItems);
    const activeMonsterSkin = useRewardStore(s => s.activeMonsterSkin);
    const activeCastleSkin = useRewardStore(s => s.activeCastleSkin);
    const activeEffect = useRewardStore(s => s.activeEffect);
    const activeBackground = useRewardStore(s => s.activeBackground);
    const shopItems = useRewardStore(s => s.shopItems);
    const buyItem = useRewardStore(s => s.buyItem);
    const equipItem = useRewardStore(s => s.equipItem);
    const spendCoins = useRewardStore(s => s.spendCoins);
    const receiveCards = useCardStore(s => s.receiveCards);
    const isWorldUnlocked = useCampaignStore(s => s.isWorldUnlocked);
    const unlockedWorlds = WORLDS.filter(w => isWorldUnlocked(w.id)).map(w => w.id);

    const [activeTab, setActiveTab] = useState('boosters');
    const [revealedCards, setRevealedCards] = useState(null); // Array of { card, result }
    const [revealIndex, setRevealIndex] = useState(0); // Which card is currently being shown
    const [packAnimation, setPackAnimation] = useState(false);

    const categories = ['boosters', 'monster', 'castle', 'effect', 'background'];
    const filteredItems = shopItems.filter(item => item.category === activeTab);

    const getActiveForCategory = (category) => {
        switch (category) {
            case 'monster': return activeMonsterSkin;
            case 'castle': return activeCastleSkin;
            case 'effect': return activeEffect;
            case 'background': return activeBackground;
            default: return null;
        }
    };

    const handleBuyBooster = (pack) => {
        if (coins < pack.price) return;

        // Deduct coins
        spendCoins(pack.price);

        // Generate cards from the pack
        const droppedCards = pack.packType === 'mega' ? openMegaPack(unlockedWorlds) : openBoosterPack(unlockedWorlds);

        // If premium pack, force first card to be epic+
        if (pack.packType === 'premium') {
            const epicOrBetter = ['epic', 'legendary'];
            if (!epicOrBetter.includes(droppedCards[0].rarity)) {
                // Re-roll the guaranteed card to be epic
                droppedCards[0] = rollCard(unlockedWorlds, 'epic');
            }
        }

        // Add to collection and get results
        const cardIds = droppedCards.map(c => c.id);
        const results = receiveCards(cardIds);

        // Prepare reveal data
        setRevealedCards(droppedCards.map((card, i) => ({
            card,
            result: results[i],
        })));
        setRevealIndex(0);
        setPackAnimation(true);

        // Start reveal after brief animation
        setTimeout(() => setPackAnimation(false), 800);
    };

    const handleRevealNext = () => {
        if (revealIndex < revealedCards.length - 1) {
            setRevealIndex(revealIndex + 1);
        }
    };

    const handleCloseReveal = () => {
        setRevealedCards(null);
        setRevealIndex(0);
    };

    const allRevealed = revealedCards && revealIndex >= revealedCards.length - 1;

    return (
        <div className="shop-screen">
            <button className="btn-back" onClick={() => setPhase('menu')}>
                ← Zurück
            </button>

            <h1 className="shop-title">🛒 Shop</h1>
            <div className="shop-coins">
                🪙 <span>{coins}</span> Münzen
            </div>

            <div className="shop-tabs">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`shop-tab ${activeTab === cat ? 'active' : ''}`}
                        onClick={() => setActiveTab(cat)}
                    >
                        {CATEGORY_LABELS[cat]}
                    </button>
                ))}
            </div>

            {/* Booster Pack Section */}
            {activeTab === 'boosters' && (
                <div className="shop-grid">
                    {BOOSTER_PACKS.map((pack, idx) => {
                        const canAfford = coins >= pack.price;
                        return (
                            <div
                                key={pack.id}
                                className="shop-item booster-pack"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className="shop-item-emoji" style={{ fontSize: '48px' }}>{pack.emoji}</div>
                                <div className="shop-item-name">{pack.name}</div>
                                <div className="booster-desc">{pack.description}</div>
                                <div className="shop-item-price">🪙 {pack.price}</div>
                                <button
                                    className="btn-buy"
                                    disabled={!canAfford}
                                    onClick={() => handleBuyBooster(pack)}
                                >
                                    {canAfford ? '📦 Öffnen' : 'Zu wenig Münzen'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Skin/Item Shop Grid */}
            {activeTab !== 'boosters' && (
                <div className="shop-grid">
                    {filteredItems.map((item, idx) => {
                        const isOwned = ownedItems.includes(item.id);
                        const isEquipped = getActiveForCategory(item.category) === item.id;
                        const canAfford = coins >= item.price;

                        return (
                            <div
                                key={item.id}
                                className={`shop-item ${isOwned ? 'owned' : ''} ${isEquipped ? 'equipped' : ''}`}
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className="shop-item-emoji">{item.emoji}</div>
                                <div className="shop-item-name">{item.name}</div>

                                {!isOwned && (
                                    <>
                                        <div className="shop-item-price">🪙 {item.price}</div>
                                        <button
                                            className="btn-buy"
                                            disabled={!canAfford}
                                            onClick={() => buyItem(item.id)}
                                        >
                                            {canAfford ? 'Kaufen' : 'Zu wenig Münzen'}
                                        </button>
                                    </>
                                )}

                                {isOwned && !isEquipped && (
                                    <button className="btn-equip" onClick={() => equipItem(item.id)}>
                                        Ausrüsten
                                    </button>
                                )}

                                {isEquipped && (
                                    <span className="equipped-badge">✅ Ausgerüstet</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Booster Reveal Modal */}
            {revealedCards && (
                <div className="booster-reveal-overlay" onClick={allRevealed ? handleCloseReveal : handleRevealNext}>
                    <div className="booster-reveal-modal" onClick={e => e.stopPropagation()}>
                        {packAnimation ? (
                            <div className="pack-opening-anim">
                                <div className="pack-emoji-spin">📦</div>
                                <p>Pack wird geöffnet...</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="booster-reveal-title">
                                    🎴 Karte {revealIndex + 1} / {revealedCards.length}
                                </h2>
                                <div className="booster-reveal-card">
                                    <Card
                                        cardId={revealedCards[revealIndex].card}
                                        level={revealedCards[revealIndex].result.isNew ? 1 : (revealedCards[revealIndex].result.newLevel || 1)}
                                        duplicates={0}
                                        isNew={revealedCards[revealIndex].result.isNew}
                                    />
                                    {revealedCards[revealIndex].result.upgraded && (
                                        <div className="booster-upgrade-badge">⬆️ Level Up!</div>
                                    )}
                                    {revealedCards[revealIndex].result.dustEarned > 0 && (
                                        <div className="booster-dust-badge">✨ +{revealedCards[revealIndex].result.dustEarned} Staub</div>
                                    )}
                                </div>
                                <div className="booster-reveal-actions">
                                    {!allRevealed ? (
                                        <button className="btn-primary" onClick={handleRevealNext}>
                                            Nächste Karte ▶️
                                        </button>
                                    ) : (
                                        <button className="btn-primary" onClick={handleCloseReveal}>
                                            ✅ Fertig
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Shop;
