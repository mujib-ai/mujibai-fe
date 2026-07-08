import type { MetadataRoute } from 'next';

export type SeoRouteKey =
  | 'home'
  | 'helpCenter'
  | 'contactUs'
  | 'privacyPolicy'
  | 'termsOfService'
  | 'refundPolicy'
  | 'cancellationPolicy';

export type SeoRoute = {
  key: SeoRouteKey;
  path: `/${string}` | '/';
  label: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  lastModified: string;
};

export type SeoMetadataInput = Pick<
  SeoRoute,
  'path' | 'title' | 'description' | 'keywords' | 'category'
>;

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type JsonLd = Record<string, unknown>;
