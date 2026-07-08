import { cookies } from 'next/headers';

import ClientDashboardOverviewPage from '@/shared/components/sections/client-dashboard/ClientDashboardOverviewPage';
import { AxiosAPI } from '@/shared/utils/axiosInstance';

export const dynamic = 'force-dynamic';

async function getUserFromServer() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const accessToken = cookieStore.get('access_token')?.value;

    const authHeaders: Record<string, string> = { Cookie: cookieHeader };
    if (accessToken) {
      authHeaders.Authorization = `Bearer ${accessToken}`;
    }

    const res = await AxiosAPI.get('/auth/check-auth', {
      headers: authHeaders,
    });

    const client = await AxiosAPI.get(`/clients/${res.data?.data.id}`, {
      headers: authHeaders,
    });

    return client.data?.data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
}
export default async function ClientDashboardPage() {
  const client = await getUserFromServer();
  return <ClientDashboardOverviewPage client={client} />;
}
