'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { DOCS_NAV } from '@/features/docs/constants';
import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';

type DocsNavProps = {
  onNavigate?: () => void;
  className?: string;
};

export function DocsNav({ onNavigate, className }: DocsNavProps) {
  const pathname = usePathname();
  const t = useTranslations('docs.nav');

  return (
    <nav className={cn('flex flex-col gap-6', className)}>
      {DOCS_NAV.map(section => (
        <div key={section.key}>
          <h4 className="mb-2 px-2 text-sm font-semibold text-foreground">
            {t(`sections.${section.key}`)}
          </h4>
          <ul className="flex flex-col gap-0.5">
            {section.items.map(item => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'block rounded-md px-2 py-1.5 text-sm transition-colors',
                      isActive
                        ? 'bg-primary/10 font-medium text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
                  >
                    {t(`items.${item.key}.title`)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
