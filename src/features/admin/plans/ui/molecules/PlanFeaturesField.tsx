'use client';

import React from 'react';

import { createPlanSchema } from '@/features/admin/plans';
import { Button } from '@/shared/components/atoms/ui/button';
import { Input } from '@/shared/components/atoms/ui/input';
import { Label } from '@/shared/components/atoms/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { Control, UseFormRegister, useFieldArray } from 'react-hook-form';
import { z } from 'zod';

type FormValues = z.infer<typeof createPlanSchema>;

interface PlanFeaturesFieldProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  t: (key: string) => string;
}

const PlanFeaturesField: React.FC<PlanFeaturesFieldProps> = ({
  control,
  register,
  t,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'features' as never,
  });

  React.useEffect(() => {
    if (fields.length === 0) {
      append('');
    }
  }, [fields.length, append]);

  return (
    <div className="space-y-2">
      <Label>{t('fields.includes')}</Label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <Input
            placeholder={t('placeholders.includes')}
            {...register(`features.${index}` as const)}
            className="border-0 bg-[#06B6D40F]!"
          />
          {index === fields.length - 1 ? (
            <Button
              type="button"
              size="icon"
              onClick={() => append('')}
              className="shrink-0 rounded bg-cyan-500 text-white hover:bg-cyan-600"
            >
              <Plus className="size-5" />
            </Button>
          ) : (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => remove(index)}
              className="text-destructive hover:bg-destructive/10 shrink-0"
            >
              <Trash2 className="size-5" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlanFeaturesField;
