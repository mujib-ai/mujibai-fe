'use client';

import { useLocale, useTranslations } from 'next-intl';

import { useLandingAgent } from '@/features/landing-voice-agent/hooks/use-landing-agent';
import { Card } from '@/shared/components/atoms/ui/card';

import { MicButton } from './MicButton';

export function VoiceAgentPanel() {
  const t = useTranslations('landingPage.interactiveExperience');
  const locale = useLocale();
  const agent = useLandingAgent(locale === 'ar' ? 'ar' : 'en');
  const listening = !['idle', 'ended', 'error'].includes(agent.state);

  const toggleListening = () => {
    if (listening) {
      agent.end();
      return;
    }
    void agent.start();
  };

  return (
    <Card className="relative flex w-full flex-col items-center gap-2 rounded-2xl bg-[#FFFFFFCC] px-8 py-10 shadow-[0_0_25px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-200 lg:w-86 dark:bg-[#06B6D40F]">
      <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
        <MicButton
          active={listening}
          onClick={toggleListening}
          label={t('voiceAgent.mic.idleTitle')}
        />
        <div>
          <h3 className="text-lg font-bold">
            {listening
              ? t('voiceAgent.mic.activeTitle')
              : t('voiceAgent.mic.idleTitle')}
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">
            {t('voiceAgent.mic.description')}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default VoiceAgentPanel;
