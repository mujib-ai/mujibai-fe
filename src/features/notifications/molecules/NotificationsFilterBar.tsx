'use client';

import type { ReactElement } from 'react';

import { useTranslations } from 'next-intl';

import { Input } from '@/shared/components/atoms/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';

import { useNotificationSettings } from '../hooks/useNotificationSettings';
import type { NotificationsListFilters } from '../hooks/useNotificationsList';
import type { NotificationSeverity } from '../types';

const SEVERITY_OPTIONS: NotificationSeverity[] = [
  'info',
  'success',
  'warning',
  'critical',
];

const ALL = '__all__';

interface NotificationsFilterBarProps {
  filters: NotificationsListFilters;
  onChange: (filters: NotificationsListFilters) => void;
}

export function NotificationsFilterBar({
  filters,
  onChange,
}: NotificationsFilterBarProps): ReactElement {
  const t = useTranslations('notifications.filters');
  const { settings } = useNotificationSettings();
  const eventTypes = settings.map(s => s.eventType);

  const set = (patch: Partial<NotificationsListFilters>) =>
    onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={filters.eventType ?? ALL}
        onValueChange={value =>
          set({ eventType: value === ALL ? undefined : value })
        }
      >
        <SelectTrigger size="sm" aria-label={t('eventType')}>
          <SelectValue placeholder={t('eventType')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>{t('allEventTypes')}</SelectItem>
          {eventTypes.map(eventType => (
            <SelectItem key={eventType} value={eventType}>
              {eventType}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.severity ?? ALL}
        onValueChange={value =>
          set({
            severity:
              value === ALL ? undefined : (value as NotificationSeverity),
          })
        }
      >
        <SelectTrigger size="sm" aria-label={t('severity')}>
          <SelectValue placeholder={t('severity')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>{t('allSeverities')}</SelectItem>
          {SEVERITY_OPTIONS.map(severity => (
            <SelectItem key={severity} value={severity}>
              {t(`severityOption.${severity}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={
          filters.readStatus === undefined ? ALL : String(filters.readStatus)
        }
        onValueChange={value =>
          set({ readStatus: value === ALL ? undefined : value === 'true' })
        }
      >
        <SelectTrigger size="sm" aria-label={t('readStatus')}>
          <SelectValue placeholder={t('readStatus')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>{t('allStatuses')}</SelectItem>
          <SelectItem value="false">{t('unread')}</SelectItem>
          <SelectItem value="true">{t('read')}</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="date"
        aria-label={t('dateFrom')}
        value={filters.dateFrom ?? ''}
        onChange={e => set({ dateFrom: e.target.value || undefined })}
        className="bg-control h-9 w-fit rounded-full border-0"
      />
      <Input
        type="date"
        aria-label={t('dateTo')}
        value={filters.dateTo ?? ''}
        onChange={e => set({ dateTo: e.target.value || undefined })}
        className="bg-control h-9 w-fit rounded-full border-0"
      />
    </div>
  );
}
