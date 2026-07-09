'use client';

import { useTranslations } from 'next-intl';

import { Container } from '@/shared/components/atoms/Container';
import { LegalSimpleSections } from '@/shared/components/templates/LegalSimpleSections';
import { PageBackground } from '@/shared/components/templates/PageBackground';

type LegalSimpleSection = {
  title: string;
  content: string;
};

export function CancellationPolicyPage() {
  const t = useTranslations('cancellationPage');
  const sections = t.raw('sections') as Record<string, LegalSimpleSection>;

  return (
    <PageBackground>
      <Container className="py-16 md:py-20">
        <span className="text-primary text-sm font-semibold">{t('badge')}</span>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">{t('title')}</h1>
        <p className="text-muted-foreground mt-2 text-sm">{t('lastUpdated')}</p>
        <p className="text-muted-foreground mt-4 max-w-2xl text-base md:text-lg">
          {t('description')}
        </p>

        <LegalSimpleSections sections={sections} />

        <p className="text-muted-foreground mt-10 text-sm italic">
          {t('notice')}
        </p>
      </Container>
    </PageBackground>
  );
}

export default CancellationPolicyPage;
