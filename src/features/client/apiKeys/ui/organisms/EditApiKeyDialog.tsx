'use client';

import { useEffect } from 'react';

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
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { API_KEY_SCOPES } from '../../constants';
import type { ApiKeyPublic, ApiKeyScope } from '../../types';

const editApiKeySchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name must be at most 255 characters'),
  scopes: z.array(z.string()),
  expiresAt: z.string().optional(),
});

type EditApiKeyFormData = z.infer<typeof editApiKeySchema>;

interface EditApiKeyDialogProps {
  apiKey: ApiKeyPublic | null;
  onClose: () => void;
  onSubmit: (
    apiKeyId: string,
    changes: {
      name?: string;
      scopes?: ApiKeyScope[];
      expiresAt?: string;
    }
  ) => Promise<void>;
  loading: boolean;
}

function toDateInputValue(expiresAt?: string): string {
  if (!expiresAt) return '';
  const date = new Date(expiresAt);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

export default function EditApiKeyDialog({
  apiKey,
  onClose,
  onSubmit,
  loading,
}: EditApiKeyDialogProps) {
  const t = useTranslations('APIKeys');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditApiKeyFormData>({
    resolver: zodResolver(editApiKeySchema),
    defaultValues: { name: '', scopes: [], expiresAt: '' },
  });

  useEffect(() => {
    if (apiKey) {
      reset({
        name: apiKey.name,
        scopes: apiKey.scopes,
        expiresAt: toDateInputValue(apiKey.expiresAt),
      });
    }
  }, [apiKey, reset]);

  if (!apiKey) return null;

  const submit = async (values: EditApiKeyFormData) => {
    const changes: {
      name?: string;
      scopes?: ApiKeyScope[];
      expiresAt?: string;
    } = {};

    if (values.name !== apiKey.name) {
      changes.name = values.name;
    }

    const nextScopes = values.scopes as ApiKeyScope[];
    const scopesChanged =
      nextScopes.length !== apiKey.scopes.length ||
      nextScopes.some(scope => !apiKey.scopes.includes(scope));
    if (scopesChanged) {
      changes.scopes = nextScopes;
    }

    const nextExpiresAt = values.expiresAt
      ? new Date(values.expiresAt).toISOString()
      : undefined;
    if (nextExpiresAt !== apiKey.expiresAt) {
      changes.expiresAt = nextExpiresAt;
    }

    if (Object.keys(changes).length === 0) {
      onClose();
      return;
    }

    await onSubmit(apiKey.id, changes);
  };

  return (
    <Dialog open={!!apiKey} onOpenChange={openState => !openState && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('edit.title')}</DialogTitle>
          <DialogDescription>{t('edit.description')}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
          <FormField
            label={t('name')}
            htmlFor="edit-name"
            error={errors.name?.message}
          >
            <Input id="edit-name" {...register('name')} />
          </FormField>

          <Controller
            control={control}
            name="scopes"
            render={({ field }) => (
              <FormField label={t('create.scopes')} htmlFor="edit-scopes">
                <div className="flex flex-col gap-2">
                  {API_KEY_SCOPES.map(scope => {
                    const checked = field.value.includes(scope);
                    return (
                      <label
                        key={scope}
                        htmlFor={`edit-scope-${scope}`}
                        className="flex cursor-pointer items-center gap-2 text-sm"
                      >
                        <Checkbox
                          id={`edit-scope-${scope}`}
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

          <FormField label={t('create.expiresAt')} htmlFor="edit-expiresAt">
            <Input id="edit-expiresAt" type="date" {...register('expiresAt')} />
          </FormField>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              {t('create.cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  {t('edit.submit')}
                </span>
              ) : (
                t('edit.submit')
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
