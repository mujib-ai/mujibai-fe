'use client';

import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';

import { useUpdatePlanDialog } from '@/features/admin/plans';
import { Button } from '@/shared/components/atoms/ui/button';
import { DialogClose } from '@/shared/components/atoms/ui/dialog';

import UpdatePlanDialogTemplate from '../templates/UpdatePlanDialogTemplate';
import UpdatePlanDialogOrganism from './UpdatePlanDialogOrganism';

interface UpdatePlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: any;
  onClose: () => void;
}

export default function UpdatePlanDialog({
  open,
  onOpenChange,
  plan,
  onClose,
}: UpdatePlanDialogProps) {
  const tUpdate = useTranslations('dialogs.updatePlan');
  const tCommon = useTranslations('common');

  const {
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
  } = useUpdatePlanDialog({ plan, onClose });

  const footer = (
    <>
      <DialogClose asChild>
        <Button
          type="button"
          variant="outline"
          className="border-primary text-primary hover:text-primary w-full rounded-full px-8 hover:bg-transparent sm:w-auto"
          onClick={onClose}
        >
          {tCommon('cancel')}
        </Button>
      </DialogClose>
      <Button
        type="submit"
        disabled={isUpdating}
        className="w-full rounded-full bg-cyan-500 px-8 text-white hover:bg-cyan-600 sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isUpdating ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            {tCommon('save')}
          </span>
        ) : (
          tCommon('save')
        )}
      </Button>
    </>
  );

  return (
    <UpdatePlanDialogTemplate
      title={tUpdate('title')}
      open={open}
      onOpenChange={onOpenChange}
      footer={footer}
      onSubmit={handleSubmit(onSubmit)}
    >
      <UpdatePlanDialogOrganism
        register={register}
        control={control}
        setValue={setValue}
        trigger={trigger}
        errors={errors}
        fields={fields}
        addFeature={addFeature}
        removeFeature={removeFeature}
        tCreate={tCreate}
        tPlans={useTranslations('plans')}
        tCommon={tCommon}
        plan={plan}
      />
    </UpdatePlanDialogTemplate>
  );
}
