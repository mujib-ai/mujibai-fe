import dynamic from 'next/dynamic';

import Header from '../organisms/Header';
import HeroSection from '../templates/landingPage/HeroSection';
import InteractiveExperienceSection from '../templates/landingPage/InteractiveExperienceSection';

const sectionFallback = <div className="h-125 w-full" aria-hidden="true" />;

const FeaturesSection = dynamic(
  () => import('../templates/landingPage/FeaturesSection'),
  { loading: () => sectionFallback }
);
const TargetedSectorsSection = dynamic(
  () => import('../templates/landingPage/TargetedSectorsSection'),
  { loading: () => sectionFallback }
);
const WhyChooseUs = dynamic(
  () => import('../templates/landingPage/WhyChooseUs'),
  { loading: () => sectionFallback }
);
const PricingSection = dynamic(
  () => import('../templates/landingPage/PricingSection'),
  { loading: () => sectionFallback }
);
const AboutUsSection = dynamic(
  () => import('../templates/landingPage/AboutUsSection'),
  { loading: () => sectionFallback }
);
const ContactUsSection = dynamic(
  () => import('../templates/landingPage/ContactUsSection'),
  { loading: () => sectionFallback }
);
const Footer = dynamic(() => import('../templates/Footer'), {
  loading: () => <div className="h-100 w-full" aria-hidden="true" />,
});

export default function LandingPage({
  hasToken = false,
}: {
  hasToken?: boolean;
}) {
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
      <Footer />
    </main>
  );
}
