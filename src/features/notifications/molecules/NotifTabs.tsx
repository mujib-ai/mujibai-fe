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
      <TabsList className="h-fit w-full justify-start gap-2 rounded-full bg-[#3B82F614] p-1 dark:bg-[#3B82F614]">
        {NOTIFICATION_TABS.map(tab => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="group h-auto flex-none gap-1.5 rounded-full px-3 py-1.5 text-xs text-gray-700 transition-all duration-300 ease-in-out hover:bg-[#06B6D420] data-[state=active]:bg-[#06B6D4] data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:bg-[#06B6D440]"
          >
            {t(tab)}
            <span className="bg-primary/10 text-primary rounded-full px-1.5 text-[10px] group-data-[state=active]:bg-white/20 group-data-[state=active]:text-white">
              {tab === 'all' ? totalCount : unreadCount}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
