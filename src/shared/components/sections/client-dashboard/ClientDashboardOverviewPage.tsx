'use client';

import { useTranslations } from 'next-intl';

import DashboardHeader from '@/shared/components/organisms/client-dashboard/DashboardHeader';
import DataUsageCard from '@/shared/components/organisms/client-dashboard/DataUsageCard';
import RecentClientsTable from '@/shared/components/organisms/client-dashboard/home/RecentClientsTable';
import { Client } from '@/shared/types';

export default function ClientDashboardOverviewPage({
  client,
}: {
  client: Client;
}) {
  const t = useTranslations('dashboardOverview');
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('welcome') + ' ' + client?.name} />

      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="col-span-2 md:col-span-2">
            <RecentClientsTable title={t('recentClients')} />
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
