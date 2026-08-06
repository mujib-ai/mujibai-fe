'use client';

import { useEffect, useRef } from 'react';

import { useTranslations } from 'next-intl';

import { useLandingAgent } from '@/features/landing-voice-agent/hooks/use-landing-agent';
import { Card } from '@/shared/components/atoms/ui/card';

import { MicButton } from './MicButton';

export function VoiceAgentPanel() {
  const t = useTranslations('landingPage.interactiveExperience.voiceAgent');
  const agent = useLandingAgent();
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);
  const active = !['idle', 'ended', 'error'].includes(agent.state);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [agent.transcript]);

  const toggleListening = () => {
    if (active) {
      agent.end();
      return;
    }
    void agent.start();
  };

  return (
    <Card className="relative flex w-full flex-col items-center gap-6 rounded-2xl bg-[#FFFFFFCC] px-4 py-6 shadow-[0_0_25px_rgba(0,0,0,0.05)] backdrop-blur-md sm:px-8 sm:py-10 dark:bg-[#06B6D40F]">
      <div className="flex flex-col items-center justify-center gap-4 p-4 text-center sm:p-8">
        <MicButton
          active={active}
          onClick={toggleListening}
          label={t(active ? 'mic.activeTitle' : 'mic.idleTitle')}
        />
        <div>
          <h3 className="text-lg font-bold">{t(`status.${agent.state}`)}</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            {agent.error ? t(`errors.${agent.error}`) : t('mic.description')}
          </p>
        </div>
        {agent.error && (
          <button
            type="button"
            onClick={() => void agent.start()}
            className="text-primary text-sm font-semibold hover:underline"
          >
            {t('retry')}
          </button>
        )}
      </div>
    </Card>
  );
}

export default VoiceAgentPanel;
