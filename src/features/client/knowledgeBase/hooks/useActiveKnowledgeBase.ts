'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';

import { knowledgeBaseKeys } from '../constants/query-keys';
import { KnowledgeBaseService } from '../services/knowledge-base.service';

export default function useActiveKnowledgeBase() {
  const {
    data: knowledgeBase,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: knowledgeBaseKeys.active(),
    queryFn: KnowledgeBaseService.getActive,
    staleTime: 60 * 1000,
  });

  return {
    knowledgeBase,
    isLoading,
    error: isError
      ? getErrorMessage(error, 'Failed to load the knowledge base')
      : null,
    refetch,
  };
}
