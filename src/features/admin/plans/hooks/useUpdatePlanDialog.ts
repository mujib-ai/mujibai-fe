'use client';
import { useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { CreatePlanDto, Plan } from '../types';
import { PlanType } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import usePlans from './usePlans';

const getFormSchema = (t: (key: string, values?: any) => string) =>
  z.object({
    title: z.string().min(1, t('required')),
    description: z.string().min(1, t('required')),
    price: z
      .string()
      .min(1, t('required'))
      .refine(value => !Number.isNaN(Number(value)), {
        message: t('invalidNumber'),
      }),
    type: z.nativeEnum(PlanType),
    features: z.array(z.string()),
  });

export type FormValues = z.infer<ReturnType<typeof getFormSchema>>;

interface UseUpdatePlanDialogProps {
  plan: Plan | null;
  onClose: () => void;
}

export default function useUpdatePlanDialog({ plan, onClose }: UseUpdatePlanDialogProps) {
  const tCreate = useTranslations('dialogs.createPlan');
  const tValidation = useTranslations('validation');
  const { updatePlan, isUpdating } = usePlans();

  const formSchema = useMemo(() => getFormSchema(tValidation), [tValidation]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      type: PlanType.MONTHLY,
      features: [''],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'features' as never,
  });

  useEffect(() => {
    if (plan) {
      reset({
        title: plan.title,
        description: plan.description || '',
        price: plan.price.toString(),
        type: plan.type,
        features: plan.features.length ? plan.features : [''],
      });
    }
  }, [plan, reset]);

  const onSubmit = async (data: FormValues) => {
    if (!plan) return;

    const cleanedData: Partial<CreatePlanDto> = {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      type: data.type,
      features: data.features.filter(item => item.trim() !== ''),
    };

    try {
      await updatePlan({ id: plan.id, data: cleanedData });
      onClose();
    } catch (error) {
      console.error('Failed to update plan', error);
    }
  };

  const addFeature = () => append('');
  const removeFeature = (index: number) => remove(index);

  return {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    errors,
    fields,
    addFeature,
    removeFeature,
    onSubmit,
    isUpdating,
    tCreate,
  };
}
