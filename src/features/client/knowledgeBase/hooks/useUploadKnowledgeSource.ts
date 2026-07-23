'use client';

import { useState } from 'react';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { knowledgeKeys } from '../constants/query-keys';
import type { DuplicateSourceInfo } from '../interfaces';
import { KnowledgeSourcesService } from '../services/knowledge-sources.service';
import type {
  ApiErrorData,
  KnowledgeSource,
  UploadKnowledgeSourceDto,
} from '../types';

export default function useUploadKnowledgeSource() {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [duplicateInfo, setDuplicateInfo] =
    useState<DuplicateSourceInfo | null>(null);

  const mutation = useMutation({
    mutationFn: async (dto: UploadKnowledgeSourceDto) => {
      setUploadProgress(0);
      setDuplicateInfo(null);

      const formData = new FormData();
      formData.append('file', dto.file);
      if (dto.name) formData.append('name', dto.name);
      if (dto.chunkingStrategy) {
        formData.append('chunkingStrategy', dto.chunkingStrategy);
      }

      return KnowledgeSourcesService.upload(formData, setUploadProgress);
    },
    onSuccess: (source: KnowledgeSource) => {
      queryClient.invalidateQueries({
        queryKey: knowledgeKeys.sourcesRoot(),
      });
      toast.success(`"${source.name}" was uploaded and queued for processing.`);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const data = error.response?.data as ApiErrorData | undefined;
        if (data?.code === 'DUPLICATE_SOURCE') {
          setDuplicateInfo({
            existingSourceId: data.existingSourceId,
            existingSourceName: data.existingSourceName,
          });
          return;
        }
      }
      toast.error(getErrorMessage(error, 'Failed to upload the file'));
    },
  });

  return {
    upload: mutation.mutateAsync,
    isUploading: mutation.isPending,
    uploadProgress,
    duplicateInfo,
    clearDuplicateInfo: () => setDuplicateInfo(null),
  };
}
