'use client';

import type { AuthResponse } from '@/features/auth/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  type TenantPreferencesUpdate,
  TenantSettingsService,
} from '../services/tenant-settings.service';

export function useTenantPreferences() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (preferences: TenantPreferencesUpdate) =>
      TenantSettingsService.updatePreferences(preferences),
    onSuccess: preferences => {
      queryClient.setQueryData<AuthResponse>(['auth'], current =>
        current
          ? { ...current, data: { ...current.data, ...preferences } }
          : current
      );
    },
  });

  return {
    updatePreferences: mutation.mutateAsync,
    isUpdating: mutation.isPending,
  };
}
