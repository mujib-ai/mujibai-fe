'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { isFinalIngestionStatus } from '../constants/ingestion-status';
import { knowledgeKeys } from '../constants/query-keys';
import { KnowledgeSourcesService } from '../services/knowledge-sources.service';
import type { KnowledgeSourceFilters } from '../types';

const ACTIVE_POLL_INTERVAL_MS = 5000;

export default function useKnowledgeSources(filters: KnowledgeSourceFilters) {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: knowledgeKeys.sources(filters),
    queryFn: () => KnowledgeSourcesService.list(filters),
    placeholderData: keepPreviousData,
    refetchInterval: query => {
      const items = query.state.data?.sources.data ?? [];
      const hasActive = items.some(
        source => !isFinalIngestionStatus(source.status)
      );
      return hasActive ? ACTIVE_POLL_INTERVAL_MS : false;
    },
  });

  return {
    sources: data?.sources.data ?? [],
    stats: data?.stats,
    page: data?.sources.pagination.page ?? filters.page,
    pageSize: data?.sources.pagination.limit ?? filters.pageSize,
    totalItems: data?.sources.pagination.total ?? 0,
    totalPages: data?.sources.pagination.totalPages ?? 1,
    isLoading,
    isFetching,
    error: isError
      ? getErrorMessage(error, 'Failed to load knowledge sources')
      : null,
  };
}
