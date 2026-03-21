'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button } from '@/shared/components/atoms/ui/button';

import Header from '../../organisms/Header';

export default function HeroSection() {
  const t = useTranslations('landingPage.hero');
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="from-primary/40 dark:from-primary/20 absolute bottom-0 -z-10 h-[60%] w-full bg-gradient-to-t from-[40%] to-transparent"></div>

      <div className="relative z-50">
        <Header />
      </div>

      <div className="flex h-full items-center justify-center px-6">
        <div className="mx-auto mt-32 flex w-full flex-col items-center gap-8 text-center sm:mt-24 md:mt-20">
          <h1 className="text-3xl leading-tight font-bold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
            {t('title')}
            <span className="text-primary">{t('subTitle')}</span>
          </h1>

          <p className="text-base text-gray-600 sm:text-lg md:text-xl dark:text-gray-300">
            {t('description')}
          </p>

          <div className="mt-4 flex h-auto flex-col justify-center gap-4 sm:h-[70px] sm:flex-row">
            <Button className="bg-primary hover:bg-primary/90 rounded-full py-6 text-base font-medium text-white shadow-md transition sm:text-lg">
              <Link href={'/login'} className="px-10 py-6 sm:px-14">
                {t('button1')}
              </Link>
            </Button>
            <Button className="bg-primary hover:bg-primary/90 rounded-full px-10 py-6 text-base font-medium text-white shadow-md transition sm:px-14 sm:text-lg">
              {t('button2')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
