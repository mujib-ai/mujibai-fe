'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import useAuth from './useAuth';

const ALLOWED_REDIRECT_PREFIXES = ['/dashboard', '/admin-dashboard'];

function getAllowedRedirectFrom(from: string | null): string | null {
  if (!from || typeof from !== 'string') return null;
  const path = from.startsWith('/') ? from : `/${from}`;
  const isAllowed = ALLOWED_REDIRECT_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  );
  return isAllowed ? path : null;
}

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const t = useTranslations('loginPage');
  const { alert, handleLogin, loginLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = getAllowedRedirectFrom(searchParams.get('from'));

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

  const onSubmit = async (values: LoginFormData) => {
    const response = await handleLogin(values);
    if (response) {
      reset();
      router.push(from ?? '/');
    }
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
  });

  return {
    form,
    handleSubmit,
    onSubmit,
    isLoading,
    alert,
    getFieldProps,
    getTranslations,
  };
}
