// Profile management store – Supabase backend
import { create } from 'zustand';
import {
    loadProfiles as dbLoadProfiles,
    createProfile as dbCreateProfile,
    verifyPin,
    deleteProfileFromDB,
    setActiveProfile,
} from '../utils/storage';

const AVATARS = ['🧒', '👧', '🦊', '🐱', '🐶', '🐸', '🦄', '🐼', '🐵', '🐰', '🦁', '🐲'];

const useProfileStore = create((set, get) => ({
    profiles: [],
    activeProfileId: null,
    avatars: AVATARS,
    loading: false,
    error: null,

    // Load profiles from Supabase
    fetchProfiles: async () => {
        set({ loading: true, error: null });
        const profiles = await dbLoadProfiles();
        set({ profiles, loading: false });
    },

    // Create a new profile
    createProfile: async (name, avatar, pin) => {
        set({ loading: true, error: null });
        const profile = await dbCreateProfile(name, avatar, pin);
        if (!profile) {
            set({ loading: false, error: 'Profil konnte nicht erstellt werden' });
            return null;
        }
        set(s => ({
            profiles: [...s.profiles, profile],
            loading: false,
        }));
        return profile.id;
    },

    // Verify PIN and select profile
    loginProfile: async (id, pin) => {
        set({ loading: true, error: null });
        const valid = await verifyPin(id, pin);
        if (!valid) {
            set({ loading: false, error: 'Falscher PIN!' });
            return false;
        }
        setActiveProfile(id);
        set({ activeProfileId: id, loading: false, error: null });
        return true;
    },

    // Delete a profile
    deleteProfile: async (id) => {
        set({ loading: true });
        await deleteProfileFromDB(id);
        set(s => ({
            profiles: s.profiles.filter(p => p.id !== id),
            activeProfileId: s.activeProfileId === id ? null : s.activeProfileId,
            loading: false,
        }));
    },

    // Logout (back to profile selection)
    logout: () => {
        setActiveProfile(null);
        set({ activeProfileId: null, error: null });
    },

    clearError: () => set({ error: null }),

    getActiveProfileData: () => {
        const s = get();
        return s.profiles.find(p => p.id === s.activeProfileId) || null;
    },
}));

export default useProfileStore;
