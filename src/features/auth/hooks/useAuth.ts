'use client';

import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { AuthService } from '../services/auth.service';
import type { LoginCredentials, ResetPasswordCredentials } from '../types';

/** API error response */
interface ApiErrorResponse {
  message?: string;
}

/** Alert state */
interface AlertState {
  type: 'success' | 'error' | null;
  title: string;
  description: string;
}

const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    return axiosError.response?.data?.message || defaultMessage;
  }
  return defaultMessage;
};

export default function useAuth() {
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState<AlertState>({
    type: null,
    title: '',
    description: '',
  });

  const showAlert = (
    type: 'success' | 'error',
    title: string,
    description: string
  ) => {
    setAlert({ type, title, description });
    setTimeout(
      () => setAlert({ type: null, title: '', description: '' }),
      5000
    );
  };

  const { data: authData, isLoading: userLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: AuthService.checkAuth,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const loginMutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      toast.success(data.message || 'Logged in successfully.');
    },
    onError: error => {
      const errorMessage = getErrorMessage(
        error,
        'Login failed - please try again'
      );
      toast.error(errorMessage);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      queryClient.clear();
      showAlert(
        'success',
        'Logout Successful',
        'You have been successfully logged out.'
      );
      setTimeout(() => window.location.reload(), 1500);
    },
    onError: error => {
      const errorMessage = getErrorMessage(
        error,
        'Logout failed - please try again'
      );
      showAlert('error', 'Logout Failed', errorMessage);
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: AuthService.forgotPassword,
    onSuccess: () => {
      showAlert(
        'success',
        'Email Sent',
        'Password reset instructions have been sent to your email address.'
      );
    },
    onError: error => {
      const errorMessage = getErrorMessage(
        error,
        'Failed to send password reset email'
      );
      showAlert('error', 'Request Failed', errorMessage);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: AuthService.resetPassword,
    onSuccess: () => {
      showAlert(
        'success',
        'Password Reset Successful',
        'Your password has been successfully reset. You can now login with your new password.'
      );
    },
    onError: error => {
      const errorMessage = getErrorMessage(
        error,
        'Password reset failed - please try again'
      );
      showAlert('error', 'Password Reset Failed', errorMessage);
    },
  });

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const data = await loginMutation.mutateAsync(credentials);
      return data;
    } catch {
      return null;
    }
  };

  const handleLogout = async () => {
    try {
      const data = await logoutMutation.mutateAsync();
      return data;
    } catch {
      return null;
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      const data = await forgotPasswordMutation.mutateAsync({ email });
      return data;
    } catch {
      return null;
    }
  };

  const handleResetPassword = async (credentials: ResetPasswordCredentials) => {
    try {
      const data = await resetPasswordMutation.mutateAsync(credentials);
      return data;
    } catch {
      return null;
    }
  };

  return {
    user: authData?.data,
    userLoading,
    loginLoading: loginMutation.isPending,
    logoutLoading: logoutMutation.isPending,
    loading:
      loginMutation.isPending ||
      logoutMutation.isPending ||
      forgotPasswordMutation.isPending ||
      resetPasswordMutation.isPending,
    alert,
    clearAlert: () => setAlert({ type: null, title: '', description: '' }),
    handleLogin,
    handleLogout,
    handleForgotPassword,
    handleResetPassword,
  };
}
