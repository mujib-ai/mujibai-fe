'use client';

import { useTranslations } from 'next-intl';

import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';
import { Skeleton } from '@heroui/react';

const BAR = 'rounded-md bg-black/10 dark:bg-white/10';

export default function SettingsLoading() {
  const t = useTranslations('settings');

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} subtitle={t('subTitle')} />
      <div className="flex flex-col gap-4">
        <Skeleton
          animationType="none"
          className={`${BAR} h-10 w-full max-w-md rounded-full`}
        />
        <div className="bg-surface rounded-2xl p-6">
          <div className="mb-6 flex flex-col gap-2">
            <Skeleton animationType="none" className={`${BAR} h-5 w-40`} />
            <Skeleton animationType="none" className={`${BAR} h-3.5 w-64`} />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                animationType="none"
                className={`${BAR} h-11 w-full rounded-md`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
