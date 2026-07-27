import { Metadata } from 'next';

import { DocsPageBody } from '@/features/docs';
import { createSeoMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  return createSeoMetadata({
    path: '/docs/api-authentication',
    title: 'Authenticating Requests | Mujib AI Docs',
    description:
      'Authenticate Mujib AI API requests using secret keys in request headers.',
    keywords: ['mujibai docs', 'API authentication', 'secret keys'],
    category: 'Documentation',
  });
}

export default function Page() {
  return <DocsPageBody pageKey="authentication" />;
}
