'use client';

import React from 'react';

import { createPlanSchema } from '@/features/admin/plans';
import { Input } from '@/shared/components/atoms/ui/input';
import { Label } from '@/shared/components/atoms/ui/label';
import { Textarea } from '@/shared/components/atoms/ui/textarea';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

type FormValues = z.infer<typeof createPlanSchema>;

interface PlanBasicInfoFieldsProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  t: (key: string) => string;
}

const PlanBasicInfoFields: React.FC<PlanBasicInfoFieldsProps> = ({
  register,
  errors,
  t,
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">{t('fields.planName')}</Label>
        <Input
          id="title"
          placeholder={t('placeholders.planName')}
          {...register('title')}
          className={`${
            errors.title ? 'border-destructive' : 'border-0'
          } bg-[#06B6D40F]!`}
        />
        {errors.title && (
          <p className="text-destructive text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t('fields.description')}</Label>
        <Textarea
          id="description"
          placeholder={t('placeholders.description')}
          {...register('description')}
          className={`${
            errors.description ? 'border-destructive' : 'border-0'
          } bg-[#06B6D40F]!`}
        />
        {errors.description && (
          <p className="text-destructive text-sm">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">{t('fields.price')}</Label>
        <Input
          id="price"
          placeholder={t('placeholders.price')}
          {...register('price')}
          className={`${
            errors.price ? 'border-destructive' : 'border-0'
          } bg-[#06B6D40F]!`}
        />
        {errors.price && (
          <p className="text-destructive text-sm">{errors.price.message}</p>
        )}
      </div>
    </>
  );
};

export default PlanBasicInfoFields;
