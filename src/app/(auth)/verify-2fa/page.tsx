import type { Metadata } from 'next';

import TwoFactorVerificationPage from '@/shared/components/sections/TwoFactorVerificationPage';
import { SITE_NAME, createNoIndexMetadata } from '@/shared/seo';

export const metadata: Metadata = createNoIndexMetadata(
  `Two-factor verification | ${SITE_NAME}`,
  `Verify your authentication code to sign in to ${SITE_NAME}.`
);

export default function VerifyTwoFactor() {
  return <TwoFactorVerificationPage />;
}
