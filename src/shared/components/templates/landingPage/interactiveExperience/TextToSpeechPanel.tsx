'use client';

import { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { TTSVoice, useTTS } from '@/features/tts';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/shared/components/atoms/ui/card';
import { Textarea } from '@/shared/components/atoms/ui/textarea';
import { cn } from '@/shared/lib/utils';
import { Loader2, User } from 'lucide-react';

import { AudioPlayer } from './AudioPlayer';

const MAX_LENGTH = 200;

const VOICES: { id: TTSVoice; label: string }[] = [
  { id: TTSVoice.ABDULLAH, label: 'عبدالله' },
  { id: TTSVoice.FAHAD, label: 'فهد' },
  { id: TTSVoice.SULTAN, label: 'سلطان' },
  { id: TTSVoice.LULWA, label: 'لولوة' },
  { id: TTSVoice.NOURA, label: 'نورة' },
  { id: TTSVoice.AISHA, label: 'عائشة' },
];

export function TextToSpeechPanel({ isRtl }: { isRtl: boolean }) {
  const t = useTranslations('landingPage.interactiveExperience');
  const { generate, isGenerating } = useTTS();

  const [voice, setVoice] = useState<TTSVoice>(TTSVoice.ABDULLAH);
  const [text, setText] = useState(t('textToSpeech.placeholder'));
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    };
  }, []);

  const handleGenerate = async () => {
    if (!text.trim()) return;

    const blob = await generate({ text, voice });
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    const url = URL.createObjectURL(blob);
    audioUrlRef.current = url;
    setAudioUrl(url);
  };

  return (
    <Card className="relative flex w-full flex-col gap-2 rounded-2xl bg-[#FFFFFFCC] px-4 py-6 shadow-[0_0_25px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-200 sm:px-8 sm:py-10 dark:bg-[#06B6D40F]">
      <CardHeader
        className={cn(
          'border-border w-full gap-1 border-b px-0 pt-4 pb-6 sm:px-8 sm:pt-8',
          isRtl ? 'text-right' : 'text-left'
        )}
      >
        <span className="text-muted-foreground text-xs">
          {t('textToSpeech.studioLabel')}
        </span>
        <h3 className="text-xl font-bold">{t('textToSpeech.heading')}</h3>
      </CardHeader>

      <CardContent className="w-full px-0 pb-4 sm:px-8 sm:pb-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-2">
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <span>{t('textToSpeech.textareaLabel')}</span>
              <span>
                {text.length} / {MAX_LENGTH}
              </span>
            </div>
            <Textarea
              value={text}
              maxLength={MAX_LENGTH}
              onChange={e => setText(e.target.value)}
              rows={6}
              dir="rtl"
              className="resize-none text-right"
            />
          </div>

          <div
            className={cn(
              'flex flex-col gap-2',
              isRtl ? 'text-right' : 'text-left'
            )}
          >
            <span className="text-muted-foreground text-xs">
              {t('textToSpeech.personasLabel')}
            </span>
            <div className="thin-scrollbar flex max-h-56 flex-col gap-2 overflow-y-auto pe-1">
              {VOICES.map(v => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVoice(v.id)}
                  className={cn(
                    'flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors',
                    voice === v.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-foreground hover:bg-control'
                  )}
                >
                  {v.label}
                  <User className="size-4" strokeWidth={1.75} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          {audioUrl && <AudioPlayer key={audioUrl} src={audioUrl} />}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !text.trim()}
          >
            {isGenerating && <Loader2 className="size-4 animate-spin" />}
            {t('textToSpeech.generateButton')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default TextToSpeechPanel;
