import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { AiOutboundPage } from '@/features/client/aiOutbound';
import { createNoIndexMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('aiOutbound');
  return createNoIndexMetadata(`${t('title')} - mujibai`, t('subTitle'));
}

export default function AiOutbound() {
  return <AiOutboundPage />;
}
