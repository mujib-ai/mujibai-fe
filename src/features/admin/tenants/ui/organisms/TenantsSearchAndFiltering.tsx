'use client';

import { useTenantsSearchAndFiltering } from '@/features/admin/tenants/hooks/useTenantsSearchAndFiltering';
import type { TenantStatusFilter } from '@/features/admin/tenants/types';
import CreateTenantDialog from '@/features/admin/tenants/ui/molecules/CreateTenantDialog';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import { Input } from '@/shared/components/atoms/ui/input';
import { Filter, Search } from 'lucide-react';

interface TenantsSearchAndFilteringProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: TenantStatusFilter;
  onStatusChange: (status: TenantStatusFilter) => void;
}

export default function TenantsSearchAndFiltering({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: TenantsSearchAndFilteringProps) {
  const { tPlaceholders, tActions, tCommon, filterState, handleFilterChange } =
    useTenantsSearchAndFiltering({ status, onStatusChange });

  return (
    <div className="grid w-full grid-cols-1 items-start gap-3 md:grid-cols-6 lg:grid-cols-6">
      <div className="dark:bg-g-white/10 col-span-3 flex w-full items-center gap-2 rounded-full bg-[#06B6D426] px-3 py-2">
        <Input
          placeholder={tPlaceholders('searchByNameEmailSector')}
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className="flex-1 border-0 py-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
        />
        <div className="text-primary flex items-center rounded-full bg-white p-2 dark:bg-[#FFFFFF26]">
          <Search className="size-4" />
        </div>
      </div>

      <div className="col-span-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              size="icon"
              aria-label={tActions('filterClients')}
              className="h-10 w-10 min-w-10 rounded-lg border-0 bg-[#06B6D4] text-white hover:bg-[#06B6D4]/90"
            >
              <Filter className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuCheckboxItem
              checked={filterState.all}
              onCheckedChange={() => handleFilterChange('all')}
            >
              {tCommon('allStatuses')}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterState.active}
              onCheckedChange={() => handleFilterChange('active')}
            >
              {tCommon('active')}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterState.inactive}
              onCheckedChange={() => handleFilterChange('inactive')}
            >
              {tCommon('inactive')}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <CreateTenantDialog />
      </div>
    </div>
  );
}
