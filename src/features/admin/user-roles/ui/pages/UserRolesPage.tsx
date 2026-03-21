'use client';

import { useTranslations } from 'next-intl';

import DashboardHeader from '@/shared/components/organisms/client-dashboard/DashboardHeader';

import { useUserRoles } from '../../hooks/useUserRoles';
import { UserRolesCardMobile, UserRolesSearchAndFiltering } from '../molecules';
import { UserRolesTable } from '../organisms';

export default function UserRolesPage() {
  const t = useTranslations('userRoles');
  const userRolesState = useUserRoles();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} />

      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <UserRolesSearchAndFiltering
          searchValue={userRolesState.q}
          onSearchChange={userRolesState.setQ}
        />
        <UserRolesTable
          users={userRolesState.users}
          isLoading={userRolesState.isLoading}
        />
        <UserRolesCardMobile
          users={userRolesState.users}
          isLoading={userRolesState.isLoading}
        />
      </div>
    </div>
  );
}
