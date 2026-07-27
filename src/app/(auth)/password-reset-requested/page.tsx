import type { Metadata } from 'next';

import PasswordResetRequestedPage from '@/shared/components/sections/PasswordResetRequestedPage';
import { SITE_NAME, createNoIndexMetadata } from '@/shared/seo';

export const metadata: Metadata = createNoIndexMetadata(
  `Password Reset Requested | ${SITE_NAME}`,
  `A password reset link has been sent for your ${SITE_NAME} account.`
);

export default function PasswordResetRequested() {
  return <PasswordResetRequestedPage />;
}
