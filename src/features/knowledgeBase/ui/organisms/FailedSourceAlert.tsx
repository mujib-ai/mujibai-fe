'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/atoms/ui/button';
import { AlertTriangle, RefreshCw, Trash2, Upload } from 'lucide-react';

import { KNOWLEDGE_BASE_PERMISSIONS } from '../../constants/permissions';
import type { KnowledgeSource } from '../../types';

interface FailedSourceAlertProps {
  source: KnowledgeSource;
  can: (permission: string) => boolean;
  isRetrying: boolean;
  onRetry: () => void;
  onDelete: () => void;
  onUploadReplacement?: () => void;
}

export default function FailedSourceAlert({
  source,
  can,
  isRetrying,
  onRetry,
  onDelete,
  onUploadReplacement,
}: FailedSourceAlertProps) {
  const t = useTranslations('KnowledgeBase');

  if (source.status !== 'failed') return null;

  return (
    <div className="border-destructive/30 bg-destructive/5 flex flex-col gap-3 rounded-lg border p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-destructive mt-0.5 size-5 shrink-0" />
        <div>
          <p className="text-destructive text-sm font-semibold">
            {t('failedAlert.title')}
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            {source.errorMessage || t('failedAlert.genericMessage')}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {can(KNOWLEDGE_BASE_PERMISSIONS.SOURCE_RETRY) && (
          <Button disabled={isRetrying} onClick={onRetry}>
            <RefreshCw className="size-4" />
            {t('actions.retry')}
          </Button>
        )}
        {onUploadReplacement &&
          can(KNOWLEDGE_BASE_PERMISSIONS.SOURCE_CREATE) && (
            <Button variant="outline" onClick={onUploadReplacement}>
              <Upload className="size-4" />
              {t('actions.upload')}
            </Button>
          )}
        {can(KNOWLEDGE_BASE_PERMISSIONS.SOURCE_DELETE) && (
          <Button variant="outline" onClick={onDelete}>
            <Trash2 className="size-4" />
            {t('actions.delete')}
          </Button>
        )}
      </div>
    </div>
  );
}
