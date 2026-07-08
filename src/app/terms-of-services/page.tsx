import type { Metadata } from 'next';

import { TermsPage } from '@/features/legal';
import {
  JsonLdScript,
  PUBLIC_SEO_ROUTES,
  createArticleSchema,
  createPageSchemas,
  createSeoMetadata,
} from '@/shared/seo';

const route = PUBLIC_SEO_ROUTES[4];

export async function generateMetadata(): Promise<Metadata> {
  return createSeoMetadata(route);
}

export default function Terms() {
  return (
    <>
      <JsonLdScript
        data={createPageSchemas(route, [createArticleSchema(route)])}
      />
      <TermsPage />
    </>
  );
}
