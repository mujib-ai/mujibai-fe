'use client';

import { useEnrollmentForm } from '@/features/enroll';
import { Button } from '@/shared/components/atoms/ui/button';
import { Spinner } from '@heroui/react';

import { FormField, FormFieldTextarea } from '../atoms';

export default function EnrollmentForm() {
  const { handleSubmit, onSubmit, isEnrollLoading, t, getFieldProps } =
    useEnrollmentForm();

  return (
    <div className="w-full rounded-2xl bg-[#FFFFFFCC] p-8 shadow-[0_0_25px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-200 dark:bg-[#06B6D40F]">
      <h2 className="text-foreground mb-6 text-2xl font-semibold">
        {t('title')}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <FormField
          label={t('name')}
          placeholder={t('namePlaceholder')}
          required
          name="name"
          {...getFieldProps('name')}
        />

        <FormField
          label={t('email')}
          placeholder={t('emailPlaceholder')}
          required
          name="email"
          {...getFieldProps('email')}
        />

        <FormField
          label={t('phone')}
          placeholder={t('phonePlaceholder')}
          required
          name="phone"
          {...getFieldProps('phone')}
        />

        <FormField
          label={t('company')}
          placeholder={t('companyNamePlaceholder')}
          required
          name="company"
          {...getFieldProps('company')}
        />

        <FormField
          label={t('website')}
          placeholder={t('companyWebsitePlaceholder')}
          required
          name="website"
          {...getFieldProps('website')}
        />

        <FormField
          label={t('address')}
          placeholder={t('addressPlaceholder')}
          required
          name="address"
          {...getFieldProps('address')}
        />

        <FormField
          label={t('industry')}
          placeholder={t('industryPlaceholder')}
          required
          name="industry"
          {...getFieldProps('industry')}
        />

        <FormField
          label={t('commercialRegister')}
          placeholder={t('commercialRegisterPlaceholder')}
          required
          name="commercialRegister"
          {...getFieldProps('commercialRegister')}
        />

        <FormField
          label={t('taxId')}
          placeholder={t('taxIdPlaceholder')}
          required
          name="taxId"
          {...getFieldProps('taxId')}
        />

        <FormFieldTextarea
          label={t('message')}
          placeholder={t('messagePlaceholder')}
          required
          name="message"
          {...getFieldProps('message')}
        />

        <div className="mt-6 flex justify-end md:col-span-2">
          <Button
            type="submit"
            className="rounded-full bg-[#00B4D8] px-8 py-2 text-white shadow-md transition hover:bg-[#0096C7] disabled:opacity-50"
            disabled={isEnrollLoading}
          >
            {isEnrollLoading ? (
              <>
                <Spinner size="md" color="current" />
                <span className="ml-2">{t('submitting')}</span>
              </>
            ) : (
              t('submit')
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
