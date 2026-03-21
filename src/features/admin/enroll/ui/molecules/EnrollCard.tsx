'use client';

import { useTranslations } from 'next-intl';

import {
  ENROLL_STATUS_STYLE_MAP,
  EnrollStatus,
  useEnroll,
  type Enroll,
} from '@/features/admin/enroll';

import { Badge } from '@/shared/components/atoms/ui/badge';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import { Check, EllipsisVertical, Eye, Trash2, X } from 'lucide-react';

interface EnrollCardProps {
  enroll: Enroll;
  onApprove?: (enroll: Enroll) => void;
  onReject?: (enroll: Enroll) => void;
  onDelete?: (enroll: Enroll) => void;
  onView?: (enroll: Enroll) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}



export function EnrollCard({
  enroll,
  onApprove,
  onReject,
  onDelete,
  onView,
  isUpdating,
  isDeleting,
}: EnrollCardProps) {
  const { formatDate } = useEnroll();
  const tColumns = useTranslations('tables.columns');
  const tCommon = useTranslations('common');
  const tEnrollmentForms = useTranslations('enrollmentForms');

  const statusStyles =
    ENROLL_STATUS_STYLE_MAP[enroll.status] ??
    ENROLL_STATUS_STYLE_MAP[EnrollStatus.PENDING];
  const statusLabel =
    enroll.status === EnrollStatus.PENDING
      ? tEnrollmentForms('statusPending')
      : enroll.status === EnrollStatus.APPROVED
        ? tEnrollmentForms('statusApproved')
        : tEnrollmentForms('statusRejected');

  return (
    <div className="border-border flex flex-col gap-3 rounded-xl border bg-[#FFFFFFBF] p-4 shadow-sm transition-all hover:shadow-md dark:bg-[#001434A6]">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold">{enroll.name}</h3>
        <Badge variant="secondary" className={statusStyles}>
          {statusLabel}
        </Badge>
      </div>
      <div className="text-muted-foreground flex flex-col gap-1.5 text-sm">
        {enroll.company && (
          <div className="flex gap-2">
            <span className="font-medium shrink-0">{tColumns('company')}:</span>
            <span>{enroll.company}</span>
          </div>
        )}
        {enroll.email && (
          <div className="flex gap-2">
            <span className="font-medium shrink-0">{tColumns('email')}:</span>
            <span className="truncate">{enroll.email}</span>
          </div>
        )}
        {enroll.phone && (
          <div className="flex gap-2">
            <span className="font-medium shrink-0">{tColumns('phone')}:</span>
            <span>{enroll.phone}</span>
          </div>
        )}
        {enroll.industry && (
          <div className="flex gap-2">
            <span className="font-medium shrink-0">{tColumns('industry')}:</span>
            <span>{enroll.industry}</span>
          </div>
        )}
        <div className="flex gap-2">
          <span className="font-medium shrink-0">{tColumns('submittedOn')}:</span>
          <span>{formatDate(enroll.submittedOn)}</span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="mt-1 h-8 w-8 hover:bg-primary/10 hover:text-primary"
          >
            <EllipsisVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onView?.(enroll)}>
            <Eye className="mr-2 size-4" />
            {tCommon('view')}
          </DropdownMenuItem>
          {onApprove && (
            <DropdownMenuItem
              onClick={() => onApprove(enroll)}
              disabled={
                enroll.status === EnrollStatus.APPROVED || isUpdating
              }
              className="text-green-600 focus:text-green-600 dark:text-green-400 dark:focus:text-green-400"
            >
              <Check className="mr-2 size-4" />
              {tEnrollmentForms('statusApproved')}
            </DropdownMenuItem>
          )}
          {onReject && (
            <DropdownMenuItem
              onClick={() => onReject(enroll)}
              disabled={
                enroll.status === EnrollStatus.REJECTED || isUpdating
              }
              className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
            >
              <X className="mr-2 size-4" />
              {tEnrollmentForms('statusRejected')}
            </DropdownMenuItem>
          )}
          {onDelete && (
            <DropdownMenuItem
              onClick={() => onDelete(enroll)}
              disabled={isDeleting}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 size-4" />
              {tCommon('delete')}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
