'use client';

import * as React from 'react';

import Logo from '@/shared/components/atoms/Logo';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/atoms/ui/sheet';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { DocsNav } from './DocsNav';

export function DocsMobileNav() {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations('docs.common');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={t('openNav')}
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-70 p-0 sm:max-w-xs">
        <div className="border-b px-4 py-3">
          <SheetTitle asChild>
            <Logo />
          </SheetTitle>
        </div>
        <div className="thin-scrollbar flex-1 overflow-y-auto px-4 py-4">
          <DocsNav onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
