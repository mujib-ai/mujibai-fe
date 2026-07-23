'use client';

import { useTranslations } from 'next-intl';

import { useAuth } from '@/features/auth';
import PasswordInput from '@/shared/components/atoms/PasswordInput';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';

import SettingsFormField from '../atoms/SettingsFormField';
import { TenantLogoUpload } from '../molecules/TenantLogoUpload';

export function AccountSettings() {
  const t = useTranslations('settings.accountSettings');
  const { user } = useAuth();

  return (
    <div className="w-full">
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="rounded-2xl bg-[#FFFFFFBF] p-6 dark:bg-[#00143473]">
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
            />
            <SettingsFormField
              id="phone"
              label={t('phone')}
              placeholder={t('phonePlaceholder')}
            />
            <SettingsFormField
              id="location"
              label={t('location')}
              placeholder={t('locationPlaceholder')}
            />
            <SettingsFormField
              id="bio"
              label={t('bio')}
              placeholder={t('bioPlaceholder')}
            />
            <div className="col-span-full mt-8 flex flex-col gap-2">
              <h1 className="text-lg font-semibold">
                {t('passwordManagement')}
              </h1>
              <p className="text-sm text-gray-400">
                {t('passwordManagementDescription')}
              </p>
            </div>
            <SettingsFormField
              id="currentPassword"
              label={t('currentPassword')}
            >
              <PasswordInput placeholder="********" />
            </SettingsFormField>
            <SettingsFormField id="newPassword" label={t('newPassword')}>
              <PasswordInput placeholder="********" />
            </SettingsFormField>
            <SettingsFormField
              id="confirmPassword"
              label={t('confirmPassword')}
            >
              <PasswordInput placeholder="********" />
            </SettingsFormField>
            <div className="col-span-full mt-6 flex justify-end">
              <Button
                className="rounded-full px-8 py-2 font-semibold"
                type="button"
              >
                {t('saveChanges')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
