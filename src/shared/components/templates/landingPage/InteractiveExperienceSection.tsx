'use client';

import { useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import { Container } from '@/shared/components/atoms/Container';
import { Reveal } from '@/shared/components/atoms/Reveal';
import { Badge } from '@/shared/components/atoms/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/atoms/ui/tabs';
import { Sparkles } from 'lucide-react';

import { AnimatedTabPanel } from './interactiveExperience/AnimatedTabPanel';

const panelFallback = (
  <div className="bg-muted h-75 w-full animate-pulse rounded-2xl" />
);

const VoiceAgentPanel = dynamic(
  () =>
    import('./interactiveExperience/VoiceAgentPanel').then(
      m => m.VoiceAgentPanel
    ),
  { loading: () => panelFallback }
);
const TextToSpeechPanel = dynamic(
  () =>
    import('./interactiveExperience/TextToSpeechPanel').then(
      m => m.TextToSpeechPanel
    ),
  { loading: () => panelFallback }
);
const SpeechToTextPanel = dynamic(
  () =>
    import('./interactiveExperience/SpeechToTextPanel').then(
      m => m.SpeechToTextPanel
    ),
  { loading: () => panelFallback }
);

type TabKey = 'voiceAgent' | 'textToSpeech' | 'speechToText';

export default function InteractiveExperienceSection() {
  const t = useTranslations('landingPage.interactiveExperience');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [tab, setTab] = useState<TabKey>('voiceAgent');

  return (
    <section className="relative py-10" dir={isRtl ? 'rtl' : 'ltr'}>
      <Container className="flex flex-col items-center gap-4 text-center">
        <Reveal stagger={0.1} className="flex flex-col items-center gap-4">
          <Badge
            variant="outline"
            className="border-border gap-1.5 rounded-full px-3 py-1.5"
          >
            <Sparkles className="text-primary size-3.5" />
            {t('badge')}
          </Badge>
          <h2 className="text-3xl leading-tight font-bold text-gray-900 sm:text-4xl dark:text-white">
            {t('title')}
          </h2>
          <p className="max-w-175 text-base text-gray-600 dark:text-gray-300">
            {t('description')}
          </p>
        </Reveal>

        <Tabs
          value={tab}
          onValueChange={value => setTab(value as TabKey)}
          className="mt-4 flex w-full flex-col"
        >
          <TabsList className="mx-auto grid h-auto w-full max-w-2xl grid-cols-3 rounded-full bg-[#3B82F614] p-1 dark:bg-[#3B82F614]">
            <TabsTrigger
              value="speechToText"
              className="min-w-0 flex-1 rounded-full px-2 py-3 text-xs font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-[#06B6D420] data-[state=active]:bg-[#06B6D4] data-[state=active]:text-white sm:px-6 sm:py-5 sm:text-sm dark:text-gray-300 dark:data-[state=active]:bg-[#06B6D440]"
            >
              {t('tabs.speechToText')}
            </TabsTrigger>

            <TabsTrigger
              value="textToSpeech"
              className="min-w-0 flex-1 rounded-full px-2 py-3 text-xs font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-[#06B6D420] data-[state=active]:bg-[#06B6D4] data-[state=active]:text-white sm:px-6 sm:py-5 sm:text-sm dark:text-gray-300 dark:data-[state=active]:bg-[#06B6D440]"
            >
              {t('tabs.textToSpeech')}
            </TabsTrigger>
            <TabsTrigger
              value="voiceAgent"
              className="min-w-0 flex-1 rounded-full px-2 py-3 text-xs font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-[#06B6D420] data-[state=active]:bg-[#06B6D4] data-[state=active]:text-white sm:px-6 sm:py-5 sm:text-sm dark:text-gray-300 dark:data-[state=active]:bg-[#06B6D440]"
            >
              {t('tabs.voiceAgent')}
            </TabsTrigger>
          </TabsList>

          <div className={`mt-8 w-full ${isRtl ? 'text-right' : 'text-left'}`}>
            <TabsContent value="voiceAgent" className="mt-0">
              <AnimatedTabPanel>
                <VoiceAgentPanel />
              </AnimatedTabPanel>
            </TabsContent>

            <TabsContent value="textToSpeech" className="mt-0">
              <AnimatedTabPanel>
                <TextToSpeechPanel isRtl={isRtl} />
              </AnimatedTabPanel>
            </TabsContent>

            <TabsContent value="speechToText" className="mt-0">
              <AnimatedTabPanel>
                <SpeechToTextPanel />
              </AnimatedTabPanel>
            </TabsContent>
          </div>
        </Tabs>

        <p className="text-muted-foreground mt-6 max-w-3xl text-xs leading-relaxed">
          {t('disclaimer')}
        </p>
      </Container>
    </section>
  );
}
