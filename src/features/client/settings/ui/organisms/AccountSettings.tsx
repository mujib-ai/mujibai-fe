'use client';

import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';

import ChangeEmailForm from './ChangeEmailForm';
import PasswordSettingsForm from './PasswordSettingsForm';
import ProfileSettingsForm from './ProfileSettingsForm';

export function AccountSettings() {
  const t = useTranslations('settings.accountSettings');

  return (
    <div className="flex w-full flex-col gap-8">
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="rounded-2xl bg-[#FFFFFFBF] p-6 dark:bg-[#00143473]">
          <ProfileSettingsForm />

          <div className="my-10 h-px w-full bg-gray-200/20" />

          <ChangeEmailForm />

          <div className="my-10 h-px w-full bg-gray-200/20" />

          <PasswordSettingsForm />
        </CardContent>
      </Card>
    </div>
  );
}
