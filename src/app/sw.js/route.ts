// Served at /sw.js. A route handler (not a static public/sw.js file) so the
// cache version below is stamped once per server start/deploy, giving every
// deploy a fresh cache namespace without any extra build tooling.
const CACHE_VERSION = `v${Date.now()}`;
const STATIC_CACHE = `mujibai-static-${CACHE_VERSION}`;
const ASSET_CACHE = `mujibai-assets-${CACHE_VERSION}`;
const CURRENT_CACHES = [STATIC_CACHE, ASSET_CACHE];

const OFFLINE_URL = '/offline';
const PRECACHE_URLS = [
  OFFLINE_URL,
  '/favicon.ico',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Same-origin, non-sensitive static assets only. Never HTML pages, never
// anything under /api, /dashboard data, or auth — see fetch handler below.
const CACHEABLE_ASSET_PATTERN =
  /^\/(_next\/static\/|icons\/|font\/|landingPage\/|dashboard-images\/|favicon\.ico$|logo\.svg$|loader-logo\.svg$)/;

const SW_SOURCE = `
const STATIC_CACHE = ${JSON.stringify(STATIC_CACHE)};
const ASSET_CACHE = ${JSON.stringify(ASSET_CACHE)};
const CURRENT_CACHES = ${JSON.stringify(CURRENT_CACHES)};
const OFFLINE_URL = ${JSON.stringify(OFFLINE_URL)};
const PRECACHE_URLS = ${JSON.stringify(PRECACHE_URLS)};
const CACHEABLE_ASSET_PATTERN = ${CACHEABLE_ASSET_PATTERN.toString()};

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(names =>
        Promise.all(
          names
            .filter(name => !CURRENT_CACHES.includes(name))
            .map(name => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isSensitiveRequest(url) {
  return (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/og') ||
    url.origin !== self.location.origin
  );
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (isSensitiveRequest(url)) return;

  // Navigations: network-first, offline fallback on failure. Never cache the
  // response itself — pages can carry per-tenant/session data.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(OFFLINE_URL).then(res => res || Response.error())
      )
    );
    return;
  }

  // Static, non-sensitive assets: stale-while-revalidate.
  if (CACHEABLE_ASSET_PATTERN.test(url.pathname)) {
    event.respondWith(
      caches.open(ASSET_CACHE).then(cache =>
        cache.match(request).then(cached => {
          const network = fetch(request)
            .then(response => {
              if (response.ok) cache.put(request, response.clone());
              return response;
            })
            .catch(() => cached);
          return cached || network;
        })
      )
    );
  }
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
`;

export async function GET() {
  return new Response(SW_SOURCE, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      // Always revalidate so the browser's periodic SW update check sees
      // changes promptly instead of caching an old worker script.
      'Cache-Control': 'no-cache',
      'Service-Worker-Allowed': '/',
    },
  });
}
