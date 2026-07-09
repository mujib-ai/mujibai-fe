import { useTranslations } from 'next-intl';

export type NavLink = {
  name: string;
  href: string;
};

export function useNavLinks(): NavLink[] {
  const t = useTranslations('landingPage');

  return [
    { name: t('header.features'), href: '#features' },
    { name: t('header.whyUs'), href: '#why-us' },
    { name: t('header.pricing'), href: '#pricing' },
    { name: t('header.targetSector'), href: '#target-sector' },
    { name: t('header.contact'), href: '#contact' },
    { name: t('header.about'), href: '#about' },
  ];
}
