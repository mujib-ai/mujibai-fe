export function getBaseUrl() {
  const rawUrl = 'https://www.mujibai.net';

  const normalizedUrl = rawUrl.startsWith('http') ? rawUrl : `${rawUrl}`;

  return normalizedUrl.replace(/\/+$/, '');
}

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${getBaseUrl()}${normalizedPath}`;
}

export function createUrl(path = '/') {
  return new URL(absoluteUrl(path));
}

export function sanitizeJsonLd(jsonLd: unknown) {
  return JSON.stringify(jsonLd).replace(/</g, '\\u003c');
}
