'use client';

import { useTranslations } from 'next-intl';

import { Check, EllipsisVertical, Eye, Trash2, X } from 'lucide-react';

import { Button } from '@/shared/components/atoms/ui/button';
import { Checkbox } from '@/shared/components/atoms/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import {
  TableCell,
  TableRow,
} from '@/shared/components/atoms/ui/table';

import { StatusEnum, type UserWithRole } from '../../types';
import { UserRoleBadge, UserRoleStatusBadge } from '../atoms';

interface UserRolesTableRowProps {
  user: UserWithRole;
  formattedDate: string;
  isSelected: boolean;
  onToggle: () => void;
  onView: () => void;
  onActivate: () => void;
  onDeactivate: () => void;
  onDelete: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function UserRolesTableRow({
  user,
  formattedDate,
  isSelected,
  onToggle,
  onView,
  onActivate,
  onDeactivate,
  onDelete,
  isUpdating,
  isDeleting,
}: UserRolesTableRowProps) {
  const tCommon = useTranslations('common');

  return (
    <TableRow className="hover:bg-transparent">
      <TableCell>
        <Checkbox checked={isSelected} onCheckedChange={onToggle} />
      </TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <UserRoleBadge role={user.role} />
      </TableCell>
      <TableCell>
        <UserRoleStatusBadge status={user.status} />
      </TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 hover:bg-transparent"
            >
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onView}>
              <Eye className="mr-2 size-4" />
              {tCommon('view')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onActivate}
              disabled={user.status === StatusEnum.ACTIVE || isUpdating}
              className="text-green-600 focus:text-green-600 dark:text-green-400 dark:focus:text-green-400"
            >
              <Check className="mr-2 size-4" />
              {tCommon('active')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDeactivate}
              disabled={user.status === StatusEnum.INACTIVE || isUpdating}
              className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
            >
              <X className="mr-2 size-4" />
              {tCommon('inactive')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onDelete}
              disabled={isDeleting}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 size-4" />
              {tCommon('delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
