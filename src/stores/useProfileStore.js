// Profile management store
import { create } from 'zustand';
import { loadProfiles, saveProfiles, setActiveProfile } from '../utils/storage';

const AVATARS = ['🧒', '👧', '🦊', '🐱', '🐶', '🐸', '🦄', '🐼', '🐵', '🐰', '🦁', '🐲'];

function generateId() {
    return 'p_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

const useProfileStore = create((set, get) => ({
    // Profiles: [{ id, name, avatar, createdAt }]
    profiles: loadProfiles(),
    activeProfileId: null,
    avatars: AVATARS,

    createProfile: (name, avatar) => {
        const id = generateId();
        const profile = {
            id,
            name: name.trim(),
            avatar: avatar || '🧒',
            createdAt: new Date().toISOString(),
        };

        set(s => {
            const profiles = [...s.profiles, profile];
            saveProfiles(profiles);
            return { profiles };
        });

        return id;
    },

    deleteProfile: (id) => {
        set(s => {
            const profiles = s.profiles.filter(p => p.id !== id);
            saveProfiles(profiles);

            // Clear profile data from localStorage
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.includes(id)) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(k => localStorage.removeItem(k));

            return {
                profiles,
                activeProfileId: s.activeProfileId === id ? null : s.activeProfileId,
            };
        });
    },

    selectProfile: (id) => {
        setActiveProfile(id);
        set({ activeProfileId: id });
    },

    logout: () => {
        setActiveProfile(null);
        set({ activeProfileId: null });
    },

    getActiveProfileData: () => {
        const s = get();
        return s.profiles.find(p => p.id === s.activeProfileId) || null;
    },
}));

export default useProfileStore;
