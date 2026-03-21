'use client';

import { PlanType } from '@/features/admin/plans';
import { Button } from '@/shared/components/atoms/ui/button';
import { Input } from '@/shared/components/atoms/ui/input';
import { Label } from '@/shared/components/atoms/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';
import { Textarea } from '@/shared/components/atoms/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

interface UpdatePlanDialogOrganismProps {
  register: any;
  control: any;
  setValue: any;
  trigger: any;
  errors: any;
  fields: any;
  addFeature: () => void;
  removeFeature: (index: number) => void;
  tCreate: (key: string) => string;
  tPlans: (key: string) => string;
  tCommon: (key: string) => string;
  plan: any;
}

export default function UpdatePlanDialogOrganism({
  register,
  control,
  setValue,
  trigger,
  errors,
  fields,
  addFeature,
  removeFeature,
  tCreate,
  tPlans,
  tCommon,
  plan,
}: UpdatePlanDialogOrganismProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">{tCreate('fields.planName')}</Label>
        <Input
          id="title"
          placeholder={tCreate('placeholders.planName')}
          maxLength={100}
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
        <Label htmlFor="description">{tCreate('fields.description')}</Label>
        <Textarea
          id="description"
          placeholder={tCreate('placeholders.description')}
          maxLength={500}
          {...register('description')}
          className={`${
            errors.description ? 'border-destructive' : 'border-0'
          } bg-[#06B6D40F]! h-24 resize-none`}
        />
        {errors.description && (
          <p className="text-destructive text-sm">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">{tCreate('fields.price')}</Label>
        <Input
          id="price"
          placeholder={tCreate('placeholders.price')}
          {...register('price')}
          className={`${
            errors.price ? 'border-destructive' : 'border-0'
          } bg-[#06B6D40F]!`}
        />
        {errors.price && (
          <p className="text-destructive text-sm">{errors.price.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">{tCreate('fields.subscription')}</Label>
        <Select
          onValueChange={(val: PlanType) => {
            setValue('type', val);
            trigger('type');
          }}
          defaultValue={PlanType.MONTHLY}
          value={plan?.type}
        >
          <SelectTrigger
            className={`w-full ${
              errors.type ? 'border-destructive' : 'border-0'
            } bg-[#06B6D40F]!`}
          >
            <SelectValue placeholder={tCreate('placeholders.subscription')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={PlanType.MONTHLY}>
              {tPlans('monthly')}
            </SelectItem>
            <SelectItem value={PlanType.YEARLY}>{tPlans('yearly')}</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-destructive text-sm">{errors.type.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>{tCreate('fields.includes')}</Label>
        {fields.map((field: { id: string }, index: number) => (
          <div key={field.id} className="flex gap-2">
            <Input
              placeholder={tCreate('placeholders.includes')}
              {...register(`features.${index}` as const)}
              className="border-0 bg-[#06B6D40F]!"
            />
            {index === fields.length - 1 ? (
              <Button
                type="button"
                size="icon"
                onClick={addFeature}
                className="shrink-0 rounded bg-cyan-500 text-white hover:bg-cyan-600"
              >
                <Plus className="size-5" />
              </Button>
            ) : (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => removeFeature(index)}
                className="text-destructive hover:bg-destructive/10 shrink-0"
              >
                <Trash2 className="size-5" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
