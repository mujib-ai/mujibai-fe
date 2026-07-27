import { Metadata } from 'next';

import { DocsPageBody } from '@/features/docs';
import { createSeoMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  return createSeoMetadata({
    path: '/docs',
    title: 'Introduction | Mujib AI Docs',
    description:
      'Learn how to create secret keys, authenticate API requests, and integrate the Mujib AI Voice Agent into your business.',
    keywords: ['mujibai docs', 'mujibai API', 'developer documentation'],
    category: 'Documentation',
  });
}

export default function Page() {
  return <DocsPageBody pageKey="introduction" />;
}
