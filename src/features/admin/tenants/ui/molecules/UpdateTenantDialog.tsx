'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';
import type { Client } from '@/shared/types';

import { useUpdateTenantForm } from '../../hooks/useUpdateTenantForm';
import { CreateTenantFormFields } from './CreateTenantFormFields';

interface UpdateTenantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenant: Client | null;
}

export default function UpdateTenantDialog({
  open,
  onOpenChange,
  tenant,
}: UpdateTenantDialogProps) {
  const tCommon = useTranslations('common');
  const tClients = useTranslations('clients');

  const { form, onSubmit, plans, isPending } = useUpdateTenantForm({
    tenant,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="thin-scrollbar max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {tCommon('edit')} {tClients('title')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          <CreateTenantFormFields form={form} plans={plans} />

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
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : tCommon('edit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
