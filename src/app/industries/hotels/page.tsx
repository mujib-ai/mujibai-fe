import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PlaceholderPage } from '@/shared/components/templates/PlaceholderPage';
import {
  JsonLdScript,
  PUBLIC_SEO_ROUTES,
  createPageSchemas,
  createSeoMetadata,
} from '@/shared/seo';

const route = PUBLIC_SEO_ROUTES.find(r => r.key === 'industryHotels')!;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('marketing.industries.hotels');
  return createSeoMetadata({
    ...route,
    title: t('title'),
    description: t('description'),
  });
}

export default async function IndustryHotelsPage() {
  const t = await getTranslations('marketing.industries.hotels');
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
