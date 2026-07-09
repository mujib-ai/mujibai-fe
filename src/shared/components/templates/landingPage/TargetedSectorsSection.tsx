'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Container } from '@/shared/components/atoms/Container';
import {
  GraduationCap,
  HandHeart,
  HeartPulse,
  Plane,
  ShoppingCart,
} from 'lucide-react';

export default function SectorsSection() {
  const t = useTranslations('landingPage.targetedSectors');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const sectors = [
    {
      id: 1,
      icon: HeartPulse,
      title: t('sectorOne.title'),
      description: t('sectorOne.description'),
      isLarge: true,
    },
    {
      id: 2,
      icon: GraduationCap,
      title: t('sectorTwo.title'),
      description: t('sectorTwo.description'),
      isLarge: false,
    },
    {
      id: 3,
      icon: HandHeart,
      title: t('sectorThree.title'),
      description: t('sectorThree.description'),
      isLarge: false,
    },
    {
      id: 4,
      icon: Plane,
      title: t('sectorFour.title'),
      description: t('sectorFour.description'),
      isLarge: false,
    },
    {
      id: 5,
      icon: ShoppingCart,
      title: t('sectorFive.title'),
      description: t('sectorFive.description'),
      isLarge: false,
    },
  ];

  return (
    <section className="relative w-full bg-white dark:bg-[#001434]">
      <div className="absolute top-1/2 left-1/2 z-0 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/40 opacity-60 blur-[160px]" />

      <Container className="relative py-18">
        <div className="mx-auto flex w-full flex-col items-center justify-start gap-10">
          <div className="mx-auto flex w-full flex-col items-center justify-start gap-3">
            <h2 className="text-center text-[44px] leading-13.5 font-bold">
              {t('title')}
            </h2>
            <p className="w-full text-center text-base leading-relaxed font-normal tracking-[0.2px] text-[#4E4E4E] transition-colors duration-300 ease-in-out md:text-lg md:leading-7.5 dark:text-[#E5E5E5]">
              {t('subTitle')}
            </p>
          </div>

          <div className="flex w-full flex-col items-start justify-start gap-3.5 md:gap-7 lg:flex-row">
            <div className="h-full w-full lg:w-[32%]">
              <div className="flex w-full flex-col items-start justify-start rounded-xl border border-[#3FA9F5]/30 bg-[#06B6D40D] px-6 py-9 dark:bg-transparent">
                <div className="rounded-lg bg-white/5 p-3 px-7 dark:bg-[#06B6D40F]">
                  <HeartPulse
                    className="size-20 text-[#06B6D4]"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="mt-20 flex w-full flex-col items-start justify-start gap-1 md:gap-2">
                  <h3 className="text-left text-3xl leading-8.75 font-bold">
                    {t('sectorOne.title')}
                  </h3>
                  <p
                    className={`w-full py-3 text-base leading-relaxed font-normal tracking-[0.2px] text-[#4E4E4E] transition-colors duration-300 ease-in-out md:text-lg md:leading-7.5 dark:text-[#E5E5E5] ${isRtl ? 'text-right' : 'text-left'}`}
                  >
                    {t('sectorOne.description')}
                  </p>
                </div>
              </div>
            </div>

            <div className="ml-0 grid w-full grid-cols-1 gap-3.5 sm:grid-cols-2 md:ml-7 md:gap-7 lg:ml-3.5 lg:w-[68%]">
              {sectors?.slice(1)?.map(sector => (
                <div
                  key={sector?.id}
                  className="flex w-full flex-col items-start justify-start rounded-xl border border-[#3FA9F5]/30 bg-[#06B6D40D] px-5.5 py-9 dark:bg-transparent"
                >
                  <div className="rounded-lg bg-white/3 p-3 px-7">
                    <sector.icon
                      className="size-17 text-[#06B6D4]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="mt-1.5 flex w-full flex-col items-start justify-start md:mt-1.5">
                    <h3 className="text-right text-lg leading-6 font-bold md:text-2xl md:leading-7.5">
                      {sector?.title}
                    </h3>
                    <p
                      className={`w-full text-base leading-relaxed font-normal tracking-[0.2px] text-[#4E4E4E] transition-colors duration-300 ease-in-out md:text-lg md:leading-7.5 dark:text-[#E5E5E5] ${isRtl ? 'text-right' : 'text-left'}`}
                    >
                      {sector?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
