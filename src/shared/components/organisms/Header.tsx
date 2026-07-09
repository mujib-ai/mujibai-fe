'use client';

import { User, useAuth } from '@/features/auth';
import { Container } from '@/shared/components/atoms/Container';

import Logo from '../atoms/Logo';
import MobileNav from '../molecules/landing/MobileNav';
import Navbar from '../molecules/landing/Navbar';
import ActionsButtons from './ActionsButtons';

export default function Header({ hasToken = false }: { hasToken?: boolean }) {
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

      <MobileNav user={user as User} hasToken={hasToken} />
    </Container>
  );
}
