'use client';

import { useTranslations } from 'next-intl';

import { ENROLL_STATUS_STYLE_MAP, EnrollStatus } from '@/features/admin/enroll';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';

import { useEnrollment } from '../../hooks/useEnrollment';

interface ViewEnrollmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enrollId: string | number | null;
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-muted-foreground text-xs font-medium">{label}</span>
      <span className="text-foreground text-sm">{value}</span>
    </div>
  );
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString();
  } catch {
    return dateStr;
  }
}

export default function ViewEnrollmentDialog({
  open,
  onOpenChange,
  enrollId,
}: ViewEnrollmentDialogProps) {
  const tColumns = useTranslations('tables.columns');
  const tCommon = useTranslations('common');
  const tEnrollmentForms = useTranslations('enrollmentForms');

  const { enrollment, isLoading } = useEnrollment(enrollId);

  const statusLabel =
    enrollment?.status === EnrollStatus.PENDING
      ? tEnrollmentForms('statusPending')
      : enrollment?.status === EnrollStatus.APPROVED
        ? tEnrollmentForms('statusApproved')
        : tEnrollmentForms('statusRejected');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden border-0 bg-white/95 p-0 shadow-2xl backdrop-blur-xl sm:max-w-lg dark:bg-slate-900/95">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              enrollment?.name ?? tCommon('view')
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200/50 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-800/50 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : enrollment ? (
              <>
                <div className="flex items-center justify-between gap-4 rounded-xl bg-linear-to-br from-cyan-50 to-blue-50 p-4 dark:from-cyan-900/20 dark:to-blue-900/20">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {tColumns('status')}
                  </span>
                  <Badge
                    variant="secondary"
                    className={
                      ENROLL_STATUS_STYLE_MAP[enrollment.status] ??
                      ENROLL_STATUS_STYLE_MAP[EnrollStatus.PENDING]
                    }
                  >
                    {statusLabel}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoRow label={tColumns('name')} value={enrollment.name} />
                  <InfoRow label={tColumns('email')} value={enrollment.email} />
                  <InfoRow label={tColumns('phone')} value={enrollment.phone} />
                  <InfoRow label={tColumns('company')} value={enrollment.company} />
                  <InfoRow label={tColumns('industry')} value={enrollment.industry} />
                  <InfoRow
                    label={tColumns('submittedOn')}
                    value={formatDate(enrollment.submittedOn) ?? undefined}
                  />
                </div>
              </>
            ) : (
              <div className="text-muted-foreground flex min-h-[120px] items-center justify-center">
                —
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="border-t border-gray-100 px-6 py-4 dark:border-gray-800">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full rounded-xl border-gray-200 font-semibold hover:bg-gray-50 hover:text-gray-900 sm:w-auto dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              {tCommon('close')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
