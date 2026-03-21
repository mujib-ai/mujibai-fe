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

interface DeleteEnrollmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enrollmentName?: string;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export default function DeleteEnrollmentDialog({
  open,
  onOpenChange,
  enrollmentName,
  onConfirm,
  isDeleting,
}: DeleteEnrollmentDialogProps) {
  const tCommon = useTranslations('common');
  const tEnrollmentForms = useTranslations('enrollmentForms');

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!isDeleting}>
        <DialogHeader>
          <DialogTitle>{tEnrollmentForms('deleteTitle')}</DialogTitle>
          <DialogDescription>
            {tEnrollmentForms('deleteConfirm')}
            {enrollmentName && (
              <span className="mt-2 block font-medium text-foreground">
                {enrollmentName}
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
            {isDeleting ? tEnrollmentForms('deleting') : tCommon('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
