'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { DOCS_NAV } from '@/features/docs/constants';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/atoms/ui/breadcrumb';
import { useTranslations } from 'next-intl';

export function DocsBreadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations('docs');
  const section = DOCS_NAV.find(section =>
    section.items.some(item => item.href === pathname)
  );
  const page = section?.items.find(item => item.href === pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/docs">{t('common.breadcrumbRoot')}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {section && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span>{t(`nav.sections.${section.key}`)}</span>
            </BreadcrumbItem>
          </>
        )}
        {page && page.href !== '/docs' && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t(`nav.items.${page.key}.title`)}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
