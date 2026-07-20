'use client';
import Image from 'next/image';

import { useIconTheme } from '@/shared/components/atoms/ThemedIcon';

export default function VoiceScriptHint({ text }: { text: string }) {
  const iconTheme = useIconTheme();
  return (
    <p className="flex items-center gap-2">
      <Image
        src={`/icons/ai-voice-${iconTheme}.svg`}
        alt="Feature"
        width={10}
        height={10}
        className="size-5"
        loading="lazy"
      />
      <span>{text}</span>
    </p>
  );
}
