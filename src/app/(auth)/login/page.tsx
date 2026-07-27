import type { Metadata } from 'next';

import LoginPage from '@/shared/components/sections/LoginPage';
import { SITE_NAME, createNoIndexMetadata } from '@/shared/seo';

export const metadata: Metadata = createNoIndexMetadata(
  `Login | ${SITE_NAME}`,
  `Sign in to your ${SITE_NAME} account.`
);

export default function Login() {
  return <LoginPage />;
}
