'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TTSService } from '../services';
import type { GenerateTTSDto } from '../types';

export function useTTS() {
  const mutation = useMutation({
    mutationFn: (payload: GenerateTTSDto) => TTSService.generate(payload),
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to generate voice'));
    },
  });

  return {
    generate: mutation.mutateAsync,
    isGenerating: mutation.isPending,
  };
}
