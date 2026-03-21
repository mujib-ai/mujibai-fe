'use client';

import { useTranslations } from 'next-intl';
import { Moon, Settings, Sun } from 'lucide-react';

import type { SettingsOrganismProps, ThemeOption } from '../../types';
import { NotificationSettings } from './NotificationSettings';
import { ThemeSettings } from './ThemeSettings';

export function SettingsOrganism({
  theme,
  notifications,
  onThemeChange,
  onNotificationChange,
}: SettingsOrganismProps) {
  const t = useTranslations('adminSettings.theme');

  const themeOptions: ThemeOption[] = [
    { label: t('light'), value: 'light', Icon: Sun },
    { label: t('dark'), value: 'dark', Icon: Moon },
    { label: t('system'), value: 'system', Icon: Settings },
  ];

  return (
    <div className="space-y-4">
      <ThemeSettings
        theme={theme}
        onThemeChange={onThemeChange}
        options={themeOptions}
      />
      <NotificationSettings
        notifications={notifications}
        onNotificationChange={onNotificationChange}
      />
    </div>
  );
}
