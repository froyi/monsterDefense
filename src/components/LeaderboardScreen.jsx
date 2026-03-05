import { useState, useEffect } from 'react';
import useGameStore from '../stores/useGameStore';
import { getLeaderboard, getActiveProfile } from '../utils/storage';
import { WORLDS } from '../utils/campaignData';

const WORLD_EMOJIS = {};
WORLDS.forEach((w, i) => { WORLD_EMOJIS[w.id] = w.emoji; });

function LeaderboardScreen({ onClose }) {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const myProfileId = getActiveProfile();

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        getLeaderboard(50).then(data => {
            if (cancelled) return;
            setEntries(data);
            setLoading(false);
        }).catch(err => {
            if (cancelled) return;
            setError('Rangliste konnte nicht geladen werden.');
            setLoading(false);
        });
        return () => { cancelled = true; };
    }, []);

    const getWorldLabel = (worldId) => {
        const emoji = WORLD_EMOJIS[worldId];
        const world = WORLDS.find(w => w.id === worldId);
        return emoji ? `${emoji} ${world?.name || worldId}` : '🏠';
    };

    const getRankEmoji = (rank) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return `#${rank}`;
    };

    return (
        <div className="leaderboard-screen">
            <button className="btn-back" onClick={onClose}>
                ← Zurück
            </button>

            <div className="leaderboard-container">
                <h1 className="leaderboard-title">🏆 Rangliste</h1>

                {loading && (
                    <div className="leaderboard-loading">
                        <div className="leaderboard-spinner" />
                        <p>Lade Rangliste…</p>
                    </div>
                )}

                {error && (
                    <div className="leaderboard-error">
                        <p>⚠️ {error}</p>
                    </div>
                )}

                {!loading && !error && entries.length === 0 && (
                    <div className="leaderboard-empty">
                        <p>🎮 Noch keine Spieler auf der Rangliste.</p>
                        <p style={{ fontSize: '14px', marginTop: '8px' }}>
                            Spiel ein Level, um auf die Rangliste zu kommen!
                        </p>
                    </div>
                )}

                {!loading && !error && entries.length > 0 && (
                    <div className="leaderboard-table-wrapper">
                        <table className="leaderboard-table">
                            <thead>
                                <tr>
                                    <th className="lb-col-rank">Rang</th>
                                    <th className="lb-col-name">Spieler</th>
                                    <th className="lb-col-stars">⭐</th>
                                    <th className="lb-col-wpm">WPM</th>
                                    <th className="lb-col-acc">Genau.</th>
                                    <th className="lb-col-world">Welt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map((entry, idx) => {
                                    const isMe = entry.id === myProfileId;
                                    const rank = idx + 1;
                                    return (
                                        <tr
                                            key={entry.id}
                                            className={`lb-row ${isMe ? 'lb-row-me' : ''} ${rank <= 3 ? 'lb-row-top' : ''}`}
                                        >
                                            <td className="lb-col-rank">
                                                <span className={`lb-rank ${rank <= 3 ? 'lb-rank-medal' : ''}`}>
                                                    {getRankEmoji(rank)}
                                                </span>
                                            </td>
                                            <td className="lb-col-name">
                                                <span className="lb-avatar">{entry.avatar || '👤'}</span>
                                                <span className="lb-name">{entry.name}</span>
                                                {isMe && <span className="lb-me-badge">DU</span>}
                                            </td>
                                            <td className="lb-col-stars">{entry.total_stars || 0}</td>
                                            <td className="lb-col-wpm">{Math.round(entry.highest_wpm || 0)}</td>
                                            <td className="lb-col-acc">{Math.round(entry.highest_accuracy || 0)}%</td>
                                            <td className="lb-col-world">
                                                {entry.max_world ? getWorldLabel(entry.max_world) : '—'}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LeaderboardScreen;
