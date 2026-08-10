'use client';

import { type ReactElement, useState } from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { filterNotifications } from '../lib/filterNotifications';
import { NotifEmptyState } from '../molecules/NotifEmptyState';
import { NotifPanelHeader } from '../molecules/NotifPanelHeader';
import { NotifTabs } from '../molecules/NotifTabs';
import { NotificationListItem } from '../molecules/NotificationListItem';
import type { NotificationPublic, NotificationTab } from '../types';

export interface NotificationsPanelProps {
  notifications: NotificationPublic[];
  isLoading: boolean;
  isError: boolean;
  unreadCount: number;
  markAllReadLoading: boolean;
  onClose: () => void;
  onMarkRead: (notificationId: string) => void;
  onMarkAllRead: () => void;
}

export function NotificationsPanel({
  notifications,
  isLoading,
  isError,
  unreadCount,
  markAllReadLoading,
  onClose,
  onMarkRead,
  onMarkAllRead,
}: NotificationsPanelProps): ReactElement {
  const t = useTranslations('notifications');
  const [tab, setTab] = useState<NotificationTab>('all');

  const filtered = filterNotifications(notifications, tab);

  return (
    <div
      role="dialog"
      aria-label={t('panel.ariaLabel')}
      className="flex max-h-[min(36rem,calc(100vh-6rem))] flex-col"
    >
      <NotifPanelHeader
        unreadCount={unreadCount}
        onMarkAllRead={onMarkAllRead}
        markAllReadLoading={markAllReadLoading}
        onClose={onClose}
      />
      <NotifTabs
        active={tab}
        onChange={setTab}
        totalCount={notifications.length}
        unreadCount={unreadCount}
      />

      <div className="flex-1 overflow-y-auto">
        {isError ? (
          <p className="text-destructive px-4 py-8 text-center text-sm">
            {t('error')}
          </p>
        ) : isLoading ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-muted h-14 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <NotifEmptyState />
        ) : (
          filtered.map(n => (
            <NotificationListItem
              key={n.id}
              notification={n}
              onRowClick={() => onMarkRead(n.id)}
            />
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <Link
          href="/dashboard/notifications"
          onClick={onClose}
          className="text-primary hover:bg-accent border-t px-4 py-2.5 text-center text-sm font-medium"
        >
          {t('viewAll')}
        </Link>
      )}
    </div>
  );
}
