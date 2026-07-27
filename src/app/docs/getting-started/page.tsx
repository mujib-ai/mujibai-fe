import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { DocsPageBody } from '@/features/docs';
import { createSeoMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('docs.nav.items.gettingStarted');
  return createSeoMetadata({
    path: '/docs/getting-started',
    title: `${t('title')} | Mujib AI Docs`,
    description: t('description'),
    keywords: ['mujibai docs', 'getting started'],
    category: 'Documentation',
  });
}

export default function Page() {
  return <DocsPageBody pageKey="gettingStarted" />;
}
