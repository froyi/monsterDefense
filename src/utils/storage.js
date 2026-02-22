// LocalStorage persistence wrapper – profile-aware

let _profileId = null;

export function setActiveProfile(profileId) {
  _profileId = profileId;
}

export function getActiveProfile() {
  return _profileId;
}

function prefixedKey(key) {
  if (!_profileId) return `monster-defense-${key}`;
  return `monster-defense-${_profileId}-${key}`;
}

function safeGet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }
}

// ---- Profiles (global, not per-profile) ----
const PROFILES_KEY = 'monster-defense-profiles';

export function loadProfiles() {
  return safeGet(PROFILES_KEY) || [];
}

export function saveProfiles(profiles) {
  safeSet(PROFILES_KEY, profiles);
}

// ---- Per-profile data ----

// Letter stats
export function loadLetterStats() {
  return safeGet(prefixedKey('stats')) || {};
}
export function saveLetterStats(stats) {
  safeSet(prefixedKey('stats'), stats);
}

// Skills
export function loadSkills() {
  return safeGet(prefixedKey('skills')) || null;
}
export function saveSkills(skills) {
  safeSet(prefixedKey('skills'), skills);
}

// Rewards
export function loadRewards() {
  return safeGet(prefixedKey('rewards')) || null;
}
export function saveRewards(rewards) {
  safeSet(prefixedKey('rewards'), rewards);
}

// Round history
export function loadHistory() {
  return safeGet(prefixedKey('history')) || [];
}
export function saveHistory(history) {
  const trimmed = history.slice(-100);
  safeSet(prefixedKey('history'), trimmed);
}
