import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PlaceholderPage } from '@/shared/components/templates/PlaceholderPage';
import {
  JsonLdScript,
  PUBLIC_SEO_ROUTES,
  createPageSchemas,
  createSeoMetadata,
} from '@/shared/seo';

const route = PUBLIC_SEO_ROUTES.find(r => r.key === 'industriesIndex')!;

const INDUSTRIES = [
  { key: 'clinics', slugKey: 'industryClinics' },
  { key: 'realEstate', slugKey: 'industryRealEstate' },
  { key: 'restaurants', slugKey: 'industryRestaurants' },
  { key: 'ecommerce', slugKey: 'industryEcommerce' },
  { key: 'hotels', slugKey: 'industryHotels' },
  { key: 'maintenanceCompanies', slugKey: 'industryMaintenanceCompanies' },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('marketing.industriesIndex');
  return createSeoMetadata({
    ...route,
    title: t('title'),
    description: t('description'),
  });
}

export default async function IndustriesPage() {
  const t = await getTranslations('marketing');
  const title = t('industriesIndex.title');
  const description = t('industriesIndex.description');

  const items = INDUSTRIES.map(({ key, slugKey }) => ({
    href: PUBLIC_SEO_ROUTES.find(r => r.key === slugKey)!.path,
    title: t(`industries.${key}.title`),
    description: t(`industries.${key}.description`),
  }));

  return (
    <>
      <JsonLdScript
        data={createPageSchemas({ ...route, title, description })}
      />
      <PlaceholderPage title={title} description={description} items={items} />
    </>
  );
}
