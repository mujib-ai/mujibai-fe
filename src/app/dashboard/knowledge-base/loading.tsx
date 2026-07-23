'use client';

import { useTranslations } from 'next-intl';

import KnowledgeBaseStats from '@/features/client/knowledgeBase/ui/organisms/KnowledgeBaseStats';
import KnowledgeSourcesTableSkeleton from '@/features/client/knowledgeBase/ui/organisms/KnowledgeSourcesTableSkeleton';
import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { Skeleton } from '@heroui/react';

const BAR = 'rounded-md bg-black/10 dark:bg-white/10';

export default function KnowledgeBaseLoading() {
  const t = useTranslations('KnowledgeBase');
  const isMobile = useIsMobile();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} subtitle={t('subTitle')} />
      <div className="flex h-full w-full flex-col gap-6 rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">{t('sources.title')}</h2>
              <Skeleton
                animationType="none"
                className={`${BAR} h-5 w-24 rounded-full`}
              />
            </div>
            <Skeleton
              animationType="none"
              className={`${BAR} h-3.5 w-32 rounded`}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton
              animationType="none"
              className={`${BAR} h-8 w-24 rounded-md`}
            />
            <Skeleton
              animationType="none"
              className={`${BAR} h-8 w-28 rounded-md`}
            />
          </div>
        </div>

        <KnowledgeBaseStats stats={undefined} isLoading />

        <div className="flex flex-wrap items-center gap-3">
          <Skeleton
            animationType="none"
            className={`${BAR} h-9 min-w-48 flex-1 rounded-md`}
          />
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              animationType="none"
              className={`${BAR} h-9 w-40 rounded-md`}
            />
          ))}
        </div>

        <KnowledgeSourcesTableSkeleton isMobile={isMobile} />
      </div>
    </div>
  );
}
