'use client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Container } from '@/shared/components/atoms/Container';
import { Button } from '@/shared/components/atoms/ui/button';

export default function WhyChooseUsSection() {
  const t = useTranslations('landingPage.whyChooseUs');
  const router = useRouter();
  const reasons = [
    {
      id: 1,
      title: t('propsOne.title'),
      description: t('propsOne.description'),
    },
    {
      id: 2,
      title: t('propsTwo.title'),
      description: t('propsTwo.description'),
    },
    {
      id: 3,
      title: t('propsThree.title'),
      description: t('propsThree.description'),
    },
    {
      id: 4,
      title: t('propsFour.title'),
      description: t('propsFour.description'),
    },
    {
      id: 5,
      title: t('propsFive.title'),
      description: t('propsFive.description'),
    },
  ];

  return (
    <section
      className="bg-background-dark relative w-full"
      style={{
        backgroundImage: "url('/landingPage/img_.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute top-0 left-0 z-10 h-full w-full bg-[#FFFFFFF5] py-20 dark:bg-black/30" />

      <Container className="relative z-50 py-[16px] md:py-[32px]">
        <div className="mx-auto flex w-full flex-col items-center justify-start gap-[16px] md:gap-[32px]">
          <div className="flex w-full flex-col items-center justify-start gap-3">
            <h2 className="text-center text-4xl leading-[50px] font-bold">
              {t('title')}
            </h2>
          </div>

          <div className="flex w-full flex-col items-start justify-start gap-[20px] md:gap-[40px]">
            <div className="mr-[5px] flex w-full flex-col items-start justify-start gap-[13px] md:mr-[10px] md:gap-[26px]">
              {reasons.map(reason => (
                <div
                  key={reason.id}
                  className="dark:border-primary flex w-full flex-col items-start justify-start gap-3 border-l-2 border-[#3B82F6] bg-[#06B6D426] px-[24px] py-[24px] dark:bg-[#ffffff1e]"
                >
                  <div>
                    <h3 className="text-3xl leading-[30px] font-bold">
                      {reason.title}
                    </h3>
                  </div>
                  <p className="w-full text-base leading-relaxed font-normal tracking-[0.2px] text-[#4E4E4E] transition-colors duration-300 ease-in-out md:text-lg md:leading-[30px] dark:text-[#E5E5E5]">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <Button
                onClick={() => router.push('/contact')}
                variant="default"
                size="lg"
                className="bg-primary rounded-full px-15 font-bold text-black dark:text-white"
              >
                {t('getStarted')}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
