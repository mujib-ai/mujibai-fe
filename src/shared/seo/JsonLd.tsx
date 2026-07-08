import type { JsonLd } from './types';
import { sanitizeJsonLd } from './utils';

type JsonLdProps = {
  data: JsonLd | JsonLd[];
};

export function JsonLdScript({ data }: JsonLdProps) {
  const graph = Array.isArray(data) ? data : [data];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(graph) }}
    />
  );
}
