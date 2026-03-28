import ChartExportCard from '@/components/ui/ChartExportCard';
import ScatterChart from '@/components/charts/ScatterChart';
import RadarChart from '@/components/charts/RadarChart';
import CategoryPieChart from '@/components/charts/CategoryPieChart';
import LocationTable from '@/components/ui/LocationTable';
import LiveGistCounter from '@/components/LiveGistCounter';
import UserAreaChart from '@/components/charts/UserAreaChart';

export default function Page() {
  return (
    <main
      style={{
        maxWidth: 1120,
        margin: '0 auto',
        padding: '40px 24px 64px',
      }}
    >
      <h1 style={{ marginTop: 0, marginBottom: 10, fontSize: 38 }}>Analytics Dashboard</h1>
      <p style={{ marginTop: 0, marginBottom: 28, color: '#475569', fontSize: 16 }}>
        Export individual charts as crisp PNG images with optional white or transparent
        backgrounds, and copy them directly to the clipboard when needed.
      </p>

      <section style={{ marginBottom: 24 }}>
        <h2>Live Gists</h2>
        <LiveGistCounter />
      </section>

      <div style={{ display: 'grid', gap: 24 }}>
        <ChartExportCard title="New vs Returning Users (90 days)">
          <UserAreaChart />
        </ChartExportCard>

        <ChartExportCard title="Scatter">
          <ScatterChart />
        </ChartExportCard>

        <ChartExportCard title="Radar">
          <RadarChart />
        </ChartExportCard>

        <ChartExportCard title="Category Distribution">
          <CategoryPieChart />
        </ChartExportCard>
      </div>

      <section style={{ marginTop: 24 }}>
        <h2>Locations</h2>
        <LocationTable />
      </section>
    </main>
  );
}
