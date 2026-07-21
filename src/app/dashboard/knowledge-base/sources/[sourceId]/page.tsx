import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { SourceDetailsPage } from '@/features/client/knowledgeBase';
import { createNoIndexMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('KnowledgeBase');
  return createNoIndexMetadata(
    `${t('details.title')} - mujibai`,
    t('subTitle')
  );
}

export default async function KnowledgeBaseSourceDetails({
  params,
}: {
  params: Promise<{ sourceId: string }>;
}) {
  const { sourceId } = await params;
  return <SourceDetailsPage sourceId={sourceId} />;
}
