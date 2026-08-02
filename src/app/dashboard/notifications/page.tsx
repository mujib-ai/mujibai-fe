import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { NotificationsListPage } from '@/features/notifications';
import { createNoIndexMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('notifications');
  return createNoIndexMetadata(`${t('title')} - mujibai`, t('subTitle'));
}

export default function NotificationsRoute() {
  return <NotificationsListPage />;
}
