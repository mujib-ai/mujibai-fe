import {
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';
import { type Table, flexRender } from '@tanstack/react-table';

type TableHeaderDesktopProps<TData> = {
  table: Table<TData>;
  locale: string;
};

export default function TableHeaderDesktop<TData>({
  table,
  locale,
}: TableHeaderDesktopProps<TData>) {
  return (
    <>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <TableHead
                  key={header.id}
                  className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
    </>
  );
}
