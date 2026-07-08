import { LegalPagePlaceholder } from '@/shared/components/templates/LegalPagePlaceholder';
import { PUBLIC_SEO_ROUTES } from '@/shared/seo';

const route = PUBLIC_SEO_ROUTES.find(item => item.key === 'helpCenter')!;

export function HelpCenterPage() {
  return (
    <LegalPagePlaceholder title={route.label} description={route.description} />
  );
}

export default HelpCenterPage;
