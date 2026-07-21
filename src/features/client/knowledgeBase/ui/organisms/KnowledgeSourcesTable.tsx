'use client';

import { useTranslations } from 'next-intl';

import { useIsMobile } from '@/shared/hooks/use-mobile';
import { Button, Table } from '@heroui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { INGESTION_STATUS_CONFIG } from '../../constants/ingestion-status';
import type { KnowledgeSource } from '../../types';
import { formatDate } from '../../utils/format-date';
import {
  IngestionStatusBadge,
  SourceTypeIcon,
  UploadProgressBar,
} from '../atoms';
import { KnowledgeSourceCard, SourceActionsMenu } from '../molecules';
import KnowledgeSourcesTableSkeleton from './KnowledgeSourcesTableSkeleton';

interface KnowledgeSourcesTableProps {
  sources: KnowledgeSource[];
  isLoading: boolean;
  error: string | null;
  hasActiveFilters: boolean;
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  locale: string;
  can: (permission: string) => boolean;
  onViewDetails: (source: KnowledgeSource) => void;
  onRetry: (source: KnowledgeSource) => void;
  onToggleEnabled: (source: KnowledgeSource) => void;
  onDownload: (source: KnowledgeSource) => void;
  onDelete: (source: KnowledgeSource) => void;
  onResetFilters: () => void;
  onUpload: () => void;
}

const BUTTON_OUTLINE_CLASS =
  'border-input hover:bg-accent inline-flex cursor-pointer items-center gap-1.5 rounded-md border bg-transparent px-3 py-1.5 text-sm shadow-xs disabled:pointer-events-none disabled:opacity-50';
const BUTTON_PRIMARY_CLASS =
  'bg-primary text-primary-foreground hover:bg-primary/90 inline-flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm';

export default function KnowledgeSourcesTable({
  sources,
  isLoading,
  error,
  hasActiveFilters,
  page,
  totalPages,
  totalItems,
  onPageChange,
  locale,
  can,
  onViewDetails,
  onRetry,
  onToggleEnabled,
  onDownload,
  onDelete,
  onResetFilters,
  onUpload,
}: KnowledgeSourcesTableProps) {
  const t = useTranslations('KnowledgeBase');
  const isMobile = useIsMobile();

  if (isLoading) {
    return <KnowledgeSourcesTableSkeleton isMobile={isMobile} />;
  }

  if (error) {
    return (
      <div className="border-destructive/30 bg-destructive/5 rounded-lg border p-8 text-center">
        <p className="text-destructive text-sm">{error}</p>
      </div>
    );
  }

  if (sources.length === 0) {
    return hasActiveFilters ? (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-10 text-center">
        <p className="text-muted-foreground text-sm">
          {t('emptyStates.noResultsTitle')}
        </p>
        <Button onPress={onResetFilters} className={BUTTON_OUTLINE_CLASS}>
          {t('emptyStates.noResultsAction')}
        </Button>
      </div>
    ) : (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-10 text-center">
        <p className="text-base font-semibold">
          {t('emptyStates.noSourcesTitle')}
        </p>
        <p className="text-muted-foreground max-w-md text-sm">
          {t('emptyStates.noSourcesDescription')}
        </p>
        <Button onPress={onUpload} className={BUTTON_PRIMARY_CLASS}>
          {t('actions.upload')}
        </Button>
      </div>
    );
  }

  const rowActions = {
    can,
    onViewDetails,
    onRetry,
    onToggleEnabled,
    onDownload,
    onDelete,
  };

  return (
    <div className="flex flex-col gap-4">
      {isMobile ? (
        <div className="flex flex-col gap-3">
          {sources.map(source => (
            <KnowledgeSourceCard
              key={source.id}
              source={source}
              locale={locale}
              {...rowActions}
            />
          ))}
        </div>
      ) : (
        <Table>
          <Table.ScrollContainer className="overflow-x-auto rounded-lg border">
            <Table.Content aria-label={t('sources.title')} className="w-full">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap"
                >
                  {t('sources.columns.source')}
                </Table.Column>
                <Table.Column className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  {t('sources.columns.type')}
                </Table.Column>
                <Table.Column className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  {t('sources.columns.status')}
                </Table.Column>
                <Table.Column className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  {t('sources.columns.progress')}
                </Table.Column>
                <Table.Column className="text-foreground h-10 px-2 text-center align-middle font-medium whitespace-nowrap">
                  {t('sources.columns.documents')}
                </Table.Column>
                <Table.Column className="text-foreground h-10 px-2 text-center align-middle font-medium whitespace-nowrap">
                  {t('sources.columns.chunks')}
                </Table.Column>
                <Table.Column className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  {t('sources.columns.uploadedAt')}
                </Table.Column>
                <Table.Column className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  {t('sources.columns.updatedAt')}
                </Table.Column>
                <Table.Column className="text-foreground h-10 px-2 text-right align-middle font-medium whitespace-nowrap">
                  {t('sources.columns.actions')}
                </Table.Column>
              </Table.Header>
              <Table.Body>
                {sources.map(source => (
                  <Table.Row
                    key={source.id}
                    className={`hover:bg-muted/50 border-t transition-colors ${!source.isEnabled ? 'opacity-60' : ''}`}
                  >
                    <Table.Cell className="max-w-56 p-2 align-middle font-medium">
                      <span className="block truncate" title={source.name}>
                        {source.name}
                      </span>
                    </Table.Cell>
                    <Table.Cell className="p-2 align-middle">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <SourceTypeIcon sourceType={source.sourceType} />
                        {t(`sourceTypes.${source.sourceType}`)}
                      </div>
                    </Table.Cell>
                    <Table.Cell className="p-2 align-middle">
                      <IngestionStatusBadge status={source.status} />
                    </Table.Cell>
                    <Table.Cell className="p-2 align-middle">
                      {INGESTION_STATUS_CONFIG[source.status].isProcessing ? (
                        <UploadProgressBar
                          value={source.progress}
                          label={
                            source.currentStage ??
                            t(`status.${source.status}.label`)
                          }
                          className="w-40"
                        />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </Table.Cell>
                    <Table.Cell className="p-2 text-center align-middle">
                      {source.documentCount}
                    </Table.Cell>
                    <Table.Cell className="p-2 text-center align-middle">
                      {source.chunkCount}
                    </Table.Cell>
                    <Table.Cell className="p-2 align-middle">
                      {formatDate(source.createdAt, locale)}
                    </Table.Cell>
                    <Table.Cell className="p-2 align-middle">
                      {formatDate(source.updatedAt, locale)}
                    </Table.Cell>
                    <Table.Cell className="p-2 text-right align-middle">
                      <SourceActionsMenu source={source} {...rowActions} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      )}

      {totalItems > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <p className="text-muted-foreground text-sm">
            {totalItems} {t('pagination.results')}
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                isDisabled={page <= 1}
                onPress={() => onPageChange(page - 1)}
                className={BUTTON_OUTLINE_CLASS}
              >
                <ChevronLeft className="size-4 rtl:rotate-180" />
                {t('pagination.previous')}
              </Button>
              <span className="text-muted-foreground text-sm whitespace-nowrap">
                {page} {t('pagination.of')} {totalPages}
              </span>
              <Button
                isDisabled={page >= totalPages}
                onPress={() => onPageChange(page + 1)}
                className={BUTTON_OUTLINE_CLASS}
              >
                {t('pagination.next')}
                <ChevronRight className="size-4 rtl:rotate-180" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
