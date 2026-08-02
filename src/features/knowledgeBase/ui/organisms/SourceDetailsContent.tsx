'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Separator } from '@heroui/react';

import type { KnowledgeSource } from '../../types';
import { formatDate } from '../../utils/format-date';
import { formatFileSize } from '../../utils/format-file-size';
import { IngestionStatusBadge, SourceTypeIcon } from '../atoms';
import FailedSourceAlert from './FailedSourceAlert';

interface DetailRow {
  labelKey: string;
  value: string | number | null;
}

interface SourceDetailsContentProps {
  source: KnowledgeSource;
  can: (permission: string) => boolean;
  isRetrying: boolean;
  onRetry: () => void;
  onDelete: () => void;
}

export default function SourceDetailsContent({
  source,
  can,
  isRetrying,
  onRetry,
  onDelete,
}: SourceDetailsContentProps) {
  const t = useTranslations('KnowledgeBase');
  const locale = useLocale();

  const rows: DetailRow[] = [
    { labelKey: 'details.originalFileName', value: source.originalFileName },
    {
      labelKey: 'details.sourceType',
      value: t(`sourceTypes.${source.sourceType}`),
    },
    {
      labelKey: 'details.fileSize',
      value:
        source.fileSize !== null
          ? formatFileSize(source.fileSize, locale)
          : null,
    },
    { labelKey: 'details.mimeType', value: source.mimeType },
    {
      labelKey: 'details.createdAt',
      value: formatDate(source.createdAt, locale),
    },
    {
      labelKey: 'details.startedAt',
      value: formatDate(source.startedAt, locale),
    },
    {
      labelKey: 'details.completedAt',
      value: formatDate(source.completedAt, locale),
    },
    { labelKey: 'details.documentCount', value: source.documentCount },
    { labelKey: 'details.chunkCount', value: source.chunkCount },
    { labelKey: 'details.language', value: source.language },
    { labelKey: 'details.category', value: source.category },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <SourceTypeIcon sourceType={source.sourceType} className="size-5" />
        <h3 className="text-base font-semibold break-all">{source.name}</h3>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <IngestionStatusBadge status={source.status} />
        <span className="text-muted-foreground text-xs">
          {source.isEnabled ? t('details.enabledYes') : t('details.enabledNo')}
        </span>
      </div>

      {source.status === 'failed' && (
        <FailedSourceAlert
          source={source}
          can={can}
          isRetrying={isRetrying}
          onRetry={onRetry}
          onDelete={onDelete}
        />
      )}

      <Separator className="bg-border h-px w-full shrink-0" />

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        {rows.map(row => (
          <div key={row.labelKey}>
            <dt className="text-muted-foreground text-xs">{t(row.labelKey)}</dt>
            <dd className="break-words">
              {row.value ?? t('details.notAvailable')}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
