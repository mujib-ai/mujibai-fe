'use client';

import { useEffect, useState } from 'react';

import { User, useAuth } from '@/features/auth';
import { Container } from '@/shared/components/atoms/Container';
import { cn } from '@/shared/lib/utils';

import Logo from '../atoms/Logo';
import MobileNav from '../molecules/landing/MobileNav';
import Navbar from '../molecules/landing/Navbar';
import ActionsButtons from './ActionsButtons';

export default function Header({ hasToken = false }: { hasToken?: boolean }) {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        'sticky top-0 z-[90] w-full transition-colors duration-300',
        isScrolled &&
          'border-border/60 bg-background/70 border-b shadow-sm backdrop-blur-md'
      )}
    >
      <Container
        as="header"
        className="flex items-center justify-between py-4 sm:py-5"
      >
        <div className="shrink-0">
          <Logo />
        </div>

        <Navbar />

        <ActionsButtons user={user as User} hasToken={hasToken} />

        <MobileNav user={user as User} hasToken={hasToken} />
      </Container>
    </div>
  );
}
