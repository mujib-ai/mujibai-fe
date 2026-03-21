'use client';

import { useTranslations } from 'next-intl';

import DashboardHeader from '@/shared/components/organisms/client-dashboard/DashboardHeader';

import { useEnrollments } from '@/features/admin/enroll';

import { EnrollsSearchAndFiltering } from '../molecules';
import { EnrollsTable } from '../organisms';

export default function EnrollmentFormPage() {
  const t = useTranslations('enrollmentForms');
  const enrollmentsState = useEnrollments();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} subtitle={t('subTitle')} />

      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <EnrollsSearchAndFiltering
          t={t}
          searchValue={enrollmentsState.q}
          onSearchChange={enrollmentsState.setQ}
          statusFilter={enrollmentsState.status}
          onStatusFilterChange={enrollmentsState.setStatus}
        />
        <EnrollsTable {...enrollmentsState} />
      </div>
    </div>
  );
}
