'use client';

import { useTranslations } from 'next-intl';

import { RouteErrorState } from '@/shared/components/organisms/dashboard/RouteErrorState';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('dashboardOverview');

  return (
    <RouteErrorState
      error={error}
      reset={reset}
      title={t('welcome')}
      subtitle={t('subTitle')}
    />
  );
}
