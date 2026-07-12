import { Metadata } from 'next';

import { DocsPageBody } from '@/features/docs';

export const metadata: Metadata = {
  title: 'Secret Keys | Mujib AI Docs',
  description: 'Create, store, and rotate Mujib AI secret keys securely.',
};

export default function Page() {
  return <DocsPageBody pageKey="secretKeys" />;
}
