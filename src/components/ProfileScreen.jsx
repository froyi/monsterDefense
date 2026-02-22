import { useState } from 'react';
import useProfileStore from '../stores/useProfileStore';

function ProfileScreen() {
    const profiles = useProfileStore(s => s.profiles);
    const avatars = useProfileStore(s => s.avatars);
    const createProfile = useProfileStore(s => s.createProfile);
    const selectProfile = useProfileStore(s => s.selectProfile);
    const deleteProfile = useProfileStore(s => s.deleteProfile);

    const [mode, setMode] = useState('select'); // 'select' | 'create'
    const [newName, setNewName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('🧒');
    const [confirmDelete, setConfirmDelete] = useState(null);

    const handleCreate = () => {
        if (!newName.trim()) return;
        const id = createProfile(newName, selectedAvatar);
        selectProfile(id);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleCreate();
    };

    const handleDelete = (id) => {
        deleteProfile(id);
        setConfirmDelete(null);
    };

    if (mode === 'create') {
        return (
            <div className="profile-screen">
                <div className="profile-card create-card">
                    <h1 className="profile-title">Neues Profil erstellen</h1>

                    <div className="avatar-preview">{selectedAvatar}</div>

                    <div className="avatar-grid">
                        {avatars.map(a => (
                            <button
                                key={a}
                                className={`avatar-btn ${selectedAvatar === a ? 'selected' : ''}`}
                                onClick={() => setSelectedAvatar(a)}
                            >
                                {a}
                            </button>
                        ))}
                    </div>

                    <input
                        className="profile-input"
                        type="text"
                        placeholder="Dein Name..."
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        maxLength={20}
                        autoFocus
                    />

                    <div className="profile-actions">
                        <button
                            className="btn-primary"
                            onClick={handleCreate}
                            disabled={!newName.trim()}
                            style={{ fontSize: '20px', opacity: newName.trim() ? 1 : 0.4 }}
                        >
                            ✨ Los geht's!
                        </button>
                        <button className="btn-secondary" onClick={() => setMode('select')}>
                            ← Zurück
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-screen">
            <div className="profile-card">
                <h1 className="profile-title">Wer spielt heute?</h1>
                <p className="profile-subtitle">Wähle dein Profil oder erstelle ein neues</p>

                {profiles.length > 0 && (
                    <div className="profile-list">
                        {profiles.map(p => (
                            <div key={p.id} className="profile-item">
                                <button
                                    className="profile-select-btn"
                                    onClick={() => selectProfile(p.id)}
                                >
                                    <span className="profile-avatar">{p.avatar}</span>
                                    <span className="profile-name">{p.name}</span>
                                </button>
                                {confirmDelete === p.id ? (
                                    <div className="profile-delete-confirm">
                                        <span style={{ fontSize: '13px', color: 'var(--color-orange)' }}>Wirklich?</span>
                                        <button
                                            className="profile-delete-yes"
                                            onClick={() => handleDelete(p.id)}
                                        >
                                            Ja
                                        </button>
                                        <button
                                            className="profile-delete-no"
                                            onClick={() => setConfirmDelete(null)}
                                        >
                                            Nein
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="profile-delete-btn"
                                        onClick={() => setConfirmDelete(p.id)}
                                        title="Profil löschen"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <button
                    className="btn-primary"
                    onClick={() => setMode('create')}
                    style={{ fontSize: '20px', marginTop: profiles.length > 0 ? '16px' : '32px' }}
                >
                    ➕ Neues Profil
                </button>
            </div>
        </div>
    );
}

export default ProfileScreen;
