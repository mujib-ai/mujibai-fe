'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@heroui/react';
import { AlertTriangle, RefreshCw, Trash2, Upload } from 'lucide-react';

import { KNOWLEDGE_BASE_PERMISSIONS } from '../../constants/permissions';
import type { KnowledgeSource } from '../../types';

const BUTTON_PRIMARY_CLASS =
  'bg-primary text-primary-foreground hover:bg-primary/90 inline-flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm disabled:pointer-events-none disabled:opacity-50';
const BUTTON_OUTLINE_CLASS =
  'border-input hover:bg-accent inline-flex cursor-pointer items-center gap-1.5 rounded-md border bg-transparent px-3 py-1.5 text-sm shadow-xs disabled:pointer-events-none disabled:opacity-50';

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
          <Button
            isDisabled={isRetrying}
            onPress={onRetry}
            className={BUTTON_PRIMARY_CLASS}
          >
            <RefreshCw className="size-4" />
            {t('actions.retry')}
          </Button>
        )}
        {onUploadReplacement &&
          can(KNOWLEDGE_BASE_PERMISSIONS.SOURCE_CREATE) && (
            <Button
              onPress={onUploadReplacement}
              className={BUTTON_OUTLINE_CLASS}
            >
              <Upload className="size-4" />
              {t('actions.upload')}
            </Button>
          )}
        {can(KNOWLEDGE_BASE_PERMISSIONS.SOURCE_DELETE) && (
          <Button onPress={onDelete} className={BUTTON_OUTLINE_CLASS}>
            <Trash2 className="size-4" />
            {t('actions.delete')}
          </Button>
        )}
      </div>
    </div>
  );
}
