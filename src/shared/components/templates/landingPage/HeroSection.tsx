'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Container } from '@/shared/components/atoms/Container';
import { Button } from '@/shared/components/atoms/ui/button';

import Header from '../../organisms/Header';

export default function HeroSection({
  hasToken = false,
}: {
  hasToken?: boolean;
}) {
  const t = useTranslations('landingPage.hero');
  const router = useRouter();
  return (
    <section className="relative flex min-h-[70vh] w-full flex-col overflow-hidden sm:min-h-screen">
      <div className="from-primary/40 dark:from-primary/20 absolute bottom-0 -z-10 h-[60%] w-full bg-linear-to-t from-40% to-transparent"></div>

      <div className="relative z-50">
        <Header hasToken={hasToken} />
      </div>

      <div className="flex flex-1 items-center justify-center px-6">
        <Container className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-3xl leading-tight font-bold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
            {t('title')} <span className="text-primary">{t('subTitle')}</span>
          </h1>

          <p className="text-base text-gray-600 sm:text-lg md:text-xl dark:text-gray-300">
            {t('description')}
          </p>

          <div className="mt-4 flex h-auto flex-col justify-center gap-4 sm:h-17.5 sm:flex-row">
            <Button
              onClick={() => router.push('/contact')}
              className="bg-primary hover:bg-primary/90 rounded-full px-10 py-6 text-base font-medium text-white shadow-md transition sm:px-14 sm:text-lg"
            >
              {t('button1')}
            </Button>
            <Button className="bg-primary hover:bg-primary/90 rounded-full px-10 py-6 text-base font-medium text-white shadow-md transition sm:px-14 sm:text-lg">
              {t('button2')}
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
