'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { knowledgeKeys } from '../constants/query-keys';
import { KnowledgeSourcesService } from '../services/knowledge-sources.service';
import {
  patchSourceInQueries,
  rollbackSourceQueries,
  snapshotSourceQueries,
} from '../utils/source-cache';

export default function useRetryKnowledgeSource() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (sourceId: string) => KnowledgeSourcesService.retry(sourceId),
    onMutate: async (sourceId: string) => {
      await queryClient.cancelQueries({
        queryKey: knowledgeKeys.sourcesRoot(),
      });
      const snapshot = snapshotSourceQueries(queryClient);
      patchSourceInQueries(queryClient, sourceId, {
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
      queryClient.invalidateQueries({
        queryKey: knowledgeKeys.sourcesRoot(),
      });
    },
  });

  return {
    retry: mutation.mutateAsync,
    isRetrying: mutation.isPending,
  };
}
