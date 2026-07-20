import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PerformanceAnalyticsPage } from '@/features/client/performanceAnalytics';
import { createNoIndexMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('performanceAnalytics');
  return createNoIndexMetadata(`${t('title')} - mujibai`, t('subTitle'));
}

export default function PerformanceAnalytics() {
  return <PerformanceAnalyticsPage />;
}
