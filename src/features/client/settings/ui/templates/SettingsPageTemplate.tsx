'use client';

import DashboardHeader from '@/shared/components/organisms/client-dashboard/DashboardHeader';

interface SettingsPageTemplateProps {
  title: string;
  children: React.ReactNode;
}

export default function SettingsPageTemplate({
  title,
  children,
}: SettingsPageTemplateProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={title} />
      <div className="z-50 h-full w-full rounded-2xl bg-white/75 p-4 shadow-sm dark:bg-[#001434A6]">
        {children}
      </div>
    </div>
  );
}
