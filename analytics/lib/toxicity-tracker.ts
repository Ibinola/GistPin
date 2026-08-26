export interface ToxicityPoint {
  date: string;
  score: number;
  flagged: number;
  moderated: number;
}

export interface RegionToxicity {
  region: string;
  avgScore: number;
  flaggedCount: number;
  resolutionRate: number;
}

export interface TimeOfDayBucket {
  label: string;
  avgScore: number;
  incidents: number;
}

export interface ToxicityEvent {
  id: string;
  gistId: string;
  score: number;
  region: string;
  category: string;
  timestamp: string;
  action: 'flagged' | 'removed' | 'warned' | 'escalated';
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

const TOXICITY_TREND: ToxicityPoint[] = MONTHS.map((m, i) => ({
  date: m,
  score: parseFloat((2.8 + Math.sin(i * 0.8) * 1.2 + (i > 4 ? -0.4 : 0) + Math.random() * 0.3).toFixed(2)),
  flagged: Math.round(180 + i * 15 + Math.sin(i) * 40),
  moderated: Math.round(160 + i * 12 + Math.sin(i) * 30),
}));

const REGION_DATA: RegionToxicity[] = [
  { region: 'North America', avgScore: 2.1, flaggedCount: 420, resolutionRate: 94 },
  { region: 'Europe',        avgScore: 2.4, flaggedCount: 380, resolutionRate: 91 },
  { region: 'Asia Pacific',  avgScore: 3.8, flaggedCount: 620, resolutionRate: 86 },
  { region: 'Latin America', avgScore: 3.2, flaggedCount: 290, resolutionRate: 88 },
  { region: 'Africa',        avgScore: 4.1, flaggedCount: 180, resolutionRate: 82 },
  { region: 'Middle East',   avgScore: 3.5, flaggedCount: 150, resolutionRate: 85 },
  { region: 'Oceania',       avgScore: 1.9, flaggedCount: 90,  resolutionRate: 96 },
];

const MODERATION_IMPACT = [
  { month: 'Apr', before: 4.2, after: 2.8 },
  { month: 'May', before: 3.9, after: 2.5 },
  { month: 'Jun', before: 3.5, after: 2.1 },
  { month: 'Jul', before: 3.1, after: 1.9 },
  { month: 'Aug', before: 2.8, after: 1.7 },
];

const TIME_OF_DAY: TimeOfDayBucket[] = [
  { label: '00:00–03:00', avgScore: 4.2, incidents: 145 },
  { label: '03:00–06:00', avgScore: 3.8, incidents: 82 },
  { label: '06:00–09:00', avgScore: 2.4, incidents: 110 },
  { label: '09:00–12:00', avgScore: 2.1, incidents: 165 },
  { label: '12:00–15:00', avgScore: 2.6, incidents: 198 },
  { label: '15:00–18:00', avgScore: 2.9, incidents: 210 },
  { label: '18:00–21:00', avgScore: 3.5, incidents: 245 },
  { label: '21:00–00:00', avgScore: 4.8, incidents: 280 },
];

const HIGH_TOXICITY_EVENTS: ToxicityEvent[] = [
  { id: 'TX-4012', gistId: 'G-8841', score: 8.9, region: 'Asia Pacific',  category: 'Harassment',    timestamp: '2026-08-25 22:14', action: 'escalated' },
  { id: 'TX-4008', gistId: 'G-8829', score: 8.4, region: 'Africa',        category: 'Hate Speech',   timestamp: '2026-08-25 18:02', action: 'removed' },
  { id: 'TX-4001', gistId: 'G-8815', score: 7.7, region: 'Middle East',   category: 'Threats',       timestamp: '2026-08-24 21:38', action: 'removed' },
  { id: 'TX-3994', gistId: 'G-8802', score: 7.2, region: 'Latin America', category: 'Spam',          timestamp: '2026-08-24 14:12', action: 'warned' },
  { id: 'TX-3987', gistId: 'G-8790', score: 6.8, region: 'Asia Pacific',  category: 'Inappropriate', timestamp: '2026-08-23 09:45', action: 'flagged' },
  { id: 'TX-3980', gistId: 'G-8775', score: 6.5, region: 'North America', category: 'Spam',          timestamp: '2026-08-23 03:22', action: 'warned' },
];

const ACTION_STYLE: Record<string, { bg: string; color: string }> = {
  escalated: { bg: '#fef2f2', color: '#dc2626' },
  removed:   { bg: '#fef2f2', color: '#b91c1c' },
  warned:    { bg: '#fffbeb', color: '#d97706' },
  flagged:   { bg: '#eff6ff', color: '#2563eb' },
};

export function getToxicityTrend(): ToxicityPoint[] {
  return TOXICITY_TREND;
}

export function getRegionToxicity(): RegionToxicity[] {
  return REGION_DATA;
}

export function getModerationImpact() {
  return MODERATION_IMPACT;
}

export function getTimeOfDay(): TimeOfDayBucket[] {
  return TIME_OF_DAY;
}

export function getHighToxicityEvents(): ToxicityEvent[] {
  return HIGH_TOXICITY_EVENTS;
}

export function getActionStyle(action: string): { bg: string; color: string } {
  return ACTION_STYLE[action] ?? { bg: '#f1f5f9', color: '#64748b' };
}
