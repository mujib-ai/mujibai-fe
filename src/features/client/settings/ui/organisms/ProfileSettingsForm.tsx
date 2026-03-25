'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/atoms/ui/button';
import { useUpdateProfile } from '../../hooks';
import type { UpdateProfileDto } from '../../types';
import SettingsFormField from '../atoms/SettingsFormField';

export default function ProfileSettingsForm() {
  const t = useTranslations('settings.accountSettings');
  const { updateProfile, isUpdating } = useUpdateProfile();
  const profileForm = useForm<UpdateProfileDto>();

  const onProfileSubmit = async (data: UpdateProfileDto) => {
    await updateProfile(data);
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-lg font-semibold">{t('profileInformation')}</h1>
        <p className="text-sm text-gray-400">{t('subTitle')}</p>
      </div>
      <form
        onSubmit={profileForm.handleSubmit(onProfileSubmit)}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <SettingsFormField
          id="name"
          label={t('name')}
          placeholder={t('namePlaceholder')}
          {...profileForm.register('name')}
        />

        <SettingsFormField
          id="phone"
          label={t('phone')}
          placeholder={t('phonePlaceholder')}
          {...profileForm.register('phone')}
        />
        <SettingsFormField
          id="location"
          label={t('location')}
          placeholder={t('locationPlaceholder')}
          {...profileForm.register('location')}
        />
        <SettingsFormField
          id="website"
          label={t('website')}
          placeholder={t('websitePlaceholder')}
          {...profileForm.register('website')}
        />
        <SettingsFormField
          id="size"
          label={t('size')}
          placeholder={t('sizePlaceholder')}
          {...profileForm.register('size')}
        />
        <SettingsFormField
          id="industry"
          label={t('industry')}
          placeholder={t('industryPlaceholder')}
          {...profileForm.register('industry')}
        />
        <SettingsFormField
          id="commercialRegister"
          label={t('commercialRegister')}
          placeholder={t('commercialRegisterPlaceholder')}
          {...profileForm.register('commercialRegister')}
        />
        <SettingsFormField
          id="taxId"
          label={t('taxId')}
          placeholder={t('taxIdPlaceholder')}
          {...profileForm.register('taxId')}
        />
        <SettingsFormField
          id="domain"
          label={t('domain')}
          placeholder={t('domainPlaceholder')}
          {...profileForm.register('domain')}
        />
        <div className="col-span-full">
          <SettingsFormField
            id="bio"
            label={t('bio')}
            placeholder={t('bioPlaceholder')}
            {...profileForm.register('bio')}
          />
        </div>

        <div className="col-span-full mt-6 flex justify-end">
          <Button
            className="rounded-full px-8 py-2 font-semibold"
            type="submit"
            disabled={isUpdating}
          >
            {isUpdating ? 'Saving...' : t('saveChanges')}
          </Button>
        </div>
      </form>
    </>
  );
}
