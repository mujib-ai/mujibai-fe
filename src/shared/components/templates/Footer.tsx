'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';

import { Container } from '../atoms/Container';
import Logo from '../atoms/Logo';

const Footer = ({ theme }: { theme?: string }) => {
  const t = useTranslations('landingPage.footer');

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

  return (
    <footer className="bg-footer-background from-primary/40 dark:from-primary/40 via-primary/30 dark:via-primary/10 relative mt-[-4px] w-full bg-gradient-to-tl to-transparent/20">
      <div className="relative w-full">
        <Container>
          <div className="pt-[39px] pb-[35px] md:pt-[78px] md:pb-[70px]">
            <div className="mb-8 flex flex-col items-start justify-between gap-8 lg:mb-16 lg:flex-row lg:gap-0">
              {/* Left Section - Logo & Social */}
              <div className="flex w-full flex-col gap-6 sm:w-[30%]">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-[6px]">
                    <Logo />
                  </div>
                  <p className="text-text-light text-left text-sm leading-[20px] font-normal md:text-lg md:leading-[27px]">
                    {t('description')}
                  </p>
                </div>

                {/* Social Media Section */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-text-light text-left text-lg leading-[22px] font-semibold md:text-xl md:leading-[25px]">
                    {t('followUs')}
                  </h3>
                  <div className="flex items-center gap-[10px]">
                    <ul className="flex items-center justify-center gap-1">
                      {socialIcons.map(({ Icon, label }) => (
                        <li
                          key={label}
                          className="cursor-pointer rounded-full bg-[#3B82F6]/20 p-2 transition-colors hover:bg-[#3B82F6]/40 dark:bg-white/20 dark:hover:bg-white/40"
                        >
                          <Icon className="size-5 text-[#3B82F6] dark:text-white" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Center Section - Quick Links */}
              <div className="flex w-full flex-col gap-[14px] lg:w-[20%] lg:self-center">
                <h3 className="text-text-light text-left text-lg leading-[22px] font-semibold md:text-xl md:leading-[25px]">
                  {t('quickLinks.title')}
                </h3>
                <ul className="flex flex-col gap-[6px]">
                  {quickLinks.map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-text-light-muted hover:text-text-light text-left text-sm leading-normal font-medium transition-colors md:text-base"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Section - Contact */}
              <div className="flex w-full flex-col items-start gap-4 sm:w-[30%] lg:flex-row lg:items-center">
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold">{t('contact.title')}</h3>

                  <div className="flex flex-col gap-3">
                    {contactItems.map((item, index) => (
                      <div
                        key={index}
                        className={`flex ${index === 2 ? 'items-start' : 'items-center'} gap-3`}
                      >
                        <div className="cursor-pointer rounded-full bg-[#3B82F6]/20 p-2 transition-colors hover:bg-[#3B82F6]/40 dark:bg-white/20 dark:hover:bg-white/40">
                          <item.Icon className="size-5 text-[#3B82F6] dark:text-white" />
                        </div>
                        {index === 2 ? (
                          <p className="w-[50%]">{item.text}</p>
                        ) : (
                          <span
                            dir={item.dir}
                            className="text-text-light-muted text-left text-sm leading-tight font-normal md:text-sm"
                          >
                            {item.text}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Copyright */}
            <div className="border-text-light border-opacity-20 flex flex-col items-center justify-between gap-4 border-t pt-4 sm:flex-row">
              <p className="text-text-light-muted text-left text-xs leading-tight font-medium md:text-xs">
                {t('copyright')}
              </p>

              <div className="flex items-center gap-8">
                {legalLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-text-light-muted hover:text-text-light text-left text-xs leading-tight font-medium transition-colors md:text-xs"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Floating Flag Image */}
      <div className="absolute top-[10%] right-10 h-[200px] w-[200px]">
        <Image
          src={
            theme === 'dark'
              ? '/landingPage/flag-logo-footer-dark.png'
              : '/landingPage/flag-logo-footer-light.png'
          }
          alt=""
          width={100}
          height={100}
          sizes="100vw,100vh"
          className="h-[200px] w-[200px] object-contain"
          style={{ height: 'auto' }}
          loading="lazy"
          suppressHydrationWarning
        />
      </div>
    </footer>
  );
};

export default Footer;
