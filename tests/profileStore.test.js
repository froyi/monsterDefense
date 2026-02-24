import { describe, it, expect, vi, beforeEach } from 'vitest';

// Declare mock data with vi.hoisted so it's available inside vi.mock factories
const { mockProfiles } = vi.hoisted(() => ({
    mockProfiles: [
        { id: 'profile-1', name: 'Alice', avatar: '🐱', pin: '1234' },
        { id: 'profile-2', name: 'Bob', avatar: '🦊', pin: '5678' },
    ],
}));

// Mock Supabase and all storage functions
vi.mock('../src/utils/supabaseClient', () => ({
    supabase: {
        from: () => ({
            select: () => ({ eq: () => ({ data: [], error: null }) }),
            insert: () => ({ select: () => ({ data: [{ id: 'new-id', name: 'Test', avatar: '🦊', pin: '1234' }], error: null }) }),
            update: () => ({ eq: () => ({ data: null, error: null }) }),
            delete: () => ({ eq: () => ({ data: null, error: null }) }),
        }),
        auth: { getSession: () => ({ data: { session: null } }) },
    },
}));

vi.mock('../src/utils/storage', () => ({
    loadProfiles: vi.fn().mockResolvedValue(mockProfiles),
    createProfile: vi.fn().mockResolvedValue({ id: 'new-id', name: 'NewKid', avatar: '🐶', pin: '9999' }),
    verifyPin: vi.fn().mockImplementation(async (id, pin) => {
        if (id === 'profile-1' && pin === '1234') return true;
        if (id === 'profile-2' && pin === '5678') return true;
        return false;
    }),
    deleteProfileFromDB: vi.fn().mockResolvedValue(true),
    setActiveProfile: vi.fn(),
    getActiveProfile: vi.fn(() => null),
    loadRewards: vi.fn().mockResolvedValue({}),
    saveRewards: vi.fn(),
    loadSkills: vi.fn().mockResolvedValue({}),
    saveSkills: vi.fn(),
}));

import useProfileStore from '../src/stores/useProfileStore';

