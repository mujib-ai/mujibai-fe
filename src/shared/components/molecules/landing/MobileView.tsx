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
} from '@/shared/components/atoms/ui/sheet';
import { User } from '@/shared/types';
import { motion } from 'framer-motion';

import LogoutDailog from './dialogs/LogoutDailog';

export default function MobileView({
  open,
  onClose,
  user,
  hasToken = false,
}: {
  open: boolean;
  onClose: () => void;
  user: User;
  hasToken?: boolean;
}) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const t = useTranslations('landingPage');
  const { handleLogout, logoutLoading } = useAuth();
  const isAuthenticated = user || hasToken;
  const links = [
    { name: t('header.features'), href: '#features' },
    { name: t('header.whyUs'), href: '#why-us' },
    { name: t('header.pricing'), href: '#pricing' },
    { name: t('header.targetSector'), href: '#target-sector' },
    { name: t('header.contact'), href: '#contact' },
    { name: t('header.about'), href: '#about' },
  ];

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="top" className="bg-background p-6">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="mt-6 flex flex-col gap-4">
              {links.map(link => (
                <li key={link.name}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="text-foreground/90 hover:text-primary after:bg-primary relative block w-full text-lg transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                </li>
              ))}

              {isAuthenticated ? (
                <>
                  <li>
                    <SheetClose asChild>
                      <Button
                        variant="default"
                        className="w-full rounded-3xl px-9 py-6"
                      >
                        <Link
                          href="/dashboard"
                          onClick={onClose}
                          className="w-full"
                        >
                          {t('header.dashboard')}
                        </Link>
                      </Button>
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        className="w-full rounded-3xl px-9 py-6"
                        onClick={() => {
                          setIsLogoutDialogOpen(true);
                          onClose();
                        }}
                      >
                        {t('header.logout')}
                      </Button>
                    </SheetClose>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <SheetClose asChild>
                      <Button variant="default" className="w-full rounded-3xl">
                        <Link
                          href="/login"
                          onClick={onClose}
                          className="w-full px-9 py-6"
                        >
                          {t('header.getStarted')}
                        </Link>
                      </Button>
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        className="border-primary text-primary w-full rounded-3xl border-2 font-semibold"
                      >
                        <Link
                          href="/enroll"
                          onClick={onClose}
                          className="w-full px-9 py-6"
                        >
                          {t('header.enroll')}
                        </Link>
                      </Button>
                    </SheetClose>
                  </li>
                </>
              )}
              <li>
                <SheetClose asChild>
                  <LanguageSwitcher />
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <ThemeSwitcher />
                </SheetClose>
              </li>
            </ul>
          </motion.div>
        </SheetContent>
      </Sheet>
      <LogoutDailog
        open={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={handleLogout}
        loading={logoutLoading}
      />
    </>
  );
}
