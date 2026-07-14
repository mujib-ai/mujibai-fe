import { Metadata } from 'next';

import { DocsPageBody } from '@/features/docs';

export const metadata: Metadata = {
  title: 'Authenticating Requests | Mujib AI Docs',
  description:
    'Authenticate Mujib AI API requests using secret keys in request headers.',
};

export default function Page() {
  return <DocsPageBody pageKey="authentication" />;
}
