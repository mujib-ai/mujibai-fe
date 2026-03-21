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

type TenantsTableDesktopSkeletonProps = {
  columnsLength: number;
};

export function TenantsTableDesktopSkeleton({
  columnsLength,
}: TenantsTableDesktopSkeletonProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-[#06B6D426] hover:bg-transparent">
          {Array.from({ length: columnsLength }).map((_, colIndex) => (
            <TableHead key={colIndex}>
              <Skeleton className="h-4 w-full max-w-[100px]" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <TableRow
            key={rowIndex}
            className="border-[#06B6D426] transition-colors hover:bg-[#06B6D40F]"
          >
            {Array.from({ length: columnsLength }).map((_, colIndex) => (
              <TableCell key={colIndex} className="py-4">
                <Skeleton className="h-4 w-full max-w-[160px] rounded-md" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

