'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/utils';
import { Chip } from '@heroui/react';
import { Loader2 } from 'lucide-react';

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
    <Chip
      color={config.color}
      className={cn(
        'inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
        STATUS_COLOR_CLASSES[config.color],
        className
      )}
    >
      {config.isProcessing && <Loader2 className="size-3 animate-spin" />}
      {t(`status.${status}.label`)}
    </Chip>
  );
}
