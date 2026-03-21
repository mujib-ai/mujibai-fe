'use client';

import { Badge } from '@/shared/components/atoms/ui/badge';
import { Button } from '@/shared/components/atoms/ui/button';
import { Checkbox } from '@/shared/components/atoms/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import { Client } from '@/shared/types';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, EllipsisVertical, Eye, Trash2 } from 'lucide-react';

export { type Client };

export interface ColumnTranslations {
  tColumns: (key: string) => string;
  tCommon: (key: string) => string;
}

export interface ClientActions {
  onView: (client: Client) => void;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

const ActionsCell = ({
  row,
  onView,
  onEdit,
  onDelete,
  tCommon,
}: {
  row: Client;
  onView: (client: Client) => void;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
  tCommon: (key: string) => string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-[#06B6D40F] hover:text-[#06B6D4]"
        >
          <EllipsisVertical className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onView(row)}>
          <Eye className="mr-2 size-4 text-[#06B6D4]" />
          {tCommon('view')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(row)}>
          <Edit className="mr-2 size-4 text-amber-500" />
          {tCommon('edit')}
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          className="text-red-600 focus:text-red-600 dark:text-red-400"
          onClick={() => onDelete(row.id)}
        >
          <Trash2 className="mr-2 size-4" />
          {tCommon('delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const buildColumns = (
  { tColumns, tCommon }: ColumnTranslations,
  { onView, onEdit, onDelete }: ClientActions,
  options?: { enableSelection?: boolean }
): ColumnDef<Client>[] => {
  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: 'name',
      header: tColumns('name'),
    },
    {
      accessorKey: 'industry',
      header: tColumns('industry'),
    },
    {
      accessorKey: 'phone',
      header: tColumns('phone'),
      cell: ({ row }) => (
        <div className="text-left" dir="ltr">
          {row.getValue('phone')}
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: tColumns('email'),
    },
    {
      accessorKey: 'subscriptionActive',
      header: tColumns('status'),
      cell: ({ row }) => {
        console.log(row.original);
        const status = row.original.isActive;
        const isActive = status === true;
        const styles = isActive
          ? 'bg-green-500/20 text-green-600 dark:text-green-400'
          : 'bg-red-500/20 text-red-600 dark:text-red-400';

        return (
          <Badge variant="secondary" className={styles}>
            {isActive ? tCommon('active') : tCommon('inactive')}
          </Badge>
        );
      },
    },

    {
      accessorKey: 'createdAt',
      header: tColumns('startDate'),
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return date.toLocaleDateString();
      },
    },
    {
      id: 'actions',
      header: tColumns('actions'),
      cell: ({ row }) => (
        <ActionsCell
          row={row.original}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          tCommon={tCommon}
        />
      ),
    },
  ];

  if (options?.enableSelection !== false) {
    columns.unshift({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label={tCommon('selectAll')}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label={tCommon('selectRow')}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    });
  }

  return columns;
};
