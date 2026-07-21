'use client';

import { Button } from '@/shared/components/atoms/ui/button';
import { Spinner } from '@heroui/react';
import { Play } from 'lucide-react';

import type { VoiceOption } from '../../constants';
import { useTextToSpeech } from '../../hooks';

export default function PlayButton({
  locale,
  text,
  voice,
}: {
  locale: string;
  text: string;
  voice?: VoiceOption;
}) {
  const { playSpeech, isPlaying } = useTextToSpeech();
  const disabled = !text.trim() || !voice || isPlaying;

  return (
    <Button
      type="button"
      className="h-10 w-10 rounded-full"
      disabled={disabled}
      onClick={() => voice && playSpeech({ text, voice })}
    >
      {isPlaying ? (
        <Spinner size="sm" color="current" />
      ) : (
        <Play
          className={`size-5 ${locale === 'ar' && 'rotate-180'}`}
          fill="#fff"
        />
      )}
    </Button>
  );
}
