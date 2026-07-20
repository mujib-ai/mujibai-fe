'use client';

import { useEffect, useRef } from 'react';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { VoiceScriptService } from '../services';
import type { TextToSpeechDto } from '../services';

export default function useTextToSpeech() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const mutation = useMutation({
    mutationFn: (payload: TextToSpeechDto) =>
      VoiceScriptService.textToSpeech(payload),
    onSuccess: blob => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;

      if (!audioRef.current) {
        audioRef.current = new Audio();
      }
      audioRef.current.src = url;
      void audioRef.current.play();
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to generate speech'));
    },
  });

  return {
    playSpeech: mutation.mutate,
    isPlaying: mutation.isPending,
  };
}
