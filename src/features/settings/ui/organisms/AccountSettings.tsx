'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useAuth } from '@/features/auth';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';

import SettingsFormField from '../atoms/SettingsFormField';
import { AppearancePreferences } from '../molecules/AppearancePreferences';
import { TenantLogoUpload } from '../molecules/TenantLogoUpload';
import { ResetPasswordDialog } from './ResetPasswordDialog';

export function AccountSettings() {
  const t = useTranslations('settings.accountSettings');
  const { user } = useAuth();
  const [isResetPasswordOpen, setResetPasswordOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-6">
      <AppearancePreferences />
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="bg-surface rounded-2xl p-6">
          <div className="mb-6 flex flex-col gap-2">
            <h1 className="text-lg font-semibold">{t('profileInformation')}</h1>
            <p className="text-sm text-gray-400">{t('subTitle')}</p>
          </div>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TenantLogoUpload
              currentLogoUrl={user?.logoUrl ?? user?.avatar}
              tenantName={user?.name}
            />
            <SettingsFormField
              id="name"
              label={t('name')}
              placeholder={t('namePlaceholder')}
              defaultValue={user?.name}
            />
            <SettingsFormField
              id="email"
              label={t('email')}
              type="email"
              placeholder={t('emailPlaceholder')}
              defaultValue={user?.email}
            />
            <SettingsFormField
              id="phone"
              label={t('phone')}
              placeholder={t('phonePlaceholder')}
              defaultValue={user?.phone}
            />
            <SettingsFormField
              id="location"
              label={t('location')}
              placeholder={t('locationPlaceholder')}
              defaultValue={user?.address}
            />
            <SettingsFormField
              id="bio"
              label={t('bio')}
              placeholder={t('bioPlaceholder')}
              defaultValue={user?.description}
            />
            <div className="col-span-full mt-8 flex flex-col gap-2">
              <h1 className="text-lg font-semibold">
                {t('passwordManagement')}
              </h1>
              <p className="text-sm text-gray-400">
                {t('passwordManagementDescription')}
              </p>
            </div>
            <div className="col-span-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => setResetPasswordOpen(true)}
              >
                {t('resetPassword')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <ResetPasswordDialog
        open={isResetPasswordOpen}
        onOpenChange={setResetPasswordOpen}
      />
    </div>
  );
}
