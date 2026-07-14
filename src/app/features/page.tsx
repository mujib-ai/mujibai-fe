import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PlaceholderPage } from '@/shared/components/templates/PlaceholderPage';
import {
  JsonLdScript,
  PUBLIC_SEO_ROUTES,
  createPageSchemas,
  createSeoMetadata,
} from '@/shared/seo';

const route = PUBLIC_SEO_ROUTES.find(r => r.key === 'featuresIndex')!;

const FEATURES = [
  { key: 'callAnswering', slugKey: 'featureCallAnswering' },
  { key: 'appointmentBooking', slugKey: 'featureAppointmentBooking' },
  { key: 'ticketCreation', slugKey: 'featureTicketCreation' },
  { key: 'knowledgeBase', slugKey: 'featureKnowledgeBase' },
  { key: 'callAnalytics', slugKey: 'featureCallAnalytics' },
  { key: 'callRecording', slugKey: 'featureCallRecording' },
  { key: 'integrations', slugKey: 'featureIntegrations' },
  { key: 'arabicDialects', slugKey: 'featureArabicDialects' },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('marketing.featuresIndex');
  return createSeoMetadata({
    ...route,
    title: t('title'),
    description: t('description'),
  });
}

export default async function FeaturesPage() {
  const t = await getTranslations('marketing');
  const title = t('featuresIndex.title');
  const description = t('featuresIndex.description');

  const items = FEATURES.map(({ key, slugKey }) => ({
    href: PUBLIC_SEO_ROUTES.find(r => r.key === slugKey)!.path,
    title: t(`features.${key}.title`),
    description: t(`features.${key}.description`),
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
