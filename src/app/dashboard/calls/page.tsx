import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CallsPage } from '@/features/client/calls';
import { createNoIndexMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ticketsAndCalls');
  return createNoIndexMetadata(
    `${t('callsTitle')} - mujibai`,
    t('callsSubTitle')
  );
}

export default function DashboardCallsPage() {
  return <CallsPage />;
}
