'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Container } from '@/shared/components/atoms/Container';

export default function AboutUsSection() {
  const t = useTranslations('landingPage.aboutUs');

  return (
    <section
      className="relative z-50 w-full"
      style={{
        backgroundImage: "url('/landingPage/about-us-bg-image.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-white/60 dark:bg-black/50" />

      <Container className="py-[17px] md:py-[34px]">
        <div className="mx-auto mt-[18px] flex w-full flex-col items-center justify-start gap-[16px] md:mt-[36px] md:gap-[32px]">
          <div className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-start gap-[2px] md:gap-[4px]">
            <h2 className="text-center text-5xl font-bold">{t('title')}</h2>
            <p className="my-4 text-center text-base font-normal tracking-[0.2px] text-[#4E4E4E] transition-colors duration-300 ease-in-out md:text-lg md:leading-[30px] dark:text-[#E5E5E5]">
              {t('subTitle')}
            </p>
          </div>

          <div className="flex w-full flex-col items-center justify-between lg:flex-row">
            {/* Image section */}
            <div className="mb-8 flex h-[245px] w-full items-center justify-center md:h-[490px] lg:mb-0 lg:w-[36%]">
              <div className="h-full w-full overflow-hidden rounded-lg shadow-2xl">
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

            {/* Content section */}
            <div className="flex w-full flex-col items-start justify-start lg:w-[64%]">
              <div className="flex w-full flex-col items-start justify-start gap-6 px-6 py-8 lg:px-12 lg:py-16">
                <h3 className="text-left text-2xl leading-[30px] font-bold md:text-3xl md:leading-[40px]">
                  {t('ourStory')}
                </h3>
                <p className="w-full text-left text-base leading-relaxed font-normal tracking-[0.2px] text-[#4E4E4E] transition-colors duration-300 ease-in-out md:text-lg md:leading-[30px] dark:text-[#E5E5E5]">
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
