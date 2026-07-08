import {
  DEFAULT_OG_IMAGE,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PUBLISHER,
} from './constants';
import type { BreadcrumbItem, JsonLd, SeoRoute } from './types';
import { absoluteUrl } from './utils';

const organizationId = absoluteUrl('/#organization');
const websiteId = absoluteUrl('/#website');

export function createOrganizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId,
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/logo.svg'),
    email: SITE_EMAIL,
    sameAs: [],
  };
}

export function createWebsiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    name: SITE_NAME,
    url: absoluteUrl('/'),
    publisher: {
      '@id': organizationId,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/help-center')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createWebPageSchema(route: SeoRoute): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(route.path)}#webpage`,
    url: absoluteUrl(route.path),
    name: route.title,
    description: route.description,
    isPartOf: {
      '@id': websiteId,
    },
    about: {
      '@id': organizationId,
    },
    publisher: {
      '@id': organizationId,
    },
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    dateModified: route.lastModified,
  };
}

export function createSoftwareApplicationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: absoluteUrl('/'),
    description:
      'AI-powered social media management software for planning, creating, approving, publishing, and measuring content.',
    publisher: {
      '@id': organizationId,
    },
    offers: {
      '@type': 'Offer',
      category: 'Subscription',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: absoluteUrl('/#pricing'),
    },
  };
}

export function createFaqPageSchema(
  questions: Array<{ question: string; answer: string }>
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

export function createArticleSchema(route: SeoRoute): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: route.title,
    description: route.description,
    url: absoluteUrl(route.path),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    author: {
      '@type': 'Organization',
      name: SITE_PUBLISHER,
    },
    publisher: {
      '@id': organizationId,
    },
    dateModified: route.lastModified,
  };
}

export function createProductSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: SITE_NAME,
    description:
      'AI-powered social media management workspace for marketing teams.',
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    url: absoluteUrl('/'),
  };
}

export function createPageSchemas(
  route: SeoRoute,
  extraSchemas: JsonLd[] = []
): JsonLd[] {
  const breadcrumbs =
    route.path === '/'
      ? [{ name: 'Home', path: '/' }]
      : [
          { name: 'Home', path: '/' },
          { name: route.label, path: route.path },
        ];

  return [
    createBreadcrumbSchema(breadcrumbs),
    createWebPageSchema(route),
    ...extraSchemas,
  ];
}
