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

interface ToggleVariables {
  sourceId: string;
  isEnabled: boolean;
}

export default function useToggleKnowledgeSource() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ sourceId, isEnabled }: ToggleVariables) =>
      KnowledgeSourcesService.setEnabled(sourceId, isEnabled),
    onMutate: async ({ sourceId, isEnabled }: ToggleVariables) => {
      await queryClient.cancelQueries({
        queryKey: knowledgeKeys.sourcesRoot(),
      });
      const snapshot = snapshotSourceQueries(queryClient);
      patchSourceInQueries(queryClient, sourceId, { isEnabled });
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
      queryClient.invalidateQueries({
        queryKey: knowledgeKeys.sourcesRoot(),
      });
    },
  });

  return {
    toggleEnabled: mutation.mutateAsync,
    isToggling: mutation.isPending,
  };
}
