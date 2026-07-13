'use client';

import { useLocale, useTranslations } from 'next-intl';

import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';

import VoiceScriptHint from '../atoms/VoiceScriptHint';
import CallGreetingVoice from '../organisms/CallGreetingVoice';
import MainConversationScript from '../organisms/MainConversationScript';

export default function VoiceScriptPage() {
  const t = useTranslations('VoiceScripts');
  const locale = useLocale();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <DashboardHeader title={t('title')} subtitle={t('subTitle')} />
      <div className="z-50 h-full w-full rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <CallGreetingVoice t={t} locale={locale} />
        <VoiceScriptHint text={t('selectLanguageVoice')} />
        <MainConversationScript t={t} locale={locale} />
      </div>
    </div>
  );
}
