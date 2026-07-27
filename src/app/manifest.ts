import type { MetadataRoute } from 'next';

import { SITE_NAME } from '@/shared/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} - AI Customer Service Agents`,
    short_name: SITE_NAME,
    description:
      'mujibai gives your business an AI customer service agent that answers phone calls and chats with website visitors.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#001434',
    theme_color: '#06B6D4',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
