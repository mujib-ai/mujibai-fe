'use client';

import { useLocale } from 'next-intl';

import type { TabItem } from '../../types';
import { AccountSettings } from './AccountSettings';
import { IntegrationSettings } from './IntegrationSettings';
import { NotificationPreference } from './NotificationPreference';
import { SettingsTabs } from './SettingsTabs';

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
    >
      {tabContent}
    </SettingsTabs>
  );
}
