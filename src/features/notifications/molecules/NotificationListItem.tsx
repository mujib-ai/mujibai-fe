'use client';

import { type ReactElement } from 'react';

import { useFormatter, useTranslations } from 'next-intl';
import Link from 'next/link';

import { Badge } from '@/shared/components/atoms/ui/badge';

import { NotifIcon } from '../atoms/NotifIcon';
import { NOTIFICATION_SEVERITY_META } from '../constants/notifTypeMeta';
import { getNotificationHref } from '../lib/notificationLinks';
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
  const href = getNotificationHref(notification);
  const isUnread = !notification.readAt;

  const date = new Date(notification.createdAt);
  const time = Number.isNaN(date.getTime()) ? '' : format.relativeTime(date);

  const content = (
    <div
      className={`flex items-start gap-3 border-b px-4 py-3 text-sm last:border-b-0 dark:border-white/10 ${
        isUnread ? 'bg-[#06B6D40F] dark:bg-[#06B6D41A]' : ''
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

  if (href) {
    return (
      <Link
        href={href}
        onClick={onRowClick}
        className="block hover:bg-black/2 dark:hover:bg-white/2"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onRowClick}
      className="block w-full text-left hover:bg-black/2 dark:hover:bg-white/2"
    >
      {content}
    </button>
  );
}
