import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ApiKeysPage } from '@/features/client/apiKeys';
import { createNoIndexMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('APIKeys');
  return createNoIndexMetadata(`${t('title')} - mujibai`, t('subTitle'));
}

export default function ApiKeys() {
  return <ApiKeysPage />;
}
