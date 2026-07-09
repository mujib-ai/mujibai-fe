'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { useAuth } from '@/features/auth';
import LanguageSwitcher from '@/shared/components/atoms/LanguageSwitcher';
import { ThemeSwitcher } from '@/shared/components/atoms/ThemeSwitcher';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/shared/components/atoms/ui/sheet';
import { useNavLinks } from '@/shared/hooks/useNavLinks';
import { User } from '@/shared/types';
import { Menu, X } from 'lucide-react';

import LogoutDailog from './dialogs/LogoutDailog';

export default function MobileNav({
  user,
  hasToken = false,
}: {
  user: User;
  hasToken?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const t = useTranslations('landingPage');
  const { handleLogout, logoutLoading } = useAuth();
  const links = useNavLinks();

  const isAuthenticated = user || hasToken;

  return (
    <div className="flex xl:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            className="flex h-10 w-10 items-center justify-center p-0 md:h-11 md:w-11"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? (
              <X className="size-5 md:size-6" />
            ) : (
              <Menu className="size-5 md:size-6" />
            )}
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="bg-background flex w-full flex-col gap-0 p-0 sm:max-w-sm"
        >
          <nav
            aria-label="Mobile"
            className="flex flex-1 flex-col overflow-y-auto px-4 pt-16 pb-4"
          >
            <ul className="flex flex-col gap-1">
              {links.map(link => (
                <li key={link.href}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      className="hover:bg-primary/10 hover:text-primary text-foreground block w-full rounded-lg px-4 py-3.5 text-base font-medium transition-colors"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 border-t pt-6">
              {isAuthenticated ? (
                <>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="default"
                      className="h-12 w-full rounded-full text-base"
                    >
                      <Link href="/dashboard">{t('header.dashboard')}</Link>
                    </Button>
                  </SheetClose>
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-full text-base"
                    onClick={() => {
                      setIsLogoutDialogOpen(true);
                      setOpen(false);
                    }}
                  >
                    {t('header.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="default"
                      className="h-12 w-full rounded-full text-base"
                    >
                      <Link href="/login">{t('header.getStarted')}</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="outline"
                      className="border-primary text-primary h-12 w-full rounded-full border-2 text-base font-semibold"
                    >
                      <Link href="/enroll">{t('header.enroll')}</Link>
                    </Button>
                  </SheetClose>
                </>
              )}
            </div>
          </nav>

          <div className="mt-auto flex items-center justify-between gap-3 border-t px-4 py-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </SheetContent>
      </Sheet>

      <LogoutDailog
        open={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={handleLogout}
        loading={logoutLoading}
      />
    </div>
  );
}
