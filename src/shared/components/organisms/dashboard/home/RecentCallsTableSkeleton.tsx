'use client';

import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';

const SKELETON_ROWS = 4;
const BAR = 'rounded-md bg-primary/10 dark:bg-white/10';

export default function RecentCallsTableSkeleton({
  title,
  alignClass,
}: {
  title: string;
  alignClass: string;
}) {
  const rows = Array.from({ length: SKELETON_ROWS });

  return (
    <Table
      aria-label={title}
      className="min-w-160 rounded-xl bg-[#FFFFFFBF] dark:bg-[#001434A6]"
    >
      <TableHeader>
        <TableRow>
          <TableHead
            scope="row"
            className={`${alignClass} text-foreground px-4 py-3 font-medium`}
          >
            <Skeleton className={`${BAR} h-4 w-16`} />
          </TableHead>
          <TableHead
            className={`${alignClass} text-foreground px-4 py-3 font-medium`}
          >
            <Skeleton className={`${BAR} h-4 w-16`} />
          </TableHead>
          <TableHead
            className={`${alignClass} text-foreground px-4 py-3 font-medium`}
          >
            <Skeleton className={`${BAR} h-4 w-16`} />
          </TableHead>
          <TableHead
            className={`${alignClass} text-foreground px-4 py-3 font-medium`}
          >
            <Skeleton className={`${BAR} h-4 w-16`} />
          </TableHead>
          <TableHead className="text-foreground px-4 py-3 text-center font-medium">
            <Skeleton className={`${BAR} mx-auto h-4 w-16`} />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((_, index) => (
          <TableRow key={index} className="border-t border-transparent">
            <TableCell className="px-4 py-3">
              <Skeleton className={`${BAR} h-4 w-32`} />
            </TableCell>
            <TableCell className="px-4 py-3">
              <Skeleton className={`${BAR} h-4 w-16`} />
            </TableCell>
            <TableCell className="px-4 py-3">
              <Skeleton className={`${BAR} h-4 w-28`} />
            </TableCell>
            <TableCell className="px-4 py-3">
              <Skeleton className={`${BAR} h-4 w-20`} />
            </TableCell>
            <TableCell className="px-4 py-3 text-center">
              <Skeleton className={`${BAR} mx-auto h-5 w-16 rounded-full`} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
