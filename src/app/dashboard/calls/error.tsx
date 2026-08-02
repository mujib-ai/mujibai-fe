'use client';

import { useTranslations } from 'next-intl';

import { RouteErrorState } from '@/shared/components/organisms/dashboard/RouteErrorState';

export default function CallsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('ticketsAndCalls');

  return (
    <RouteErrorState
      error={error}
      reset={reset}
      title={t('callsTitle')}
      subtitle={t('callsSubTitle')}
    />
  );
}
