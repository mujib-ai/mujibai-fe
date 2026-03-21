'use client';

import * as React from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { useTenant } from '@/features/admin/tenants';
import type { TenantStatusFilter } from '@/features/admin/tenants/types';
import { buildColumns } from '@/shared/components/molecules/admin-dashboard/clientsColumns';
import type { Client } from '@/shared/types';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface UseTenantsTableParams {
  search?: string;
  status?: TenantStatusFilter;
}

export function useTenantsTable(params: UseTenantsTableParams = {}) {
  const { search = '', status = 'all' } = params;
  const tColumns = useTranslations('tables.columns');
  const tCommon = useTranslations('common');
  const tClients = useTranslations('clients');
  const tStates = useTranslations('states.empty');
  const tCreateClientFields = useTranslations('dialogs.createClient.fields');
  const locale = useLocale();

  const {
    tenants: tenantsData,
    tenantsMeta,
    page,
    limit,
    setPage,
    setLimit,
    isLoading,
    deleteTenant,
  } = useTenant({ search, status });
  const [rowSelection, setRowSelection] = React.useState({});
  const [viewingClient, setViewingClient] = React.useState<Client | null>(null);
  const [editingClient, setEditingClient] = React.useState<Client | null>(null);

  const paginationState = React.useMemo(
    () => ({
      pageIndex: page - 1,
      pageSize: limit,
    }),
    [page, limit]
  );

  const handleView = React.useCallback((client: Client) => {
    setViewingClient(client);
  }, []);

  const handleEdit = React.useCallback((client: Client) => {
    setEditingClient(client);
  }, []);

  const handleDelete = React.useCallback(
    (id: string) => {
      if (
        typeof window !== 'undefined' &&
        window.confirm('Delete this client?')
      ) {
        deleteTenant(id);
      }
    },
    [deleteTenant]
  );

  const columns = React.useMemo(
    () =>
      buildColumns(
        { tColumns, tCommon },
        { onView: handleView, onEdit: handleEdit, onDelete: handleDelete },
        { enableSelection: false }
      ),
    [tColumns, tCommon, handleView, handleEdit, handleDelete]
  );

  const table = useReactTable({
    data: tenantsData || [],
    columns,
    rowCount: tenantsMeta?.total || 0,
    manualPagination: true,
    state: {
      rowSelection,
      pagination: paginationState,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: updater => {
      if (typeof updater === 'function') {
        const newState = updater({
          pageIndex: page - 1,
          pageSize: limit,
        });
        setPage(newState.pageIndex + 1);
        setLimit(newState.pageSize);
      } else {
        setPage(updater.pageIndex + 1);
        setLimit(updater.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: row => row.id.toString(),
  });

  const hasRows = table.getRowModel().rows.length > 0;

  const closeViewDialog = React.useCallback(() => {
    setViewingClient(null);
  }, []);

  const closeEditDialog = React.useCallback(() => {
    setEditingClient(null);
  }, []);

  return {
    table,
    columns,
    tenantsData: tenantsData ?? [],
    totalTenants: tenantsMeta?.total ?? 0,
    hasRows,
    locale,
    tColumns,
    tCreateClientFields,
    tCommon,
    tClients,
    tStates,
    isLoading,
    viewingClient,
    editingClient,
    closeViewDialog,
    closeEditDialog,
  };
}
