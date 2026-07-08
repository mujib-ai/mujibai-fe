'use client';

import { useForgetPassword } from '@/features/auth';
import ForgetPasswordForm from '@/shared/components/organisms/auth/ForgetPasswordForm';
import ForgetPasswordTemplate from '@/shared/components/templates/auth/ForgetPasswordTemplate';

export default function ForgetPasswordPage() {
  const { form, onSubmit, alert, t } = useForgetPassword();

  return (
    <ForgetPasswordTemplate>
      <ForgetPasswordForm form={form} onSubmit={onSubmit} alert={alert} t={t} />
    </ForgetPasswordTemplate>
  );
}
