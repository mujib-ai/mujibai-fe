import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import {
  DEFAULT_APP_LOCALE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_TYPE,
  DEFAULT_OG_IMAGE_WIDTH,
  OG_LOCALE_BY_APP_LOCALE,
  SITE_CREATOR,
  SITE_NAME,
  SITE_PUBLISHER,
  SUPPORTED_APP_LOCALES,
} from './constants';
import type {
  AppLocale,
  ArticleMetadataInput,
  SeoImage,
  SeoMetadataInput,
} from './types';
import { absoluteUrl, createUrl, getBaseUrl } from './utils';

/** Alias kept explicit per the SEO architecture doc — same behavior as absoluteUrl. */
export const canonicalUrl = absoluteUrl;

async function resolveAppLocale(): Promise<AppLocale> {
  try {
    const locale = await getLocale();
    return locale === 'ar' ? 'ar' : 'en';
  } catch {
    return DEFAULT_APP_LOCALE;
  }
}

type ResolvedOgImage = Required<
  Pick<SeoImage, 'url' | 'width' | 'height' | 'alt' | 'type'>
>;

function resolveOgImages(
  title: string,
  image?: SeoImage,
  images?: SeoImage[]
): ResolvedOgImage[] {
  const primary: SeoImage = image ?? {
    url: absoluteUrl(
      `${DEFAULT_OG_IMAGE_PATH}?title=${encodeURIComponent(title)}`
    ),
    width: DEFAULT_OG_IMAGE_WIDTH,
    height: DEFAULT_OG_IMAGE_HEIGHT,
    alt: DEFAULT_OG_IMAGE_ALT,
    type: DEFAULT_OG_IMAGE_TYPE,
  };

  const all = [primary, ...(images ?? [])];

  return all.map(img => ({
    url: img.url.startsWith('http') ? img.url : absoluteUrl(img.url),
    width: img.width ?? DEFAULT_OG_IMAGE_WIDTH,
    height: img.height ?? DEFAULT_OG_IMAGE_HEIGHT,
    alt: img.alt,
    type: img.type ?? DEFAULT_OG_IMAGE_TYPE,
  }));
}

export async function createSeoMetadata({
  path,
  title,
  description,
  keywords,
  category,
  type = 'website',
  image,
  images,
  article,
}: SeoMetadataInput): Promise<Metadata> {
  const url = absoluteUrl(path);
  const appLocale = await resolveAppLocale();
  const ogLocale = OG_LOCALE_BY_APP_LOCALE[appLocale];
  const alternateLocales = SUPPORTED_APP_LOCALES.filter(
    locale => locale !== appLocale
  ).map(locale => OG_LOCALE_BY_APP_LOCALE[locale]);

  const ogImages = resolveOgImages(title, image, images);

  const openGraph: Metadata['openGraph'] =
    type === 'article'
      ? {
          type: 'article',
          title,
          description,
          url,
          siteName: SITE_NAME,
          locale: ogLocale,
          images: ogImages,
          publishedTime: article?.publishedTime,
          modifiedTime: article?.modifiedTime,
          authors: article?.author ? [article.author] : undefined,
          section: article?.section,
          tags: article?.tags,
        }
      : {
          type: 'website',
          title,
          description,
          url,
          siteName: SITE_NAME,
          locale: ogLocale,
          images: ogImages,
        };

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
      ...openGraph,
      // og:locale:alternate — declared because the app renders every route in
      // both languages behind the same URL (cookie-driven, not path-based).
      alternateLocale: alternateLocales,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages.map(img => img.url),
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export async function createArticleSeoMetadata(
  input: Omit<SeoMetadataInput, 'type'> & { article: ArticleMetadataInput }
): Promise<Metadata> {
  return createSeoMetadata({ ...input, type: 'article' });
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
