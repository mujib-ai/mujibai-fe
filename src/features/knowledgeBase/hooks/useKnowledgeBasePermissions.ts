'use client';

import useAuth from '@/features/auth/hooks/useAuth';
import { can as hasPermission } from '@/features/auth/lib/authorization';

export default function useKnowledgeBasePermissions() {
  const { user } = useAuth();

  function can(permission: string): boolean {
    return hasPermission(user, permission);
  }

  return { can };
}
