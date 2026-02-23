import useRewardStore from '../stores/useRewardStore';

const LAYOUTS = [
    { id: 'de', name: 'Deutsch', flag: '🇩🇪', desc: 'QWERTZ-Tastatur' },
    { id: 'en', name: 'English', flag: '🇬🇧', desc: 'QWERTY Keyboard' },
];

function SettingsPanel({ onClose }) {
    const keyboardLayout = useRewardStore(s => s.keyboardLayout);
    const setKeyboardLayout = useRewardStore(s => s.setKeyboardLayout);

    return (
        <div className="overlay" onClick={onClose}>
            <div className="settings-panel" onClick={e => e.stopPropagation()}>
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
                                <span className="layout-name">{layout.name}</span>
                                <span className="layout-desc">{layout.desc}</span>
                                {keyboardLayout === layout.id && (
                                    <span className="layout-check">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <button className="btn-secondary" onClick={onClose} style={{ marginTop: 'var(--space-lg)' }}>
                    ← Zurück
                </button>
            </div>
        </div>
    );
}

export default SettingsPanel;
