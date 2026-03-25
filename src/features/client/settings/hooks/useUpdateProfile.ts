'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { SettingsService } from '../services/settings.service';
import type { UpdateProfileDto } from '../types';

export function useUpdateProfile() {
  const t = useTranslations('settings.accountSettings.toasts');
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: (dto: UpdateProfileDto) => SettingsService.updateProfile(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenant-profile'] });
      toast.success(t('profileUpdated'));
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || t('profileUpdateFailed');
      toast.error(errorMessage);
    },
  });

  return {
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
  };
}
