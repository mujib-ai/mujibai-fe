'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Check, EllipsisVertical, Eye, Trash2, X } from 'lucide-react';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';

import { StatusEnum, type UserWithRole } from '../../types';
import { UserRoleBadge, UserRoleStatusBadge } from '../atoms';

interface UserRoleCardProps {
  user: UserWithRole;
  onView?: (user: UserWithRole) => void;
  onActivate: (user: UserWithRole) => void;
  onDeactivate: (user: UserWithRole) => void;
  onDelete: (user: UserWithRole) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

function formatLastActive(dateStr: string | undefined, locale: string) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? dateStr
      : d.toLocaleDateString(locale, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
  } catch {
    return dateStr;
  }
}

export function UserRoleCard({
  user,
  onView,
  onActivate,
  onDeactivate,
  onDelete,
  isUpdating,
  isDeleting,
}: UserRoleCardProps) {
  const tColumns = useTranslations('tables.columns');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <div className="border-border flex flex-col gap-3 rounded-xl border bg-background p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold">{user.name}</h3>
        <div className="flex items-center gap-2">
          <UserRoleStatusBadge status={user.status} />
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
              <DropdownMenuItem onClick={() => onView?.(user)}>
                <Eye className="mr-2 size-4" />
                {tCommon('view')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onActivate(user)}
                disabled={
                  user.status === StatusEnum.ACTIVE || isUpdating
                }
                className="text-green-600 focus:text-green-600 dark:text-green-400 dark:focus:text-green-400"
              >
                <Check className="mr-2 size-4" />
                {tCommon('active')}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDeactivate(user)}
                disabled={
                  user.status === StatusEnum.INACTIVE || isUpdating
                }
                className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
              >
                <X className="mr-2 size-4" />
                {tCommon('inactive')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(user)}
                disabled={isDeleting}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 size-4" />
                {tCommon('delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="text-muted-foreground flex flex-col gap-1.5 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium shrink-0">{tColumns('email')}:</span>
          <span>{user.email}</span>
        </div>
        {user.phone && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium shrink-0">{tColumns('phone')}:</span>
            <span>{user.phone}</span>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium shrink-0">{tColumns('role')}:</span>
          <UserRoleBadge role={user.role} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium shrink-0">
            {tColumns('lastActive')}:
          </span>
          <span>{formatLastActive(user.startDate, locale)}</span>
        </div>
      </div>
    </div>
  );
}
