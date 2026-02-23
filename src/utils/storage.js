// Storage layer – Supabase backend with localStorage fallback
import { supabase } from './supabaseClient';

let _profileId = null;

export function setActiveProfile(profileId) {
    _profileId = profileId;
}

export function getActiveProfile() {
    return _profileId;
}

// ==========================================
// Profile management (Supabase)
// ==========================================

export async function loadProfiles() {
    const { data, error } = await supabase
        .from('profiles')
        .select('id, name, avatar, created_at')
        .order('created_at', { ascending: true });
    if (error) {
        console.warn('Failed to load profiles:', error);
        return [];
    }
    return data || [];
}

export async function createProfile(name, avatar, pin) {
    // Simple hash for PIN (not cryptographic, just obfuscation for kids game)
    const pinHash = btoa(pin);
    const { data, error } = await supabase
        .from('profiles')
        .insert({ name: name.trim(), avatar, pin_hash: pinHash })
        .select('id, name, avatar, created_at')
        .single();
    if (error) {
        console.warn('Failed to create profile:', error);
        return null;
    }

    // Initialize rewards row
    await supabase.from('rewards').insert({ profile_id: data.id });

    // Initialize default skills
    const defaultSkills = [
        { profile_id: data.id, skill_key: 'homeRow', unlocked: true, rounds_completed: 3 },
        { profile_id: data.id, skill_key: 'upperRow', unlocked: false, rounds_completed: 0 },
        { profile_id: data.id, skill_key: 'lowerRow', unlocked: false, rounds_completed: 0 },
        { profile_id: data.id, skill_key: 'umlauts', unlocked: false, rounds_completed: 0 },
        { profile_id: data.id, skill_key: 'capitalization', unlocked: false, rounds_completed: 0 },
        { profile_id: data.id, skill_key: 'numbers', unlocked: false, rounds_completed: 0 },
        { profile_id: data.id, skill_key: 'punctuation', unlocked: false, rounds_completed: 0 },
    ];
    await supabase.from('skills').insert(defaultSkills);

    return data;
}

export async function verifyPin(profileId, pin) {
    const { data, error } = await supabase
        .from('profiles')
        .select('pin_hash')
        .eq('id', profileId)
        .single();
    if (error || !data) return false;
    return data.pin_hash === btoa(pin);
}

export async function deleteProfileFromDB(profileId) {
    // CASCADE will handle related tables
    const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', profileId);
    return !error;
}

// ==========================================
// Letter stats (Supabase)
// ==========================================

export async function loadLetterStats() {
    if (!_profileId) return {};
    const { data, error } = await supabase
        .from('letter_stats')
        .select('char, count, errors, avg_reaction_ms, streak')
        .eq('profile_id', _profileId);
    if (error) {
        console.warn('Failed to load letter stats:', error);
        return {};
    }
    const stats = {};
    (data || []).forEach(row => {
        stats[row.char] = {
            count: row.count,
            errors: row.errors,
            avgReactionMs: row.avg_reaction_ms,
            streak: row.streak,
        };
    });
    return stats;
}

export async function saveLetterStats(stats) {
    if (!_profileId) return;
    const rows = Object.entries(stats).map(([char, s]) => ({
        profile_id: _profileId,
        char,
        count: s.count,
        errors: s.errors,
        avg_reaction_ms: s.avgReactionMs,
        streak: s.streak,
    }));
    if (rows.length === 0) return;

    const { error } = await supabase
        .from('letter_stats')
        .upsert(rows, { onConflict: 'profile_id,char' });
    if (error) console.warn('Failed to save letter stats:', error);
}

// ==========================================
// Skills (Supabase)
// ==========================================

export async function loadSkills() {
    if (!_profileId) return null;
    const { data, error } = await supabase
        .from('skills')
        .select('skill_key, unlocked, rounds_completed')
        .eq('profile_id', _profileId);
    if (error || !data || data.length === 0) return null;

    const skills = {};
    data.forEach(row => {
        skills[row.skill_key] = {
            unlocked: row.unlocked,
            roundsCompleted: row.rounds_completed,
        };
    });
    return skills;
}

export async function saveSkills(skills) {
    if (!_profileId) return;
    const rows = Object.entries(skills).map(([key, s]) => ({
        profile_id: _profileId,
        skill_key: key,
        unlocked: s.unlocked,
        rounds_completed: s.roundsCompleted,
    }));
    if (rows.length === 0) return;

    const { error } = await supabase
        .from('skills')
        .upsert(rows, { onConflict: 'profile_id,skill_key' });
    if (error) console.warn('Failed to save skills:', error);
}

