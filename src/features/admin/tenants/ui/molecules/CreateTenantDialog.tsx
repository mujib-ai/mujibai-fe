'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { CreateTenantForm } from '@/features/admin/tenants';
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
import { Plus } from 'lucide-react';

export default function CreateTenantDialog() {
  const tDialog = useTranslations('dialogs.createClient');
  const tActions = useTranslations('actions');
  const tCommon = useTranslations('common');

  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2 rounded-full py-5 md:w-auto">
          <Plus className="size-4 text-white" />
          <span className="text-white">{tActions('addClient')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="thin-scrollbar max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{tDialog('title')}</DialogTitle>
        </DialogHeader>

        <CreateTenantForm onSuccess={() => setOpen(false)} />

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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
