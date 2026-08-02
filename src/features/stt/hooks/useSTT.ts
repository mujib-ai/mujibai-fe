'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { STTService } from '../services';

export function useSTT() {
  const mutation = useMutation({
    mutationFn: (file: File | Blob) => STTService.transcribe(file),
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to transcribe audio'));
    },
  });

  return {
    transcribe: mutation.mutateAsync,
    isTranscribing: mutation.isPending,
  };
}
