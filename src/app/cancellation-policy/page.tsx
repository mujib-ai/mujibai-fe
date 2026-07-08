import type { Metadata } from 'next';

import { CancellationPolicyPage } from '@/features/CancellationPolicy';
import {
  JsonLdScript,
  PUBLIC_SEO_ROUTES,
  createArticleSchema,
  createPageSchemas,
  createSeoMetadata,
} from '@/shared/seo';

const route = PUBLIC_SEO_ROUTES.find(
  item => item.key === 'cancellationPolicy'
)!;

export async function generateMetadata(): Promise<Metadata> {
  return createSeoMetadata(route);
}

export default function CancellationPolicy() {
  return (
    <>
      <JsonLdScript
        data={createPageSchemas(route, [createArticleSchema(route)])}
      />
      <CancellationPolicyPage />
    </>
  );
}
