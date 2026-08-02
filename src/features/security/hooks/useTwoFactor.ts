'use client';

import { AuthService } from '@/features/auth/services/auth.service';
import type { AuthResponse } from '@/features/auth/types';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
  };

  const startSetupMutation = useMutation({
    mutationFn: TwoFactorService.startSetup,
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to start 2FA setup'));
    },
  });

  const verifySetupMutation = useMutation({
    mutationFn: TwoFactorService.enable,
    onSuccess: result => {
      setTwoFactorStatus(queryClient, result.isTwoFactorEnabled);
      invalidate();
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Invalid verification code'));
    },
  });

  const disableMutation = useMutation({
    mutationFn: TwoFactorService.disable,
    onSuccess: result => {
      setTwoFactorStatus(queryClient, result.isTwoFactorEnabled);
      toast.success('Two-factor authentication disabled.');
      invalidate();
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to disable 2FA'));
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
