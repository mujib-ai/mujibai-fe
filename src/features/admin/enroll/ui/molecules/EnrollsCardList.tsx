'use client';

import { useTranslations } from 'next-intl';

import type { Enroll } from '@/features/admin/enroll';

import { EnrollCard } from './EnrollCard';

interface EnrollsCardListProps {
  enrollments: Enroll[];
  onApprove?: (enroll: Enroll) => void;
  onReject?: (enroll: Enroll) => void;
  onDelete?: (enroll: Enroll) => void;
  onView?: (enroll: Enroll) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export function EnrollsCardList({
  enrollments,
  onApprove,
  onReject,
  onDelete,
  onView,
  isUpdating,
  isDeleting,
}: EnrollsCardListProps) {
  const tTables = useTranslations('tables');

  if (enrollments.length === 0) {
    return (
      <div className="my-10 flex flex-col items-center justify-center py-12 md:hidden">
        <p className="text-muted-foreground text-center text-sm">
          {tTables('noResults')}
        </p>
      </div>
    );
  }

  return (
    <div className="my-6 space-y-4 md:hidden">
      {enrollments.map(enroll => (
        <EnrollCard
          key={enroll.id}
          enroll={enroll}
          onApprove={onApprove}
          onReject={onReject}
          onDelete={onDelete}
          onView={onView}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}
