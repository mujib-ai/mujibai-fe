import type { Metadata } from 'next';

import {
  DEFAULT_LOCALE,
  DEFAULT_OG_IMAGE,
  SITE_CREATOR,
  SITE_NAME,
  SITE_PUBLISHER,
} from './constants';
import type { SeoMetadataInput } from './types';
import { absoluteUrl, createUrl, getBaseUrl } from './utils';

export function createSeoMetadata({
  path,
  title,
  description,
  keywords,
  category,
}: SeoMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(DEFAULT_OG_IMAGE);

  return {
    metadataBase: createUrl(),
    title,
    description,
    keywords,
    authors: [{ name: SITE_NAME, url: getBaseUrl() }],
    creator: SITE_CREATOR,
    publisher: SITE_PUBLISHER,
    category,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} AI customer service`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export function createNoIndexMetadata(
  title: string,
  description: string
): Metadata {
  return {
    metadataBase: createUrl(),
    title,
    description,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}
