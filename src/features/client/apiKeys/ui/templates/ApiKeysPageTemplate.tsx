'use client';

import React from 'react';

import DashboardHeader from '@/shared/components/organisms/client-dashboard/DashboardHeader';

interface ApiKeysPageTemplateProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function ApiKeysPageTemplate({
  title,
  subtitle,
  children,
}: ApiKeysPageTemplateProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={title} subtitle={subtitle} />
      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        {children}
      </div>
    </div>
  );
}
