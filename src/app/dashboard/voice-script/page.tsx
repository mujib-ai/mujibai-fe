import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { VoiceScriptPage } from '@/features/client/voiceScript';
import { createNoIndexMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('VoiceScripts');
  return createNoIndexMetadata(`${t('title')} - mujibai`, t('subTitle'));
}

export default function VoiceScript() {
  return <VoiceScriptPage />;
}
