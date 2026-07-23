'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { knowledgeKeys } from '../constants/query-keys';
import { KnowledgeSourcesService } from '../services/knowledge-sources.service';
import type { UploadManualTextSourceDto } from '../types';

export default function useUploadManualTextSource() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: UploadManualTextSourceDto) =>
      KnowledgeSourcesService.uploadManualText(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: knowledgeKeys.sourcesRoot(),
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
