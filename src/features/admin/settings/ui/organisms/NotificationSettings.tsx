'use client';

import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';

import type { NotificationSettingsData, NotificationSettingsProps } from '../../types';
import { NotificationToggleRow } from '../atoms';

export function NotificationSettings({
  notifications,
  onNotificationChange,
}: NotificationSettingsProps) {
  const t = useTranslations('adminSettings.notifications');

  const notificationTypes = [
    {
      key: 'email' as keyof NotificationSettingsData,
      labelKey: 'email' as const,
    },
    {
      key: 'sms' as keyof NotificationSettingsData,
      labelKey: 'sms' as const,
    },
    {
      key: 'browser' as keyof NotificationSettingsData,
      labelKey: 'browser' as const,
    },
  ];

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 rounded-2xl bg-[#FFFFFFBF] py-7 dark:bg-[#001434A6]">
        {notificationTypes.map(({ key, labelKey }) => (
          <NotificationToggleRow
            key={key}
            label={t(labelKey)}
            checked={notifications[key]}
            onCheckedChange={(enabled) => onNotificationChange(key, enabled)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
