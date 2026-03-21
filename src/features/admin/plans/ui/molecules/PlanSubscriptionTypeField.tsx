'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { PlanType, createPlanSchema } from '@/features/admin/plans';
import { Label } from '@/shared/components/atoms/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
import { z } from 'zod';

type FormValues = z.infer<typeof createPlanSchema>;

interface PlanSubscriptionTypeFieldProps {
  control: Control<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  trigger: UseFormTrigger<FormValues>;
  errors: FieldErrors<FormValues>;
  t: (key: string) => string;
}

const PlanSubscriptionTypeField: React.FC<PlanSubscriptionTypeFieldProps> = ({
  control,
  setValue,
  trigger,
  errors,
  t,
}) => {
  const tPlans = useTranslations('plans');

  return (
    <div className="space-y-2">
      <Label htmlFor="type">{t('fields.subscription')}</Label>
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <Select
            onValueChange={(val: PlanType) => {
              setValue('type', val);
              trigger('type');
            }}
            defaultValue={field.value || PlanType.MONTHLY}
            value={field.value}
          >
            <SelectTrigger
              className={`w-full ${
                errors.type ? 'border-destructive' : 'border-0'
              } bg-[#06B6D40F]!`}
            >
              <SelectValue placeholder={t('placeholders.subscription')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={PlanType.MONTHLY}>{tPlans('monthly')}</SelectItem>
              <SelectItem value={PlanType.YEARLY}>{tPlans('yearly')}</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      {errors.type && (
        <p className="text-destructive text-sm">{errors.type.message}</p>
      )}
    </div>
  );
};

export default PlanSubscriptionTypeField;
