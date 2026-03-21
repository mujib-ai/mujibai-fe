import { Item } from '@/shared/types';
import { ColumnDef } from '@tanstack/react-table';
import { CircleCheckBig, EllipsisVertical, Loader } from 'lucide-react';
import { toast } from 'sonner';

import DragHandle from '@/shared/components/atoms/DragHandle';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Button } from '@/shared/components/atoms/ui/button';
import { Checkbox } from '@/shared/components/atoms/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import { Input } from '@/shared/components/atoms/ui/input';
import { Label } from '@/shared/components/atoms/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';
import TableCellViewer from '@/shared/components/organisms/admin-dashboard/overview/TableCellViewer';

export const buildColumns = (
  t: (key: string, values?: Record<string, string | number>) => string
): ColumnDef<Item>[] => [
  {
    id: 'drag',
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label={t('common.selectAll')}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label={t('common.selectRow')}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'header',
    header: t('tables.columns.header'),
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: t('tables.columns.sectionType'),
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.type}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'process',
    header: t('tables.columns.process'),
    cell: ({ row }) => (
      <div className="text-sm">{String(row.original.process ?? '-')}</div>
    ),
  },
  {
    accessorKey: 'progress',
    header: t('tables.columns.progress'),
    cell: ({ row }) => (
      <div>
        <Badge variant="secondary" className="px-2">
          {typeof row.original.progress === 'number'
            ? `${row.original.progress}%`
            : String(row.original.progress ?? '-')}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: t('tables.columns.status'),
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === 'Done' ? (
          <CircleCheckBig className="mr-1 inline-block fill-green-500 dark:fill-green-400" />
        ) : (
          <Loader className="mr-1 inline-block" />
        )}
        {t(
          `states.status.${row.original.status?.toLowerCase().replace(/ /g, '_') ?? 'error'}`
        )}
      </Badge>
    ),
  },
  {
    accessorKey: 'target',
    header: () => (
      <div className="w-full text-right">{t('tables.columns.target')}</div>
    ),
    cell: ({ row }) => (
      <form
        onSubmit={e => {
          e.preventDefault();
          toast.promise(new Promise(r => setTimeout(r, 800)), {
            loading: t('states.loading.saving', { name: row.original.header }),
            success: t('states.status.done'),
            error: t('states.error.generic'),
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-target`} className="sr-only">
          {t('tables.columns.target')}
        </Label>
        <Input
          id={`${row.original.id}-target`}
          defaultValue={row.original.target}
          className="hover:bg-input/30 focus-visible:bg-background h-8 w-16 border-transparent bg-transparent text-right shadow-none"
        />
      </form>
    ),
  },
  {
    accessorKey: 'limit',
    header: () => (
      <div className="w-full text-right">{t('tables.columns.limit')}</div>
    ),
    cell: ({ row }) => (
      <form
        onSubmit={e => {
          e.preventDefault();
          toast.promise(new Promise(r => setTimeout(r, 800)), {
            loading: t('states.loading.saving', { name: row.original.header }),
            success: t('states.status.done'),
            error: t('states.status.error'),
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
          {t('tables.columns.limit')}
        </Label>
        <Input
          id={`${row.original.id}-limit`}
          defaultValue={row.original.limit}
          className="hover:bg-input/30 focus-visible:bg-background h-8 w-16 border-transparent bg-transparent text-right shadow-none"
        />
      </form>
    ),
  },
  {
    accessorKey: 'owner',
    header: t('tables.columns.owner'),
    cell: ({ row }) => (
      <div className="text-sm">{String(row.original.owner ?? '-')}</div>
    ),
  },
  {
    accessorKey: 'reviewer',
    header: t('tables.columns.reviewer'),
    cell: ({ row }) => {
      const isAssigned =
        row.original.reviewer &&
        row.original.reviewer !== t('actions.assignReviewer');
      if (isAssigned) return <div>{row.original.reviewer}</div>;

      return (
        <>
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            {t('tables.columns.reviewer')}
          </Label>
          <Select defaultValue="">
            <SelectTrigger
              size="sm"
              id={`${row.original.id}-reviewer`}
              className="w-38"
            >
              <SelectValue placeholder={t('actions.assignReviewer')} />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
              <SelectItem value="Jamik Tashpulatov">
                Jamik Tashpulatov
              </SelectItem>
            </SelectContent>
          </Select>
        </>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: t('tables.columns.createdAt'),
    cell: ({ row }) =>
      row.original.createdAt ? (
        <div className="text-sm">
          {new Date(row.original.createdAt as string | number).toLocaleDateString()}
        </div>
      ) : (
        <div className="text-sm">-</div>
      ),
  },
  {
    accessorKey: 'updatedAt',
    header: t('tables.columns.updatedAt'),
    cell: ({ row }) =>
      row.original.updatedAt ? (
        <div className="text-sm">
          {new Date(row.original.updatedAt as string | number).toLocaleDateString()}
        </div>
      ) : (
        <div className="text-sm">-</div>
      ),
  },
  {
    id: 'actions',
    cell: () => (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-muted-foreground data-[state=open]:bg-muted flex size-8"
              size="icon"
            >
              <EllipsisVertical />
              <span className="sr-only">{t('tables.openMenu')}</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuCheckboxItem>
              {t('common.edit')}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
              {t('common.copy')}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
              {t('common.favorite')}
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem>
              {t('common.delete')}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
