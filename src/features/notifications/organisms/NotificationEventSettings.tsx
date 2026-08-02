'use client';

import type { ReactElement } from 'react';

import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';
import { Checkbox } from '@/shared/components/atoms/ui/checkbox';
import { Label } from '@/shared/components/atoms/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';

import { useNotificationSettings } from '../hooks/useNotificationSettings';
import type {
  NotificationChannel,
  NotificationFrequency,
  NotificationSettingsPublic,
} from '../types';

function humanizeEventType(eventType: string): string {
  return eventType
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function NotificationEventSettings(): ReactElement {
  const t = useTranslations('settings.notificationSettings');
  const { settings, isLoading, isError, updateSettings } =
    useNotificationSettings();

  const toggleChannel = (
    setting: NotificationSettingsPublic,
    channel: NotificationChannel,
    checked: boolean
  ) => {
    if (setting.mandatory && channel === 'in_app' && !checked) return;

    const channels = checked
      ? [...setting.channels, channel]
      : setting.channels.filter(c => c !== channel);

    updateSettings({
      eventType: setting.eventType,
      payload: {
        channels,
        frequency: setting.frequency,
        threshold: setting.threshold,
      },
    });
  };

  const changeFrequency = (
    setting: NotificationSettingsPublic,
    frequency: NotificationFrequency
  ) => {
    updateSettings({
      eventType: setting.eventType,
      payload: {
        channels: setting.channels,
        frequency,
        threshold: setting.threshold,
      },
    });
  };

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{t('title')}</CardTitle>
        <p className="text-muted-foreground text-sm">{t('subTitle')}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 rounded-xl bg-white py-6 dark:bg-[#00143473]">
        {isError ? (
          <p className="text-destructive text-sm">{t('loadFailed')}</p>
        ) : isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-muted h-16 animate-pulse rounded-xl" />
          ))
        ) : (
          settings.map(setting => (
            <div
              key={setting.eventType}
              className="flex flex-col gap-3 rounded-xl bg-[#3B82F614] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-semibold">
                  {humanizeEventType(setting.eventType)}
                </h2>
                <Select
                  value={setting.frequency}
                  onValueChange={value =>
                    changeFrequency(setting, value as NotificationFrequency)
                  }
                >
                  <SelectTrigger size="sm" aria-label={t('frequency')}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {setting.allowedFrequencies.map(freq => (
                      <SelectItem key={freq} value={freq}>
                        {t(`frequencyOption.${freq}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap gap-4">
                {setting.allowedChannels.map(channel => (
                  <Label
                    key={channel}
                    className="flex items-center gap-2 text-sm font-normal"
                  >
                    <Checkbox
                      checked={setting.channels.includes(channel)}
                      disabled={setting.mandatory && channel === 'in_app'}
                      onCheckedChange={checked =>
                        toggleChannel(setting, channel, checked === true)
                      }
                    />
                    {t(`channel.${channel}`)}
                  </Label>
                ))}
              </div>

              {setting.mandatory && (
                <p className="text-muted-foreground text-xs">
                  {t('mandatory')}
                </p>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
