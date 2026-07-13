'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FLAT_DOCS_NAV } from '@/features/docs/constants';
import { ThemedIcon } from '@/shared/components/atoms/ThemedIcon';
import { cn } from '@/shared/lib/utils';

export function DocsPager() {
  const pathname = usePathname();
  const t = useTranslations('docs');
  const index = FLAT_DOCS_NAV.findIndex(item => item.href === pathname);

  if (index === -1) return null;

  const prev = FLAT_DOCS_NAV[index - 1];
  const next = FLAT_DOCS_NAV[index + 1];

  if (!prev && !next) return null;

  return (
    <nav className="mt-10 flex items-center justify-between gap-4 border-t pt-6">
      {prev ? (
        <Link
          href={prev.href}
          className={cn(
            'group hover:border-primary/40 hover:bg-accent flex flex-1 flex-col items-start gap-1 rounded-lg border p-3 text-sm transition-colors'
          )}
        >
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            <ThemedIcon name="arrow-left" size={14} className="size-3.5" />
            {t('common.previous')}
          </span>
          <span className="text-foreground group-hover:text-primary font-medium">
            {t(`nav.items.${prev.key}.title`)}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.href}
          className={cn(
            'group hover:border-primary/40 hover:bg-accent flex flex-1 flex-col items-end gap-1 rounded-lg border p-3 text-right text-sm transition-colors'
          )}
        >
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            {t('common.next')}
            <ThemedIcon name="arrow-right" size={14} className="size-3.5" />
          </span>
          <span className="text-foreground group-hover:text-primary font-medium">
            {t(`nav.items.${next.key}.title`)}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
