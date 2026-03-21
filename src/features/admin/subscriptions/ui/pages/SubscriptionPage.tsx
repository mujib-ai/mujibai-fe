'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import DashboardHeader from '@/shared/components/organisms/client-dashboard/DashboardHeader';

import SubscriptionsSearching from '@/features/admin/subscriptions/ui/molecules/SubscriptionsSearching';
import SubscriptionTable from '@/features/admin/subscriptions/ui/organisms/SubscriptionTable';

export default function SubscriptionPage() {
  const t = useTranslations('subscriptions');
  const [q, setQ] = useState('');

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} />

      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <SubscriptionsSearching q={q} onSearchChange={setQ} />
        <SubscriptionTable q={q} />
      </div>
    </div>
  );
}
