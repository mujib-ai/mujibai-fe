import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { DocsPageBody } from '@/features/docs';
import { createSeoMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('docs.nav.items.webhooks');
  return createSeoMetadata({
    path: '/docs/webhooks',
    title: `${t('title')} | Mujib AI Docs`,
    description: t('description'),
    keywords: ['mujibai docs', 'webhooks'],
    category: 'Documentation',
  });
}

export default function Page() {
  return <DocsPageBody pageKey="webhooks" />;
}