describe('useProfileStore', () => {
    beforeEach(() => {
        useProfileStore.setState({
            profiles: [],
            activeProfileId: null,
            loading: false,
            error: null,
        });
    });

    // ────────────────────────────────────────────
    // Initial state
    // ────────────────────────────────────────────
    describe('initial state', () => {
        it('starts with no active profile', () => {
            expect(useProfileStore.getState().activeProfileId).toBeNull();
        });

        it('has 12 available avatars', () => {
            expect(useProfileStore.getState().avatars).toHaveLength(12);
        });

        it('starts with no error', () => {
            expect(useProfileStore.getState().error).toBeNull();
        });
    });

    // ────────────────────────────────────────────
    // fetchProfiles
    // ────────────────────────────────────────────
    describe('fetchProfiles', () => {
        it('loads profiles from storage', async () => {
            await useProfileStore.getState().fetchProfiles();
            expect(useProfileStore.getState().profiles).toHaveLength(2);
        });

        it('profiles have correct data', async () => {
            await useProfileStore.getState().fetchProfiles();
            const profiles = useProfileStore.getState().profiles;
            expect(profiles[0].name).toBe('Alice');
            expect(profiles[1].name).toBe('Bob');
        });

        it('clears loading state after fetch', async () => {
            await useProfileStore.getState().fetchProfiles();
            expect(useProfileStore.getState().loading).toBe(false);
        });
    });

    // ────────────────────────────────────────────
    // createProfile
    // ────────────────────────────────────────────
    describe('createProfile', () => {
        it('creates a new profile and returns its id', async () => {
            const id = await useProfileStore.getState().createProfile('NewKid', '🐶', '9999');
            expect(id).toBe('new-id');
        });

        it('adds the new profile to the list', async () => {
            await useProfileStore.getState().createProfile('NewKid', '🐶', '9999');
            const profiles = useProfileStore.getState().profiles;
            expect(profiles.some(p => p.id === 'new-id')).toBe(true);
        });

        it('clears loading after creation', async () => {
            await useProfileStore.getState().createProfile('NewKid', '🐶', '9999');
            expect(useProfileStore.getState().loading).toBe(false);
        });
    });

    // ────────────────────────────────────────────
    // loginProfile
    // ────────────────────────────────────────────
    describe('loginProfile', () => {
        it('returns true and sets activeProfileId on correct PIN', async () => {
            const result = await useProfileStore.getState().loginProfile('profile-1', '1234');
            expect(result).toBe(true);
            expect(useProfileStore.getState().activeProfileId).toBe('profile-1');
        });

        it('returns false and sets error on wrong PIN', async () => {
            const result = await useProfileStore.getState().loginProfile('profile-1', '0000');
            expect(result).toBe(false);
            expect(useProfileStore.getState().error).toBeTruthy();
            expect(useProfileStore.getState().activeProfileId).toBeNull();
        });

        it('clears error on subsequent successful login', async () => {
            await useProfileStore.getState().loginProfile('profile-1', '0000'); // fail
            await useProfileStore.getState().loginProfile('profile-1', '1234'); // succeed
            expect(useProfileStore.getState().error).toBeNull();
        });
    });

    // ────────────────────────────────────────────
    // logout
    // ────────────────────────────────────────────
    describe('logout', () => {
        it('clears activeProfileId', async () => {
            await useProfileStore.getState().loginProfile('profile-1', '1234');
            useProfileStore.getState().logout();
            expect(useProfileStore.getState().activeProfileId).toBeNull();
        });

        it('clears any error', async () => {
            useProfileStore.setState({ error: 'Some error' });
            useProfileStore.getState().logout();
            expect(useProfileStore.getState().error).toBeNull();
        });
    });

    // ────────────────────────────────────────────
    // deleteProfile
    // ────────────────────────────────────────────
    describe('deleteProfile', () => {
        it('removes the profile from the list', async () => {
            useProfileStore.setState({ profiles: [...mockProfiles] });
            await useProfileStore.getState().deleteProfile('profile-1');
            const profiles = useProfileStore.getState().profiles;
            expect(profiles.find(p => p.id === 'profile-1')).toBeUndefined();
        });

        it('clears activeProfileId if deleted profile was active', async () => {
            useProfileStore.setState({ profiles: [...mockProfiles], activeProfileId: 'profile-1' });
            await useProfileStore.getState().deleteProfile('profile-1');
            expect(useProfileStore.getState().activeProfileId).toBeNull();
        });

        it('keeps activeProfileId if a different profile is deleted', async () => {
            useProfileStore.setState({ profiles: [...mockProfiles], activeProfileId: 'profile-2' });
            await useProfileStore.getState().deleteProfile('profile-1');
            expect(useProfileStore.getState().activeProfileId).toBe('profile-2');
        });
    });

    // ────────────────────────────────────────────
    // getActiveProfileData
    // ────────────────────────────────────────────
    describe('getActiveProfileData', () => {
        it('returns null when no profile is active', () => {
            expect(useProfileStore.getState().getActiveProfileData()).toBeNull();
        });

        it('returns profile data for active profile', () => {
            useProfileStore.setState({ profiles: [...mockProfiles], activeProfileId: 'profile-1' });
            const data = useProfileStore.getState().getActiveProfileData();
            expect(data.name).toBe('Alice');
            expect(data.avatar).toBe('🐱');
        });
    });

    // ────────────────────────────────────────────
    // clearError
    // ────────────────────────────────────────────
    describe('clearError', () => {
        it('clears the error state', () => {
            useProfileStore.setState({ error: 'Something went wrong' });
            useProfileStore.getState().clearError();
            expect(useProfileStore.getState().error).toBeNull();
        });
    });
});
