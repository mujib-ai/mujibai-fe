'use client';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';
import { X, Trash2 } from 'lucide-react';

interface DeleteScriptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  t: (key: string) => string;
  isLoading?: boolean;
}

export default function DeleteScriptDialog({
  open,
  onOpenChange,
  onConfirm,
  t,
  isLoading = false,
}: DeleteScriptDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md border-none bg-[#001434E0] p-0 text-white shadow-2xl backdrop-blur-xl dark:bg-[#001434CC]"
      >
        <div className="relative p-6">
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                <Trash2 className="size-5 text-red-500" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-white">
                  {t('deleteConversationScript')}
                </DialogTitle>
              </DialogHeader>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer text-white/70 transition-all hover:text-white"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="py-4">
            <p className="text-white/80 leading-relaxed">
              {t('deleteConfirmationMessage')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full rounded-full border-cyan-500 bg-transparent text-cyan-500 hover:bg-cyan-500/10"
            >
              {t('cancel')}
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="w-full rounded-full bg-red-500 text-white hover:bg-red-600 border-none"
            >
              {isLoading ? '...' : t('delete')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
