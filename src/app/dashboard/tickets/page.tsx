import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import TicketsPage from '@/features/client/tickets/ui/pages/TicketsPage';
import { createNoIndexMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ticketsAndCalls');
  return createNoIndexMetadata(
    `${t('ticketsTitle')} - mujibai`,
    t('ticketsSubTitle')
  );
}

export default function DashboardTicketsPage() {
  return <TicketsPage mode="tickets" />;
}
