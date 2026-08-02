'use client';

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/atoms/ui/button';
import { AlertTriangle } from 'lucide-react';

import DashboardHeader from './DashboardHeader';

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
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={title} subtitle={subtitle} />
      <div className="bg-surface flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl p-8 text-center shadow-sm">
        <div className="bg-destructive/10 flex size-14 items-center justify-center rounded-full">
          <AlertTriangle className="text-destructive size-7" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">{t('title')}</p>
          <p className="text-muted-foreground text-sm">{t('description')}</p>
        </div>
        <Button onClick={reset}>{t('retry')}</Button>
      </div>
    </div>
  );
}
