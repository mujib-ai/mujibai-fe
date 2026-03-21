'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import type { TenantStatusFilter } from '@/features/admin/tenants/types';
import TenantsSearchAndFiltering from '@/features/admin/tenants/ui/organisms/TenantsSearchAndFiltering';
import TenantsTable from '@/features/admin/tenants/ui/organisms/TenantsTable';
import DashboardHeader from '@/shared/components/organisms/client-dashboard/DashboardHeader';

export default function TenantsPage() {
  const t = useTranslations('clients');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<TenantStatusFilter>('all');

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} />

      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <TenantsSearchAndFiltering
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
        />
        <TenantsTable search={search} status={status} />
      </div>
    </div>
  );
}
