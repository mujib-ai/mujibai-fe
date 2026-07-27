import { Metadata } from 'next';

import { DocsPageBody } from '@/features/docs';
import { createSeoMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  return createSeoMetadata({
    path: '/docs/voice-agent',
    title: 'Voice Agent Integration | Mujib AI Docs',
    description:
      'Integrate the Mujib AI Voice Agent into your business: phone numbers, outbound calls, and webhooks.',
    keywords: ['mujibai docs', 'voice agent integration'],
    category: 'Documentation',
  });
}

export default function Page() {
  return <DocsPageBody pageKey="voiceAgentIntegration" />;
}
