'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function SectorsSection({ theme }: { theme: string }) {
  const t = useTranslations('landingPage.targetedSectors');
  const sectors = [
    {
      id: 1,
      icon: '/images/img_group_white_a700_74x86.svg',
      title: t('sectorOne.title'),
      description: t('sectorOne.description'),
      isLarge: true,
    },
    {
      id: 2,
      icon: '/images/img_group_white_a700_74x86.svg',
      title: t('sectorTwo.title'),
      description: t('sectorTwo.description'),
      isLarge: false,
    },
    {
      id: 3,
      icon: '/images/img_group_white_a700_74x86.svg',
      title: t('sectorThree.title'),
      description: t('sectorThree.description'),
      isLarge: false,
    },
    {
      id: 4,
      icon: '/images/img_group_white_a700_74x86.svg',
      title: t('sectorFour.title'),
      description: t('sectorFour.description'),
      isLarge: false,
    },
    {
      id: 5,
      icon: '/images/img_group_white_a700_74x86.svg',
      title: t('sectorFive.title'),
      description: t('sectorFive.description'),
      isLarge: false,
    },
  ];

  return (
    <section className="bg-background-dark relative w-full bg-white dark:bg-[#001434]">
      <div className="absolute top-1/2 left-1/2 z-0 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/40 opacity-60 blur-[160px]" />

      <div className="relative mx-auto w-full px-8 py-18">
        <div className="mx-auto flex w-full flex-col items-center justify-start gap-10">
          {/* Header section with animations */}
          <div className="mx-auto flex w-full max-w-[95%] flex-col items-center justify-start gap-3 px-15">
            <h2 className="text-center text-[44px] leading-[54px] font-bold">
              {t('title')}
            </h2>
            <p className="w-full text-center text-base leading-relaxed font-normal tracking-[0.2px] text-[#4E4E4E] transition-colors duration-300 ease-in-out md:text-lg md:leading-[30px] dark:text-[#E5E5E5]">
              {t('subTitle')}
            </p>
          </div>

          <div className="flex w-full flex-col items-start justify-start gap-[14px] md:gap-[28px] lg:flex-row">
            {/* Large featured card */}
            <div className="h-full w-full lg:w-[32%]">
              <div className="flex w-full flex-col items-start justify-start rounded-xl border border-[#3FA9F5]/30 bg-[#06B6D40D] px-6 py-9 dark:bg-transparent">
                <div className="rounded-lg bg-white/5 p-3 px-7 dark:bg-[#06B6D40F]">
                  <Image
                    src={
                      theme === 'dark'
                        ? '/landingPage/targeted-sector-image-one-dark.png'
                        : '/landingPage/targeted-sector-image-one-light.png'
                    }
                    alt={t('sectorOne.title')}
                    width={100}
                    height={100}
                    className="w-20"
                    style={{ height: 'auto' }}
                    loading="lazy"
                    suppressHydrationWarning
                  />
                </div>

                <div className="mt-20 flex w-full flex-col items-start justify-start gap-[4px] md:gap-[8px]">
                  <h3 className="text-left text-3xl leading-[35px] font-bold">
                    {t('sectorOne.title')}
                  </h3>
                  <p className="w-full py-3 text-left text-base leading-relaxed font-normal tracking-[0.2px] text-[#4E4E4E] transition-colors duration-300 ease-in-out md:text-lg md:leading-[30px] dark:text-[#E5E5E5]">
                    {t('sectorOne.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Grid of smaller cards */}
            <div className="ml-0 grid w-full grid-cols-1 gap-[14px] sm:grid-cols-2 md:ml-[28px] md:gap-[28px] lg:ml-[14px] lg:w-[68%]">
              {sectors?.slice(1)?.map((sector) => (
                <div
                  key={sector?.id}
                  className="flex w-full flex-col items-start justify-start rounded-xl border border-[#3FA9F5]/30 bg-[#06B6D40D] px-[22px] py-[36px] dark:bg-transparent"
                >
                  <div className="rounded-lg bg-white/3 p-3 px-7">
                    <Image
                      src={sector.icon}
                      alt={sector.title}
                      width={74}
                      height={86}
                      className="h-[86px] w-[74px]"
                      loading="lazy"
                      suppressHydrationWarning
                    />
                  </div>

                  <div className="mt-[6px] flex w-full flex-col items-start justify-start md:mt-[12px]">
                    <h3 className="text-left text-[12px] leading-[15px] font-bold md:text-[24px] md:leading-[30px]">
                      {sector?.title}
                    </h3>
                    <p className="w-full text-left text-base leading-relaxed font-normal tracking-[0.2px] text-[#4E4E4E] transition-colors duration-300 ease-in-out md:text-lg md:leading-[30px] dark:text-[#E5E5E5]">
                      {sector?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
