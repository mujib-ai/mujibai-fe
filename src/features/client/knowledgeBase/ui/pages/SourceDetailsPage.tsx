'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
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
  const { retry, isRetrying } = useRetryKnowledgeSource(
    baseSource?.knowledgeBaseId
  );
  const { remove, isDeleting } = useDeleteKnowledgeSource(
    baseSource?.knowledgeBaseId,
    { page: 1, onPageChange: () => undefined }
  );
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
          <div className="flex flex-col gap-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-32 w-full" />
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
