'use client';

import dynamic from 'next/dynamic';

import type {
  AnalyticsOverview,
  AnalyticsTrendPoint,
  TopKeywordItem,
} from '@/features/client/analytics/types';
import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';

import StatisticsCards from '../organisms/StatisticsCards';

const chartGridFallback = (
  <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
    <div className="bg-muted h-75 animate-pulse rounded-2xl lg:col-span-2" />
    <div className="bg-muted h-75 animate-pulse rounded-2xl" />
  </div>
);

const DailyAICallsAnalytics = dynamic(
  () => import('../organisms/DailyAICallsAnalytics'),
  { loading: () => chartGridFallback }
);
const ScenarioPerformanceAnalytics = dynamic(
  () => import('../organisms/ScenarioPerformanceAnalytics'),
  { loading: () => chartGridFallback }
);

export default function PerformanceAnalyticsTemplate({
  t,
  overview,
  callsTrendPoints,
  topKeywords,
  isLoading,
}: {
  t: (key: string) => string;
  overview: AnalyticsOverview | null;
  callsTrendPoints: AnalyticsTrendPoint[];
  topKeywords: TopKeywordItem[];
  isLoading: boolean;
}) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} subtitle={t('subTitle')} />
      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <StatisticsCards t={t} overview={overview} isLoading={isLoading} />
        <DailyAICallsAnalytics
          t={t}
          points={callsTrendPoints}
          overview={overview}
          topKeywords={topKeywords}
        />
        <ScenarioPerformanceAnalytics t={t} />
      </div>
    </div>
  );
}
