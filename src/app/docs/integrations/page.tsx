import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { DocsPageBody } from '@/features/docs';
import { createSeoMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('docs.nav.items.integrations');
  return createSeoMetadata({
    path: '/docs/integrations',
    title: `${t('title')} | Mujib AI Docs`,
    description: t('description'),
    keywords: ['mujibai docs', 'integrations'],
    category: 'Documentation',
  });
}

export default function Page() {
  return <DocsPageBody pageKey="integrations" />;
}
