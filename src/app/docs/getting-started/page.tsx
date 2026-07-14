import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { DocsPageBody } from '@/features/docs';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('docs.nav.items.gettingStarted');
  return {
    title: `${t('title')} | Mujib AI Docs`,
    description: t('description'),
    icons: { icon: '/favicon.ico' },
  };
}

export default function Page() {
  return <DocsPageBody pageKey="gettingStarted" />;
}
