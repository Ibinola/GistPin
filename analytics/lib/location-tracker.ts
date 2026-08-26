export interface LocationDiscovery {
  region: string;
  newLocations: number;
  totalLocations: number;
  coveragePct: number;
  velocity: number;
  frontier: 'hot' | 'warm' | 'cold';
}

export interface Milestone {
  title: string;
  date: string;
  value: number;
  icon: string;
}

export const WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];

export const WEEKLY_DISCOVERIES = [12, 18, 24, 31, 27, 35, 42, 38];

export const REGION_DISCOVERIES: LocationDiscovery[] = [
  { region: 'North America', newLocations: 142, totalLocations: 1840, coveragePct: 94.2, velocity: 8.3, frontier: 'warm' },
  { region: 'Europe',        newLocations: 98,  totalLocations: 1560, coveragePct: 91.7, velocity: 6.1, frontier: 'warm' },
  { region: 'Asia Pacific',  newLocations: 215, totalLocations: 2230, coveragePct: 78.4, velocity: 12.8, frontier: 'hot' },
  { region: 'Latin America', newLocations: 67,  totalLocations: 480,  coveragePct: 45.3, velocity: 3.9, frontier: 'cold' },
  { region: 'Africa',        newLocations: 34,  totalLocations: 190,  coveragePct: 18.7, velocity: 2.1, frontier: 'cold' },
  { region: 'Middle East',   newLocations: 28,  totalLocations: 150,  coveragePct: 22.1, velocity: 1.8, frontier: 'cold' },
  { region: 'Oceania',       newLocations: 19,  totalLocations: 210,  coveragePct: 62.5, velocity: 1.2, frontier: 'warm' },
];

export const MILESTONES: Milestone[] = [
  { title: '5,000th Location',    date: '2026-08-12', value: 5000, icon: '🌍' },
  { title: 'Asia Pacific Leads',  date: '2026-08-01', value: 2200, icon: '🏆' },
  { title: '50% Latin America',   date: '2026-07-18', value: 500,  icon: '📈' },
  { title: 'First Antarctica Pin',date: '2026-07-05', value: 1,    icon: '🧊' },
];

export const TOTAL_LOCATIONS = REGION_DISCOVERIES.reduce((s, r) => s + r.totalLocations, 0);
export const TOTAL_NEW = REGION_DISCOVERIES.reduce((s, r) => s + r.newLocations, 0);
export const GLOBAL_COVERAGE = ((REGION_DISCOVERIES.reduce((s, r) => s + r.totalLocations, 0) / 8500) * 100).toFixed(1);

export function getDiscoveryRate(): LocationDiscovery[] {
  return REGION_DISCOVERIES;
}

export function getMilestones(): Milestone[] {
  return MILESTONES;
}
