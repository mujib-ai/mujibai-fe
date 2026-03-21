import { cookies } from 'next/headers';

import ClientDashboardOverviewPage from '@/shared/components/sections/client-dashboard/ClientDashboardOverviewPage';

import { AxiosAPI } from '@/shared/utils/axiosInstance';

async function getUserFromServer() {
  try {
    const cookieHeader = (await cookies()).toString();

    const res = await AxiosAPI.get('/auth/check-auth', {
      headers: {
        Cookie: cookieHeader,
      },
    });

    const client = await AxiosAPI.get(`/clients/${res.data?.data.id}`, {
      headers: {
        Cookie: cookieHeader,
      },
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
