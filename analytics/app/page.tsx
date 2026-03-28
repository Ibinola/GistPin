import ScatterChart from '@/components/charts/ScatterChart';
import RadarChart from '@/components/charts/RadarChart';
import CategoryPieChart from '@/components/charts/CategoryPieChart';
import LocationTable from '@/components/ui/LocationTable';
import LiveGistCounter from '@/components/LiveGistCounter';
import UserAreaChart from '@/components/charts/UserAreaChart';
import AnalyticsRefreshBar from '@/components/ui/AnalyticsRefreshBar';

export default function Page() {
  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '32px 20px 48px' }}>
      <h1>Analytics Dashboard</h1>
      <AnalyticsRefreshBar />

      <h2>Live Gists</h2>
      <LiveGistCounter />

      <h2>New vs Returning Users (90 days)</h2>
      <UserAreaChart />

      <h2>Scatter</h2>
      <ScatterChart />

      <h2>Radar</h2>
      <RadarChart />

      <h2>Category Distribution</h2>
      <CategoryPieChart />

      <h2>Locations</h2>
      <LocationTable />
    </main>
  );
}
