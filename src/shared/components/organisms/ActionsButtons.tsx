import { useState } from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import useAuth from '@/features/auth/hooks/useAuth';
import { Button } from '@/shared/components/atoms/ui/button';
import { User } from '@/shared/types';

import LanguageSwitcher from '../atoms/LanguageSwitcher';
import { ThemeSwitcher } from '../atoms/ThemeSwitcher';
import LogoutDailog from '../molecules/landing/dialogs/LogoutDailog';

export default function ActionsButtons({ user }: { user: User }) {
  const { handleLogout, logoutLoading } = useAuth();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const t = useTranslations('landingPage');

  const isClientOrAdmin = user?.role === 'CLIENT' || user?.role === 'ADMIN';
  const dashboardHref =
    user?.role === 'ADMIN' ? '/admin-dashboard' : '/dashboard';

  return (
    <div className="hidden items-center justify-center gap-1.5 xl:flex xl:gap-2.5">
      <ThemeSwitcher />
      <LanguageSwitcher />

      {!user && (
        <div className="flex gap-1.5 lg:gap-2 xl:gap-2.5">
          <Button
            className="h-9 rounded-full text-sm font-medium lg:h-10 xl:h-11 xl:text-base dark:text-white"
            variant="default"
          >
            <Link
              href="/login"
              className="px-4 py-2 lg:px-6 lg:py-2.5 xl:px-6 xl:py-3"
            >
              {t('header.getStarted')}
            </Link>
          </Button>
          <Button
            className="hover:text-primary border-primary text-primary dark:border-primary h-9 rounded-full border-2 text-sm font-bold hover:bg-transparent lg:h-10 xl:h-11 xl:text-base"
            variant="outline"
          >
            <Link
              href="/enroll"
              className="px-4 py-2 lg:px-6 lg:py-2.5 xl:px-6 xl:py-3"
            >
              {t('header.enroll')}
            </Link>
          </Button>
        </div>
      )}

      {isClientOrAdmin && (
        <div className="flex gap-1.5 lg:gap-2 xl:gap-2.5">
          <Button
            className="h-9 rounded-full text-sm font-medium lg:h-10 xl:h-11 xl:text-base dark:text-white"
            variant="default"
          >
            <Link
              href={dashboardHref}
              className="px-4 py-2 lg:px-6 lg:py-2.5 xl:px-6 xl:py-3"
            >
              {t('header.dashboard')}
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-9 rounded-full text-sm lg:h-10 xl:h-11 xl:text-base"
            onClick={() => setOpenLogoutDialog(true)}
          >
            <span className="px-4 lg:px-6 xl:px-6">{t('header.logout')}</span>
          </Button>
        </div>
      )}

      <LogoutDailog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
        onConfirm={handleLogout}
        loading={logoutLoading}
      />
    </div>
  );
}
