import { Item } from '@/shared/types';
import { Table } from '@tanstack/react-table';
import { ChevronDown, LayoutDashboard, Plus } from 'lucide-react';

import { Badge } from '@/shared/components/atoms/ui/badge';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import { Label } from '@/shared/components/atoms/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';
import { TabsList, TabsTrigger } from '@/shared/components/atoms/ui/tabs';

interface AdminOverviewToolbarProps {
  table: Table<Item>;
  t: (key: string, values?: Record<string, string | number>) => string;
}

export function AdminOverviewToolbar({ table, t }: AdminOverviewToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 lg:px-6">
      <Label htmlFor="view-selector" className="sr-only">
        {t('common.view')}
      </Label>
      <Select defaultValue="outline">
        <SelectTrigger
          className="flex w-fit @4xl/main:hidden"
          size="sm"
          id="view-selector"
        >
          <SelectValue placeholder={t('tables.selectView')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="outline">{t('overview.outline')}</SelectItem>
          <SelectItem value="past-performance">
            {t('overview.pastPerformance')}
          </SelectItem>
          <SelectItem value="key-personnel">
            {t('overview.keyPersonnel')}
          </SelectItem>
          <SelectItem value="focus-documents">
            {t('overview.focusDocuments')}
          </SelectItem>
        </SelectContent>
      </Select>

      <TabsList className="hidden @4xl/main:flex">
        <TabsTrigger value="outline">{t('overview.outline')}</TabsTrigger>
        <TabsTrigger value="past-performance">
          {t('overview.pastPerformance')} <Badge variant="secondary">3</Badge>
        </TabsTrigger>
        <TabsTrigger value="key-personnel">
          {t('overview.keyPersonnel')} <Badge variant="secondary">2</Badge>
        </TabsTrigger>
        <TabsTrigger value="focus-documents">
          {t('overview.focusDocuments')}
        </TabsTrigger>
      </TabsList>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <LayoutDashboard />
              <span className="hidden lg:inline">
                {t('tables.customizeColumns')}
              </span>
              <span className="lg:hidden">{t('tables.columnsLabel')}</span>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {table
              .getAllColumns()
              .filter(
                column =>
                  typeof column.accessorFn !== 'undefined' &&
                  column.getCanHide()
              )
              .map(column => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={v => column.toggleVisibility(!!v)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm">
          <Plus />
          <span className="hidden lg:inline">{t('actions.addSection')}</span>
        </Button>
      </div>
    </div>
  );
}
