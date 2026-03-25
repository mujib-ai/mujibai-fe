'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import PasswordInput from '@/shared/components/atoms/PasswordInput';
import { Button } from '@/shared/components/atoms/ui/button';
import { useChangePassword } from '../../hooks';
import type { ChangePasswordDto } from '../../types';
import SettingsFormField from '../atoms/SettingsFormField';

export default function PasswordSettingsForm() {
  const t = useTranslations('settings.accountSettings');
  const { changePassword, isChanging } = useChangePassword();
  const passwordForm = useForm<ChangePasswordDto>();

  const onPasswordSubmit = async (data: ChangePasswordDto) => {
    await changePassword(data);
    passwordForm.reset();
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-lg font-semibold">{t('passwordManagement')}</h1>
        <p className="text-sm text-gray-400">{t('passwordManagementDescription')}</p>
      </div>
      <form
        onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <SettingsFormField id="currentPassword" label={t('currentPassword')}>
          <PasswordInput
            placeholder="********"
            {...passwordForm.register('currentPassword')}
          />
        </SettingsFormField>
        <SettingsFormField id="newPassword" label={t('newPassword')}>
          <PasswordInput
            placeholder="********"
            {...passwordForm.register('newPassword')}
          />
        </SettingsFormField>
        <SettingsFormField id="confirmPassword" label={t('confirmPassword')}>
          <PasswordInput
            placeholder="********"
            {...passwordForm.register('confirmPassword')}
          />
        </SettingsFormField>
        <div className="col-span-full mt-6 flex justify-end">
          <Button
            className="rounded-full px-8 py-2 font-semibold"
            type="submit"
            disabled={isChanging}
          >
            {isChanging ? 'Updating...' : t('saveChanges')}
          </Button>
        </div>
      </form>
    </>
  );
}
