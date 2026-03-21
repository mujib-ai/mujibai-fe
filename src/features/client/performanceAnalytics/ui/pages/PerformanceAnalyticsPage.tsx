'use client';

import { useTranslations } from 'next-intl';

import PerformanceAnalyticsTemplate from '../templates/PerformanceAnalyticsTemplate';

export default function PerformanceAnalyticsPage() {
  const t = useTranslations('performanceAnalytics');
  return <PerformanceAnalyticsTemplate t={t} />;
}
