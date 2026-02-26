import { useState, useEffect } from 'react';
import useProfileStore from '../stores/useProfileStore';
import { verifyPin } from '../utils/storage';

function ProfileScreen() {
    const {
        profiles, avatars, loading, error,
        fetchProfiles, createProfile, loginProfile, deleteProfile, clearError,
    } = useProfileStore();

    const [mode, setMode] = useState('select'); // 'select' | 'create' | 'pin'
    const [selectedAvatar, setSelectedAvatar] = useState('🧒');
    const [name, setName] = useState('');
    const [pin, setPin] = useState('');
    const [targetProfile, setTargetProfile] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [deletePin, setDeletePin] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        fetchProfiles().then(() => setFetched(true));
    }, []);

    // Auto-switch to create only if DB returned 0 profiles
    useEffect(() => {
        if (fetched && !loading && profiles.length === 0 && mode === 'select') {
            setMode('create');
        }
    }, [profiles, loading, mode, fetched]);

    const handleCreate = async () => {
        if (!name.trim() || pin.length !== 4) return;
        const profileId = await createProfile(name, selectedAvatar, pin);
        if (profileId) {
            // Auto-login after creation
            await loginProfile(profileId, pin);
        }
    };

    const handleSelectProfile = (profile) => {
        setTargetProfile(profile);
        setPin('');
        clearError();
        setMode('pin');
    };

    const handleLogin = async () => {
        if (pin.length !== 4 || !targetProfile) return;
        await loginProfile(targetProfile.id, pin);
    };

    const handleDelete = async (id) => {
        if (deletePin.length !== 4) return;
        const valid = await verifyPin(id, deletePin);
        if (!valid) {
            setDeleteError('Falscher PIN!');
            return;
        }
        await deleteProfile(id);
        setConfirmDelete(null);
        setDeletePin('');
        setDeleteError('');
    };

    // PIN input screen
    if (mode === 'pin' && targetProfile) {
        return (
            <div className="profile-screen">
                <div className="profile-card">
                    <h2 className="profile-title">Willkommen zurück!</h2>
                    <div className="avatar-preview">{targetProfile.avatar}</div>
                    <p className="profile-subtitle">{targetProfile.name}, gib deinen PIN ein</p>

                    <input
                        className="profile-input"
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        placeholder="4-stelliger PIN"
                        value={pin}
                        onChange={e => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                            setPin(val);
                            clearError();
                        }}
                        onKeyDown={e => e.key === 'Enter' && handleLogin()}
                        autoFocus
                    />

                    {error && <p style={{ color: 'var(--color-red-soft)', marginBottom: 'var(--space-md)', fontWeight: 600 }}>{error}</p>}

                    <div className="profile-actions">
                        <button
                            className="btn-primary"
                            onClick={handleLogin}
                            disabled={pin.length !== 4 || loading}
                            style={{ opacity: pin.length !== 4 ? 0.5 : 1 }}
                        >
                            {loading ? '⏳ ...' : '🔓 Einloggen'}
                        </button>
                        <button className="btn-secondary" onClick={() => { setMode('select'); setPin(''); clearError(); }}>
                            ← Zurück
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Create profile screen
    if (mode === 'create') {
        return (
            <div className="profile-screen">
                <div className="profile-card">
                    <h2 className="profile-title">Neues Profil erstellen</h2>
                    <div className="avatar-preview">{selectedAvatar}</div>

                    <div className="avatar-grid">
                        {avatars.map(a => (
                            <button
                                key={a}
                                className={`avatar-btn${selectedAvatar === a ? ' selected' : ''}`}
                                onClick={() => setSelectedAvatar(a)}
                            >
                                {a}
                            </button>
                        ))}
                    </div>

                    <input
                        className="profile-input"
                        type="text"
                        maxLength={12}
                        placeholder="Dein Name..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                    />

                    <input
                        className="profile-input"
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        placeholder="4-stelliger PIN"
                        value={pin}
                        onChange={e => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                            setPin(val);
                        }}
                    />

                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
                        Merke dir deinen PIN – damit loggst du dich ein!
                    </p>

                    {error && <p style={{ color: 'var(--color-red-soft)', marginBottom: 'var(--space-md)', fontWeight: 600 }}>{error}</p>}

                    <div className="profile-actions">
                        <button
                            className="btn-primary"
                            onClick={handleCreate}
                            disabled={!name.trim() || pin.length !== 4 || loading}
                            style={{ opacity: (!name.trim() || pin.length !== 4) ? 0.5 : 1 }}
                        >
                            {loading ? '⏳ ...' : '✨ Los geht\'s!'}
                        </button>
                        {profiles.length > 0 && (
                            <button className="btn-secondary" onClick={() => setMode('select')}>
                                ← Zurück
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Select profile screen
    return (
        <div className="profile-screen">
            <div className="profile-card">
                <h2 className="profile-title">Wer spielt heute?</h2>
                <p className="profile-subtitle">Wähle dein Profil oder erstelle ein neues</p>

                {loading && <p style={{ color: 'var(--text-muted)' }}>Lade Profile... ⏳</p>}

                <div className="profile-list">
                    {profiles.map(p => (
                        <div key={p.id} className="profile-item">
                            <button
                                className="profile-select-btn"
                                onClick={() => handleSelectProfile(p)}
                            >
                                <span className="profile-avatar">{p.avatar}</span>
                                <span className="profile-name">{p.name}</span>
                            </button>
                            {confirmDelete === p.id ? (
                                <div className="profile-delete-confirm">
                                    <input
                                        className="profile-delete-pin"
                                        type="password"
                                        inputMode="numeric"
                                        maxLength={4}
                                        placeholder="PIN"
                                        value={deletePin}
                                        onChange={e => {
                                            setDeletePin(e.target.value.replace(/\D/g, '').slice(0, 4));
                                            setDeleteError('');
                                        }}
                                        onKeyDown={e => e.key === 'Enter' && handleDelete(p.id)}
                                        autoFocus
                                    />
                                    <button
                                        className="profile-delete-yes"
                                        onClick={() => handleDelete(p.id)}
                                        disabled={deletePin.length !== 4}
                                    >🗑️</button>
                                    <button className="profile-delete-no" onClick={() => { setConfirmDelete(null); setDeletePin(''); setDeleteError(''); }}>✕</button>
                                    {deleteError && <span className="profile-delete-error">{deleteError}</span>}
                                </div>
                            ) : (
                                <button className="profile-delete-btn" onClick={() => { setConfirmDelete(p.id); setDeletePin(''); setDeleteError(''); }}>🗑️</button>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    className="btn-primary"
                    onClick={() => { setMode('create'); setName(''); setPin(''); setSelectedAvatar('🧒'); clearError(); }}
                    style={{ marginTop: 'var(--space-md)' }}
                >
                    + Neues Profil
                </button>
            </div>
        </div>
    );
}

export default ProfileScreen;
