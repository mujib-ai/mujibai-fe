import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PlaceholderPage } from '@/shared/components/templates/PlaceholderPage';
import {
  JsonLdScript,
  PUBLIC_SEO_ROUTES,
  createPageSchemas,
  createSeoMetadata,
} from '@/shared/seo';

const route = PUBLIC_SEO_ROUTES.find(r => r.key === 'arabicAiReceptionist')!;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('marketing.arabicAiReceptionist');
  return createSeoMetadata({
    ...route,
    title: t('title'),
    description: t('description'),
  });
}

export default async function ArabicAiReceptionistPage() {
  const t = await getTranslations('marketing.arabicAiReceptionist');
  const title = t('title');
  const description = t('description');

  return (
    <>
      <JsonLdScript
        data={createPageSchemas({ ...route, title, description })}
      />
      <PlaceholderPage title={title} description={description} />
    </>
  );
}
