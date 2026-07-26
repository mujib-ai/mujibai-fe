'use client';

import { useTranslations } from 'next-intl';

import { GoogleCalendarIntegrationPage } from '@/features/client/integrations/googleCalendar';
import { SlackIntegrationPage } from '@/features/client/integrations/slack';

import { IntegrationCard } from '../molecules';

export function IntegrationSettings() {
  const t = useTranslations('settings.integrationSettings');

  return (
    <div>
      <div className="my-5 px-5">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {t('title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">{t('subTitle')}</p>
      </div>

      <div className="my-2 grid grid-cols-1 gap-4 px-5 md:grid-cols-2 lg:grid-cols-3">
        <SlackIntegrationPage />
        <IntegrationCard
          title={t('whatsapp')}
          subtitle={t('whatsappDesc')}
          add={t('add')}
          image="/dashboard-images/logos_whatsapp-icon.svg"
        />
        <GoogleCalendarIntegrationPage />
      </div>
    </div>
  );
}
