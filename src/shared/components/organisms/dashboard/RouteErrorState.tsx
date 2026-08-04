'use client';

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { ErrorState } from '@/shared/components/molecules/ErrorState';
import { PageLayout } from '@/shared/components/templates/PageLayout';

interface RouteErrorStateProps {
  error: Error & { digest?: string };
  reset: () => void;
  title: string;
  subtitle?: string;
}

export function RouteErrorState({
  error,
  reset,
  title,
  subtitle,
}: RouteErrorStateProps) {
  const t = useTranslations('routeError');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageLayout
      title={title}
      subtitle={subtitle}
      contentClassName="flex items-center justify-center"
    >
      <ErrorState
        title={t('title')}
        description={t('description')}
        retryLabel={t('retry')}
        onRetry={reset}
        className="w-full"
      />
    </PageLayout>
  );
}
