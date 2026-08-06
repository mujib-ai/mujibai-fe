import type { Metadata } from 'next';

import ResetPasswordPage from '@/shared/components/sections/ResetPasswordPage';
import { SITE_NAME, createNoIndexMetadata } from '@/shared/seo';

export const metadata: Metadata = createNoIndexMetadata(
  `Reset Password | ${SITE_NAME}`,
  `Choose a new password for your ${SITE_NAME} account.`
);

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPassword({ searchParams }: Props) {
  const params = await searchParams;
  const token = params.token || '';

  return <ResetPasswordPage token={token} />;
}
