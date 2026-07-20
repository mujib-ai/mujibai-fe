import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CallsAndTicketsPage } from '@/features/client/tickets';
import { createNoIndexMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ticketsAndCalls');
  return createNoIndexMetadata(
    `${t('ticketsTitle')} - mujibai`,
    t('ticketsSubTitle')
  );
}

export default function TicketsPage() {
  return <CallsAndTicketsPage mode="tickets" />;
}
