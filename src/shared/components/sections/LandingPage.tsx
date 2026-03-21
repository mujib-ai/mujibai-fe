'use client';

import { useTheme } from 'next-themes';

import Footer from '../templates/Footer';
import AboutUsSection from '../templates/landingPage/AboutUsSection';
import ContactUsSection from '../templates/landingPage/ContactUsSection';
import FeaturesSection from '../templates/landingPage/FeaturesSection';
import HeroSection from '../templates/landingPage/HeroSection';
import PricingSection from '../templates/landingPage/PricingSection';
import TargetedSectorsSection from '../templates/landingPage/TargetedSectorsSection';
import WhyChooseUs from '../templates/landingPage/WhyChooseUs';

export default function LandingPage() {
  const { theme: currentTheme } = useTheme();
  return (
    <main className="h-screen w-full overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <TargetedSectorsSection theme={currentTheme || 'dark'} />
      <WhyChooseUs />
      <PricingSection />
      <AboutUsSection />
      <ContactUsSection />
      <Footer theme={currentTheme || 'dark'} />
    </main>
  );
}
