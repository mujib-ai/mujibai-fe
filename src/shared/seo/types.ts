import type { MetadataRoute } from 'next';

export type SeoRouteKey =
  | 'home'
  | 'helpCenter'
  | 'contactUs'
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

export type SeoMetadataInput = Pick<
  SeoRoute,
  'path' | 'title' | 'description' | 'keywords' | 'category'
>;

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type JsonLd = Record<string, unknown>;
