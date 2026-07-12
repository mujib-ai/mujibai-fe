import { Metadata } from 'next';

import { DocsPageBody } from '@/features/docs';

export const metadata: Metadata = {
  title: 'Voice Agent Integration | Mujib AI Docs',
  description:
    'Integrate the Mujib AI Voice Agent into your business: phone numbers, outbound calls, and webhooks.',
};

export default function Page() {
  return <DocsPageBody pageKey="voiceAgentIntegration" />;
}
