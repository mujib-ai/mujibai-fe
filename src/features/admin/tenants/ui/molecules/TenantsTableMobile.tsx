'use client';

import { TenantsTableMobileSkeleton } from '@/features/admin/tenants/ui/molecules/TenantsTableMobileSkeleton';
import type { Client } from '@/shared/types';
import { Users } from 'lucide-react';

type TenantItem = Pick<
  Client,
  'id' | 'name' | 'email' | 'phone' | 'address' | 'industry' | 'size' | 'isActive'
>;

type TenantsTableMobileProps = {
  tenants: TenantItem[];
  tCommon: (key: string) => string;
  tClients: (key: string) => string;
  tColumns: (key: string) => string;
  tFields: (key: string) => string;
  hasRows: boolean;
  isLoading: boolean;
};

export function TenantsTableMobile({
  tenants,
  tCommon,
  tClients,
  tColumns,
  tFields,
  hasRows,
  isLoading,
}: TenantsTableMobileProps) {
  if (isLoading && !hasRows) {
    return <TenantsTableMobileSkeleton />;
  }

  if (hasRows) {
    return (
      <div className="space-y-3 md:hidden">
        {tenants.map(client => {
          const statusKey = client.isActive ? 'active' : 'inactive';

          return (
            <div
              key={client.id}
              className="border-border bg-background flex flex-col gap-3 rounded-xl border shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 px-3 pt-3">
                <h3 className="text-base font-semibold">{client.name}</h3>
                <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                  {tCommon(statusKey)}
                </span>
              </div>
              <div className="text-muted-foreground flex flex-col gap-1 px-3 pb-3 text-xs">
                {client.email && (
                  <span>
                    <span className="font-medium">{tColumns('email')}:</span>{' '}
                    {client.email}
                  </span>
                )}
                {client.phone && (
                  <span>
                    <span className="font-medium">{tColumns('phone')}:</span>{' '}
                    {client.phone}
                  </span>
                )}
                {client.address && (
                  <span>
                    <span className="font-medium">
                      {tFields('address')}:
                    </span>{' '}
                    {client.address}
                  </span>
                )}
                {client.industry && (
                  <span>
                    <span className="font-medium">
                      {tColumns('industry')}:
                    </span>{' '}
                    {client.industry}
                  </span>
                )}
                {client.size && (
                  <span>
                    <span className="font-medium">
                      {tFields('companySize')}:
                    </span>{' '}
                    {client.size}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="block md:hidden">
      <div className="flex min-h-[220px] w-full flex-col items-center justify-center gap-4 rounded-2xl bg-[#FFFFFFBF] p-6 text-center dark:bg-[#001434A6]">
        <div className="bg-primary/10 rounded-full p-4">
          <Users className="text-primary h-10 w-10" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight">
            {tClients('emptyTitle')}
          </h3>
          <p className="text-muted-foreground text-sm">
            {tClients('emptyDescription')}
          </p>
        </div>
      </div>
    </div>
  );
}
