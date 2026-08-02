'use client';

import { useTranslations } from 'next-intl';

import { RouteErrorState } from '@/shared/components/organisms/dashboard/RouteErrorState';

export default function SettingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('settings');

  return (
    <RouteErrorState
      error={error}
      reset={reset}
      title={t('title')}
      subtitle={t('subTitle')}
    />
  );
}
