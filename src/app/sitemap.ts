import type { MetadataRoute } from 'next';

import { PUBLIC_SEO_ROUTES, absoluteUrl } from '@/shared/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_SEO_ROUTES.map(route => ({
    url: absoluteUrl(route.path),
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
