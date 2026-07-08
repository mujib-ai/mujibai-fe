'use client';

import { useResetPasswordForm } from '@/features/auth';
import { Button } from '@/shared/components/atoms/ui/button';
import { PasswordField } from '@/shared/components/molecules/PasswordField';
import {
  ResetPasswordAlert,
  ResetPasswordHeader,
} from '@/shared/components/molecules/ResetPasswordComponents';

export default function ResetPasswordPage({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) {
  const {
    handleSubmit,
    onSubmit,
    isSubmitting,
    isValid,
    alert,
    getFieldProps,
    getTranslations,
  } = useResetPasswordForm({ userId, token });

  const {
    title,
    newPassword,
    confirmPassword,
    placeholder,
    submit,
    submitting,
  } = getTranslations();

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="absolute top-1/2 left-1/2 z-[-1] h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/70 opacity-60 blur-[160px]" />

      <div className="flex h-[50%] w-[100%] flex-col items-center justify-center gap-5 sm:w-[50%]">
        <ResetPasswordHeader />

        <div className="rounded-2xl border-t border-b border-white bg-[#FFFFFF80] p-10 sm:w-[100%] md:w-[80%] lg:w-[60%] dark:bg-[#06B6D40F]">
          <ResetPasswordAlert alert={alert} />

          <h1 className="text-2xl font-semibold">{title}</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-5"
          >
            <PasswordField
              id="newPassword"
              label={newPassword}
              placeholder={placeholder}
              {...getFieldProps('newPassword')}
            />

            <PasswordField
              id="confirmPassword"
              label={confirmPassword}
              placeholder={placeholder}
              {...getFieldProps('confirmPassword')}
            />

            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="text-md mt-2 w-full rounded-full py-5 text-white capitalize disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? submitting : submit}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
