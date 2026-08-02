'use client';

import useAuth from '@/features/auth/hooks/useAuth';

export default function useKnowledgeBasePermissions() {
  const { user } = useAuth();

  function can(): boolean {
    return !!user;
  }

  return { can };
}
