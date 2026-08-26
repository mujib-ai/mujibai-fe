'use client';

import { useTranslations } from 'next-intl';

import { AuthService } from '@/features/auth/services/auth.service';
import type { AuthResponse } from '@/features/auth/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getTwoFactorErrorTranslationKey } from '../lib/two-factor-error';
import { TwoFactorService } from '../services/two-factor.service';

const AUTH_QUERY_KEY = ['auth'];

function setTwoFactorStatus(
  queryClient: ReturnType<typeof useQueryClient>,
  isTwoFactorEnabled: boolean
) {
  queryClient.setQueryData<AuthResponse>(AUTH_QUERY_KEY, current =>
    current
      ? { ...current, data: { ...current.data, isTwoFactorEnabled } }
      : current
  );
}

export function useTwoFactorStatus() {
  const { data, isLoading } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: AuthService.checkAuth,
  });

  return { enabled: data?.data.isTwoFactorEnabled ?? false, isLoading };
}

export function useTwoFactor() {
  const queryClient = useQueryClient();
  const t = useTranslations('security.twoFactor');

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
  };

  const startSetupMutation = useMutation({
    mutationFn: TwoFactorService.startSetup,
    onError: error => {
      toast.error(
        t(getTwoFactorErrorTranslationKey(error, 'errors.setupFailed'))
      );
    },
  });

  const verifySetupMutation = useMutation({
    mutationFn: TwoFactorService.enable,
    onSuccess: result => {
      setTwoFactorStatus(queryClient, result.isTwoFactorEnabled);
      invalidate();
    },
  });

  const disableMutation = useMutation({
    mutationFn: TwoFactorService.disable,
    onSuccess: result => {
      setTwoFactorStatus(queryClient, result.isTwoFactorEnabled);
      toast.success(t('disableDialog.success'));
      invalidate();
    },
  });

  return {
    startSetup: startSetupMutation.mutateAsync,
    startSetupLoading: startSetupMutation.isPending,
    verifySetup: verifySetupMutation.mutateAsync,
    verifySetupLoading: verifySetupMutation.isPending,
    disable: disableMutation.mutateAsync,
    disableLoading: disableMutation.isPending,
  };
}
