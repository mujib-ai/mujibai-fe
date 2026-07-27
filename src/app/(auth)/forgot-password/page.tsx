import type { Metadata } from 'next';

import ForgetPasswordPage from '@/shared/components/sections/ForgetPasswordPage';
import { SITE_NAME, createNoIndexMetadata } from '@/shared/seo';

export const metadata: Metadata = createNoIndexMetadata(
  `Forgot Password | ${SITE_NAME}`,
  `Reset the password for your ${SITE_NAME} account.`
);

export default function ForgetPassword() {
  return <ForgetPasswordPage />;
}
