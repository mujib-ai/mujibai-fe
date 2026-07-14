'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export function useFooter() {
  const t = useTranslations('landingPage.footer');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const quickLinks = [
    { href: '#about', label: t('quickLinks.aboutUs') },
    { href: '#features', label: t('quickLinks.features') },
    { href: '#why-us', label: t('quickLinks.whyUs') },
    { href: '/contact', label: t('quickLinks.contactUs') },
    { href: '#industries', label: t('quickLinks.industries') },
    { href: '#pricing', label: t('quickLinks.pricing') },
    { href: '/help-center', label: t('quickLinks.helpCenter') },
  ];

  const legalLinks = [
    { href: '/terms', label: t('termsOfUse') },
    { href: '/privacy', label: t('privacyPolicy') },
    { href: '/cancellation-policy', label: t('cancellationPolicy') },
  ];

  const socialIcons = [
    {
      Icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/%D9%85%D8%AC%D9%8A%D8%A8-ai/',
    },
  ];

  const contactItems = [
    { Icon: Phone, text: t('contact.phone'), dir: 'ltr' as const },
    { Icon: Mail, text: t('contact.email'), dir: 'ltr' as const },
    {
      Icon: MapPin,
      text: t('contact.address'),
    },
  ];

  return {
    t,
    isRtl,
    quickLinks,
    legalLinks,
    socialIcons,
    contactItems,
  };
}
