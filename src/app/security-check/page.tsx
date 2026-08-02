import type { Metadata } from 'next';

import SecurityCheckPage from '@/shared/components/sections/SecurityCheckPage';
import { SITE_NAME, createNoIndexMetadata } from '@/shared/seo';

export const metadata: Metadata = createNoIndexMetadata(
  `Secure your account | ${SITE_NAME}`,
  `Set up two-factor authentication for your ${SITE_NAME} account.`
);

export default function SecurityCheck() {
  return <SecurityCheckPage />;
}
