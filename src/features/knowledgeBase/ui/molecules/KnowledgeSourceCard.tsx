'use client';

import { useTranslations } from 'next-intl';

import { Card } from '@heroui/react';

import type { KnowledgeSource } from '../../types';
import { formatDate } from '../../utils/format-date';
import { SourceTypeIcon } from '../atoms';
import SourceActionsMenu from './SourceActionsMenu';
import SourceStatusSummary from './SourceStatusSummary';

interface KnowledgeSourceCardProps {
  source: KnowledgeSource;
  locale: string;
  can: (permission: string) => boolean;
  onViewDetails: (source: KnowledgeSource) => void;
  onRetry: (source: KnowledgeSource) => void;
  onToggleEnabled: (source: KnowledgeSource) => void;
  onDownload: (source: KnowledgeSource) => void;
  onDelete: (source: KnowledgeSource) => void;
}

export default function KnowledgeSourceCard({
  source,
  locale,
  can,
  onViewDetails,
  onRetry,
  onToggleEnabled,
  onDownload,
  onDelete,
}: KnowledgeSourceCardProps) {
  const t = useTranslations('KnowledgeBase');

  return (
    <Card
      className={`bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm ${!source.isEnabled ? 'opacity-60' : ''}`}
    >
      <Card.Header className="flex flex-row items-center justify-between gap-2 px-4">
        <div className="flex min-w-0 items-center gap-2">
          <SourceTypeIcon sourceType={source.sourceType} />
          <p className="truncate text-sm font-semibold" title={source.name}>
            {source.name}
          </p>
        </div>
        <SourceActionsMenu
          source={source}
          can={can}
          onViewDetails={onViewDetails}
          onRetry={onRetry}
          onToggleEnabled={onToggleEnabled}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      </Card.Header>
      <Card.Content className="flex flex-col gap-3 px-4">
        <SourceStatusSummary
          status={source.status}
          progress={source.progress}
          errorMessage={source.errorMessage}
        />
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <dt className="text-muted-foreground text-xs">
              {t('sources.columns.documents')}
            </dt>
            <dd>{source.documentCount}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">
              {t('sources.columns.chunks')}
            </dt>
            <dd>{source.chunkCount}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">
              {t('sources.columns.uploadedAt')}
            </dt>
            <dd>{formatDate(source.createdAt, locale)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">
              {t('sources.columns.updatedAt')}
            </dt>
            <dd>{formatDate(source.updatedAt, locale)}</dd>
          </div>
        </dl>
      </Card.Content>
    </Card>
  );
}
