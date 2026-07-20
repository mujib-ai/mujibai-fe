import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import ContactUsPage from '@/features/contactUs/pages/ContactUsPage';
import {
  JsonLdScript,
  PUBLIC_SEO_ROUTES,
  createPageSchemas,
  createSeoMetadata,
} from '@/shared/seo';

const route = PUBLIC_SEO_ROUTES.find(r => r.key === 'contactUs')!;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('marketing.contact');
  return createSeoMetadata({
    ...route,
    title: t('title'),
    description: t('description'),
  });
}

export default async function page() {
  const t = await getTranslations('marketing.contact');
  const title = t('title');
  const description = t('description');

  return (
    <>
      <JsonLdScript
        data={createPageSchemas({ ...route, title, description })}
      />
      <ContactUsPage />
    </>
  );
}
