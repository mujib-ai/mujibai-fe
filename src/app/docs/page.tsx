import { Metadata } from 'next';

import { DocsPageBody } from '@/features/docs';

export const metadata: Metadata = {
  title: 'Introduction | Mujib AI Docs',
  description:
    'Learn how to create secret keys, authenticate API requests, and integrate the Mujib AI Voice Agent into your business.',
};

export default function Page() {
  return <DocsPageBody pageKey="introduction" />;
}
