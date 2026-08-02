'use client';

import { useLocale, useTranslations } from 'next-intl';

import CallsTableSkeleton from '@/features/calls/ui/organisms/CallsTableSkeleton';
import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';

export default function CallsLoading() {
  const t = useTranslations('ticketsAndCalls');
  const locale = useLocale();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('callsTitle')} subtitle={t('callsSubTitle')} />
      <div className="bg-surface z-50 h-full w-full rounded-2xl p-4 shadow-sm">
        <CallsTableSkeleton t={t} locale={locale} titleKey="callsTitle" />
      </div>
    </div>
  );
}
