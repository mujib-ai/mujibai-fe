'use client';

import * as React from 'react';

import type { PlansFilters } from '@/features/admin/plans';
import { usePlansTable } from '@/features/admin/plans/hooks/usePlansTable';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { buildColumns } from '../molecules/PlansColumns';
import { PlansEmptyState } from '../molecules/PlansEmptyState';
import { PlansTableDesktop } from '../molecules/PlansTableDesktop';
import { PlansTableMobile } from '../molecules/PlansTableMobile';
import { PlansTablePagination } from '../molecules/PlansTablePagination';
import UpdatePlanDialog from './UpdatePlanDialog';
import ViewPlanDialog from './ViewPlanDialog';

interface PlansTableProps {
  filters: PlansFilters;
  setFilters: React.Dispatch<React.SetStateAction<PlansFilters>>;
}

export default function PlansTable({ filters, setFilters }: PlansTableProps) {
  const {
    locale,
    tColumns,
    tCommon,
    tPagination,
    plans,
    isLoading,
    total,
    pagination,
    setPagination,
    editingPlan,
    viewingPlanId,
    isUpdateDialogOpen,
    isViewDialogOpen,
    setIsUpdateDialogOpen,
    setIsViewDialogOpen,
    setEditingPlan,
    setViewingPlanId,
    handleEdit,
    handleView,
    handleDelete,
  } = usePlansTable(filters, setFilters);

  const columns = React.useMemo(
    () =>
      buildColumns({ tColumns, tCommon }, handleDelete, handleEdit, handleView),
    [tColumns, tCommon, handleDelete, handleEdit, handleView]
  );

  const table = useReactTable({
    data: plans ?? [],
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: row => row.id,
  });

  const paginatedPlans = table.getRowModel().rows.map(row => row.original);

  if (!isLoading && (!plans || plans.length === 0)) {
    return <PlansEmptyState />;
  }

  return (
    <div className="my-10 space-y-4">
      <PlansTableDesktop table={table} locale={locale} isLoading={isLoading} />

      <PlansTableMobile
        plans={paginatedPlans}
        isLoading={isLoading}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
      />

      {total > 10 && <PlansTablePagination table={table} t={tPagination} />}

      <UpdatePlanDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        plan={editingPlan}
        onClose={() => {
          setIsUpdateDialogOpen(false);
          setEditingPlan(null);
        }}
      />

      <ViewPlanDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        planId={viewingPlanId}
        onClose={() => {
          setIsViewDialogOpen(false);
          setViewingPlanId(null);
        }}
      />
    </div>
  );
}
