import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { KnowledgeBasePage } from '@/features/client/knowledgeBase';
import { createNoIndexMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('KnowledgeBase');
  return createNoIndexMetadata(`${t('title')} - mujibai`, t('subTitle'));
}

export default function KnowledgeBase() {
  return <KnowledgeBasePage />;
}
