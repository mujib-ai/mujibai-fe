'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';

interface DeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export default function DeleteUserDialog({
  open,
  onOpenChange,
  userName,
  onConfirm,
  isDeleting,
}: DeleteUserDialogProps) {
  const tCommon = useTranslations('common');
  const tUserRoles = useTranslations('userRoles');

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!isDeleting}>
        <DialogHeader>
          <DialogTitle>{tUserRoles('deleteTitle')}</DialogTitle>
          <DialogDescription>
            {tUserRoles('deleteConfirm')}
            {userName && (
              <span className="mt-2 block font-medium text-foreground">
                {userName}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            {tCommon('cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? tUserRoles('deleting') : tCommon('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
