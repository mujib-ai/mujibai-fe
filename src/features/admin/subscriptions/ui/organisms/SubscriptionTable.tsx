'use client';

import { useLocale, useTranslations } from 'next-intl';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';

import { useSubscriptions } from '@/features/admin/subscriptions/hooks/useSubscriptions';
import SubscriptionPlanBadge from '@/features/admin/subscriptions/ui/atoms/SubscriptionPlanBadge';
import SubscriptionUsageCell from '@/features/admin/subscriptions/ui/atoms/SubscriptionUsageCell';

interface SubscriptionTableProps {
  q?: string;
  tenantId?: string;
  planId?: string;
  isActive?: boolean;
}

export default function SubscriptionTable({
  q = '',
  tenantId,
  planId,
  isActive,
}: SubscriptionTableProps) {
  const locale = useLocale();
  const tColumns = useTranslations('tables.columns');
  const tTables = useTranslations('tables');
  const tClients = useTranslations('clients');
  const { subscriptions, isLoading } = useSubscriptions({
    q,
    tenantId,
    planId,
    isActive,
  });

  return (
    <Table className="my-10 rounded-2xl bg-[#FFFFFFBF] dark:bg-[#001434A6]">
      <TableHeader>
        <TableRow>
          <TableHead
            className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            {tColumns('name')}
          </TableHead>
          <TableHead
            className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            {tColumns('email')}
          </TableHead>
          <TableHead
            className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            {tColumns('plan')}
          </TableHead>
          <TableHead
            className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            {tClients('clientUsage')}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : subscriptions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center">
              {tTables('noResults')}
            </TableCell>
          </TableRow>
        ) : (
          subscriptions.map(subscription => (
          <TableRow
            key={subscription.id}
            className="transition-colors hover:bg-white/10"
          >
            <TableCell>{subscription.name}</TableCell>
            <TableCell>{subscription.email}</TableCell>
            <TableCell>
              <SubscriptionPlanBadge plan={subscription.plan} />
            </TableCell>
            <TableCell>
              <SubscriptionUsageCell value={subscription.clientUsage} />
            </TableCell>
          </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
