'use client';

import { useTranslations } from 'next-intl';

import type { Plan } from '@/features/admin/plans';
import {
  COMPANY_SIZE_OPTIONS,
  INDUSTRY_OPTIONS,
  type TenantFormValues,
} from '@/features/admin/tenants';
import { PasswordFormField } from '@/shared/components/molecules/PasswordFormField';
import { SelectFormField } from '@/shared/components/molecules/SelectFormField';
import { TextFormField } from '@/shared/components/molecules/TextFormField';
import { TextareaFormField } from '@/shared/components/molecules/TextareaFormField';
import { UseFormReturn } from 'react-hook-form';

interface CreateTenantFormFieldsProps {
  form: UseFormReturn<TenantFormValues>;
  plans: Plan[];
  fullWidthSelects?: boolean;
}

export function CreateTenantFormFields({
  form,
  plans,
  fullWidthSelects = false,
}: CreateTenantFormFieldsProps) {
  const tFields = useTranslations('dialogs.createClient.fields');
  const tPlaceholders = useTranslations('placeholders');
  const tIndustry = useTranslations('dialogs.createClient.industryOptions');

  const planOptions = plans.map(plan => ({
    value: plan.id,
    label: plan.title,
  }));

  const industryOptions = INDUSTRY_OPTIONS.map(option => ({
    value: option.value,
    label: tIndustry(option.value),
  }));

  return (
    <div className="grid grid-cols-2 gap-4">
      <TextFormField
        name="name"
        label={tFields('clientName')}
        placeholder={tPlaceholders('enterClientName')}
        register={form.register}
        error={form.formState.errors.name}
      />

      <TextFormField
        name="email"
        label={tFields('email')}
        type="email"
        placeholder={tPlaceholders('enterEmail')}
        register={form.register}
        error={form.formState.errors.email}
      />

      <PasswordFormField
        name="password"
        label={tFields('password')}
        placeholder="........"
        value={form.watch('password')}
        onChange={e => form.setValue('password', e.target.value)}
        error={form.formState.errors.password}
      />

      <TextFormField
        name="phone"
        label={tFields('phone')}
        placeholder={tPlaceholders('enterPhone')}
        register={form.register}
        error={form.formState.errors.phone}
      />

      <TextFormField
        name="address"
        label={tFields('address')}
        placeholder={tPlaceholders('enterAddress')}
        register={form.register}
        error={form.formState.errors.address}
      />

      <TextFormField
        name="website"
        label={tFields('website')}
        placeholder={tPlaceholders('enterWebsite')}
        register={form.register}
        error={form.formState.errors.website}
      />

      <div className={fullWidthSelects ? 'col-span-2' : ''}>
        <SelectFormField
          name="industry"
          label={tFields('industry')}
          placeholder={tPlaceholders('selectIndustry')}
          options={industryOptions}
          value={form.watch('industry')}
          onValueChange={val => form.setValue('industry', val)}
          error={form.formState.errors.industry}
        />
      </div>

      <div className={fullWidthSelects ? 'col-span-2' : ''}>
        <SelectFormField
          name="planId"
          label={tFields('plan')}
          placeholder={tPlaceholders('selectPlan')}
          options={planOptions}
          value={form.watch('planId')}
          onValueChange={val => form.setValue('planId', val)}
          error={form.formState.errors.planId}
        />
      </div>

      <div className={fullWidthSelects ? 'col-span-2' : ''}>
        <SelectFormField
          name="size"
          label={tFields('companySize')}
          placeholder={tPlaceholders('selectSize')}
          options={COMPANY_SIZE_OPTIONS}
          value={form.watch('size')}
          onValueChange={val => form.setValue('size', val)}
          error={form.formState.errors.size}
        />
      </div>

      <TextFormField
        name="commercialRegister"
        label={tFields('commercialRegister')}
        placeholder={tPlaceholders('enterCommercialRegister')}
        register={form.register}
        error={form.formState.errors.commercialRegister}
      />

      <TextFormField
        name="taxId"
        label={tFields('taxId')}
        placeholder={tPlaceholders('enterTaxId')}
        register={form.register}
        error={form.formState.errors.taxId}
        className="col-span-2 space-y-2"
      />

      <TextareaFormField
        name="description"
        label={tFields('description')}
        placeholder={tPlaceholders('enterDescription')}
        register={form.register}
        error={form.formState.errors.description}
        className="col-span-2 space-y-2"
      />
    </div>
  );
}
