'use client';

import { useTranslations } from 'next-intl';

import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';
import DataUsageCard from '@/shared/components/organisms/dashboard/DataUsageCard';
import RecentCallsTableSkeleton from '@/shared/components/organisms/dashboard/home/RecentCallsTableSkeleton';

export default function DashboardLoading() {
  const t = useTranslations('dashboardOverview');

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('welcome')} subtitle={t('subTitle')} />
      <div className="bg-surface z-50 h-full w-full rounded-2xl p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="col-span-2 md:col-span-2">
            <RecentCallsTableSkeleton
              title={t('newCalls')}
              alignClass="text-start"
            />
          </div>
          <div className="col-span-1">
            <DataUsageCard
              used={0}
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
