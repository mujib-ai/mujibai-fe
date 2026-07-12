import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import Logo from '@/shared/components/atoms/Logo';
import { Button } from '@/shared/components/atoms/ui/button';

import { DocsMobileNav } from './DocsMobileNav';
import { DocsSearch } from './DocsSearch';

export async function DocsHeader() {
  const t = await getTranslations('docs.common');

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 lg:px-8">
      <DocsMobileNav />

      <Logo />

      <nav className="hidden items-center gap-4 lg:flex">
        <Link
          href="/docs"
          className="text-sm font-medium text-foreground transition-colors hover:text-primary"
        >
          {t('docsLink')}
        </Link>
      </nav>

      <div className="ml-auto flex flex-1 items-center justify-end gap-2">
        <div className="w-auto sm:w-full sm:max-w-sm">
          <DocsSearch />
        </div>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="hidden sm:inline-flex"
        >
          <Link href="/dashboard">{t('dashboardLink')}</Link>
        </Button>
      </div>
    </header>
  );
}
