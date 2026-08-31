'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/atoms/ui/button';
import { FilePlus, Upload } from 'lucide-react';

import { KNOWLEDGE_BASE_PERMISSIONS } from '../../constants/permissions';
import type { KnowledgeBaseStats } from '../../types';

interface KnowledgeBaseHeaderProps {
  stats: KnowledgeBaseStats | undefined;
  can: (permission: string) => boolean;
  onUpload: () => void;
  onAddManualText: () => void;
}

export default function KnowledgeBaseHeader({
  can,
  onUpload,
  onAddManualText,
}: KnowledgeBaseHeaderProps) {
  const t = useTranslations('KnowledgeBase');

  const canCreateSource = can(KNOWLEDGE_BASE_PERMISSIONS.SOURCE_CREATE);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold">{t('sources.title')}</h2>
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
