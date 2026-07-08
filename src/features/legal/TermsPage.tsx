'use client';

import { useTranslations } from 'next-intl';

import { Container } from '@/shared/components/atoms/Container';
import { LegalRichSections } from '@/shared/components/templates/LegalRichSections';
import { PageBackground } from '@/shared/components/templates/PageBackground';

export function TermsPage() {
  const t = useTranslations('legal.terms');

  return (
    <PageBackground>
      <Container className="py-16 md:py-20">
        <span className="text-primary text-sm font-semibold">
          {t('eyebrow')}
        </span>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">{t('title')}</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          {t('lastUpdatedLabel')} {t('lastUpdated')}
        </p>
        <p className="text-muted-foreground mt-4 max-w-2xl text-base md:text-lg">
          {t('intro')}
        </p>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm italic">
          {t('disclaimer')}
        </p>

        <LegalRichSections namespace="legal.terms" />
      </Container>
    </PageBackground>
  );
}

export default TermsPage;
