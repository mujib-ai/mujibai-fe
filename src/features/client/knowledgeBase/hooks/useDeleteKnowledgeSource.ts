'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { knowledgeKeys } from '../constants/query-keys';
import { KnowledgeSourcesService } from '../services/knowledge-sources.service';
import type { KnowledgeSourcesOverview } from '../types';
import {
  rollbackSourceQueries,
  snapshotSourceQueries,
} from '../utils/source-cache';

interface DeletePagination {
  page: number;
  onPageChange: (page: number) => void;
}

export default function useDeleteKnowledgeSource(pagination: DeletePagination) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (sourceId: string) => KnowledgeSourcesService.remove(sourceId),
    onMutate: async (sourceId: string) => {
      await queryClient.cancelQueries({
        queryKey: knowledgeKeys.sourcesRoot(),
      });
      const snapshot = snapshotSourceQueries(queryClient);

      let emptiedPage = false;
      queryClient.setQueriesData<KnowledgeSourcesOverview>(
        { queryKey: knowledgeKeys.sourcesRoot() },
        old => {
          if (!old) return old;
          const data = old.sources.data.filter(item => item.id !== sourceId);
          if (
            data.length === 0 &&
            data.length !== old.sources.data.length &&
            pagination.page > 1
          ) {
            emptiedPage = true;
          }
          return {
            ...old,
            sources: {
              ...old.sources,
              data,
              pagination: {
                ...old.sources.pagination,
                total: Math.max(0, old.sources.pagination.total - 1),
              },
            },
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
      queryClient.invalidateQueries({
        queryKey: knowledgeKeys.sourcesRoot(),
      });
    },
  });

  return {
    remove: mutation.mutateAsync,
    isDeleting: mutation.isPending,
  };
}
