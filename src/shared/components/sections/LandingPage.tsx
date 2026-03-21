'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import Footer from '../templates/Footer';
import AboutUsSection from '../templates/landingPage/AboutUsSection';
import ContactUsSection from '../templates/landingPage/ContactUsSection';
import FeaturesSection from '../templates/landingPage/FeaturesSection';
import HeroSection from '../templates/landingPage/HeroSection';
import PricingSection from '../templates/landingPage/PricingSection';
import TargetedSectorsSection from '../templates/landingPage/TargetedSectorsSection';
import WhyChooseUs from '../templates/landingPage/WhyChooseUs';

export default function LandingPage({
  hasToken = false,
}: {
  hasToken?: boolean;
}) {
  const { theme: currentTheme } = useTheme();
  const [themeReady, setThemeReady] = useState(false);

  // Don't render landing content until theme is resolved (same gate as ThemeSwitcher)
  useEffect(() => setThemeReady(true), []);

  if (!themeReady) return null;

  return (
    <main className="h-screen w-full overflow-x-hidden">
      <HeroSection hasToken={hasToken} />
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
