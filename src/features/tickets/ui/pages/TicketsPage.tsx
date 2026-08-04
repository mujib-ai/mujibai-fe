'use client';

import { useLocale, useTranslations } from 'next-intl';

import { PageLayout } from '@/shared/components/templates/PageLayout';

import { useTickets } from '../../hooks';
import Filtering from '../organisms/Filtering';
import Table from '../organisms/Table';

type CallsAndTicketsMode = 'calls' | 'tickets';

export default function TicketsPage({ mode }: { mode: CallsAndTicketsMode }) {
  const t = useTranslations('ticketsAndCalls');
  const locale = useLocale();
  const titleKey = mode === 'calls' ? 'callsTitle' : 'ticketsTitle';
  const subtitleKey = mode === 'calls' ? 'callsSubTitle' : 'ticketsSubTitle';
  const {
    tickets,
    total,
    page,
    limit,
    totalPages,
    status,
    isLoading,
    error,
    goToPage,
    changeLimit,
    changeStatus,
  } = useTickets();

  return (
    <PageLayout title={t(titleKey)} subtitle={t(subtitleKey)}>
      <section className="flex flex-col">
        {(status !== undefined || total > 0 || isLoading) && (
          <Filtering
            status={status}
            onStatusChange={changeStatus}
            statusPlaceholder={t('status')}
            allStatusesText={t('filterAllStatuses')}
            t={t}
          />
        )}
        <Table
          t={t}
          locale={locale}
          titleKey={titleKey}
          tickets={tickets}
          total={total}
          page={page}
          limit={limit}
          totalPages={totalPages}
          isLoading={isLoading}
          error={error}
          goToPage={goToPage}
          changeLimit={changeLimit}
        />
      </section>
    </PageLayout>
  );
}
