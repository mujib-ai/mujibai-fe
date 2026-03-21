import ResetPasswordPage from '@/shared/components/sections/ResetPasswordPage';

interface Props {
  searchParams: Promise<{ userId?: string; token?: string }>;
}

export default async function ResetPassword({ searchParams }: Props) {
  const params = await searchParams;
  const userId = params.userId || '';
  const token = params.token || '';

  return <ResetPasswordPage userId={userId} token={token} />;
}
