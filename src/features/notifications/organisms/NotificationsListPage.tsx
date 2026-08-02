'use client';

import type { ReactElement } from 'react';
import { useRef } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import CallsPagination from '@/features/client/calls/ui/molecules/CallsPagination';
import Reveal from '@/shared/components/atoms/Reveal';
import { Button } from '@/shared/components/atoms/ui/button';
import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';
import { PageBackground } from '@/shared/components/templates/PageBackground';
import { gsap, useGSAP } from '@/shared/lib/gsap';
import { useQuery } from '@tanstack/react-query';

import { useNotifications } from '../hooks/useNotifications';
import { useNotificationsList } from '../hooks/useNotificationsList';
import { groupNotificationsByDay } from '../lib/groupByDay';
import { NotifEmptyState } from '../molecules/NotifEmptyState';
import { NotificationRow } from '../molecules/NotificationRow';
import { NotificationsPageTabs } from '../molecules/NotificationsPageTabs';
import { NotificationService } from '../services/notifications.api';
import type { NotificationTab } from '../types';

export function NotificationsListPage(): ReactElement {
  const t = useTranslations('notifications');
  const locale = useLocale();
  const headerRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    pagination,
    isLoading,
    isError,
    filters,
    updateFilters,
    page,
    pageSize,
    changePage,
    changePageSize,
    markRead,
    markAllRead,
    markAllReadLoading,
    remove,
  } = useNotificationsList();
  const { unreadCount } = useNotifications();
  const { data: totalAll } = useQuery({
    queryKey: ['notifications', 'total-all'],
    queryFn: () => NotificationService.list({ page: 1, pageSize: 1 }),
    select: response => response.pagination.total,
  });

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.5,
        ease: 'power2.out',
      });
    },
    { scope: headerRef }
  );

  const activeTab: NotificationTab =
    filters.readStatus === false ? 'unread' : 'all';

  const changeTab = (tab: NotificationTab) => {
    updateFilters({
      ...filters,
      readStatus: tab === 'unread' ? false : undefined,
    });
  };

  const groups = groupNotificationsByDay(notifications, locale);
  const listKey = `${page}-${JSON.stringify(filters)}`;

  return (
    <PageBackground showHeader={false} className="min-h-0 w-full items-stretch">
      <div ref={headerRef} className="flex h-full w-full flex-col gap-4">
        <DashboardHeader title={t('title')} subtitle={t('subTitle')} />

        <div className="z-10 flex w-full flex-1 flex-col gap-4 rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <NotificationsPageTabs
              active={activeTab}
              onChange={changeTab}
              totalCount={totalAll ?? 0}
              unreadCount={unreadCount}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => markAllRead()}
              disabled={markAllReadLoading}
            >
              {t('panel.markAllRead')}
            </Button>
          </div>

          {isError ? (
            <p className="text-destructive px-4 py-8 text-center text-sm">
              {t('error')}
            </p>
          ) : isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-muted h-20 animate-pulse rounded-2xl"
                />
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <NotifEmptyState />
          ) : (
            <div key={listKey} className="flex flex-col gap-6">
              {groups.map(group => (
                <div key={group.key} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground text-xs font-medium">
                      {group.labelKind === 'today'
                        ? t('groups.today')
                        : group.labelKind === 'yesterday'
                          ? t('groups.yesterday')
                          : (group.weekday ?? group.date)}
                    </span>
                    <div className="bg-border h-px flex-1" />
                  </div>
                  <Reveal stagger={0.06} className="flex flex-col gap-2">
                    {group.items.map(notification => (
                      <NotificationRow
                        key={notification.id}
                        notification={notification}
                        onRowClick={() => markRead(notification.id)}
                        onRemove={() => remove(notification.id)}
                      />
                    ))}
                  </Reveal>
                </div>
              ))}
            </div>
          )}

          {pagination && (
            <CallsPagination
              page={page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              limit={pageSize}
              isFetching={isLoading}
              onPageChange={changePage}
              onLimitChange={changePageSize}
              ofText={t('pagination.of')}
              clientsText={t('pagination.results')}
              previousText={t('pagination.previous')}
              nextText={t('pagination.next')}
              locale={locale}
            />
          )}
        </div>
      </div>
    </PageBackground>
  );
}
