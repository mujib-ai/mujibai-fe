'use client';

import { useTranslations } from 'next-intl';

import { Container } from '@/shared/components/atoms/Container';
import { LegalRichSections } from '@/shared/components/templates/LegalRichSections';
import { PageBackground } from '@/shared/components/templates/PageBackground';

export function PrivacyPolicyPage() {
  const t = useTranslations('legal.privacy');

  return (
    <PageBackground>
      <Container className="py-16 md:py-20">
        <span className="text-primary text-sm font-semibold">
          {t('eyebrow')}
        </span>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">{t('title')}</h1>

        <LegalRichSections namespace="legal.privacy" />
      </Container>
    </PageBackground>
  );
}

export default PrivacyPolicyPage;
