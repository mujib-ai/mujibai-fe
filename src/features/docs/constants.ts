import type { DocNavItem, DocNavSection } from './types';

export const DOCS_ROOT = '/docs';

export const DOCS_NAV: DocNavSection[] = [
  {
    key: 'gettingStarted',
    items: [
      { key: 'introduction', href: '/docs' },
      { key: 'gettingStarted', href: '/docs/getting-started' },
    ],
  },
  {
    key: 'authentication',
    items: [
      { key: 'secretKeys', href: '/docs/secret-keys' },
      { key: 'authentication', href: '/docs/api-authentication' },
    ],
  },
  {
    key: 'integrations',
    items: [
      {
        key: 'voiceAgentIntegration',
        href: '/docs/voice-agent',
      },
      { key: 'webhooks', href: '/docs/webhooks' },
      { key: 'integrations', href: '/docs/integrations' },
    ],
  },
];

export const FLAT_DOCS_NAV: DocNavItem[] = DOCS_NAV.flatMap(
  section => section.items
);
