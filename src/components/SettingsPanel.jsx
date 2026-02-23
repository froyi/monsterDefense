import useRewardStore from '../stores/useRewardStore';

const LAYOUTS = [
    { id: 'de', name: 'Deutsch', flag: '🇩🇪', desc: 'QWERTZ-Tastatur' },
    { id: 'en', name: 'English', flag: '🇬🇧', desc: 'QWERTY Keyboard' },
];

function SettingsPanel({ onClose }) {
    const keyboardLayout = useRewardStore(s => s.keyboardLayout);
    const setKeyboardLayout = useRewardStore(s => s.setKeyboardLayout);

    return (
        <div className="settings-overlay" onClick={onClose}>
            <div className="settings-modal" onClick={e => e.stopPropagation()}>
                <button className="settings-close" onClick={onClose} aria-label="Schließen">✕</button>
                <h2 className="settings-title">⚙️ Einstellungen</h2>

                <div className="settings-section">
                    <h3 className="settings-section-title">⌨️ Tastatur-Layout</h3>
                    <p className="settings-desc">
                        Wähle dein Tastatur-Layout. Die Wörter im Spiel passen sich automatisch an.
                    </p>
                    <div className="layout-options">
                        {LAYOUTS.map(layout => (
                            <button
                                key={layout.id}
                                className={`layout-option ${keyboardLayout === layout.id ? 'active' : ''}`}
                                onClick={() => setKeyboardLayout(layout.id)}
                            >
                                <span className="layout-flag">{layout.flag}</span>
                                <div className="layout-info">
                                    <span className="layout-name">{layout.name}</span>
                                    <span className="layout-desc">{layout.desc}</span>
                                </div>
                                {keyboardLayout === layout.id && (
                                    <span className="layout-check">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <button className="settings-back-btn" onClick={onClose}>
                    ← Zurück
                </button>
            </div>
        </div>
    );
}

export default SettingsPanel;
