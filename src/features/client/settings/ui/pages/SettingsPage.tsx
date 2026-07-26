'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import useClientSettings from '../../hooks/useClientSettings';
import { SettingsOrganism } from '../organisms';
import SettingsPageTemplate from '../templates/SettingsPageTemplate';

export default function SettingsPage() {
  const t = useTranslations('settings');
  const searchParams = useSearchParams();

  const tabItems = [
    { value: 'accountSettings', label: t('accountSettings.title') },
    { value: 'integrationSettings', label: t('integrationSettings.title') },
    {
      value: 'notificationPreference',
      label: t('notificationPreference.title'),
    },
  ];

  const requestedTab = searchParams.get('tab') ?? undefined;
  const initialActiveTab = tabItems.some(tab => tab.value === requestedTab)
    ? requestedTab
    : undefined;

  const { activeTab, setActiveTab } = useClientSettings(
    tabItems,
    initialActiveTab
  );

  return (
    <SettingsPageTemplate title={t('title')} subtitle={t('subTitle')}>
      <SettingsOrganism
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabItems}
      />
    </SettingsPageTemplate>
  );
}
