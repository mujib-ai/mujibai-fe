'use client';

import { useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Badge } from '@/shared/components/atoms/ui/badge';
import { Card, CardContent } from '@/shared/components/atoms/ui/card';
import { Upload } from 'lucide-react';

import { MicButton } from './MicButton';

export function SpeechToTextPanel() {
  const t = useTranslations('landingPage.interactiveExperience');
  const [listening, setListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleListening = () => {
    setListening(prev => !prev);
  };

  return (
    <Card className="relative flex w-full flex-col gap-2 rounded-2xl bg-[#FFFFFFCC] px-8 py-10 shadow-[0_0_25px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-200 dark:bg-[#06B6D40F]">
      <CardContent className="flex flex-col gap-6 p-0">
        <div>
          <h3 className="text-xl font-bold">{t('speechToText.heading')}</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            {t('speechToText.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="border-border rounded-2xl border p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                {t('speechToText.textBox.label')}
              </span>
              <Badge
                variant="outline"
                className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
              >
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {t('speechToText.textBox.status')}
              </Badge>
            </div>
            <p className="text-muted-foreground min-h-24 text-sm">
              {t('speechToText.textBox.placeholder')}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="text-muted-foreground text-xs">
              {t('speechToText.live.title')}
            </span>
            <MicButton
              active={listening}
              onClick={toggleListening}
              label={t('speechToText.live.idleTitle')}
            />
            <p className="text-muted-foreground text-sm">
              {listening
                ? t('speechToText.live.activeTitle')
                : t('speechToText.live.idleTitle')}
            </p>
          </div>
        </div>

        <div className="relative flex items-center py-2">
          <div className="border-border flex-1 border-t" />
          <span className="text-muted-foreground bg-card px-3 text-xs">
            {t('speechToText.divider')}
          </span>
          <div className="border-border flex-1 border-t" />
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="border-border hover:bg-control flex items-center gap-3 rounded-xl border border-dashed p-4 text-start transition-colors"
        >
          <span className="bg-control flex size-10 shrink-0 items-center justify-center rounded-full">
            <Upload className="size-4" strokeWidth={1.75} />
          </span>
          <span>
            <span className="block text-sm font-semibold">
              {t('speechToText.upload.title')}
            </span>
            <span className="text-muted-foreground block text-xs">
              {t('speechToText.upload.description')}
            </span>
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/mp3,audio/wav,audio/mpeg"
            className="hidden"
          />
        </button>
      </CardContent>
    </Card>
  );
}

export default SpeechToTextPanel;
