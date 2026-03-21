import { cookies } from 'next/headers';

import LandingPage from '@/shared/components/sections/LandingPage';

export default async function HomePage() {
  const cookieStore = await cookies();
  const hasToken = !!cookieStore.get('access_token')?.value;
  return <LandingPage hasToken={hasToken} />;
}
