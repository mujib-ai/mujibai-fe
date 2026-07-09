'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useFooter } from '@/shared/hooks/useFooter';

import { Container } from '../atoms/Container';
import Logo from '../atoms/Logo';
import { Separator } from '../atoms/ui/separator';

const Footer = ({ theme }: { theme?: string }) => {
  const { t, isRtl, quickLinks, legalLinks, socialIcons, contactItems } =
    useFooter();

  return (
    <footer
      className={`bg-footer-background from-primary/40 via-primary/30 dark:from-primary/40 dark:via-primary/10 relative -mt-1 w-full to-transparent/20 ${isRtl ? 'bg-linear-to-tr' : 'bg-linear-to-tl'}`}
    >
      <div className="relative w-full">
        <Container>
          <div className="pt-9.75 pb-[35px] md:pt-[78px] md:pb-[70px]">
            <div className="mb-8 flex flex-col items-start justify-between gap-8 lg:mb-16 lg:flex-row lg:gap-0">
              <div className="flex w-full flex-col gap-6 sm:w-[30%]">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1.5">
                    <Logo />
                  </div>
                  <p
                    className={`${isRtl ? 'text-right' : 'text-left'} text-sm leading-5 font-normal md:text-lg md:leading-6.75`}
                  >
                    {t('description')}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3
                    className={`${isRtl ? 'text-right' : 'text-left'} text-lg leading-5.5 font-semibold md:text-xl md:leading-6.25`}
                  >
                    {t('followUs')}
                  </h3>
                  <div className="flex items-center gap-2.5">
                    <ul className="flex items-center justify-center gap-1">
                      {socialIcons.map(({ Icon, label, href }) => (
                        <li
                          key={label}
                          className="rounded-full bg-[#3B82F6]/20 p-2 transition-colors hover:bg-[#3B82F6]/40 dark:bg-white/20 dark:hover:bg-white/40"
                        >
                          {href ? (
                            <Link
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={label}
                            >
                              <Icon className="size-5 text-[#3B82F6] dark:text-white" />
                            </Link>
                          ) : (
                            <Icon className="size-5 cursor-pointer text-[#3B82F6] dark:text-white" />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-3.5 lg:w-[20%] lg:self-center">
                <h3
                  className={`${isRtl ? 'text-right' : 'text-left'} text-lg leading-5.5 font-semibold md:text-xl md:leading-6.25`}
                >
                  {t('quickLinks.title')}
                </h3>
                <ul className="flex flex-col gap-1.5">
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
            <Separator className="bg-foreground/15" />

            <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
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

      <div
        className={`absolute top-[10%] h-50 w-50 ${isRtl ? 'left-10' : 'right-10'}`}
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
          className="h-50 w-50 object-contain"
          style={{ height: 'auto' }}
          loading="lazy"
          suppressHydrationWarning
        />
      </div>
    </footer>
  );
};

export default Footer;
