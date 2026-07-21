'use client';

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/atoms/ui/button';
import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';
import { AlertTriangle } from 'lucide-react';

export default function KnowledgeBaseError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('KnowledgeBase');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} subtitle={t('subTitle')} />
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl bg-[#FFFFFFBF] p-8 text-center shadow-sm dark:bg-[#001434A6]">
        <div className="bg-destructive/10 flex size-14 items-center justify-center rounded-full">
          <AlertTriangle className="text-destructive size-7" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">{t('errorTitle')}</p>
          <p className="text-muted-foreground text-sm">
            {t('errors.loadFailed')}
          </p>
        </div>
        <Button onClick={reset}>{t('errorRetry')}</Button>
      </div>
    </div>
  );
}
