'use client';

import { useTranslations } from 'next-intl';

import PlansPageOrganism from '../organisms/PlansPageOrganism';
import PlansPageTemplate from '../templates/PlansPageTemplate';

export default function PlansPage() {
  const t = useTranslations('plans');

  return (
    <PlansPageTemplate title={t('title')}>
      <PlansPageOrganism />
    </PlansPageTemplate>
  );
}
