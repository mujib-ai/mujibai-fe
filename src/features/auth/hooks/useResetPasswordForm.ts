'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import useAuth from './useAuth';

const createFormSchema = (t: (key: string) => string) =>
  z
    .object({
      newPassword: z
        .string()
        .min(1, t('passwordRequired'))
        .min(8, t('passwordTooShort'))
        .max(72, t('passwordTooLong'))
        .regex(/[A-Z]/, t('passwordUppercase'))
        .regex(/[a-z]/, t('passwordLowercase'))
        .regex(/[0-9]/, t('passwordDigit')),
      confirmPassword: z.string().min(1, t('confirmPasswordRequired')),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: t('passwordsMustMatch'),
      path: ['confirmPassword'],
    });

export type ResetPasswordFormData = z.infer<
  ReturnType<typeof createFormSchema>
>;

export function useResetPasswordForm({ token }: { token: string }) {
  const t = useTranslations('resetPasswordPage');
  const router = useRouter();
  const { handleResetPassword, alert } = useAuth();
  const tokenIsValid = token.length >= 16 && token.length <= 512;

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(createFormSchema(t)),
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = form;

  const onSubmit = async (values: ResetPasswordFormData) => {
    if (!tokenIsValid) return;

    const response = await handleResetPassword({
      token,
      newPassword: values.newPassword,
    });

    if (response) {
      toast.success(t('passwordResetSuccess'));
      router.replace('/login');
    }
  };

  const getFieldProps = (fieldName: keyof ResetPasswordFormData) => ({
    register: register(fieldName),
    error: errors[fieldName]?.message,
  });

  return {
    handleSubmit,
    onSubmit,
    isSubmitting,
    isValid: isValid && tokenIsValid,
    tokenIsValid,
    alert,
    getFieldProps,
    t,
  };
}
