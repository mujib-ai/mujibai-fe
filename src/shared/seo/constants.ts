import type { SeoRoute } from './types';

export const SITE_NAME = 'mujibai';
export const SITE_CREATOR = 'mujibai';
export const SITE_PUBLISHER = 'mujibai';
export const DEFAULT_LOCALE = 'ar_SA';
export const DEFAULT_OG_IMAGE = '/loader-logo.svg';
export const SITE_EMAIL = 'tech@mujibai.net';

export const PUBLIC_SEO_ROUTES = [
  {
    key: 'home',
    path: '/',
    label: 'Home',
    title: 'mujibai - AI customer service agents for phone & web',
    description:
      'mujibai gives your business an AI customer service agent that answers phone calls and chats with website visitors, with easy landing page integration and no-code setup.',
    keywords: [
      'AI customer service',
      'AI phone agent',
      'AI call answering',
      'AI receptionist',
      'landing page AI chat integration',
      'mujibai',
    ],
    category: 'SoftwareApplication',
    priority: 1,
    changeFrequency: 'weekly',
    lastModified: '2026-06-27',
  },
  {
    key: 'helpCenter',
    path: '/help-center',
    label: 'Help Center',
    title: 'Help Center - mujibai',
    description:
      'Find guides and tutorials for setting up your AI customer service agent, connecting a phone number, and embedding mujibai on your landing page.',
    keywords: [
      'mujibai help center',
      'AI customer service support',
      'phone number setup guide',
      'landing page integration guide',
      'mujibai tutorials',
    ],
    category: 'Support',
    priority: 0.7,
    changeFrequency: 'weekly',
    lastModified: '2026-06-27',
  },
  {
    key: 'contactUs',
    path: '/contact-us',
    label: 'Contact',
    title: 'Contact us - mujibai',
    description:
      'Contact the mujibai team for sales, support, onboarding, and partnership questions about AI customer service.',
    keywords: [
      'contact mujibai',
      'mujibai sales',
      'mujibai support',
      'AI customer service software support',
      'business phone AI setup',
    ],
    category: 'Contact',
    priority: 0.6,
    changeFrequency: 'monthly',
    lastModified: '2026-06-27',
  },
  {
    key: 'privacyPolicy',
    path: '/privacy-policy',
    label: 'Privacy Policy',
    title: 'Privacy Policy - mujibai',
    description:
      'How mujibai collects, uses, and protects personal and call/chat data across the product and website.',
    keywords: [
      'mujibai privacy policy',
      'data protection',
      'personal data',
      'call recording privacy',
      'AI customer service privacy',
    ],
    category: 'Legal',
    priority: 0.4,
    changeFrequency: 'yearly',
    lastModified: '2026-04-26',
  },
  {
    key: 'termsOfService',
    path: '/terms-of-services',
    label: 'Terms of Service',
    title: 'Terms of Service - mujibai',
    description:
      'Terms for using mujibai, including accounts, phone number provisioning, acceptable use, subscriptions, and liability.',
    keywords: [
      'mujibai terms',
      'terms of service',
      'SaaS terms',
      'subscription terms',
      'acceptable use',
    ],
    category: 'Legal',
    priority: 0.4,
    changeFrequency: 'yearly',
    lastModified: '2026-04-26',
  },
  {
    key: 'refundPolicy',
    path: '/refund-policy',
    label: 'Refund Policy',
    title: 'Refund Policy - mujibai',
    description:
      "mujibai's refund policy, including eligibility, non-refundable cases, duplicate charges, and how refund requests are reviewed.",
    keywords: [
      'mujibai refund policy',
      'refund eligibility',
      'SaaS refund policy',
      'subscription refunds',
      'billing support',
    ],
    category: 'Legal',
    priority: 0.4,
    changeFrequency: 'yearly',
    lastModified: '2026-07-01',
  },
  {
    key: 'cancellationPolicy',
    path: '/cancellation-policy',
    label: 'Cancellation Policy',
    title: 'Cancellation Policy - mujibai',
    description:
      "mujibai's cancellation policy, including subscription cancellation, access after cancellation, automatic renewal, and data retention.",
    keywords: [
      'mujibai cancellation policy',
      'cancel subscription',
      'SaaS cancellation policy',
      'automatic renewal',
      'data retention',
    ],
    category: 'Legal',
    priority: 0.4,
    changeFrequency: 'yearly',
    lastModified: '2026-07-01',
  },
] as const satisfies readonly SeoRoute[];

export const DISALLOWED_ROUTES = ['/auth', '/dashboard'] as const;
