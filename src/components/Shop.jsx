import { useState } from 'react';
import useGameStore from '../stores/useGameStore';
import useRewardStore from '../stores/useRewardStore';

const CATEGORY_LABELS = {
    monster: '👾 Monster-Skins',
    castle: '🏰 Burg-Skins',
    effect: '✨ Effekte',
    background: '🌄 Hintergründe',
};

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

    const [activeTab, setActiveTab] = useState('monster');

    const categories = ['monster', 'castle', 'effect', 'background'];
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
        </div>
    );
}

export default Shop;
