import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { SettingsPage } from '@/features/client/settings';
import { createNoIndexMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('settings');
  return createNoIndexMetadata(`${t('title')} - mujibai`, t('subTitle'));
}

export default function ClientSettings() {
  return <SettingsPage />;
}
