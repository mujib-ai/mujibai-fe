'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import {
  type CreatePlanDto,
  PlanType,
  createPlanSchema,
  usePlans,
} from '@/features/admin/plans';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/atoms/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import PlanBasicInfoFields from '../molecules/PlanBasicInfoFields';
import PlanFeaturesField from '../molecules/PlanFeaturesField';
import PlanSubscriptionTypeField from '../molecules/PlanSubscriptionTypeField';

type FormValues = z.infer<typeof createPlanSchema>;

export default function CreatePlanDialog() {
  const t = useTranslations('dialogs.createPlan');
  const tActions = useTranslations('actions');
  const tCommon = useTranslations('common');
  const [open, setOpen] = React.useState(false);
  const { createPlan, isCreating } = usePlans();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(createPlanSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      type: PlanType.MONTHLY,
      features: [''],
    },
  });

  const onSubmit = async (data: FormValues) => {
    const cleanedData: CreatePlanDto = {
      title: data.title,
      price: Number(data.price),
      features: data.features.filter(item => item.trim() !== ''),
      type: data.type as PlanType,
    };

    try {
      await createPlan(cleanedData);
      setOpen(false);
      reset();
    } catch (error) {
      console.error('Failed to create plan', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 rounded-full py-5">
          <Plus className="size-5 text-white" />
          <span className="text-white">{tActions('addNewPlan')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <PlanBasicInfoFields register={register} errors={errors} t={t} />

            <PlanSubscriptionTypeField
              control={control}
              setValue={setValue}
              trigger={trigger}
              errors={errors}
              t={t}
            />

            <PlanFeaturesField register={register} control={control} t={t} />
          </div>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="border-primary text-primary hover:text-primary w-full rounded-full px-8 hover:bg-transparent sm:w-auto"
              >
                {tCommon('cancel')}
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isCreating}
              className="w-full rounded-full bg-cyan-500 px-8 text-white hover:bg-cyan-600 sm:w-auto"
            >
              {isCreating
                ? tActions('createPlan') + '...'
                : tActions('createPlan')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
