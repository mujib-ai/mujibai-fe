import { type ReactElement } from 'react';

import { useTranslations } from 'next-intl';

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';

import { NOTIFICATION_TABS } from '../lib/filterNotifications';
import type { NotificationTab } from '../types';

interface NotifTabsProps {
  active: NotificationTab;
  onChange: (tab: NotificationTab) => void;
  totalCount: number;
  unreadCount: number;
}

export function NotifTabs({
  active,
  onChange,
  totalCount,
  unreadCount,
}: NotifTabsProps): ReactElement {
  const t = useTranslations('notifications.tabs');

  return (
    <Tabs
      value={active}
      onValueChange={value => onChange(value as NotificationTab)}
      className="gap-0"
    >
      <TabsList className="h-fit w-full justify-start rounded-none border-b bg-transparent p-2">
        {NOTIFICATION_TABS.map(tab => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="h-auto flex-none gap-1.5 rounded-full px-3 py-1.5 text-xs"
          >
            {t(tab)}
            <span className="bg-primary/10 text-primary rounded-full px-1.5 text-[10px]">
              {tab === 'all' ? totalCount : unreadCount}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
