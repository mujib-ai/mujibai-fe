import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/enroll', destination: '/register', permanent: true },
      { source: '/terms-of-services', destination: '/terms', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      {
        source: '/forget-password',
        destination: '/forgot-password',
        permanent: true,
      },
      {
        source: '/docs/authentication',
        destination: '/docs/api-authentication',
        permanent: true,
      },
      {
        source: '/docs/voice-agent-integration',
        destination: '/docs/voice-agent',
        permanent: true,
      },
      {
        source: '/dashboard/voice-script',
        destination: '/dashboard/knowledge-base',
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
export default withNextIntl(nextConfig);
