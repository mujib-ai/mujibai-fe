'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Separator, Skeleton } from '@heroui/react';
import { ArrowLeft } from 'lucide-react';

import {
  useDeleteKnowledgeSource,
  useKnowledgeBasePermissions,
  useKnowledgeSource,
  useKnowledgeSourceStatus,
  useRetryKnowledgeSource,
} from '../../hooks';
import DeleteSourceDialog from '../organisms/DeleteSourceDialog';
import SourceDetailsContent from '../organisms/SourceDetailsContent';

const SKELETON_BAR = 'rounded-md bg-black/10 dark:bg-white/10';

interface SourceDetailsPageProps {
  sourceId: string;
}

export default function SourceDetailsPage({
  sourceId,
}: SourceDetailsPageProps) {
  const t = useTranslations('KnowledgeBase');
  const router = useRouter();

  const { source: baseSource, isLoading, error } = useKnowledgeSource(sourceId);
  const { source: liveSource } = useKnowledgeSourceStatus(sourceId);
  const { can } = useKnowledgeBasePermissions();
  const { retry, isRetrying } = useRetryKnowledgeSource();
  const { remove, isDeleting } = useDeleteKnowledgeSource({
    page: 1,
    onPageChange: () => undefined,
  });
  const [isConfirmingDelete, setConfirmingDelete] = useState(false);

  const source = baseSource ? { ...baseSource, ...liveSource } : undefined;

  const handleConfirmDelete = async () => {
    if (!source) return;
    try {
      await remove(source.id);
      setConfirmingDelete(false);
      router.push('/dashboard/knowledge-base');
    } catch {}
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <Link
        href="/dashboard/knowledge-base"
        className="text-muted-foreground hover:text-foreground inline-flex w-fit items-center gap-1.5 text-sm"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        {t('actions.backToKnowledgeBase')}
      </Link>

      <div className="rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton
                animationType="none"
                className={`${SKELETON_BAR} size-5 rounded`}
              />
              <Skeleton
                animationType="none"
                className={`${SKELETON_BAR} h-4.5 w-48 rounded`}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Skeleton
                animationType="none"
                className={`${SKELETON_BAR} h-5 w-20 rounded-full`}
              />
              <Skeleton
                animationType="none"
                className={`${SKELETON_BAR} h-3 w-40 rounded`}
              />
            </div>

            <Separator className="bg-border h-px w-full shrink-0" />

            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index}>
                  <dt>
                    <Skeleton
                      animationType="none"
                      className={`${SKELETON_BAR} h-3 w-20 rounded`}
                    />
                  </dt>
                  <dd className="mt-1.5">
                    <Skeleton
                      animationType="none"
                      className={`${SKELETON_BAR} h-3.5 rounded`}
                      style={{ width: 60 + ((index * 23) % 60) }}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : error || !source ? (
          <p className="text-destructive text-sm">
            {error ?? t('errors.loadDetailsFailed')}
          </p>
        ) : (
          <SourceDetailsContent
            source={source}
            can={can}
            isRetrying={isRetrying}
            onRetry={() => retry(source.id).catch(() => undefined)}
            onDelete={() => setConfirmingDelete(true)}
          />
        )}
      </div>

      <DeleteSourceDialog
        source={isConfirmingDelete ? (source ?? null) : null}
        onClose={() => setConfirmingDelete(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
