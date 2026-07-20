import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

import ClientDashboardOverviewPage from '@/shared/components/sections/dashboard/ClientDashboardOverviewPage';
import { createNoIndexMetadata } from '@/shared/seo';
import { AxiosAPI } from '@/shared/utils/axiosInstance';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const [tSidebar, tOverview] = await Promise.all([
    getTranslations('sidebar'),
    getTranslations('dashboardOverview'),
  ]);
  return createNoIndexMetadata(
    `${tSidebar('dashboard')} - mujibai`,
    tOverview('subTitle')
  );
}

async function getUserFromServer() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const accessToken = cookieStore.get('access_token')?.value;

    const authHeaders: Record<string, string> = { Cookie: cookieHeader };
    if (accessToken) {
      authHeaders.Authorization = `Bearer ${accessToken}`;
    }

    const res = await AxiosAPI.get('/tenants/check-auth', {
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
