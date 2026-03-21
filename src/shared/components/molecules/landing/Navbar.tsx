import { useTranslations } from 'next-intl';

export default function Navbar() {
  const handleSmoothScroll = (sectionId: string) => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };
  const t = useTranslations('landingPage');
  return (
    <nav>
      <ul className="hidden flex-row items-center justify-center gap-4 xl:flex xl:gap-6 2xl:gap-8">
        <li>
          <button
            onClick={() => handleSmoothScroll('features')}
            className="group relative cursor-pointer pb-1 text-sm transition-all duration-300 hover:bg-transparent lg:text-base"
          >
            {t('header.features')}
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
          </button>
        </li>

        <li>
          <button
            onClick={() => handleSmoothScroll('why-us')}
            className="group relative cursor-pointer pb-1 text-sm transition-all duration-300 hover:bg-transparent lg:text-base"
          >
            {t('header.whyUs')}
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
          </button>
        </li>

        <li>
          <button
            onClick={() => handleSmoothScroll('pricing')}
            className="group relative cursor-pointer pb-1 text-sm transition-all duration-300 hover:bg-transparent lg:text-base"
          >
            {t('header.pricing')}
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
          </button>
        </li>

        <li>
          <button
            onClick={() => handleSmoothScroll('targetSector')}
            className="group relative cursor-pointer pb-1 text-sm transition-all duration-300 hover:bg-transparent lg:text-base"
          >
            {t('header.targetSector')}
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
          </button>
        </li>

        <li>
          <button
            onClick={() => handleSmoothScroll('contact')}
            className="group relative cursor-pointer pb-1 text-sm transition-all duration-300 hover:bg-transparent lg:text-base"
          >
            {t('header.contact')}
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
          </button>
        </li>

        <li>
          <button
            onClick={() => handleSmoothScroll('about')}
            className="group relative cursor-pointer pb-1 text-sm transition-all duration-300 hover:bg-transparent lg:text-base"
          >
            {t('header.about')}
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
