'use client';

import { useLocale, useTranslations } from 'next-intl';

import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';

import { useCalls } from '../../hooks';
import CallsTable from '../organisms/CallsTable';
import Filtering from '../organisms/Filtering';

export default function CallsPage() {
  const t = useTranslations('ticketsAndCalls');
  const locale = useLocale();
  const {
    calls,
    pagination,
    status,
    setStatus,
    setPage,
    setLimit,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useCalls();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('callsTitle')} subtitle={t('callsSubTitle')} />
      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <section className="flex flex-col">
          {(status !== undefined || pagination.total > 0 || isLoading) && (
            <Filtering
              status={status}
              onStatusChange={setStatus}
              statusPlaceholder={t('status')}
              allStatusesText={t('filterAllStatuses')}
              t={t}
            />
          )}
          <CallsTable
            t={t}
            locale={locale}
            titleKey="callsTitle"
            calls={calls}
            pagination={pagination}
            isLoading={isLoading}
            isFetching={isFetching}
            error={error}
            onPageChange={setPage}
            onLimitChange={setLimit}
            onRetry={refetch}
          />
        </section>
      </div>
    </div>
  );
}
