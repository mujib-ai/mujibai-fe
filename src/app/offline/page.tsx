import type { Metadata } from 'next';

import { SITE_NAME, createNoIndexMetadata } from '@/shared/seo';

import { OfflineView } from './OfflineView';

export const metadata: Metadata = createNoIndexMetadata(
  `You're offline | ${SITE_NAME}`,
  'No internet connection was found.'
);

export default function OfflinePage() {
  return <OfflineView />;
}
