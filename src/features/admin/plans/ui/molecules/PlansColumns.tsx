'use client';

import type { Plan } from '@/features/admin/plans';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, EllipsisVertical, Eye, Trash2 } from 'lucide-react';

interface ActionsProps {
  row: Plan;
  onDelete: (id: string) => void;
  onEdit: (plan: Plan) => void;
  onView: (plan: Plan) => void;
  tCommon: (key: string) => string;
}

const ActionsCell = ({
  row,
  onDelete,
  onEdit,
  onView,
  tCommon,
}: ActionsProps) => {
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
          <Eye className="mr-2 size-4" />
          {tCommon('view')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(row)}>
          <Edit className="mr-2 size-4" />
          {tCommon('edit')}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500 focus:text-red-500"
          onClick={() => onDelete(row.id)}
        >
          <Trash2 className="mr-2 size-4 text-red-500" />
          {tCommon('delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const buildColumns = (
  {
    tColumns,
    tCommon,
  }: { tColumns: (key: string) => string; tCommon: (key: string) => string },
  onDelete: (id: string) => void,
  onEdit: (plan: Plan) => void,
  onView: (plan: Plan) => void
): ColumnDef<Plan>[] => {
  return [
    {
      accessorKey: 'title',
      header: tColumns('name'),
    },
    {
      accessorKey: 'price',
      header: tColumns('price'),
      cell: ({ row }) => {
        return <span>{row.original.price}</span>;
      },
    },
    {
      id: 'includes',
      header: tColumns('includes'),
      accessorFn: row => row.features?.join(', ') || '',
    },
    {
      id: 'actions',
      header: tColumns('actions'),
      cell: ({ row }) => (
        <ActionsCell
          row={row.original}
          onDelete={onDelete}
          onEdit={onEdit}
          onView={onView}
          tCommon={tCommon}
        />
      ),
    },
  ];
};
