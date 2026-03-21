'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Checkbox } from '@/shared/components/atoms/ui/checkbox';
import {
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';

interface UserRolesTableHeaderProps {
  allChecked: boolean;
  onToggleAll: () => void;
}

export function UserRolesTableHeader({
  allChecked,
  onToggleAll,
}: UserRolesTableHeaderProps) {
  const tColumns = useTranslations('tables.columns');
  const locale = useLocale();
  const alignClass = locale === 'ar' ? 'text-right' : 'text-left';

  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        <TableHead>
          <Checkbox checked={allChecked} onCheckedChange={onToggleAll} />
        </TableHead>
        <TableHead className={alignClass}>{tColumns('name')}</TableHead>
        <TableHead className={alignClass}>{tColumns('email')}</TableHead>
        <TableHead className={alignClass}>{tColumns('role')}</TableHead>
        <TableHead className={alignClass}>{tColumns('status')}</TableHead>
        <TableHead className={alignClass}>{tColumns('lastActive')}</TableHead>
        <TableHead className={alignClass}>{tColumns('actions')}</TableHead>
      </TableRow>
    </TableHeader>
  );
}
