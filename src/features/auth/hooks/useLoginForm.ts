'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { setPendingTwoFactorLogin } from '../lib/pending-two-factor';
import { getAllowedRedirectFrom } from '../lib/redirect';
import {
  AuthService,
  isTwoFactorRequiredError,
} from '../services/auth.service';
import useAuth from './useAuth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const t = useTranslations('loginPage');
  const { handleLogin, loginLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = getAllowedRedirectFrom(searchParams.get('from'));

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const completeLogin = async (values: LoginFormData) => {
    try {
      await handleLogin(values);
      const destination = from ?? '/dashboard';

      let isTwoFactorEnabled = false;
      try {
        const me = await AuthService.checkAuth();
        isTwoFactorEnabled = me.data.isTwoFactorEnabled === true;
      } catch {
        // Best-effort status check; fall back to nudging the user.
      }

      reset();
      if (isTwoFactorEnabled) {
        router.push(destination);
      } else {
        router.push(`/security-check?from=${encodeURIComponent(destination)}`);
      }
    } catch (error) {
      if (isTwoFactorRequiredError(error)) {
        setPendingTwoFactorLogin(values, from ?? '/dashboard');
        router.push('/verify-2fa');
      }
    }
  };

  const getFieldProps = (fieldName: keyof LoginFormData) => ({
    register: register(fieldName),
    error: errors[fieldName]?.message,
  });

  const getTranslations = () => ({
    title: t('title'),
    email: t('email'),
    emailPlaceholder: t('emailPlaceholder'),
    password: t('password'),
    passwordPlaceholder: t('passwordPlaceholder'),
    forgotPassword: t('forgotPassword'),
    loginButton: t('loginButton'),
    loading: t('loading'),
  });

  return {
    handleSubmit,
    onSubmit: completeLogin,
    isLoading: isSubmitting || loginLoading,
    getFieldProps,
    getTranslations,
  };
}
