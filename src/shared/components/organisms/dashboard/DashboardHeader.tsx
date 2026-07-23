'use client';

import LanguageSwitcher from '@/shared/components/atoms/LanguageSwitcher';
import { ThemeSwitcher } from '@/shared/components/atoms/ThemeSwitcher';
import { ThemedIcon } from '@/shared/components/atoms/ThemedIcon';
import { SidebarTrigger } from '@/shared/components/atoms/ui/sidebar';

import NotificationBell from './NotificationBell';
import TenantAvatarMenu from './TenantAvatarMenu';

export default function DashboardHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="relative z-60 flex w-full flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#FFFFFFBF] px-5 py-4 shadow-sm dark:bg-[#001434A6]">
      <div className="flex items-center gap-2">
        <SidebarTrigger>
          <ThemedIcon name="sidebar" className="size-5" />
        </SidebarTrigger>
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {title}
          </h1>
          {subtitle && <p className="text-foreground text-sm">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <NotificationBell />
        <LanguageSwitcher />
        <ThemeSwitcher />
        <TenantAvatarMenu />
      </div>
    </div>
  );
}
