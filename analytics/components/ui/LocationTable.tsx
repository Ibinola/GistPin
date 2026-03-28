'use client';

import Sparkline from '@/components/charts/Sparkline';
import { useLocationDataQuery } from '@/lib/analytics-queries';

export default function LocationTable() {
  const { data, isLoading, error } = useLocationDataQuery();

  if (isLoading || !data) {
    return <p>Loading location trends...</p>;
  }

  if (error) {
    return <p>Unable to load location trends.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Location</th>
          <th>Trend</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.location}>
            <td>{row.location}</td>
            <td>
              <Sparkline data={row.values} />
              {row.values.at(-1)! > row.values[0] ? '↑' : '↓'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
