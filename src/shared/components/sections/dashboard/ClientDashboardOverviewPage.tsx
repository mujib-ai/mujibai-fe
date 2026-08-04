'use client';

import { useTranslations } from 'next-intl';

import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';
import DataUsageCard from '@/shared/components/organisms/dashboard/DataUsageCard';
import RecentCallsTable from '@/shared/components/organisms/dashboard/home/RecentCallsTable';
import { Client } from '@/shared/types';

export default function ClientDashboardOverviewPage({
  client,
}: {
  client: Client | null;
}) {
  const t = useTranslations('dashboardOverview');
  const title = client?.name ? `${t('welcome')} ${client.name}` : t('welcome');
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={title} subtitle={t('subTitle')} />

      <div className="bg-surface z-50 h-full w-full rounded-2xl border border-white/40 p-4 shadow-sm backdrop-blur-sm sm:p-5 dark:border-white/10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="col-span-2 md:col-span-2">
            <RecentCallsTable title={t('newCalls')} />
          </div>
          <div className="col-span-1">
            <DataUsageCard
              used={10}
              total={100}
              title={t('dataUsage')}
              upgradePlan={t('upgradePlan')}
              of={t('of')}
              more={t('more')}
              dataTitle={t('dataTitle')}
              left={t('left')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
