import type { MetadataRoute } from 'next';

import {
  DISALLOWED_ROUTES,
  PUBLIC_SEO_ROUTES,
  absoluteUrl,
  getBaseUrl,
} from '@/shared/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: PUBLIC_SEO_ROUTES.map(route => route.path),
      disallow: [...DISALLOWED_ROUTES],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: new URL(getBaseUrl()).host,
  };
}
