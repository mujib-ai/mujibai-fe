'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';

import { knowledgeKeys } from '../constants/query-keys';
import { KnowledgeSourcesService } from '../services/knowledge-sources.service';

export default function useKnowledgeSource(sourceId: string | undefined) {
  const {
    data: source,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: knowledgeKeys.source(sourceId ?? ''),
    queryFn: () => KnowledgeSourcesService.get(sourceId as string),
    enabled: !!sourceId,
  });

  return {
    source,
    isLoading,
    error: isError
      ? getErrorMessage(error, 'Failed to load source details')
      : null,
  };
}
