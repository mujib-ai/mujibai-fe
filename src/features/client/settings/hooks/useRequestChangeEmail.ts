'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { SettingsService } from '../services/settings.service';
import type { ChangeEmailDto } from '../types';

export function useRequestChangeEmail() {
  const t = useTranslations('settings.accountSettings.toasts');

  const requestChangeEmailMutation = useMutation({
    mutationFn: (dto: ChangeEmailDto) => SettingsService.requestChangeEmail(dto),
    onSuccess: () => {
      toast.success(t('emailChangeRequestSent'));
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || t('emailChangeRequestFailed');
      toast.error(errorMessage);
    },
  });

  return {
    requestChangeEmail: requestChangeEmailMutation.mutateAsync,
    isRequesting: requestChangeEmailMutation.isPending,
  };
}
