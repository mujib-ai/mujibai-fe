'use client';

import type { AnalyticsOverview } from '@/features/client/analytics/types';
import {
  formatDuration,
  formatPercentage,
} from '@/features/client/analytics/utils/analytics-formatters';

import StatisticsCard from '../atoms/StatisticsCard';

export default function StatisticsCards({
  t,
  overview,
  isLoading,
}: {
  t: (key: string) => string;
  overview: AnalyticsOverview | null;
  isLoading: boolean;
}) {
  const number = (value: number | undefined) =>
    isLoading || value === undefined ? '—' : value.toLocaleString();

  const statisticsCardsData = [
    {
      icon: '/dashboard-images/calla.svg',
      number: number(overview?.totalCalls),
      title: t('totalCalls'),
    },
    {
      icon: '/dashboard-images/timer.svg',
      number: isLoading
        ? '—'
        : formatDuration(overview?.averageCallDurationSeconds ?? null),
      title: t('averageCallDuration'),
    },
    {
      icon: '/dashboard-images/tickets.svg',
      number: number(overview?.ticketsCreated),
      title: t('ticketsCreated'),
    },
    {
      icon: '/dashboard-images/correct-call.svg',
      number: number(overview?.answeredCalls),
      title: t('answeredCalls'),
    },
    {
      icon: '/dashboard-images/success-calls.svg',
      number: isLoading
        ? '—'
        : formatPercentage(overview?.customerSatisfactionPercentage ?? null),
      title: t('customerSatisfaction'),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {statisticsCardsData.map((item, index) => (
        <StatisticsCard
          key={index}
          icon={item.icon}
          number={item.number}
          title={item.title}
        />
      ))}
    </div>
  );
}
