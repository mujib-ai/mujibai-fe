'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { getAllowedRedirectFrom } from '../lib/redirect';
import { isTwoFactorRequiredError } from '../services/auth.service';
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
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const completeLogin = async (values: LoginFormData, code?: string) => {
    try {
      const response = await handleLogin({ ...values, code });
      reset();
      const destination = from ?? '/';
      if (!response.data.tenant.isTwoFactorEnabled) {
        router.push(`/security-check?from=${encodeURIComponent(destination)}`);
        return;
      }
      router.push(destination);
    } catch (error) {
      if (!code && isTwoFactorRequiredError(error)) {
        setRequiresTwoFactor(true);
        setTwoFactorCode('');
        return;
      }
      if (code) setTwoFactorCode('');
    }
  };

  const onSubmit = (values: LoginFormData) => completeLogin(values);

  const onTwoFactorSubmit = () => {
    if (twoFactorCode.length !== 6) return;
    return completeLogin(form.getValues(), twoFactorCode);
  };

  const returnToCredentials = () => {
    setRequiresTwoFactor(false);
    setTwoFactorCode('');
  };

  const isLoading = isSubmitting || loginLoading;

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
    twoFactorTitle: t('twoFactorTitle'),
    twoFactorDescription: t('twoFactorDescription'),
    verifyCode: t('verifyCode'),
    backToLogin: t('backToLogin'),
  });

  return {
    form,
    handleSubmit,
    onSubmit,
    isLoading,
    getFieldProps,
    getTranslations,
    requiresTwoFactor,
    twoFactorCode,
    setTwoFactorCode,
    onTwoFactorSubmit,
    returnToCredentials,
  };
}
