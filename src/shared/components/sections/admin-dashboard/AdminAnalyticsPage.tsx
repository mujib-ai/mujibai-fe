import { useTranslations } from 'next-intl';

import AnalyticsStatistics from '@/shared/components/organisms/admin-dashboard/analytics/AnalyticsStatistics';
import CallsOverTimeAnalytics from '@/shared/components/organisms/admin-dashboard/analytics/CallsOverTimeAnalytics';
import TicketVolumeAnalytics from '@/shared/components/organisms/admin-dashboard/analytics/TicketVolumeAnalytics';
import Top5ActiveClients from '@/shared/components/organisms/admin-dashboard/overview/Top5ActiveClients';
import DashboardHeader from '@/shared/components/organisms/client-dashboard/DashboardHeader';

export default function AdminAnalyticsPage() {
  const t = useTranslations('analytics');
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} />

      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <AnalyticsStatistics />
        <div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2">
          <CallsOverTimeAnalytics />
          <TicketVolumeAnalytics />
        </div>
        <Top5ActiveClients />
      </div>
    </div>
  );
}
