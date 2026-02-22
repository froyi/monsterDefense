import { useMemo } from 'react';
import useGameStore from '../stores/useGameStore';
import useStatsStore from '../stores/useStatsStore';

const DAY_LABELS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

function StatsScreen() {
    const setPhase = useGameStore(s => s.setPhase);
    const history = useStatsStore(s => s.history);
    const getTopErrors = useStatsStore(s => s.getTopErrors);

    const weeklyData = useMemo(() => {
        const now = new Date();
        const days = [];

        for (let i = 6; i >= 0; i--) {
            const day = new Date(now);
            day.setDate(day.getDate() - i);
            const dayStr = day.toISOString().split('T')[0];
            const dayLabel = DAY_LABELS[day.getDay() === 0 ? 6 : day.getDay() - 1];

            const dayRounds = history.filter(r => r.date && r.date.startsWith(dayStr));
            const avgWPM = dayRounds.length > 0
                ? Math.round(dayRounds.reduce((s, r) => s + (r.wpm || 0), 0) / dayRounds.length)
                : 0;
            const avgAccuracy = dayRounds.length > 0
                ? Math.round(dayRounds.reduce((s, r) => s + (r.accuracy || 0), 0) / dayRounds.length)
                : 0;

            days.push({ dayLabel, avgWPM, avgAccuracy, rounds: dayRounds.length });
        }

        return days;
    }, [history]);

    const topErrors = getTopErrors();

    const totalRounds = history.length;
    const avgWPM = totalRounds > 0
        ? Math.round(history.reduce((s, r) => s + (r.wpm || 0), 0) / totalRounds)
        : 0;
    const avgAccuracy = totalRounds > 0
        ? Math.round(history.reduce((s, r) => s + (r.accuracy || 0), 0) / totalRounds * 10) / 10
        : 0;

    const maxBarWPM = Math.max(10, ...weeklyData.map(d => d.avgWPM));

    if (totalRounds === 0) {
        return (
            <div className="stats-screen">
                <button className="btn-back" onClick={() => setPhase('menu')}>
                    ← Zurück
                </button>
                <div className="stats-container">
                    <h1 className="stats-title">📊 Statistik</h1>
                    <div className="stats-empty">
                        <p>🎮 Spiele zuerst eine Runde!</p>
                        <p style={{ fontSize: '14px', marginTop: '8px' }}>
                            Hier siehst du dann deinen Fortschritt.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="stats-screen">
            <button className="btn-back" onClick={() => setPhase('menu')}>
                ← Zurück
            </button>

            <div className="stats-container">
                <h1 className="stats-title">📊 Statistik</h1>

                {/* Summary */}
                <div className="stats-section">
                    <div className="stats-section-title">Gesamtübersicht</div>
                    <div className="stats-summary-grid">
                        <div className="stats-summary-item">
                            <div className="stats-summary-value">{totalRounds}</div>
                            <div className="stats-summary-label">Runden</div>
                        </div>
                        <div className="stats-summary-item">
                            <div className="stats-summary-value" style={{ color: 'var(--color-neon-green)' }}>
                                {avgWPM}
                            </div>
                            <div className="stats-summary-label">⌀ WPM</div>
                        </div>
                        <div className="stats-summary-item">
                            <div className="stats-summary-value" style={{ color: 'var(--color-gold)' }}>
                                {avgAccuracy}%
                            </div>
                            <div className="stats-summary-label">⌀ Genauigkeit</div>
                        </div>
                    </div>
                </div>

                {/* Weekly Chart */}
                <div className="stats-section">
                    <div className="stats-section-title">Woche – WPM</div>
                    <div className="stats-chart">
                        {weeklyData.map((day, i) => (
                            <div key={i} className="stats-chart-bar-wrapper">
                                <div className="stats-chart-bar">
                                    <div
                                        className="stats-chart-bar-fill"
                                        style={{
                                            height: day.avgWPM > 0 ? `${(day.avgWPM / maxBarWPM) * 100}%` : '4px',
                                        }}
                                        title={`${day.avgWPM} WPM`}
                                    />
                                </div>
                                <div className="stats-chart-label">{day.dayLabel}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Errors */}
                {topErrors.length > 0 && (
                    <div className="stats-section">
                        <div className="stats-section-title">Schwierigste Buchstaben</div>
                        <div className="error-list">
                            {topErrors.map((e, i) => (
                                <span key={i} className="error-badge">
                                    {e.char === ' ' ? '⎵' : e.char}
                                    <span style={{ fontSize: '12px', opacity: 0.7, marginLeft: '4px' }}>
                                        {Math.round(e.errorRate * 100)}%
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Last 5 rounds */}
                <div className="stats-section">
                    <div className="stats-section-title">Letzte Runden</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {history.slice(-5).reverse().map((round, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '8px 12px',
                                background: 'var(--bg-tertiary)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '14px',
                            }}>
                                <span style={{ color: 'var(--text-muted)' }}>
                                    {round.date ? new Date(round.date).toLocaleDateString('de-DE') : '–'}
                                </span>
                                <span style={{ color: 'var(--color-neon-green)', fontWeight: 700 }}>
                                    {round.wpm} WPM
                                </span>
                                <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>
                                    {round.accuracy}%
                                </span>
                                <span style={{ color: 'var(--color-purple)', fontWeight: 700 }}>
                                    {round.score} Pkt
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatsScreen;
