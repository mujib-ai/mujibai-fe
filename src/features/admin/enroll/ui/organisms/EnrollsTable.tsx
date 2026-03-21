'use client';

import * as React from 'react';

import { useLocale, useTranslations } from 'next-intl';

import {
  ENROLL_STATUS_STYLE_MAP,
  EnrollStatus,
  type Enroll,
} from '@/features/admin/enroll';

import { Badge } from '@/shared/components/atoms/ui/badge';
import { Button } from '@/shared/components/atoms/ui/button';
import { Checkbox } from '@/shared/components/atoms/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';
import { Check, EllipsisVertical, Eye, Trash2, X } from 'lucide-react';

import { useDeleteEnrollment } from '../../hooks/useDeleteEnrollment';
import { useUpdateEnrollmentStatus } from '../../hooks/useUpdateEnrollmentStatus';
import DeleteEnrollmentDialog from '../molecules/DeleteEnrollmentDialog';
import { EnrollsCardList } from '../molecules/EnrollsCardList';
import ViewEnrollmentDialog from '../molecules/ViewEnrollmentDialog';

interface EnrollsTableProps {
  enrollments?: Enroll[] | null;
  enrollmentsMeta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  page?: number;
  setPage?: (page: number) => void;
  nextPage?: () => void;
  prevPage?: () => void;
}

