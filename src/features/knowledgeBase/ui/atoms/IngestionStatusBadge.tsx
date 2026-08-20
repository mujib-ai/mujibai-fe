'use client';

import { useTranslations } from 'next-intl';

import { Badge } from '@/shared/components/atoms/ui/badge';
import { Spinner } from '@/shared/components/atoms/ui/spinner';
import { cn } from '@/shared/lib/utils';

import { INGESTION_STATUS_CONFIG } from '../../constants/ingestion-status';
import { STATUS_COLOR_CLASSES } from '../../constants/status-colors';
import type { IngestionStatus } from '../../types';

interface IngestionStatusBadgeProps {
  status: IngestionStatus;
  className?: string;
}

export default function IngestionStatusBadge({
  status,
  className,
}: IngestionStatusBadgeProps) {
  const t = useTranslations('KnowledgeBase');
  const config = INGESTION_STATUS_CONFIG[status];

  return (
    <Badge
      className={cn(
        'inline-flex w-fit items-center gap-1 whitespace-nowrap',
        STATUS_COLOR_CLASSES[config.color],
        className
      )}
    >
      {config.isProcessing && <Spinner className="size-4" />}
      {t(`status.${status}.label`)}
    </Badge>
  );
}
