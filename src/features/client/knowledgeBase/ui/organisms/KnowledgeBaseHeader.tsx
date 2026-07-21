'use client';

import { useLocale, useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/utils';
import { Button, Chip } from '@heroui/react';
import { FilePlus, Upload } from 'lucide-react';

import { KNOWLEDGE_BASE_PERMISSIONS } from '../../constants/permissions';
import { STATUS_COLOR_CLASSES } from '../../constants/status-colors';
import type { KnowledgeBase, StatusColor } from '../../types';
import { formatDate } from '../../utils/format-date';

const OVERALL_STATUS_COLOR: Record<
  KnowledgeBase['overallStatus'],
  StatusColor
> = {
  ready: 'success',
  processing: 'accent',
  attention_needed: 'danger',
};

interface KnowledgeBaseHeaderProps {
  knowledgeBase: KnowledgeBase | undefined;
  can: (permission: string) => boolean;
  onUpload: () => void;
  onAddManualText: () => void;
}

export default function KnowledgeBaseHeader({
  knowledgeBase,
  can,
  onUpload,
  onAddManualText,
}: KnowledgeBaseHeaderProps) {
  const t = useTranslations('KnowledgeBase');
  const locale = useLocale();

  const canUpload = can(KNOWLEDGE_BASE_PERMISSIONS.UPLOAD);
  const canCreate = can(KNOWLEDGE_BASE_PERMISSIONS.CREATE);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold">{t('sources.title')}</h2>
            {knowledgeBase && (
              <Chip
                className={cn(
                  'inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                  STATUS_COLOR_CLASSES[
                    OVERALL_STATUS_COLOR[knowledgeBase.overallStatus]
                  ]
                )}
              >
                {t(`overallStatus.${knowledgeBase.overallStatus}`)}
              </Chip>
            )}
          </div>
          <p className="text-muted-foreground text-sm">
            {knowledgeBase?.lastSyncAt
              ? t('lastSynced', {
                  date: formatDate(knowledgeBase.lastSyncAt, locale),
                })
              : t('neverSynced')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {canCreate && knowledgeBase?.capabilities.manualText && (
            <Button
              onPress={onAddManualText}
              className="border-input hover:bg-accent inline-flex cursor-pointer items-center gap-1.5 rounded-md border bg-transparent px-3 py-1.5 text-sm shadow-xs"
            >
              <FilePlus className="size-4" />
              {t('actions.addManualText')}
            </Button>
          )}
          {canUpload && (
            <Button
              onPress={onUpload}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm"
            >
              <Upload className="size-4" />
              {t('actions.upload')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
