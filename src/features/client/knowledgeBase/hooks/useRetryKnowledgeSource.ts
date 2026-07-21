'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { knowledgeBaseKeys } from '../constants/query-keys';
import { KnowledgeSourcesService } from '../services/knowledge-sources.service';
import {
  patchSourceInQueries,
  rollbackSourceQueries,
  snapshotSourceQueries,
} from '../utils/source-cache';

export default function useRetryKnowledgeSource(
  knowledgeBaseId: string | undefined
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (sourceId: string) => KnowledgeSourcesService.retry(sourceId),
    onMutate: async (sourceId: string) => {
      if (!knowledgeBaseId) return undefined;
      await queryClient.cancelQueries({
        queryKey: knowledgeBaseKeys.sourcesRoot(knowledgeBaseId),
      });
      const snapshot = snapshotSourceQueries(queryClient, knowledgeBaseId);
      patchSourceInQueries(queryClient, knowledgeBaseId, sourceId, {
        status: 'queued',
        progress: 0,
        errorMessage: null,
      });
      return { snapshot };
    },
    onError: (error, _sourceId, context) => {
      if (context?.snapshot)
        rollbackSourceQueries(queryClient, context.snapshot);
      toast.error(getErrorMessage(error, 'Failed to retry processing'));
    },
    onSuccess: () => {
      toast.success('Retrying source processing.');
    },
    onSettled: () => {
      if (!knowledgeBaseId) return;
      queryClient.invalidateQueries({
        queryKey: knowledgeBaseKeys.sourcesRoot(knowledgeBaseId),
      });
      queryClient.invalidateQueries({
        queryKey: knowledgeBaseKeys.stats(knowledgeBaseId),
      });
    },
  });

  return {
    retry: mutation.mutateAsync,
    isRetrying: mutation.isPending,
  };
}
