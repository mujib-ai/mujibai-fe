'use client';

import { useTranslations } from 'next-intl';

import { useAnalytics } from '@/features/client/analytics';

import PerformanceAnalyticsTemplate from '../templates/PerformanceAnalyticsTemplate';

export default function PerformanceAnalyticsPage() {
  const t = useTranslations('performanceAnalytics');
  const { overview, callsTrend, keywords, isLoading } = useAnalytics();

  return (
    <PerformanceAnalyticsTemplate
      t={t}
      overview={overview}
      callsTrendPoints={callsTrend?.points ?? []}
      topKeywords={keywords?.topKeywords ?? []}
      isLoading={isLoading}
    />
  );
}
