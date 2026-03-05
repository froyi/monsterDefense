-- Run this SQL in the Supabase SQL Editor to add leaderboard columns to the profiles table.
-- These columns store each player's best stats for the global leaderboard.

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS highest_wpm real DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS highest_accuracy real DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS highest_score integer DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS max_world text DEFAULT 'village';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS max_level integer DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_stars integer DEFAULT 0;