// ==========================================
// Rewards (Supabase)
// ==========================================

export async function loadRewards() {
    if (!_profileId) return null;
    const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('profile_id', _profileId)
        .single();
    if (error || !data) return null;
    return {
        coins: data.coins,
        totalCoinsEarned: data.total_coins_earned,
        ownedItems: data.owned_items || [],
        activeMonsterSkin: data.active_monster_skin,
        activeCastleSkin: data.active_castle_skin,
        activeEffect: data.active_effect,
        activeBackground: data.active_background,
        lastDailyChest: data.last_daily_chest,
        streak: data.streak,
        lastPlayDate: data.last_play_date,
    };
}

export async function saveRewards(rewards) {
    if (!_profileId) return;
    const { error } = await supabase
        .from('rewards')
        .update({
            coins: rewards.coins,
            total_coins_earned: rewards.totalCoinsEarned,
            owned_items: rewards.ownedItems || [],
            active_monster_skin: rewards.activeMonsterSkin,
            active_castle_skin: rewards.activeCastleSkin,
            active_effect: rewards.activeEffect,
            active_background: rewards.activeBackground,
            last_daily_chest: rewards.lastDailyChest,
            streak: rewards.streak,
            last_play_date: rewards.lastPlayDate,
        })
        .eq('profile_id', _profileId);
    if (error) console.warn('Failed to save rewards:', error);
}

// ==========================================
// Round History (Supabase)
// ==========================================

export async function loadHistory() {
    if (!_profileId) return [];
    const { data, error } = await supabase
        .from('round_history')
        .select('created_at, wpm, accuracy, score, highest_combo, wave')
        .eq('profile_id', _profileId)
        .order('created_at', { ascending: false })
        .limit(100);
    if (error) {
        console.warn('Failed to load history:', error);
        return [];
    }
    return (data || []).map(r => ({
        date: r.created_at,
        wpm: r.wpm,
        accuracy: r.accuracy,
        score: r.score,
        highestCombo: r.highest_combo,
        wave: r.wave,
    })).reverse();
}

export async function saveRoundResult(result) {
    if (!_profileId) return;
    const { error } = await supabase
        .from('round_history')
        .insert({
            profile_id: _profileId,
            wpm: result.wpm || 0,
            accuracy: result.accuracy || 0,
            score: result.score || 0,
            highest_combo: result.highestCombo || 0,
            wave: result.wave || 1,
        });
    if (error) console.warn('Failed to save round result:', error);
}

// ==========================================
// Achievements (Supabase)
// ==========================================

export async function loadAchievements() {
    if (!_profileId) return [];
    const { data, error } = await supabase
        .from('achievements')
        .select('achievement_key, unlocked_at')
        .eq('profile_id', _profileId);
    if (error) {
        console.warn('Failed to load achievements:', error);
        return [];
    }
    return data || [];
}

export async function unlockAchievement(achievementKey) {
    if (!_profileId) return;
    const { error } = await supabase
        .from('achievements')
        .upsert(
            { profile_id: _profileId, achievement_key: achievementKey },
            { onConflict: 'profile_id,achievement_key' }
        );
    if (error) console.warn('Failed to unlock achievement:', error);
}

// ==========================================
// Daily Challenges (Supabase)
// ==========================================

export async function loadDailyChallenge(dateStr) {
    if (!_profileId) return null;
    const { data, error } = await supabase
        .from('daily_challenges')
        .select('*')
        .eq('profile_id', _profileId)
        .eq('challenge_date', dateStr)
        .maybeSingle();
    if (error) {
        console.warn('Failed to load daily challenge:', error);
        return null;
    }
    return data;
}

export async function saveDailyChallenge(dateStr, challengeKey, progress, target, completed, rewardClaimed) {
    if (!_profileId) return;
    const { error } = await supabase
        .from('daily_challenges')
        .upsert(
            {
                profile_id: _profileId,
                challenge_date: dateStr,
                challenge_key: challengeKey,
                progress: Math.min(progress, target),
                target,
                completed,
                reward_claimed: rewardClaimed,
            },
            { onConflict: 'profile_id,challenge_date' }
        );
    if (error) console.warn('Failed to save daily challenge:', error);
}

export async function countCompletedChallenges() {
    if (!_profileId) return 0;
    const { count, error } = await supabase
        .from('daily_challenges')
        .select('*', { count: 'exact', head: true })
        .eq('profile_id', _profileId)
        .eq('completed', true);
    if (error) {
        console.warn('Failed to count challenges:', error);
        return 0;
    }
    return count || 0;
}

