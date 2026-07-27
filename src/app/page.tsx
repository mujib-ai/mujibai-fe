import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

import LandingPage from '@/shared/components/sections/LandingPage';
import {
  JsonLdScript,
  PUBLIC_SEO_ROUTES,
  createPageSchemas,
  createSeoMetadata,
  createSoftwareApplicationSchema,
} from '@/shared/seo';

const route = PUBLIC_SEO_ROUTES.find(r => r.key === 'home')!;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('marketing.home');
  return createSeoMetadata({
    ...route,
    title: t('title'),
    description: t('description'),
  });
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const hasToken = !!cookieStore.get('access_token')?.value;
  const t = await getTranslations('marketing.home');

  return (
    <>
      <JsonLdScript
        data={createPageSchemas(
          { ...route, title: t('title'), description: t('description') },
          [createSoftwareApplicationSchema()]
        )}
      />
      <LandingPage hasToken={hasToken} />
    </>
  );
}
