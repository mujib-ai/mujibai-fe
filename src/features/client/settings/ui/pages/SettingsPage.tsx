'use client';

import { useTranslations } from 'next-intl';

import useClientSettings from '../../hooks/useClientSettings';
import { SettingsOrganism } from '../organisms';
import SettingsPageTemplate from '../templates/SettingsPageTemplate';

export default function SettingsPage() {
  const t = useTranslations('settings');

  const tabItems = [
    { value: 'accountSettings', label: t('accountSettings.title') },
    { value: 'integrationSettings', label: t('integrationSettings.title') },
    {
      value: 'notificationPreference',
      label: t('notificationPreference.title'),
    },
  ];

  const { activeTab, setActiveTab } = useClientSettings(tabItems);

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
