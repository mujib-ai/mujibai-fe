'use client';

import * as React from 'react';

import { useLocale, useTranslations } from 'next-intl';
import type { PaginationState, Updater } from '@tanstack/react-table';

import type { Plan, PlansFilters } from '@/features/admin/plans';
import { usePlans } from '@/features/admin/plans';

export function usePlansTable(
  filters: PlansFilters,
  setFilters: React.Dispatch<React.SetStateAction<PlansFilters>>
) {
  const locale = useLocale();
  const tColumns = useTranslations('tables.columns');
  const tCommon = useTranslations('common');
  const tPagination = useTranslations('tables.pagination');

  const { plans, isLoading, deletePlan, total } = usePlans({
    title: filters.title,
    type: filters.type,
    page: filters.page,
    limit: filters.limit,
  });

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: (filters.page ?? 1) - 1,
    pageSize: filters.limit ?? 10,
  });

  React.useEffect(() => {
    setPagination({
      pageIndex: (filters.page ?? 1) - 1,
      pageSize: filters.limit ?? 10,
    });
  }, [filters.page, filters.limit]);

  const [editingPlan, setEditingPlan] = React.useState<Plan | null>(null);
  const [viewingPlanId, setViewingPlanId] = React.useState<string | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = React.useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);

  const handleEdit = React.useCallback((plan: Plan) => {
    setEditingPlan(plan);
    setIsUpdateDialogOpen(true);
  }, []);

  const handleView = React.useCallback((plan: Plan) => {
    setViewingPlanId(plan.id);
    setIsViewDialogOpen(true);
  }, []);

  const handleDelete = React.useCallback(
    (id: string) => {
      deletePlan(id);
    },
    [deletePlan]
  );

  const handlePaginationChange = React.useCallback(
    (updater: Updater<PaginationState>) => {
      setPagination(prev => {
        const next = typeof updater === 'function' ? (updater as (old: PaginationState) => PaginationState)(prev) : updater;

        setFilters(current => ({
          ...current,
          page: next.pageIndex + 1,
          limit: next.pageSize,
        }));

        return next;
      });
    },
    [setFilters]
  );

  return {
    locale,
    tColumns,
    tCommon,
    tPagination,
    plans: plans ?? [],
    isLoading,
    total,
    pagination,
    setPagination: handlePaginationChange,
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
  };
}
