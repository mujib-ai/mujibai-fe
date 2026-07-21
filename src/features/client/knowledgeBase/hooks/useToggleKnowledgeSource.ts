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

interface ToggleVariables {
  sourceId: string;
  isEnabled: boolean;
}

export default function useToggleKnowledgeSource(
  knowledgeBaseId: string | undefined
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ sourceId, isEnabled }: ToggleVariables) =>
      KnowledgeSourcesService.setEnabled(sourceId, isEnabled),
    onMutate: async ({ sourceId, isEnabled }: ToggleVariables) => {
      if (!knowledgeBaseId) return undefined;
      await queryClient.cancelQueries({
        queryKey: knowledgeBaseKeys.sourcesRoot(knowledgeBaseId),
      });
      const snapshot = snapshotSourceQueries(queryClient, knowledgeBaseId);
      patchSourceInQueries(queryClient, knowledgeBaseId, sourceId, {
        isEnabled,
      });
      return { snapshot };
    },
    onError: (error, _vars, context) => {
      if (context?.snapshot)
        rollbackSourceQueries(queryClient, context.snapshot);
      toast.error(getErrorMessage(error, 'Failed to update the source'));
    },
    onSuccess: (_data, variables) => {
      toast.success(
        variables.isEnabled ? 'Source enabled.' : 'Source disabled.'
      );
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
    toggleEnabled: mutation.mutateAsync,
    isToggling: mutation.isPending,
  };
}
