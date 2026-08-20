'use client';

import { useTranslations } from 'next-intl';

import { AuthService } from '@/features/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

interface ValidationErrorItem {
  loc: (string | number)[];
  msg: string;
}

interface ChangePasswordErrorResponse {
  detail?: string | ValidationErrorItem[];
}

const createFormSchema = (t: (key: string) => string) =>
  z
    .object({
      currentPassword: z.string().min(1, t('currentPasswordRequired')),
      newPassword: z
        .string()
        .min(1, t('passwordRequired'))
        .min(8, t('passwordTooShort'))
        .max(72, t('passwordTooLong'))
        .regex(/[A-Z]/, t('passwordUppercase'))
        .regex(/[a-z]/, t('passwordLowercase'))
        .regex(/[0-9]/, t('passwordDigit')),
      confirmNewPassword: z.string().min(1, t('confirmPasswordRequired')),
    })
    .refine(data => data.newPassword === data.confirmNewPassword, {
      message: t('passwordsMustMatch'),
      path: ['confirmNewPassword'],
    });

export type ChangePasswordFormData = z.infer<
  ReturnType<typeof createFormSchema>
>;

export function useChangePasswordForm({
  onSuccess,
}: { onSuccess?: () => void } = {}) {
  const t = useTranslations('settings.accountSettings.changePassword');
  const queryClient = useQueryClient();

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(createFormSchema(t)),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = form;

  const mutation = useMutation({
    mutationFn: AuthService.changePassword,
  });

  const onSubmit = handleSubmit(async values => {
    try {
      await mutation.mutateAsync({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      reset();
      onSuccess?.();
      toast.success(t('changeSuccess'));
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      return;
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const data = error.response?.data as
          | ChangePasswordErrorResponse
          | undefined;

        if (status === 400) {
          setError('currentPassword', {
            message: t('currentPasswordIncorrect'),
          });
          return;
        }

        if (status === 422 && Array.isArray(data?.detail)) {
          const fieldError = data.detail.find(item =>
            item.loc.includes('newPassword')
          );
          setError('newPassword', {
            message: fieldError?.msg ?? t('passwordInvalid'),
          });
          return;
        }

        if (status === 429) {
          toast.error(t('tooManyAttempts'));
          return;
        }
      }

      toast.error(t('changeError'));
    }
  });

  return {
    register,
    onSubmit,
    errors,
    isSubmitting: isSubmitting || mutation.isPending,
    isValid,
  };
}
