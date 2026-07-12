import type { DocNavItem, DocNavSection } from './types';

export const DOCS_ROOT = '/docs';

export const DOCS_NAV: DocNavSection[] = [
  {
    key: 'gettingStarted',
    items: [{ key: 'introduction', href: '/docs' }],
  },
  {
    key: 'authentication',
    items: [
      { key: 'secretKeys', href: '/docs/secret-keys' },
      { key: 'authentication', href: '/docs/authentication' },
    ],
  },
  {
    key: 'integrations',
    items: [
      {
        key: 'voiceAgentIntegration',
        href: '/docs/voice-agent-integration',
      },
    ],
  },
];

export const FLAT_DOCS_NAV: DocNavItem[] = DOCS_NAV.flatMap(
  section => section.items
);
