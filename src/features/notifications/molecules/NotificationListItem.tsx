'use client';

import { type ReactElement } from 'react';

import { useFormatter, useTranslations } from 'next-intl';
import Link from 'next/link';

import { Badge } from '@/shared/components/atoms/ui/badge';

import { NotifIcon } from '../atoms/NotifIcon';
import { NOTIFICATION_SEVERITY_META } from '../constants/notifTypeMeta';
import type { NotificationPublic } from '../types';

interface NotificationListItemProps {
  notification: NotificationPublic;
  onRowClick: () => void;
}

export function NotificationListItem({
  notification,
  onRowClick,
}: NotificationListItemProps): ReactElement {
  const t = useTranslations('notifications');
  const format = useFormatter();
  const meta = NOTIFICATION_SEVERITY_META[notification.severity];
  const isUnread = !notification.readAt;

  const date = new Date(notification.createdAt);
  const time = Number.isNaN(date.getTime()) ? '' : format.relativeTime(date);

  const content = (
    <div
      className={`flex items-start gap-3 border-b px-4 py-3 text-sm last:border-b-0 ${
        isUnread ? 'bg-primary/5' : ''
      }`}
    >
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-full ${meta.className}`}
      >
        <NotifIcon name={meta.icon} size={14} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate font-medium">{notification.title}</p>
          <span className="text-muted-foreground shrink-0 text-[10px] whitespace-nowrap">
            {time}
          </span>
        </div>
        <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
          {notification.body}
        </p>
        {notification.severity === 'critical' && (
          <Badge variant="destructive" className="mt-2">
            {t('chips.critical')}
          </Badge>
        )}
        {notification.severity === 'warning' && (
          <Badge
            variant="secondary"
            className="mt-2 bg-amber-500/10 text-amber-700"
          >
            {t('chips.warning')}
          </Badge>
        )}
      </div>
      {isUnread && (
        <span className="bg-primary mt-1.5 size-2 shrink-0 rounded-full" />
      )}
    </div>
  );

  return (
    <Link
      href={`/dashboard/notifications/${notification.id}`}
      onClick={onRowClick}
      className="hover:bg-accent block"
    >
      {content}
    </Link>
  );
}
