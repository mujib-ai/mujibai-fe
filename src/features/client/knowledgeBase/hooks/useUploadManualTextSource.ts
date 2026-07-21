'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { knowledgeBaseKeys } from '../constants/query-keys';
import { KnowledgeSourcesService } from '../services/knowledge-sources.service';
import type { UploadManualTextSourceDto } from '../types';

export default function useUploadManualTextSource(
  knowledgeBaseId: string | undefined
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: UploadManualTextSourceDto) => {
      if (!knowledgeBaseId) throw new Error('No active knowledge base');
      return KnowledgeSourcesService.uploadManualText(knowledgeBaseId, payload);
    },
    onSuccess: () => {
      if (!knowledgeBaseId) return;
      queryClient.invalidateQueries({
        queryKey: knowledgeBaseKeys.sourcesRoot(knowledgeBaseId),
      });
      queryClient.invalidateQueries({
        queryKey: knowledgeBaseKeys.stats(knowledgeBaseId),
      });
      toast.success('Text source added and queued for processing.');
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to add the text source'));
    },
  });

  return {
    uploadManualText: mutation.mutateAsync,
    isUploading: mutation.isPending,
  };
}
