import type { MetadataRoute } from 'next';

export type SeoRouteKey =
  | 'home'
  | 'helpCenter'
  | 'privacyPolicy'
  | 'termsOfService'
  | 'refundPolicy'
  | 'cancellationPolicy'
  | 'aiVoiceAgent'
  | 'aiCallCenter'
  | 'arabicAiReceptionist'
  | 'automatedCustomerService'
  | 'afterHoursCallAnswering'
  | 'pricing'
  | 'demo'
  | 'about'
  | 'featuresIndex'
  | 'featureCallAnswering'
  | 'featureAppointmentBooking'
  | 'featureTicketCreation'
  | 'featureKnowledgeBase'
  | 'featureCallAnalytics'
  | 'featureCallRecording'
  | 'featureIntegrations'
  | 'featureArabicDialects'
  | 'industriesIndex'
  | 'industryClinics'
  | 'industryRealEstate'
  | 'industryRestaurants'
  | 'industryEcommerce'
  | 'industryHotels'
  | 'industryMaintenanceCompanies';

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

export type AppLocale = 'en' | 'ar';

export type SeoImage = {
  url: string;
  width?: number;
  height?: number;
  alt: string;
  type?: string;
};

export type ArticleMetadataInput = {
  /** ISO 8601 date string. Must come from real content data. */
  publishedTime: string;
  /** ISO 8601 date string. Omit if the content has no distinct update date. */
  modifiedTime?: string;
  /** Omit rather than fabricate when no real author is attached to the content. */
  author?: string;
  section?: string;
  tags?: string[];
};

export type SeoMetadataInput = Pick<
  SeoRoute,
  'path' | 'title' | 'description' | 'keywords' | 'category'
> & {
  /** Defaults to 'website'. Use 'article' for blog posts, guides, and docs content. */
  type?: 'website' | 'article';
  /** Overrides the default site OG image for this page. */
  image?: SeoImage;
  /** Additional images after the primary one — the first image always takes precedence. */
  images?: SeoImage[];
  /** Required when type is 'article'. */
  article?: ArticleMetadataInput;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type JsonLd = Record<string, unknown>;
