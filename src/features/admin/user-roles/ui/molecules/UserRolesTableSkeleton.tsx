'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';

const ROWS_COUNT = 8;

export function UserRolesTableSkeleton() {
  const tColumns = useTranslations('tables.columns');
  const locale = useLocale();

  return (
    <Table className="my-10 rounded-2xl bg-[#FFFFFFBF] dark:bg-[#001434A6]">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>
            <Skeleton className="size-4 rounded" />
          </TableHead>
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
            {tColumns('role')}
          </TableHead>
          <TableHead
            className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            {tColumns('status')}
          </TableHead>
          <TableHead
            className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            {tColumns('lastActive')}
          </TableHead>
          <TableHead
            className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            {tColumns('actions')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: ROWS_COUNT }).map((_, rowIndex) => (
          <TableRow key={rowIndex} className="hover:bg-transparent">
            <TableCell>
              <Skeleton className="size-4 rounded" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-28 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-36 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-16 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-14 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="size-8 rounded-md" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
