'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
  getToxicityTrend,
  getRegionToxicity,
  getModerationImpact,
  getTimeOfDay,
  getHighToxicityEvents,
  getActionStyle,
} from '@/lib/toxicity-tracker';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend, Filler);

const CARD = { background: '#fff', borderRadius: 22, padding: 24, border: '1px solid rgba(148,163,184,0.16)' } as const;

const trend = getToxicityTrend();
const regions = getRegionToxicity();
const modImpact = getModerationImpact();
const timeOfDay = getTimeOfDay();
const highEvents = getHighToxicityEvents();

const latestScore = trend[trend.length - 1].score;
const prevScore = trend[trend.length - 2].score;
const scoreDelta = (latestScore - prevScore).toFixed(2);
const totalFlagged = trend.reduce((s, t) => s + t.flagged, 0);
const avgResolution = (regions.reduce((s, r) => s + r.resolutionRate, 0) / regions.length).toFixed(1);

export default function ToxicityTrendsPage() {
  const trendData = {
    labels: trend.map((t) => t.date),
    datasets: [
      {
        label: 'Avg Toxicity Score',
        data: trend.map((t) => t.score),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.1)',
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        borderWidth: 2.5,
        yAxisID: 'y',
      },
      {
        label: 'Flagged Gists',
        data: trend.map((t) => t.flagged),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.08)',
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        borderWidth: 2,
        yAxisID: 'y1',
      },
    ],
  };

  const regionBarData = {
    labels: regions.map((r) => r.region),
    datasets: [
      {
        label: 'Avg Toxicity Score',
        data: regions.map((r) => r.avgScore),
        backgroundColor: regions.map((r) =>
          r.avgScore >= 4 ? 'rgba(239,68,68,0.7)' :
          r.avgScore >= 3 ? 'rgba(251,191,36,0.7)' :
          'rgba(34,197,94,0.6)'
        ),
        borderRadius: 5,
      },
    ],
  };

  const modImpactData = {
    labels: modImpact.map((m) => m.month),
    datasets: [
      {
        label: 'Before Moderation',
        data: modImpact.map((m) => m.before),
        backgroundColor: 'rgba(239,68,68,0.6)',
        borderRadius: 4,
      },
      {
        label: 'After Moderation',
        data: modImpact.map((m) => m.after),
        backgroundColor: 'rgba(34,197,94,0.7)',
        borderRadius: 4,
      },
    ],
  };

  const timeOfDayData = {
    labels: timeOfDay.map((t) => t.label),
    datasets: [
      {
        label: 'Avg Score',
        data: timeOfDay.map((t) => t.avgScore),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245,158,11,0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        borderWidth: 2.5,
        yAxisID: 'y',
      },
      {
        label: 'Incidents',
        data: timeOfDay.map((t) => t.incidents),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.08)',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        borderWidth: 2,
        yAxisID: 'y1',
      },
    ],
  };

  return (
    <main style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 24px 64px' }}>
      <div style={{ background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)', borderRadius: 22, padding: 32, marginBottom: 32 }}>
        <h1 style={{ margin: '0 0 6px', fontSize: 32, fontWeight: 800, color: '#111827' }}>Content Toxicity Trend Analysis</h1>
        <p style={{ margin: 0, color: '#6b7280', fontSize: 15 }}>Toxicity scoring, moderation impact, location-based analysis, and high-toxicity event detection.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }} data-report-section data-report-title="Toxicity KPIs">
        {[
          { label: 'Current Toxicity Score', value: latestScore.toFixed(2), color: latestScore > 3 ? '#dc2626' : '#16a34a', sub: `${Number(scoreDelta) > 0 ? '+' : ''}${scoreDelta} vs last month` },
          { label: 'Total Flagged (YTD)', value: totalFlagged.toLocaleString(), color: '#6366f1', sub: 'gists flagged' },
          { label: 'Avg Resolution Rate', value: `${avgResolution}%`, color: '#16a34a', sub: 'across all regions' },
          { label: 'High-Alert Events', value: highEvents.filter((e) => e.score >= 7).length.toString(), color: '#dc2626', sub: 'score ≥ 7.0' },
        ].map(({ label, value, color, sub }) => (
          <div key={label} style={{ ...CARD, borderRadius: 16, padding: '20px 24px' }}>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 6, fontWeight: 600 }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color }}>{value}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }} data-report-section data-report-title="Toxicity Trend">
        <div style={CARD}>
          <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700 }}>Toxicity Score & Flagged Gists Trend</h3>
          <Line data={trendData} options={{
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
              y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#9ca3af' }, title: { display: true, text: 'Score' } },
              y1: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false }, ticks: { color: '#9ca3af' }, title: { display: true, text: 'Flagged' } },
            },
          }} height={90} />
        </div>
        <div style={CARD}>
          <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700 }}>Location-Based Toxicity</h3>
          <Bar data={regionBarData} options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
              y: { beginAtZero: true, max: 6, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#9ca3af' } },
            },
          }} height={90} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }} data-report-section data-report-title="Moderation Impact & Time-of-Day">
        <div style={CARD}>
          <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700 }}>Moderation Intervention Impact</h3>
          <Bar data={modImpactData} options={{
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
              y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#9ca3af' } },
            },
          }} height={90} />
        </div>
        <div style={CARD}>
          <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700 }}>Toxicity by Time of Day</h3>
          <Line data={timeOfDayData} options={{
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#9ca3af', maxRotation: 45 } },
              y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#9ca3af' }, title: { display: true, text: 'Score' } },
              y1: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false }, ticks: { color: '#9ca3af' }, title: { display: true, text: 'Incidents' } },
            },
          }} height={90} />
        </div>
      </div>

      <div style={CARD} data-report-section data-report-title="High-Toxicity Events">
        <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700 }}>High-Toxicity Event Detection</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
              <th style={{ padding: '8px 10px' }}>Event ID</th>
              <th style={{ padding: '8px 10px' }}>Gist</th>
              <th style={{ padding: '8px 10px' }}>Score</th>
              <th style={{ padding: '8px 10px' }}>Region</th>
              <th style={{ padding: '8px 10px' }}>Category</th>
              <th style={{ padding: '8px 10px' }}>Timestamp</th>
              <th style={{ padding: '8px 10px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {highEvents.map((e) => {
              const actionSt = getActionStyle(e.action);
              return (
                <tr key={e.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 10px', fontWeight: 700, fontFamily: 'monospace' }}>{e.id}</td>
                  <td style={{ padding: '10px 10px', color: '#64748b', fontFamily: 'monospace' }}>{e.gistId}</td>
                  <td style={{ padding: '10px 10px', fontWeight: 700, color: e.score >= 8 ? '#dc2626' : e.score >= 6 ? '#f59e0b' : '#6366f1' }}>
                    {e.score.toFixed(1)}
                  </td>
                  <td style={{ padding: '10px 10px', color: '#64748b' }}>{e.region}</td>
                  <td style={{ padding: '10px 10px', color: '#64748b' }}>{e.category}</td>
                  <td style={{ padding: '10px 10px', color: '#94a3b8', fontSize: 12 }}>{e.timestamp}</td>
                  <td style={{ padding: '10px 10px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 20, background: actionSt.bg, color: actionSt.color, fontSize: 11, fontWeight: 700, textTransform: 'capitalize' }}>
                      {e.action}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
