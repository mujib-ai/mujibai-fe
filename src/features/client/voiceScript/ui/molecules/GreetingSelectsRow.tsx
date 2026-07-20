'use client';

import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';
import { Textarea } from '@/shared/components/atoms/ui/textarea';

import type { VoiceOption } from '../../constants';
import { VOICE_OPTIONS } from '../../constants';
import { PlayButton } from '../atoms';

export default function GreetingSelectsRow({
  t,
  locale,
}: {
  t: (key: string) => string;
  locale: string;
}) {
  const [voice, setVoice] = useState<VoiceOption | undefined>(undefined);
  const [greeting, setGreeting] = useState('');

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-4 sm:flex-nowrap">
      <Select
        value={voice}
        onValueChange={value => setVoice(value as VoiceOption)}
      >
        <SelectTrigger className="w-full border-0 bg-[#06B6D426] sm:w-56">
          <SelectValue placeholder={t('selectVoice')} />
        </SelectTrigger>
        <SelectContent>
          {VOICE_OPTIONS.map(option => (
            <SelectItem key={option} value={option}>
              {t(`voices.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea
        value={greeting}
        onChange={event => setGreeting(event.target.value)}
        placeholder={t('selectGreeting')}
        className="min-h-9 resize-none border-0 bg-[#06B6D426]"
      />
      <PlayButton locale={locale} text={greeting} voice={voice} />
    </div>
  );
}
