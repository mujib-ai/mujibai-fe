'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';

import { isFinalIngestionStatus } from '../constants/ingestion-status';
import { knowledgeBaseKeys } from '../constants/query-keys';
import { KnowledgeSourcesService } from '../services/knowledge-sources.service';

const ACTIVE_POLL_INTERVAL_MS = 4000;

export default function useKnowledgeSourceStatus(sourceId: string | undefined) {
  const {
    data: source,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: knowledgeBaseKeys.sourceStatus(sourceId ?? ''),
    queryFn: () => KnowledgeSourcesService.getStatus(sourceId as string),
    enabled: !!sourceId,
    refetchInterval: query => {
      const status = query.state.data?.status;
      if (!status || isFinalIngestionStatus(status)) return false;
      return ACTIVE_POLL_INTERVAL_MS;
    },
  });

  return {
    source,
    isLoading,
    error: isError
      ? getErrorMessage(error, 'Failed to load source status')
      : null,
  };
}
