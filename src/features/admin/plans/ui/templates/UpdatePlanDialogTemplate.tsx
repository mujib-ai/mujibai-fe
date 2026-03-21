'use client';

import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';

interface UpdatePlanDialogTemplateProps {
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

export default function UpdatePlanDialogTemplate({
  title,
  children,
  footer,
  open,
  onOpenChange,
  onSubmit,
}: UpdatePlanDialogTemplateProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          {children}
        </form>

        <DialogFooter className="gap-2">
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
