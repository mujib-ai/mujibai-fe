'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  CLIENT_SETTINGS_CONSTANTS,
  getSettingsTabFromQuery,
  getSettingsTabQueryValue,
} from '../../constants';
import { SettingsOrganism } from '../organisms';
import SettingsPageTemplate from '../templates/SettingsPageTemplate';

export default function SettingsPage() {
  const t = useTranslations('settings');
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabItems = [
    { value: 'accountSettings', label: t('accountSettings.title') },
    { value: 'integrationSettings', label: t('integrationSettings.title') },
    {
      value: 'notificationPreference',
      label: t('notificationPreference.title'),
    },
  ];

  const activeTab = getSettingsTabFromQuery(
    searchParams.get(CLIENT_SETTINGS_CONSTANTS.TAB_QUERY_PARAM)
  );

  const setActiveTab = (tabValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(
      CLIENT_SETTINGS_CONSTANTS.TAB_QUERY_PARAM,
      getSettingsTabQueryValue(tabValue)
    );
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

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
