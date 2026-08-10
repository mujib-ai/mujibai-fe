'use client';

import { type ReactElement, useEffect } from 'react';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import { Badge } from '@/shared/components/atoms/ui/badge';
import { Button } from '@/shared/components/atoms/ui/button';
import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';
import { ArrowLeft } from 'lucide-react';

import { NotifIcon } from '../atoms/NotifIcon';
import { NOTIFICATION_SEVERITY_META } from '../constants/notifTypeMeta';
import { useNotifications } from '../hooks/useNotifications';
import { formatNotificationDate } from '../lib/formatNotificationDate';
import { getNotificationHref } from '../lib/notificationLinks';

export function NotificationDetail({
  notificationId,
}: {
  notificationId: string;
}): ReactElement {
  const t = useTranslations('notifications');
  const locale = useLocale();
  const { notifications, isLoading, markRead } = useNotifications();

  const notification = notifications.find(n => n.id === notificationId);
  const isUnread = !!notification && !notification.readAt;

  useEffect(() => {
    if (notification && isUnread) markRead(notification.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification?.id, isUnread]);

  if (!notification) {
    return (
      <div className="flex h-full w-full flex-col gap-4">
        <DashboardHeader
          title={t('detail.title')}
          subtitle={t('detail.subTitle')}
        />
        <div className="bg-background z-50 flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl p-4 shadow-sm">
          {!isLoading && (
            <>
              <p className="text-sm font-semibold">
                {t('detail.notFoundTitle')}
              </p>
              <p className="text-muted-foreground text-sm">
                {t('detail.notFoundSubtitle')}
              </p>
            </>
          )}
          <Link
            href="/dashboard"
            className="text-primary mt-2 inline-flex items-center gap-1 text-sm"
          >
            <ArrowLeft className="size-4" />
            {t('detail.back')}
          </Link>
        </div>
      </div>
    );
  }

  const meta = NOTIFICATION_SEVERITY_META[notification.severity];
  const href = getNotificationHref(notification);

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader
        title={t('detail.title')}
        subtitle={t('detail.subTitle')}
      />
      <div className="bg-surface z-50 h-full w-full rounded-2xl border border-white/40 p-4 shadow-sm backdrop-blur-sm sm:p-5 dark:border-white/10">
        <Link
          href="/dashboard"
          className="text-primary mb-4 inline-flex items-center gap-1 text-sm"
        >
          <ArrowLeft className="size-4" />
          {t('detail.back')}
        </Link>

        <div className="flex items-start gap-4">
          <div
            className={`flex size-12 shrink-0 items-center justify-center rounded-full ${meta.className}`}
          >
            <NotifIcon name={meta.icon} size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">{notification.title}</h2>
              {isUnread && (
                <Badge variant="secondary">{t('detail.unread')}</Badge>
              )}
              {notification.severity === 'critical' && (
                <Badge variant="destructive">{t('chips.critical')}</Badge>
              )}
              {notification.severity === 'warning' && (
                <Badge
                  variant="secondary"
                  className="bg-amber-500/10 text-amber-700"
                >
                  {t('chips.warning')}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              {t('detail.receivedAt')}:{' '}
              {formatNotificationDate(notification.createdAt, locale)}
            </p>
            <p className="mt-4 text-sm leading-relaxed">{notification.body}</p>

            {href && (
              <Button asChild className="mt-6 rounded-full">
                <Link href={href}>
                  {t('detail.viewResource', {
                    resourceType: notification.resourceType ?? '',
                  })}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
