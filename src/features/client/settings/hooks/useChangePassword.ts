'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { SettingsService } from '../services/settings.service';
import type { ChangePasswordDto } from '../types';

export function useChangePassword() {
  const t = useTranslations('settings.accountSettings.toasts');

  const changePasswordMutation = useMutation({
    mutationFn: (dto: ChangePasswordDto) => SettingsService.changePassword(dto),
    onSuccess: () => {
      toast.success(t('passwordChanged'));
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || t('passwordChangeFailed');
      toast.error(errorMessage);
    },
  });

  return {
    changePassword: changePasswordMutation.mutateAsync,
    isChanging: changePasswordMutation.isPending,
  };
}
