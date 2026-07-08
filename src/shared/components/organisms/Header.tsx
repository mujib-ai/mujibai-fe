'use client';

import { useState } from 'react';

import { User, useAuth } from '@/features/auth';
import { Container } from '@/shared/components/atoms/Container';
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
    <Container
      as="header"
      className="flex items-center justify-between py-4 sm:py-5"
    >
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
    </Container>
  );
}
