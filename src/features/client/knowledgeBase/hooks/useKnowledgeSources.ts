'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { isFinalIngestionStatus } from '../constants/ingestion-status';
import { knowledgeBaseKeys } from '../constants/query-keys';
import { KnowledgeSourcesService } from '../services/knowledge-sources.service';
import type { KnowledgeSourceFilters } from '../types';

const ACTIVE_POLL_INTERVAL_MS = 5000;

export default function useKnowledgeSources(
  knowledgeBaseId: string | undefined,
  filters: KnowledgeSourceFilters
) {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: knowledgeBaseKeys.sources(knowledgeBaseId ?? '', filters),
    queryFn: () =>
      KnowledgeSourcesService.list(knowledgeBaseId as string, filters),
    enabled: !!knowledgeBaseId,
    placeholderData: keepPreviousData,
    refetchInterval: query => {
      const items = query.state.data?.items ?? [];
      const hasActive = items.some(
        source => !isFinalIngestionStatus(source.status)
      );
      return hasActive ? ACTIVE_POLL_INTERVAL_MS : false;
    },
  });

  return {
    sources: data?.items ?? [],
    page: data?.page ?? filters.page,
    pageSize: data?.pageSize ?? filters.pageSize,
    totalItems: data?.totalItems ?? 0,
    totalPages: data?.totalPages ?? 1,
    isLoading,
    isFetching,
    error: isError
      ? getErrorMessage(error, 'Failed to load knowledge sources')
      : null,
  };
}
