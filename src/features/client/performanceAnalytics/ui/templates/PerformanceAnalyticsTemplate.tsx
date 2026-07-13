'use client';

import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';

import DailyAICallsAnalytics from '../organisms/DailyAICallsAnalytics';
import ScenarioPerformanceAnalytics from '../organisms/ScenarioPerformanceAnalytics';
import StatisticsCards from '../organisms/StatisticsCards';

export default function PerformanceAnalyticsTemplate({
  t,
}: {
  t: (key: string) => string;
}) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} subtitle={t('subTitle')} />
      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <StatisticsCards t={t} />
        <DailyAICallsAnalytics t={t} />
        <ScenarioPerformanceAnalytics t={t} />
      </div>
    </div>
  );
}
