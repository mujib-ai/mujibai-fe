'use client';

import { useLoginForm } from '@/features/auth';
import { Button } from '@/shared/components/atoms/ui/button';
import { EmailField } from '@/shared/components/molecules/EmailField';
import {
  ForgotPasswordLink,
  LoginHeader,
} from '@/shared/components/molecules/LoginComponents';
import { LoginPasswordField } from '@/shared/components/molecules/LoginPasswordField';
import { Spinner } from '@heroui/react';

export default function LoginPage() {
  const { handleSubmit, onSubmit, isLoading, getFieldProps, getTranslations } =
    useLoginForm();

  const {
    title,
    email,
    emailPlaceholder,
    password,
    passwordPlaceholder,
    forgotPassword,
    loginButton,
    loading,
  } = getTranslations();

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="absolute top-1/2 left-1/2 z-[-1] h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/70 opacity-60 blur-[160px]" />

      <div className="flex h-[50%] w-full flex-col items-center justify-center gap-5 sm:w-[50%]">
        <LoginHeader />

        <div className="rounded-2xl border-t border-b border-white bg-[#FFFFFF80] p-10 sm:w-full md:w-[80%] lg:w-[60%] dark:bg-[#06B6D40F]">
          <h1 className="text-2xl font-semibold">{title}</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-5"
          >
            <EmailField
              id="email"
              label={email}
              placeholder={emailPlaceholder}
              disabled={isLoading}
              {...getFieldProps('email')}
            />

            <LoginPasswordField
              id="password"
              label={password}
              placeholder={passwordPlaceholder}
              disabled={isLoading}
              {...getFieldProps('password')}
            />

            <ForgotPasswordLink
              href="/forgot-password"
              label={forgotPassword}
              disabled={isLoading}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="text-md mt-2 w-full rounded-full py-5 text-white capitalize transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner size="sm" color="current" />
                  {loading}
                </span>
              ) : (
                loginButton
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
