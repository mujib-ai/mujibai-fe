import { useTranslations } from 'next-intl';

import initialData from '@/shared/data/data.json';

import { TotalVisitorsAnalytics } from '@/shared/components/organisms/admin-dashboard/analytics/TotalVisitorsAnalytics';
import AdminOverviewTable from '@/shared/components/organisms/admin-dashboard/overview/AdminOverviewTable';
import DashboardHeader from '@/shared/components/organisms/client-dashboard/DashboardHeader';

export default function AdminDashboardOverviewPage() {
  const tNavbar = useTranslations('navbar');
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={tNavbar('welcome')} />

      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <TotalVisitorsAnalytics />
        <AdminOverviewTable data={initialData as any} />
      </div>
    </div>
  );
}
