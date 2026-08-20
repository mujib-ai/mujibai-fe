import { useTranslations } from 'next-intl';

import { Container } from '@/shared/components/atoms/Container';
import { Reveal } from '@/shared/components/atoms/Reveal';
import FeatureCard from '@/shared/components/molecules/FeatureCard';
import {
  AudioLines,
  ChartNoAxesCombined,
  Cloud,
  LayoutDashboard,
  PlugZap,
  TicketPlus,
} from 'lucide-react';

export default function FeaturesSection() {
  const t = useTranslations('landingPage.features');

  const featuresData = [
    {
      id: 1,
      title: t('featureOne.title'),
      description: t('featureOne.description'),
      icon: AudioLines,
    },
    {
      id: 2,
      title: t('featureTwo.title'),
      description: t('featureTwo.description'),
      icon: ChartNoAxesCombined,
    },
    {
      id: 3,
      title: t('featureThree.title'),
      description: t('featureThree.description'),
      icon: TicketPlus,
    },
    {
      id: 4,
      title: t('featureFour.title'),
      description: t('featureFour.description'),
      icon: LayoutDashboard,
    },
    {
      id: 5,
      title: t('featureFive.title'),
      description: t('featureFive.description'),
      icon: PlugZap,
    },
    {
      id: 6,
      title: t('featureSix.title'),
      description: t('featureSix.description'),
      icon: Cloud,
    },
  ];

  return (
    <section className="relative py-10">
      <Container className="my-10 flex flex-col items-center justify-center gap-3 text-center">
        <Reveal>
          <h1 className="dark: text-4xl leading-tight font-bold text-gray-900">
            {t('title')}
          </h1>
          <p className="max-w-[700px] text-base text-gray-600 dark:text-gray-300">
            {t('description')}
          </p>
        </Reveal>
      </Container>

      <div className="relative">
        <div className="absolute top-1/2 left-1/2 z-0 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/40 opacity-60 blur-[160px]"></div>
        <Container className="z-50">
          <Reveal
            stagger={0.08}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {featuresData.map(feature => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
