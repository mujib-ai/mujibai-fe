'use client';

import { useLocale } from 'next-intl';

import { AccountSettings } from './AccountSettings';
import { IntegrationSettings } from './IntegrationSettings';
import { NotificationPreference } from './NotificationPreference';
import { SettingsTabs } from './SettingsTabs';

import type { TabItem } from '../../types';

export interface SettingsOrganismProps {
  activeTab: string;
  onTabChange: (tabValue: string) => void;
  tabs: TabItem[];
}

export function SettingsOrganism({
  activeTab,
  onTabChange,
  tabs,
}: SettingsOrganismProps) {
  const locale = useLocale();

  const tabContent = {
    accountSettings: <AccountSettings />,
    integrationSettings: <IntegrationSettings />,
    notificationPreference: <NotificationPreference />,
  };

  return (
    <SettingsTabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      locale={locale}
      children={tabContent}
    />
  );
}
