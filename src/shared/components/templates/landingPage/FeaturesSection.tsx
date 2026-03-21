import { useTranslations } from 'next-intl';

import FeatureCard from '@/shared/components/molecules/FeatureCard';

const featureHumanDark = '/landingPage/feature-human-dark.png';
const featureHumanLight = '/landingPage/feature-human-light.png';
const handSystemDark = '/landingPage/hand-system-dark.png';
const handSystemLight = '/landingPage/hand-system-light.png';
const phoneAnalysisDark = '/landingPage/phone-analyis-dark.png';
const phoneAnalysisLight = '/landingPage/phone-analyis-light.png';

export default function FeaturesSection() {
  const t = useTranslations('landingPage.features');

  const featuresData = [
    {
      id: 1,
      title: t('featureOne.title'),
      description: t('featureOne.description'),
      image: featureHumanLight,
      imageDark: featureHumanDark,
    },
    {
      id: 2,
      title: t('featureTwo.title'),
      description: t('featureTwo.description'),
      image: handSystemLight,
      imageDark: handSystemDark,
    },
    {
      id: 3,
      title: t('featureThree.title'),
      description: t('featureThree.description'),
      image: phoneAnalysisLight,
      imageDark: phoneAnalysisDark,
    },
    {
      id: 4,
      title: t('featureFour.title'),
      description: t('featureFour.description'),
      image: featureHumanLight,
      imageDark: featureHumanDark,
    },
    {
      id: 5,
      title: t('featureFive.title'),
      description: t('featureFive.description'),
      image: featureHumanLight,
      imageDark: featureHumanDark,
    },
    {
      id: 6,
      title: t('featureSix.title'),
      description: t('featureSix.description'),
      image: featureHumanLight,
      imageDark: featureHumanDark,
    },
  ];

  return (
    <section className="relative py-10">
      <div className="my-10 flex flex-col items-center justify-center gap-3 text-center">
        <h1 className="text-4xl leading-tight font-bold text-gray-900 dark:text-white">
          {t('title')}
        </h1>
        <p className="max-w-[700px] text-base text-gray-600 dark:text-gray-300">
          {t('description')}
        </p>
      </div>

      <div className="relative">
        <div className="absolute top-1/2 left-1/2 z-0 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/40 opacity-60 blur-[160px]"></div>
        <div className="z-50 mx-auto grid max-w-[80%] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map(feature => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              imageDark={feature.imageDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
