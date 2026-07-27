import { Metadata } from 'next';

import { DocsPageBody } from '@/features/docs';
import { createSeoMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  return createSeoMetadata({
    path: '/docs/secret-keys',
    title: 'Secret Keys | Mujib AI Docs',
    description: 'Create, store, and rotate Mujib AI secret keys securely.',
    keywords: ['mujibai docs', 'secret keys', 'API keys'],
    category: 'Documentation',
  });
}

export default function Page() {
  return <DocsPageBody pageKey="secretKeys" />;
}
