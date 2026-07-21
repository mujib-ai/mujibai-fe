import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { NotificationDetail } from '@/features/notifications';
import { createNoIndexMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('notifications.detail');
  return createNoIndexMetadata(`${t('title')} - mujibai`, t('subTitle'));
}

export default async function NotificationDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <NotificationDetail notificationId={id} />;
}
