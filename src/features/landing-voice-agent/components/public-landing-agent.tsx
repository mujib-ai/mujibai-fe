'use client';

import { usePathname } from 'next/navigation';

import { PUBLIC_LANDING_AGENT_ROUTES } from '../lib/constants';
import { LandingAgentTrigger } from './landing-agent-trigger';

export function PublicLandingAgent({ enabled = true }: { enabled?: boolean }) {
  const pathname = usePathname();
  const visible = PUBLIC_LANDING_AGENT_ROUTES.some(route =>
    route === '/'
      ? pathname === '/'
      : pathname === route || pathname.startsWith(`${route}/`)
  );
  if (!enabled || !visible) return null;
  return <LandingAgentTrigger />;
}
