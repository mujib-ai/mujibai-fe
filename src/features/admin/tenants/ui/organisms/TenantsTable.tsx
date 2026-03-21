'use client';

import type { TenantStatusFilter } from '@/features/admin/tenants/types';
import { useTenantsTable } from '@/features/admin/tenants/hooks/useTenantsTable';
import { TenantsTableDesktop } from '@/features/admin/tenants/ui/molecules/TenantsTableDesktop';
import { TenantsTableMobile } from '@/features/admin/tenants/ui/molecules/TenantsTableMobile';
import UpdateTenantDialog from '@/features/admin/tenants/ui/molecules/UpdateTenantDialog';
import ViewClientDialog from '@/features/admin/tenants/ui/molecules/ViewClientDialog';
import { ClientsTablePagination } from '@/shared/components/molecules/admin-dashboard/ClientsTablePagination';

interface TenantsTableProps {
  search?: string;
  status?: TenantStatusFilter;
}

export default function TenantsTable({ search, status }: TenantsTableProps) {
  const {
    table,
    columns,
    tenantsData,
    hasRows,
    totalTenants,
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
  } = useTenantsTable({ search, status });

  return (
    <div className="my-10 space-y-4">
      <div className="rounded-2xl bg-[#FFFFFFBF] p-4 dark:bg-[#001434A6]">
        <TenantsTableDesktop
          table={table}
          locale={locale}
          columnsLength={columns.length}
          tStates={tStates}
          hasRows={hasRows}
          isLoading={isLoading}
          tClients={tClients}
        />
        <TenantsTableMobile
          tenants={tenantsData ?? []}
          tCommon={tCommon}
          tClients={tClients}
          tColumns={tColumns}
          tFields={tCreateClientFields}
          hasRows={hasRows}
          isLoading={isLoading}
        />
      </div>

      {hasRows && totalTenants > 10 && (
        <ClientsTablePagination table={table} locale={locale} />
      )}

      <ViewClientDialog
        open={!!viewingClient}
        onOpenChange={open => !open && closeViewDialog()}
        client={viewingClient}
      />
      <UpdateTenantDialog
        open={!!editingClient}
        onOpenChange={open => !open && closeEditDialog()}
        tenant={editingClient}
      />
    </div>
  );
}
