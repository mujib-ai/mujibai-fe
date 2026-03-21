'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';

import Logo from '../atoms/Logo';

const Footer = ({ theme }: { theme: string }) => {
  const t = useTranslations('landingPage.footer');

  const quickLinks = [
    { href: '#about', label: t('quickLinks.aboutUs') },
    { href: '#features', label: t('quickLinks.features') },
    { href: '#why-us', label: t('quickLinks.whyUs') },
    { href: '#contact', label: t('quickLinks.contactUs') },
    { href: '#industries', label: t('quickLinks.industries') },
    { href: '#pricing', label: t('quickLinks.pricing') },
  ];

  const socialIcons = [
    { Icon: Facebook, label: 'Facebook' },
    { Icon: Instagram, label: 'Instagram' },
    { Icon: Twitter, label: 'Twitter' },
  ];

  const contactItems = [
    { Icon: Phone, text: t('contact.phone') },
    { Icon: Mail, text: t('contact.email') },
    {
      Icon: MapPin,
      text: t('contact.address'),
    },
  ];

  return (
    <footer className="bg-footer-background from-primary/40 dark:from-primary/40 via-primary/30 dark:via-primary/10 relative mt-[-4px] w-full bg-gradient-to-tl to-transparent/20">
      <div className="relative w-full">
        <div className="relative mx-auto w-full px-10">
          <div className="pt-[39px] pb-[35px] md:pt-[78px] md:pb-[70px]">
            <div className="mb-8 flex flex-col items-start justify-between gap-8 lg:mb-16 lg:flex-row lg:gap-0">
              {/* Left Section - Logo & Social */}
              <motion.div
                className="flex w-full flex-col gap-6 sm:w-[30%]"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <div className="flex flex-col gap-3">
                  <motion.div
                    className="flex items-center gap-[6px]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Logo />
                  </motion.div>
                  <motion.p
                    className="text-text-light text-left text-sm leading-[20px] font-normal md:text-lg md:leading-[27px]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {t('description')}
                  </motion.p>
                </div>

                {/* Social Media Section */}
                <motion.div
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="text-text-light text-left text-lg leading-[22px] font-semibold md:text-xl md:leading-[25px]">
                    {t('followUs')}
                  </h3>
                  <div className="flex items-center gap-[10px]">
                    <ul className="flex items-center justify-center gap-1">
                      {socialIcons.map(({ Icon, label }, index) => (
                        <motion.li
                          key={label}
                          className="cursor-pointer rounded-full bg-[#3B82F6]/20 p-2 transition-colors hover:bg-[#3B82F6]/40 dark:bg-white/20 dark:hover:bg-white/40"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: 0.5 + index * 0.1,
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                          }}
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon className="size-5 text-[#3B82F6] dark:text-white" />
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>

              {/* Center Section - Quick Links */}
              <motion.div
                className="flex w-full flex-col gap-[14px] lg:w-[20%] lg:self-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              >
                <motion.h3
                  className="text-text-light text-left text-lg leading-[22px] font-semibold md:text-xl md:leading-[25px]"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {t('quickLinks.title')}
                </motion.h3>
                <ul className="flex flex-col gap-[6px]">
                  {quickLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    >
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          className="text-text-light-muted hover:text-text-light text-left text-sm leading-normal font-medium transition-colors md:text-base"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Right Section - Contact */}
              <motion.div
                className="flex w-full flex-col items-start gap-4 sm:w-[30%] lg:flex-row lg:items-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
              >
                <div className="flex flex-col gap-3">
                  <motion.h3
                    className="text-xl font-bold"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {t('contact.title')}
                  </motion.h3>

                  <div className="flex flex-col gap-3">
                    {contactItems.map((item, index) => (
                      <motion.div
                        key={index}
                        className={`flex ${index === 2 ? 'items-start' : 'items-center'} gap-3`}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      >
                        <motion.div
                          className="cursor-pointer rounded-full bg-[#3B82F6]/20 p-2 transition-colors hover:bg-[#3B82F6]/40 dark:bg-white/20 dark:hover:bg-white/40"
                          whileHover={{ scale: 1.15, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <item.Icon className="size-5 text-[#3B82F6] dark:text-white" />
                        </motion.div>
                        {index === 2 ? (
                          <p className="w-[50%]">{item.text}</p>
                        ) : (
                          <span className="text-text-light-muted text-left text-sm leading-tight font-normal md:text-sm">
                            {item.text}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Section - Copyright */}
            <motion.div
              className="border-text-light border-opacity-20 flex flex-col items-center justify-between gap-4 border-t pt-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.p
                className="text-text-light-muted text-left text-xs leading-tight font-medium md:text-xs"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {t('copyright')}
              </motion.p>

              <motion.div
                className="flex items-center gap-8"
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.span
                  className="text-text-light-muted hover:text-text-light cursor-pointer text-left text-xs leading-tight font-medium transition-colors md:text-xs"
                  whileHover={{ x: 3 }}
                >
                  {t('termsOfUse')}
                </motion.span>
                <motion.a
                  href="#privacy"
                  className="text-text-light-muted hover:text-text-light text-left text-xs leading-tight font-medium transition-colors md:text-xs"
                  whileHover={{ x: 3 }}
                >
                  {t('privacyPolicy')}
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Flag Image */}
      <motion.div
        className="absolute top-[10%] right-10 h-[200px] w-[200px]"
        initial={{ opacity: 0, scale: 0.5, y: -30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        animate={{
          y: [0, -12, 0],
        }}
        style={{
          transition: 'all 4s ease-in-out infinite',
        }}
      >
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
      </motion.div>
    </footer>
  );
};

export default Footer;
