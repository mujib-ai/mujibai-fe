'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import { FLAT_DOCS_NAV } from '@/features/docs/constants';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';
import { Input } from '@/shared/components/atoms/ui/input';
import { cn } from '@/shared/lib/utils';
import { FileText, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function DocsSearch() {
  const router = useRouter();
  const t = useTranslations('docs');
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  const entries = React.useMemo(
    () =>
      FLAT_DOCS_NAV.map(item => ({
        ...item,
        title: t(`nav.items.${item.key}.title`),
        description: t(`nav.items.${item.key}.description`),
      })),
    [t]
  );

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;

    return entries.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [entries, query]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="w-9 justify-start gap-2 px-0 text-muted-foreground sm:w-full sm:max-w-sm sm:px-3"
      >
        <Search className="mx-auto size-4 sm:mx-0" />
        <span className="hidden flex-1 text-left sm:inline">
          {t('common.searchPlaceholder')}
        </span>
        <kbd className="hidden rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
          {t('common.searchShortcut')}
        </kbd>
      </Button>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogTitle className="sr-only">
          {t('common.searchPlaceholder')}
        </DialogTitle>
        <div className="flex items-center gap-2 border-b px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Input
            autoFocus
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder={t('common.searchPlaceholder')}
            className="border-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              {t('common.noResults')}
            </li>
          )}
          {results.map(item => (
            <li key={item.href}>
              <button
                type="button"
                onClick={() => handleSelect(item.href)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent'
                )}
              >
                <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="flex flex-col">
                  <span className="font-medium text-foreground">
                    {item.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
