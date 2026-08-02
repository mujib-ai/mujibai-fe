'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/atoms/ui/tabs';

import type { TabItem } from '../../types';

export interface SettingsTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabValue: string) => void;
  locale: string;
  children: Record<string, React.ReactNode>;
}

export function SettingsTabs({
  tabs,
  activeTab,
  onTabChange,
  locale,
  children,
}: SettingsTabsProps) {
  return (
    <Tabs
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      value={activeTab}
      onValueChange={onTabChange}
      className="w-full"
    >
      <TabsList className="mx-3 mt-4 flex h-12 flex-wrap justify-between gap-2 rounded-full bg-[#3B82F614] p-1 dark:bg-[#3B82F614]">
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex-1 rounded-full px-6 py-5 text-sm font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-[#06B6D420] data-[state=active]:bg-[#06B6D4] data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:bg-[#06B6D440]"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(tab => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4">
          {children[tab.value]}
        </TabsContent>
      ))}
    </Tabs>
  );
}
