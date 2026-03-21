'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import useAuth from './useAuth';

export const forgetPasswordSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t('emailInvalid')).min(1, t('emailRequired')),
  });

export type ForgetPasswordFormData = z.infer<
  ReturnType<typeof forgetPasswordSchema>
>;

export default function useForgetPassword() {
  const t = useTranslations('forgetPasswordPage');
  const { alert, handleForgotPassword } = useAuth();
  const router = useRouter();

  const form = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema(t)),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ForgetPasswordFormData) => {
    const response = await handleForgotPassword(values.email);
    if (response) {
      Cookies.set('resetEmail', values.email, { expires: 1 / 24 });
      router.push('/password-reset-requested');
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    alert,
    t,
  };
}
