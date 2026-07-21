'use client';

import type { ReactNode } from 'react';

import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';

interface KnowledgeBasePageTemplateProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function KnowledgeBasePageTemplate({
  title,
  subtitle,
  children,
}: KnowledgeBasePageTemplateProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={title} subtitle={subtitle} />
      <div className="z-50 flex h-full w-full flex-col gap-6 rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        {children}
      </div>
    </div>
  );
}
