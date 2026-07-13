'use client';

import { useTranslations } from 'next-intl';

import { FormField } from '@/shared/components/atoms/FormField';
import { Button } from '@/shared/components/atoms/ui/button';
import { Checkbox } from '@/shared/components/atoms/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';
import { Input } from '@/shared/components/atoms/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { API_KEY_ENVIRONMENTS, API_KEY_SCOPES } from '../../constants';
import type { ApiKeyScope, CreateApiKeyDto } from '../../types';

const createApiKeySchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name must be at most 255 characters'),
  environment: z.enum(['sandbox', 'live']),
  scopes: z.array(z.string()),
  expiresAt: z.string().optional(),
});

type CreateApiKeyFormData = z.infer<typeof createApiKeySchema>;

interface CreateApiKeyDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateApiKeyDto) => Promise<void>;
  loading: boolean;
}

export default function CreateApiKeyDialog({
  open,
  onClose,
  onSubmit,
  loading,
}: CreateApiKeyDialogProps) {
  const t = useTranslations('APIKeys');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateApiKeyFormData>({
    resolver: zodResolver(createApiKeySchema),
    defaultValues: {
      name: '',
      environment: 'live',
      scopes: [],
      expiresAt: '',
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = async (values: CreateApiKeyFormData) => {
    await onSubmit({
      name: values.name,
      environment: values.environment,
      scopes: values.scopes as ApiKeyScope[],
      expiresAt: values.expiresAt
        ? new Date(values.expiresAt).toISOString()
        : undefined,
    });
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={openState => !openState && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('create.title')}</DialogTitle>
          <DialogDescription>{t('create.description')}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
          <FormField
            label={t('name')}
            htmlFor="name"
            error={errors.name?.message}
          >
            <Input
              id="name"
              placeholder={t('create.namePlaceholder')}
              {...register('name')}
            />
          </FormField>

          <Controller
            control={control}
            name="environment"
            render={({ field }) => (
              <FormField label={t('create.environment')} htmlFor="environment">
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="environment" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {API_KEY_ENVIRONMENTS.map(env => (
                      <SelectItem key={env} value={env}>
                        {t(`environments.${env}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            )}
          />

          <Controller
            control={control}
            name="scopes"
            render={({ field }) => (
              <FormField label={t('create.scopes')} htmlFor="scopes">
                <div className="flex flex-col gap-2">
                  {API_KEY_SCOPES.map(scope => {
                    const checked = field.value.includes(scope);
                    return (
                      <label
                        key={scope}
                        htmlFor={`scope-${scope}`}
                        className="flex cursor-pointer items-center gap-2 text-sm"
                      >
                        <Checkbox
                          id={`scope-${scope}`}
                          checked={checked}
                          onCheckedChange={isChecked => {
                            field.onChange(
                              isChecked
                                ? [...field.value, scope]
                                : field.value.filter(s => s !== scope)
                            );
                          }}
                        />
                        {t(`scopes.${scope}`)}
                      </label>
                    );
                  })}
                </div>
              </FormField>
            )}
          />

          <FormField label={t('create.expiresAt')} htmlFor="expiresAt">
            <Input id="expiresAt" type="date" {...register('expiresAt')} />
          </FormField>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              {t('create.cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  {t('create.submit')}
                </span>
              ) : (
                t('create.submit')
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
