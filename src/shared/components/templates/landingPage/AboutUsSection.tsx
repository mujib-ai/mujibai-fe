'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

import { Container } from '@/shared/components/atoms/Container';

export default function AboutUsSection() {
  const t = useTranslations('landingPage.aboutUs');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <section
      className="relative z-50 w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/landingPage/about-us-bg-image.jpg')",
      }}
    >
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-white/60 dark:bg-black/50" />

      <Container className="py-4.25 md:py-8.5">
        <div className="mx-auto mt-4.5 flex w-full flex-col items-center justify-start gap-4 md:mt-9 md:gap-8">
          <div className="mx-auto flex w-full max-w-200 flex-col items-center justify-start gap-0.5 md:gap-1">
            <h2 className="text-center text-5xl font-bold">{t('title')}</h2>
            <p className="my-4 text-center text-base font-normal tracking-[0.2px] text-[#4E4E4E] transition-colors duration-300 ease-in-out md:text-lg md:leading-7.5 dark:text-[#E5E5E5]">
              {t('subTitle')}
            </p>
          </div>

          <div className="flex w-full flex-col items-center justify-between lg:flex-row">
            <div className="lg:w-2.5/12 mb-8 flex h-61.25 w-full items-center justify-center md:h-122.5 lg:mb-0">
              <div className="h-full w-full overflow-hidden rounded-lg">
                <Image
                  src="/landingPage/about-us-image.jpg"
                  alt="Mujib AI Story"
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:w-7.5/12 flex w-full flex-col items-start justify-start">
              <div className="flex w-full flex-col items-start justify-start gap-6 px-6 py-8 lg:px-12 lg:py-16">
                <h3
                  className={`${isRtl ? 'text-right' : 'text-left'} text-2xl leading-7.5 font-bold md:text-3xl md:leading-10`}
                >
                  {t('ourStory')}
                </h3>
                <p
                  className={`w-full text-base leading-relaxed font-normal tracking-[0.2px] text-[#4E4E4E] transition-colors duration-300 ease-in-out md:text-lg md:leading-7.5 dark:text-[#E5E5E5] ${isRtl ? 'text-right' : 'text-left'}`}
                >
                  {t('description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
