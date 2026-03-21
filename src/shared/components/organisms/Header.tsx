'use client';

import { useState } from 'react';

import { User, useAuth } from '@/features/auth';
import { Button } from '@/shared/components/atoms/ui/button';
import { Menu, X } from 'lucide-react';

import Logo from '../atoms/Logo';
import MobileView from '../molecules/landing/MobileView';
import Navbar from '../molecules/landing/Navbar';
import ActionsButtons from './ActionsButtons';

export default function Header({ hasToken = false }: { hasToken?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  return (
    <header className="mx-auto flex w-full max-w-(--breakpoint-2xl) items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-8 lg:px-10 xl:px-12">
      <div className="shrink-0">
        <Logo />
      </div>

      <Navbar />

      <ActionsButtons user={user as User} hasToken={hasToken} />

      <div className="flex xl:hidden">
        <Button
          className="flex h-10 w-10 items-center justify-center p-0 md:h-11 md:w-11"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <X className="size-5 md:size-6" />
          ) : (
            <Menu className="size-5 md:size-6" />
          )}
        </Button>
      </div>

      <MobileView
        user={user as User}
        hasToken={hasToken}
        onClose={() => setIsMenuOpen(false)}
        open={isMenuOpen}
      />
    </header>
  );
}
