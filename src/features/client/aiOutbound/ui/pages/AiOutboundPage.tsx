'use client';

import { useLocale, useTranslations } from 'next-intl';

import AiOutboundTemplate from '../templates/AiOutboundTemplate';

export default function AiOutboundPage() {
  const t = useTranslations('aiOutbound');
  const locale = useLocale();
  return <AiOutboundTemplate t={t} locale={locale} />;
}
