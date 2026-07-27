'use client';

import { useTheme } from 'next-themes';

import Header from '../organisms/Header';
import Footer from '../templates/Footer';
import AboutUsSection from '../templates/landingPage/AboutUsSection';
import ContactUsSection from '../templates/landingPage/ContactUsSection';
import FeaturesSection from '../templates/landingPage/FeaturesSection';
import HeroSection from '../templates/landingPage/HeroSection';
import InteractiveExperienceSection from '../templates/landingPage/InteractiveExperienceSection';
import PricingSection from '../templates/landingPage/PricingSection';
import TargetedSectorsSection from '../templates/landingPage/TargetedSectorsSection';
import WhyChooseUs from '../templates/landingPage/WhyChooseUs';

export default function LandingPage({
  hasToken = false,
}: {
  hasToken?: boolean;
}) {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen w-full overflow-x-clip">
      <Header hasToken={hasToken} />
      <HeroSection />
      <InteractiveExperienceSection />
      <FeaturesSection />
      <TargetedSectorsSection />
      <WhyChooseUs />
      <PricingSection />
      <AboutUsSection />
      <ContactUsSection />
      <Footer theme={theme} />
    </main>
  );
}
