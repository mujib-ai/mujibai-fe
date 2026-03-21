'use client';

import { useTranslations } from 'next-intl';

import DashboardHeader from '@/shared/components/organisms/client-dashboard/DashboardHeader';

import useSettings from '../../hooks/useSettings';
import { SettingsOrganism } from '../organisms';

export default function SettingsPage() {
  const t = useTranslations('adminSettings');
  const { theme, notifications, updateTheme, updateNotification } =
    useSettings();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} />

      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <SettingsOrganism
          theme={theme}
          notifications={notifications}
          onThemeChange={updateTheme}
          onNotificationChange={updateNotification}
        />
      </div>
    </div>
  );
}
