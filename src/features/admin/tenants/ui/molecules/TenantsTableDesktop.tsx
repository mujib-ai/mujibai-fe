'use client';

import { TenantsTableDesktopSkeleton } from '@/features/admin/tenants/ui/molecules/TenantsTableDesktopSkeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/shared/components/atoms/ui/table';
import { flexRender } from '@tanstack/react-table';

import NoResultsTable from '../atoms/NoResultsTable';
import TableHeaderDesktop from '../atoms/TableHeaderDesktop';

type TenantsTableDesktopProps = {
  table: any;
  locale: string;
  columnsLength: number;
  tStates: (key: string) => string;
  tClients: (key: string) => string;
  hasRows: boolean;
  isLoading: boolean;
};

export function TenantsTableDesktop({
  table,
  locale,
  columnsLength,
  tStates,
  tClients,
  hasRows,
  isLoading,
}: TenantsTableDesktopProps) {
  if (isLoading && !hasRows) {
    return (
      <div className="hidden md:block">
        <TenantsTableDesktopSkeleton columnsLength={columnsLength} />
      </div>
    );
  }

  if (!hasRows) {
    return (
      <div className="hidden md:block">
        <Table>
          <TableBody>
            <NoResultsTable columnsLength={columnsLength} tStates={tStates} />
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="hidden md:block">
      <Table>
        <TableHeaderDesktop table={table} locale={locale} />

        <TableBody>
          {hasRows
            ? table.getRowModel().rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="transition-colors hover:bg-[#06B6D40F] hover:text-[#06B6D4] data-[state=selected]:bg-[#06B6D40F] data-[state=selected]:text-[#06B6D4]"
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
            : null}
        </TableBody>
      </Table>
    </div>
  );
}
