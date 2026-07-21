'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { knowledgeBaseKeys } from '../constants/query-keys';
import { KnowledgeSourcesService } from '../services/knowledge-sources.service';
import type { KnowledgeSource, PaginatedResponse } from '../types';
import {
  rollbackSourceQueries,
  snapshotSourceQueries,
} from '../utils/source-cache';

interface DeletePagination {
  page: number;
  onPageChange: (page: number) => void;
}

export default function useDeleteKnowledgeSource(
  knowledgeBaseId: string | undefined,
  pagination: DeletePagination
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (sourceId: string) => KnowledgeSourcesService.remove(sourceId),
    onMutate: async (sourceId: string) => {
      if (!knowledgeBaseId) return undefined;
      await queryClient.cancelQueries({
        queryKey: knowledgeBaseKeys.sourcesRoot(knowledgeBaseId),
      });
      const snapshot = snapshotSourceQueries(queryClient, knowledgeBaseId);

      let emptiedPage = false;
      queryClient.setQueriesData<PaginatedResponse<KnowledgeSource>>(
        { queryKey: knowledgeBaseKeys.sourcesRoot(knowledgeBaseId) },
        old => {
          if (!old) return old;
          const items = old.items.filter(item => item.id !== sourceId);
          if (
            items.length === 0 &&
            items.length !== old.items.length &&
            pagination.page > 1
          ) {
            emptiedPage = true;
          }
          return {
            ...old,
            items,
            totalItems: Math.max(0, old.totalItems - 1),
          };
        }
      );

      return { snapshot, emptiedPage };
    },
    onError: (error, _sourceId, context) => {
      if (context?.snapshot)
        rollbackSourceQueries(queryClient, context.snapshot);
      toast.error(getErrorMessage(error, 'Failed to delete the source'));
    },
    onSuccess: (_data, _sourceId, context) => {
      toast.success('Source deleted.');
      if (context?.emptiedPage) {
        pagination.onPageChange(pagination.page - 1);
      }
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
    remove: mutation.mutateAsync,
    isDeleting: mutation.isPending,
  };
}
