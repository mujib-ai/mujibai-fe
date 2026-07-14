import type { Metadata } from 'next';

import { PrivacyPolicyPage } from '@/features/legal';
import {
  JsonLdScript,
  PUBLIC_SEO_ROUTES,
  createArticleSchema,
  createPageSchemas,
  createSeoMetadata,
} from '@/shared/seo';

const route = PUBLIC_SEO_ROUTES[3];

export async function generateMetadata(): Promise<Metadata> {
  return createSeoMetadata(route);
}

export default function PrivacyPolicy() {
  return (
    <>
      <JsonLdScript
        data={createPageSchemas(route, [createArticleSchema(route)])}
      />
      <PrivacyPolicyPage />
    </>
  );
}
