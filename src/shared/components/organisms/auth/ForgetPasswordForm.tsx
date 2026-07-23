'use client';

import Link from 'next/link';

import type { ForgetPasswordFormData } from '@/features/auth';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/atoms/ui/alert';
import { Button } from '@/shared/components/atoms/ui/button';
import { Input } from '@/shared/components/atoms/ui/input';
import { Label } from '@/shared/components/atoms/ui/label';
import { Spinner } from '@heroui/react';
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface ForgetPasswordFormProps {
  form: UseFormReturn<ForgetPasswordFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  alert: {
    type: string | null;
    title: string;
    description: string;
  };
  t: (key: string) => string;
}

export default function ForgetPasswordForm({
  form,
  onSubmit,
  alert,
  t,
}: ForgetPasswordFormProps) {
  const {
    register,
    formState: { errors, isSubmitting, isValid },
  } = form;

  return (
    <div className="rounded-2xl border-t border-b border-white bg-[#FFFFFF80] p-10 sm:w-[100%] md:w-[80%] lg:w-[60%] dark:bg-[#06B6D40F]">
      {alert.type && (
        <Alert
          variant={alert.type === 'error' ? 'destructive' : 'default'}
          className={`${alert.type === 'error' ? 'border-red-200 bg-red-50/20' : 'border-green-200 bg-green-50/20'}`}
        >
          {alert.type === 'success' ? (
            <CheckCircle2Icon />
          ) : (
            <AlertCircleIcon />
          )}
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      )}
      <h1 className="text-2xl font-semibold">{t('title')}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {t('description')}
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 py-5">
        <div>
          <Label htmlFor="email">{t('emailLabel')}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t('emailPlaceholder')}
            {...register('email')}
            className={`mt-3 w-full border-none bg-[#06B6D40F] placeholder:text-[#000000BF] focus:ring-2 focus:ring-[#06B6D4] focus:outline-none dark:bg-[#3B82F633] dark:placeholder:text-[#FFFFFFBF] ${
              errors.email ? 'ring-2 ring-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="text-md mt-4 w-full rounded-full py-5 text-white capitalize transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner size="sm" color="current" />
              {t('sending')}
            </span>
          ) : (
            t('sendButton')
          )}
        </Button>

        <div className="flex items-center justify-center">
          <Link
            href="/login"
            className="text-primary transition-colors duration-200 hover:underline"
          >
            {t('returnLogin')}
          </Link>
        </div>
      </form>
    </div>
  );
}
