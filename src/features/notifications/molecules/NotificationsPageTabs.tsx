'use client';

import type { ReactElement } from 'react';

import { useTranslations } from 'next-intl';

import type { NotificationTab } from '../types';

interface NotificationsPageTabsProps {
  active: NotificationTab;
  onChange: (tab: NotificationTab) => void;
  totalCount: number;
  unreadCount: number;
}

export function NotificationsPageTabs({
  active,
  onChange,
  totalCount,
  unreadCount,
}: NotificationsPageTabsProps): ReactElement {
  const t = useTranslations('notifications.tabs');

  const tabs: { value: NotificationTab; count: number }[] = [
    { value: 'all', count: totalCount },
    { value: 'unread', count: unreadCount },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {tabs.map(tab => {
        const isActive = active === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'bg-control text-muted-foreground hover:text-foreground'
            }`}
          >
            <span
              className={`flex size-6 items-center justify-center rounded-full text-xs font-semibold ${
                isActive
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-primary/10 text-primary'
              }`}
            >
              {tab.count}
            </span>
            {t(tab.value)}
          </button>
        );
      })}
    </div>
  );
}
