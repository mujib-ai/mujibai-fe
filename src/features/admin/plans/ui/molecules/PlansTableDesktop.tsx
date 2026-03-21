'use client';

import { flexRender } from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';

import { PlansTableSkeleton } from '../atoms/PlansTableSkeleton';

interface PlansTableDesktopProps {
  table: any;
  locale: string;
  isLoading: boolean;
}

export function PlansTableDesktop({
  table,
  locale,
  isLoading,
}: PlansTableDesktopProps) {
  return (
    <div className="hidden rounded-2xl bg-[#FFFFFFBF] md:block dark:bg-[#001434A6]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <TableHead
                  key={header.id}
                  className={locale === 'ar' ? 'text-right' : 'text-left'}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <PlansTableSkeleton />
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: any) => (
              <TableRow
                key={row.id}
                className="transition-colors hover:bg-[#06B6D40F] hover:text-[#06B6D4]"
              >
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
}

