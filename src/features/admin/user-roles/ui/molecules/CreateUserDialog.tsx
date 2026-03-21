'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { Loader2, Plus } from 'lucide-react';

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

import { useCreateUserForm } from '../../hooks/useCreateUserForm';
import { FormField } from '../atoms';

export default function CreateUserDialog() {
  const t = useTranslations('dialogs.createUser');
  const tActions = useTranslations('actions');
  const tCommon = useTranslations('common');
  const tPlaceholders = useTranslations('placeholders');
  const [open, setOpen] = React.useState(false);

  const { form, handleSubmit, onSubmit, errors, isSubmitting } =
    useCreateUserForm(() => setOpen(false));
  const { register } = form;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full py-5">
          <Plus className="size-4" />
          {tActions('addNewUser')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            id="name"
            label={t('fields.fullName')}
            placeholder={tPlaceholders('enterFullName')}
            error={errors.name?.message}
            register={register('name')}
          />

          <FormField
            id="email"
            label={t('fields.email')}
            placeholder={tPlaceholders('enterEmail')}
            error={errors.email?.message}
            type="email"
            register={register('email')}
          />

          <FormField
            id="password"
            label={t('fields.password')}
            placeholder={tPlaceholders('enterPassword')}
            error={errors.password?.message}
            type="password"
            register={register('password')}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="border-primary text-primary hover:text-primary rounded-full px-8 hover:bg-transparent"
              >
                {tCommon('cancel')}
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-cyan-500 px-8 text-white hover:bg-cyan-600"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  {tActions('createUser')}
                </span>
              ) : (
                tActions('createUser')
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
