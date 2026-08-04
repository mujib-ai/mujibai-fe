'use client';

import { useLocale, useTranslations } from 'next-intl';

import { PageLayout } from '@/shared/components/templates/PageLayout';

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
    <PageLayout title={t('callsTitle')} subtitle={t('callsSubTitle')}>
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
    </PageLayout>
  );
}
