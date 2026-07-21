'use client';

import { useTranslations } from 'next-intl';

import { INGESTION_STATUS_CONFIG } from '../../constants/ingestion-status';
import type { IngestionStatus } from '../../types';
import { IngestionStatusBadge, UploadProgressBar } from '../atoms';

interface SourceStatusSummaryProps {
  status: IngestionStatus;
  progress: number;
  currentStage: string | null;
  errorMessage?: string | null;
  className?: string;
}

export default function SourceStatusSummary({
  status,
  progress,
  currentStage,
  errorMessage,
  className,
}: SourceStatusSummaryProps) {
  const t = useTranslations('KnowledgeBase');
  const config = INGESTION_STATUS_CONFIG[status];

  return (
    <div className={className}>
      <IngestionStatusBadge status={status} />
      {config.isProcessing && (
        <UploadProgressBar
          value={progress}
          label={currentStage ?? t(`status.${status}.label`)}
          className="mt-2 w-full max-w-48"
        />
      )}
      {status === 'failed' && errorMessage && (
        <p className="text-destructive mt-1 max-w-64 text-xs break-words">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
