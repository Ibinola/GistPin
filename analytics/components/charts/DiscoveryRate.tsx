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
  WEEKS,
  WEEKLY_DISCOVERIES,
  REGION_DISCOVERIES,
  MILESTONES,
  TOTAL_NEW,
  GLOBAL_COVERAGE,
  getDiscoveryRate,
  getMilestones,
} from '@/lib/location-tracker';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend, Filler);

const CARD = { background: '#fff', borderRadius: 22, padding: 24, border: '1px solid rgba(148,163,184,0.16)' } as const;

const FRONTIER_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  hot:  { bg: '#fef2f2', color: '#dc2626', label: 'Hot Frontier' },
  warm: { bg: '#fffbeb', color: '#d97706', label: 'Warm Zone' },
  cold: { bg: '#eff6ff', color: '#2563eb', label: 'Cold Frontier' },
};

export default function DiscoveryRate() {
  const discoveries = getDiscoveryRate();
  const milestones = getMilestones();

  const weeklyData = {
    labels: WEEKS,
    datasets: [{
      label: 'New Locations',
      data: WEEKLY_DISCOVERIES,
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99,102,241,0.12)',
      fill: true,
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2.5,
    }],
  };

  const velocityData = {
    labels: discoveries.map((d) => d.region),
    datasets: [{
      label: 'Velocity (locations/week)',
      data: discoveries.map((d) => d.velocity),
      backgroundColor: discoveries.map((d) =>
        d.frontier === 'hot' ? 'rgba(239,68,68,0.7)' :
        d.frontier === 'warm' ? 'rgba(251,191,36,0.7)' :
        'rgba(99,102,241,0.6)'
      ),
      borderRadius: 6,
    }],
  };

  const coverageData = {
    labels: discoveries.map((d) => d.region),
    datasets: [{
      label: 'Coverage %',
      data: discoveries.map((d) => d.coveragePct),
      backgroundColor: discoveries.map((d) =>
        d.coveragePct >= 80 ? 'rgba(34,197,94,0.7)' :
        d.coveragePct >= 40 ? 'rgba(251,191,36,0.7)' :
        'rgba(239,68,68,0.6)'
      ),
      borderRadius: 4,
    }],
  };

  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)', borderRadius: 22, padding: 32, marginBottom: 28 }}>
        <h1 style={{ margin: '0 0 6px', fontSize: 28, fontWeight: 800 }}>Location Discovery Rate Tracker</h1>
        <p style={{ margin: 0, color: '#6b7280', fontSize: 15 }}>New location discovery velocity, geographic frontier visualization, and coverage metrics.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'New Locations (8w)', value: TOTAL_NEW.toLocaleString(), color: '#6366f1' },
          { label: 'Global Coverage', value: `${GLOBAL_COVERAGE}%`, color: '#16a34a' },
          { label: 'Avg Velocity', value: `${(discoveries.reduce((s, d) => s + d.velocity, 0) / discoveries.length).toFixed(1)}/wk`, color: '#111827' },
          { label: 'Hot Frontiers', value: discoveries.filter((d) => d.frontier === 'hot').length.toString(), color: '#dc2626' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ ...CARD, borderRadius: 16, padding: '20px 24px' }}>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 6, fontWeight: 600 }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <div style={CARD}>
          <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700 }}>New Location Rate (8-Week Trend)</h3>
          <Line data={weeklyData} options={{
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
              y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#9ca3af' } },
            },
          }} height={100} />
        </div>
        <div style={CARD}>
          <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700 }}>Discovery Velocity by Region</h3>
          <Bar data={velocityData} options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
              y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#9ca3af' } },
            },
          }} height={100} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <div style={CARD}>
          <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700 }}>Geographic Frontier Visualization</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {discoveries.map((d) => {
              const st = FRONTIER_STYLE[d.frontier];
              return (
                <div key={d.region} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 14, border: '1px solid #e2e8f0', background: '#fafafa' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{d.region}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
                      {d.newLocations} new · {d.totalLocations.toLocaleString()} total
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 70, height: 6, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
                      <div style={{ width: `${d.coveragePct}%`, height: '100%', background: st.color, borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 12, color: '#64748b', minWidth: 42, textAlign: 'right' }}>{d.coveragePct}%</span>
                    <span style={{ padding: '4px 10px', borderRadius: 20, background: st.bg, color: st.color, fontSize: 11, fontWeight: 700 }}>
                      {st.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={CARD}>
          <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700 }}>Coverage Percentage by Region</h3>
          <Bar data={coverageData} options={{
            responsive: true,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
              x: { beginAtZero: true, max: 100, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#9ca3af', callback: (v: number | string) => `${v}%` } },
              y: { grid: { display: false }, ticks: { color: '#64748b' } },
            },
          }} height={100} />
        </div>
      </div>

      <div style={CARD}>
        <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700 }}>Milestone Celebrations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {milestones.map((m) => (
            <div key={m.title} style={{ padding: '16px 18px', borderRadius: 16, background: 'linear-gradient(135deg, #f0f9ff 0%, #ede9fe 100%)', border: '1px solid rgba(99,102,241,0.12)' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{m.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{m.title}</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>
                {new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                {m.value > 1 ? ` · ${m.value.toLocaleString()} locations` : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
