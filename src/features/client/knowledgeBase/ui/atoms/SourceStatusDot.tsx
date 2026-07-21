import { cn } from '@/shared/lib/utils';

import { INGESTION_STATUS_CONFIG } from '../../constants/ingestion-status';
import { STATUS_DOT_COLOR_CLASSES } from '../../constants/status-colors';
import type { IngestionStatus } from '../../types';

interface SourceStatusDotProps {
  status: IngestionStatus;
  className?: string;
}

export default function SourceStatusDot({
  status,
  className,
}: SourceStatusDotProps) {
  const config = INGESTION_STATUS_CONFIG[status];

  return (
    <span
      aria-hidden
      className={cn(
        'inline-block size-2 shrink-0 rounded-full',
        STATUS_DOT_COLOR_CLASSES[config.color],
        config.isProcessing && 'animate-pulse',
        className
      )}
    />
  );
}
