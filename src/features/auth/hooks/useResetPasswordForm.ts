'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import useAuth from './useAuth';

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof formSchema>;

interface UseResetPasswordFormProps {
  userId: string;
  token: string;
}

export function useResetPasswordForm({
  userId,
  token,
}: UseResetPasswordFormProps) {
  const t = useTranslations('resetPasswordPage');
  const router = useRouter();
  const { handleResetPassword, alert } = useAuth();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(formSchema),
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
    const res = await handleResetPassword({
      userId,
      token,
      newPassword: values.newPassword,
    });

    if (res) {
      router.push('/');
    }
  };

  const getFieldProps = (fieldName: keyof ResetPasswordFormData) => ({
    register: register(fieldName),
    error: errors[fieldName]?.message,
  });

  const getTranslations = () => ({
    title: t('title'),
    newPassword: t('newPassword'),
    confirmPassword: t('confirmPassword'),
    placeholder: t('placeholder'),
    submit: t('submit'),
    submitting: t('submitting'),
  });

  return {
    form,
    handleSubmit,
    onSubmit,
    isSubmitting,
    isValid,
    alert,
    getFieldProps,
    getTranslations,
  };
}
