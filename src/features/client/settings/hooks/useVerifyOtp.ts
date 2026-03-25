'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { SettingsService } from '../services/settings.service';
import type { VerifyOtpDto } from '../types';

export function useVerifyOtp() {
  const t = useTranslations('settings.accountSettings.toasts');
  const queryClient = useQueryClient();

  const verifyOtpMutation = useMutation({
    mutationFn: (dto: VerifyOtpDto) => SettingsService.verifyOtp(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenant-profile'] });
      toast.success(t('emailChanged'));
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || t('otpVerificationFailed');
      toast.error(errorMessage);
    },
  });

  return {
    verifyOtp: verifyOtpMutation.mutateAsync,
    isVerifying: verifyOtpMutation.isPending,
  };
}
