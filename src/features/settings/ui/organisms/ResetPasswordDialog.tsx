'use client';

import { useTranslations } from 'next-intl';

import PasswordInput from '@/shared/components/atoms/PasswordInput';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';

import { useChangePasswordForm } from '../../hooks/useChangePasswordForm';
import SettingsFormField from '../atoms/SettingsFormField';

interface ResetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResetPasswordDialog({
  open,
  onOpenChange,
}: ResetPasswordDialogProps) {
  const t = useTranslations('settings.accountSettings');
  const { register, onSubmit, errors, isSubmitting } = useChangePasswordForm({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('passwordManagement')}</DialogTitle>
          <DialogDescription>
            {t('passwordManagementDescription')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <SettingsFormField id="currentPassword" label={t('currentPassword')}>
            <PasswordInput
              id="currentPassword"
              placeholder="********"
              disabled={isSubmitting}
              error={errors.currentPassword?.message}
              touched={!!errors.currentPassword}
              {...register('currentPassword')}
            />
          </SettingsFormField>
          <SettingsFormField id="newPassword" label={t('newPassword')}>
            <PasswordInput
              id="newPassword"
              placeholder="********"
              disabled={isSubmitting}
              error={errors.newPassword?.message}
              touched={!!errors.newPassword}
              {...register('newPassword')}
            />
          </SettingsFormField>
          <SettingsFormField
            id="confirmNewPassword"
            label={t('confirmPassword')}
          >
            <PasswordInput
              id="confirmNewPassword"
              placeholder="********"
              disabled={isSubmitting}
              error={errors.confirmNewPassword?.message}
              touched={!!errors.confirmNewPassword}
              {...register('confirmNewPassword')}
            />
          </SettingsFormField>
          <div className="mt-2 flex justify-end">
            <Button
              className="rounded-full px-8 py-2 font-semibold"
              type="submit"
              disabled={isSubmitting}
            >
              {t('saveChanges')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