export default function EnrollsTable({
  enrollments,
  enrollmentsMeta,
  isLoading,
  isFetching,
  isError,
  page = 1,
  setPage,
  nextPage,
  prevPage,
}: EnrollsTableProps) {
  const tColumns = useTranslations('tables.columns');
  const tCommon = useTranslations('common');
  const tPagination = useTranslations('tables.pagination');
  const tTables = useTranslations('tables');
  const locale = useLocale();
  const [selected, setSelected] = React.useState<(string | number)[]>([]);
  const [viewingEnrollId, setViewingEnrollId] = React.useState<
    string | number | null
  >(null);
  const [enrollToDelete, setEnrollToDelete] = React.useState<Enroll | null>(
    null
  );

  const safeEnrollments = (() => {
    if (enrollments == null) return [];
    if (Array.isArray(enrollments)) return enrollments;
    const items = (enrollments as { items?: Enroll[] }).items;
    return Array.isArray(items) ? items : [];
  })();

  const safeMeta = enrollmentsMeta && typeof enrollmentsMeta === 'object'
    ? enrollmentsMeta
    : undefined;

  const allChecked =
    safeEnrollments.length > 0 && selected.length === safeEnrollments.length;

  const toggleAll = () => {
    setSelected(
      allChecked ? [] : safeEnrollments.map(e => e.id)
    );
  };

  const toggleOne = (id: string | number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const tEnrollmentForms = useTranslations('enrollmentForms');
  const updateStatusMutation = useUpdateEnrollmentStatus();
  const deleteMutation = useDeleteEnrollment();

  const handleApprove = (enroll: Enroll) => {
    updateStatusMutation.mutate({ id: enroll.id, action: 'approve' });
  };

  const handleReject = (enroll: Enroll) => {
    updateStatusMutation.mutate({ id: enroll.id, action: 'reject' });
  };

  const handleDeleteClick = (enroll: Enroll) => {
    setEnrollToDelete(enroll);
  };

  const handleDeleteConfirm = () => {
    if (enrollToDelete) {
      deleteMutation.mutate(enrollToDelete.id);
    }
  };

  const renderStatusBadge = (status: Enroll['status']) => {
    const labelMap: Record<EnrollStatus, string> = {
      [EnrollStatus.PENDING]: tEnrollmentForms('statusPending'),
      [EnrollStatus.APPROVED]: tEnrollmentForms('statusApproved'),
      [EnrollStatus.REJECTED]: tEnrollmentForms('statusRejected'),
    };
    const styles =
      ENROLL_STATUS_STYLE_MAP[status] ??
      ENROLL_STATUS_STYLE_MAP[EnrollStatus.PENDING];
    const label = labelMap[status] ?? status;

    return (
      <Badge variant="secondary" className={styles}>
        {label}
      </Badge>
    );
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString();
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="my-10 flex items-center justify-center py-12">
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="my-10 flex items-center justify-center py-12">
        <p className="text-muted-foreground text-sm">
          {tTables('loadError')}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <Table className="my-10 rounded-2xl bg-[#FFFFFFBF] dark:bg-[#001434A6]">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>
              <Checkbox checked={allChecked} onCheckedChange={toggleAll} />
            </TableHead>
            <TableHead
              className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
            >
              {tColumns('name')}
            </TableHead>
            <TableHead
              className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
            >
              {tColumns('company')}
            </TableHead>
            <TableHead
              className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
            >
              {tColumns('email')}
            </TableHead>
            <TableHead
              className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
            >
              {tColumns('phone')}
            </TableHead>
            <TableHead
              className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
            >
              {tColumns('industry')}
            </TableHead>
            <TableHead
              className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
            >
              {tColumns('status')}
            </TableHead>
            <TableHead
              className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
            >
              {tColumns('submittedOn')}
            </TableHead>
            <TableHead
              className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
            >
              {tColumns('actions')}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {safeEnrollments.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={9}
                className="text-muted-foreground py-12 text-center"
              >
                {tTables('noResults')}
              </TableCell>
            </TableRow>
          ) : (
            safeEnrollments.map(enroll => (
              <TableRow
                key={enroll.id}
                className="hover:bg-transparent"
              >
                <TableCell>
                  <Checkbox
                    checked={selected.includes(enroll.id)}
                    onCheckedChange={() => toggleOne(enroll.id)}
                  />
                </TableCell>
                <TableCell>{enroll.name}</TableCell>
                <TableCell>{enroll.company}</TableCell>
                <TableCell>{enroll.email}</TableCell>
                <TableCell>{enroll.phone}</TableCell>
                <TableCell>{enroll.industry}</TableCell>
                <TableCell>{renderStatusBadge(enroll.status)}</TableCell>
                <TableCell>{formatDate(enroll.submittedOn)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                      >
                        <EllipsisVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setViewingEnrollId(enroll.id)}
                      >
                        <Eye className="mr-2 size-4" />
                        {tCommon('view')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleApprove(enroll)}
                        disabled={
                          enroll.status === EnrollStatus.APPROVED ||
                          updateStatusMutation.isPending
                        }
                        className="text-green-600 focus:text-green-600 dark:text-green-400 dark:focus:text-green-400"
                      >
                        <Check className="mr-2 size-4" />
                        {tEnrollmentForms('statusApproved')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleReject(enroll)}
                        disabled={
                          enroll.status === EnrollStatus.REJECTED ||
                          updateStatusMutation.isPending
                        }
                        className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                      >
                        <X className="mr-2 size-4" />
                        {tEnrollmentForms('statusRejected')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(enroll)}
                        disabled={deleteMutation.isPending}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 size-4" />
                        {tCommon('delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      </div>

      <EnrollsCardList
        enrollments={safeEnrollments}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelete={handleDeleteClick}
        onView={enroll => setViewingEnrollId(enroll.id)}
        isUpdating={updateStatusMutation.isPending}
        isDeleting={deleteMutation.isPending}
      />

      <ViewEnrollmentDialog
        open={!!viewingEnrollId}
        onOpenChange={open => !open && setViewingEnrollId(null)}
        enrollId={viewingEnrollId}
      />

      <DeleteEnrollmentDialog
        open={!!enrollToDelete}
        onOpenChange={open => !open && setEnrollToDelete(null)}
        enrollmentName={enrollToDelete?.name}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteMutation.isPending}
      />

      {safeMeta && safeMeta.totalPages > 1 && nextPage && prevPage && (
        <div className="flex items-center justify-between py-4">
          <p className="text-muted-foreground text-sm">
            {tPagination('page')} {page} {tPagination('of')} {safeMeta.totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={page <= 1 || isFetching}
            >
              {tPagination('goToPrev')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={
                page >= safeMeta.totalPages || isFetching
              }
            >
              {tPagination('goToNext')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
