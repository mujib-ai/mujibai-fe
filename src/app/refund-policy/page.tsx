import type { Metadata } from 'next';

import { RefundPolicyPage } from '@/features/refundPolicy';
import {
  JsonLdScript,
  PUBLIC_SEO_ROUTES,
  createArticleSchema,
  createPageSchemas,
  createSeoMetadata,
} from '@/shared/seo';

const route = PUBLIC_SEO_ROUTES.find(item => item.key === 'refundPolicy')!;

export async function generateMetadata(): Promise<Metadata> {
  return createSeoMetadata(route);
}

export default function RefundPolicy() {
  return (
    <>
      <JsonLdScript
        data={createPageSchemas(route, [createArticleSchema(route)])}
      />
      <RefundPolicyPage />
    </>
  );
}
