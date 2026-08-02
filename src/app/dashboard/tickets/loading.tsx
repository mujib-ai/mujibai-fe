'use client';

import { useLocale, useTranslations } from 'next-intl';

import TicketsTableSkeleton from '@/features/tickets/ui/organisms/TicketsTableSkeleton';
import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';

export default function TicketsLoading() {
  const t = useTranslations('ticketsAndCalls');
  const locale = useLocale();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader
        title={t('ticketsTitle')}
        subtitle={t('ticketsSubTitle')}
      />
      <div className="bg-surface z-50 h-full w-full rounded-2xl p-4 shadow-sm">
        <TicketsTableSkeleton t={t} locale={locale} titleKey="ticketsTitle" />
      </div>
    </div>
  );
}
