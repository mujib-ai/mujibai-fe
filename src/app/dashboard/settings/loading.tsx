'use client';

import { useTranslations } from 'next-intl';

import SettingsSkeleton from '@/features/settings/ui/organisms/SettingsSkeleton';
import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';

export default function SettingsLoading() {
  const t = useTranslations('settings');

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} subtitle={t('subTitle')} />
      <div className="z-50 h-full w-full rounded-2xl bg-white/75 p-4 shadow-sm dark:bg-[#001434A6]">
        <SettingsSkeleton />
      </div>
    </div>
  );
}
