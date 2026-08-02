import type { ChartConfig } from '@/shared/components/atoms/ui/chart';

import type { AnalyticsTrendPoint } from '../types';

const X_KEY_CANDIDATES = [
  'date',
  'timestamp',
  'period',
  'label',
  'day',
  'hour',
];
const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

export function getTrendXKey(points: AnalyticsTrendPoint[]): string {
  if (points.length === 0) return 'date';
  const [first] = points;
  const candidate = X_KEY_CANDIDATES.find(key => key in first);
  if (candidate) return candidate;
  const stringKey = Object.keys(first).find(
    key => typeof first[key] === 'string'
  );
  return stringKey ?? 'date';
}

export function getTrendSeriesKeys(
  points: AnalyticsTrendPoint[],
  xKey: string
): string[] {
  if (points.length === 0) return [];
  const [first] = points;
  return Object.keys(first).filter(
    key => key !== xKey && typeof first[key] === 'number'
  );
}

export function humanizeKey(key: string): string {
  const withSpaces = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

export function buildTrendChartConfig(seriesKeys: string[]): ChartConfig {
  return seriesKeys.reduce<ChartConfig>((config, key, index) => {
    config[key] = {
      label: humanizeKey(key),
      color: CHART_COLORS[index % CHART_COLORS.length],
    };
    return config;
  }, {});
}
