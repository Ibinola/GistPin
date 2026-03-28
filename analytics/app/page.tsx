import ChartExportCard from '@/components/ui/ChartExportCard';
import ScatterChart from '@/components/charts/ScatterChart';
import RadarChart from '@/components/charts/RadarChart';
import CategoryPieChart from '@/components/charts/CategoryPieChart';
import LocationTable from '@/components/ui/LocationTable';
import LiveGistCounter from '@/components/LiveGistCounter';
import UserAreaChart from '@/components/charts/UserAreaChart';
import KPIGrid from '@/components/KPICard';
import DailyGistsChart from '@/components/charts/DailyGistsChart';

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
    <div className="space-y-6">

      <h2>Overview</h2>
      <KPIGrid />

      <h2>Daily Gists (Last 30 Days)</h2>
      <DailyGistsChart />

      <h2>Live Gists</h2>
      <LiveGistCounter />
      {/* KPI row — live counter spans full width on mobile, 1/3 on lg */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 lg:col-span-1">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Live Gists
          </h2>
          <LiveGistCounter />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            New vs Returning Users · 90 days
          </h2>
          <UserAreaChart />
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Gist Age vs Engagement
          </h2>
          <ScatterChart />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Platform Usage
          </h2>
          <RadarChart />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Category Distribution
          </h2>
          <CategoryPieChart />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Active Locations
          </h2>
          <LocationTable />
        </div>
      </div>

    </div>
  );
}
