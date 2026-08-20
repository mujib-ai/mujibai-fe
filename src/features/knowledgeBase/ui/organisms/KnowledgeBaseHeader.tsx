'use client';

import { useTranslations } from 'next-intl';

import { Badge } from '@/shared/components/atoms/ui/badge';
import { Button } from '@/shared/components/atoms/ui/button';
import { cn } from '@/shared/lib/utils';
import { FilePlus, Upload } from 'lucide-react';

import { KNOWLEDGE_BASE_PERMISSIONS } from '../../constants/permissions';
import { STATUS_COLOR_CLASSES } from '../../constants/status-colors';
import type {
  KnowledgeBaseOverallStatus,
  KnowledgeBaseStats,
  StatusColor,
} from '../../types';

const OVERALL_STATUS_COLOR: Record<KnowledgeBaseOverallStatus, StatusColor> = {
  ready: 'success',
  processing: 'accent',
  attention_needed: 'danger',
};

function deriveOverallStatus(
  stats: KnowledgeBaseStats
): KnowledgeBaseOverallStatus {
  if (stats.failedSources > 0) return 'attention_needed';
  if (stats.processingSources > 0) return 'processing';
  return 'ready';
}

interface KnowledgeBaseHeaderProps {
  stats: KnowledgeBaseStats | undefined;
  can: (permission: string) => boolean;
  onUpload: () => void;
  onAddManualText: () => void;
}

export default function KnowledgeBaseHeader({
  stats,
  can,
  onUpload,
  onAddManualText,
}: KnowledgeBaseHeaderProps) {
  const t = useTranslations('KnowledgeBase');

  const canCreateSource = can(KNOWLEDGE_BASE_PERMISSIONS.SOURCE_CREATE);
  const overallStatus = stats ? deriveOverallStatus(stats) : undefined;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold">{t('sources.title')}</h2>
            {overallStatus && (
              <Badge
                className={cn(
                  STATUS_COLOR_CLASSES[OVERALL_STATUS_COLOR[overallStatus]]
                )}
              >
                {t(`overallStatus.${overallStatus}`)}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {canCreateSource && (
            <Button onClick={onAddManualText} variant="outline">
              <FilePlus className="size-4" />
              {t('actions.addManualText')}
            </Button>
          )}
          {canCreateSource && (
            <Button onClick={onUpload}>
              <Upload className="size-4" />
              {t('actions.upload')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
