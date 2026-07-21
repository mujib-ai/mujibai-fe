'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';

import { knowledgeBaseKeys } from '../constants/query-keys';
import { KnowledgeBaseService } from '../services/knowledge-base.service';

export default function useKnowledgeBaseStats(
  knowledgeBaseId: string | undefined
) {
  const {
    data: stats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: knowledgeBaseKeys.stats(knowledgeBaseId ?? ''),
    queryFn: () => KnowledgeBaseService.getStats(knowledgeBaseId as string),
    enabled: !!knowledgeBaseId,
  });

  return {
    stats,
    isLoading,
    error: isError ? getErrorMessage(error, 'Failed to load statistics') : null,
  };
}
