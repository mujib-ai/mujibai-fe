'use client';

import { useLocale, useTranslations } from 'next-intl';

import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';

export function useFooter() {
  const t = useTranslations('landingPage.footer');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const quickLinks = [
    { href: '#about', label: t('quickLinks.aboutUs') },
    { href: '#features', label: t('quickLinks.features') },
    { href: '#why-us', label: t('quickLinks.whyUs') },
    { href: '/contact-us', label: t('quickLinks.contactUs') },
    { href: '#industries', label: t('quickLinks.industries') },
    { href: '#pricing', label: t('quickLinks.pricing') },
    { href: '/help-center', label: t('quickLinks.helpCenter') },
  ];

  const legalLinks = [
    { href: '/terms-of-services', label: t('termsOfUse') },
    { href: '/privacy-policy', label: t('privacyPolicy') },
    { href: '/cancellation-policy', label: t('cancellationPolicy') },
  ];

  const socialIcons = [
    { Icon: Facebook, label: 'Facebook' },
    { Icon: Instagram, label: 'Instagram' },
    { Icon: Twitter, label: 'Twitter' },
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
