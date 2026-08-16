'use client';

import type { ReactNode } from 'react';

import { useNotifications } from './hooks/useNotifications';

export function NotificationsRealtimeProvider({
  children,
}: {
  children: ReactNode;
}) {
  useNotifications({ realtime: true });
  return children;
}
