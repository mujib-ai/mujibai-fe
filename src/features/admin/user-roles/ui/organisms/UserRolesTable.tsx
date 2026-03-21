'use client';

import { useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';

import {
  useDeleteUser,
  useUpdateUserStatus,
} from '../../hooks/useUserRoleActions';
import { StatusEnum, type UserWithRole } from '../../types';
import { UserRoleBadge, UserRoleStatusBadge } from '../atoms';
import DeleteUserDialog from '../molecules/DeleteUserDialog';
import { UserRolesTableSkeleton } from '../molecules/UserRolesTableSkeleton';
import ViewUserDialog from '../molecules/ViewUserDialog';

interface UserRolesTableProps {
  users: UserWithRole[];
  isLoading?: boolean;
}

export default function UserRolesTable({ users, isLoading }: UserRolesTableProps) {
  const [userToDelete, setUserToDelete] = useState<UserWithRole | null>(null);
  const [viewingUser, setViewingUser] = useState<UserWithRole | null>(null);
  const updateStatusMutation = useUpdateUserStatus();
  const deleteMutation = useDeleteUser();

  const handleActivate = (user: UserWithRole) => {
    updateStatusMutation.mutate({ id: user.id, status: StatusEnum.ACTIVE});
  };

  const handleDeactivate = (user: UserWithRole) => {
    updateStatusMutation.mutate({ id: user.id, status: StatusEnum.INACTIVE});
  };

  const handleDeleteClick = (user: UserWithRole) => {
    setUserToDelete(user);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete.id);
      setUserToDelete(null);
    }
  };
  const tColumns = useTranslations('tables.columns');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const formatLastActive = (dateStr?: string | null) => {
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
  };
  const [selected, setSelected] = useState<number[]>([]);

  const allChecked = users.length > 0 && selected.length === users.length;

  const toggleAll = () => {
    setSelected(allChecked ? [] : users.map(c => c.id));
  };

  const toggleOne = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <div className="hidden md:block">
        <UserRolesTableSkeleton />
      </div>
    );
  }

  return (
    <>
    <div className="hidden md:block">
      <Table className="my-10 rounded-2xl bg-[#FFFFFFBF] dark:bg-[#001434A6]">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox checked={allChecked} onCheckedChange={toggleAll} />
          </TableHead>
          <TableHead
            className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            {tColumns('name')}
          </TableHead>
          <TableHead
            className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            {tColumns('email')}
          </TableHead>
          <TableHead
            className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            {tColumns('role')}
          </TableHead>
          <TableHead
            className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            {tColumns('status')}
          </TableHead>
          <TableHead
            className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            {tColumns('lastActive')}
          </TableHead>
          <TableHead
            className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            {tColumns('actions')}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map(user => (
          <TableRow key={user.id} className="hover:bg-transparent">
            <TableCell>
              <Checkbox
                checked={selected.includes(user.id)}
                onCheckedChange={() => toggleOne(user.id)}
              />
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <UserRoleBadge role={user.role} />
            </TableCell>
            <TableCell>
              <UserRoleStatusBadge status={user.status} />
            </TableCell>
            <TableCell>{formatLastActive(user.startDate)}</TableCell>
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
                  <DropdownMenuItem onClick={() => setViewingUser(user)}>
                    <Eye className="mr-2 size-4" />
                    {tCommon('view')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleActivate(user)}
                    disabled={
                      user.status === StatusEnum.ACTIVE ||
                      updateStatusMutation.isPending
                    }
                    className="text-green-600 focus:text-green-600 dark:text-green-400 dark:focus:text-green-400"
                  >
                    <Check className="mr-2 size-4" />
                    {tCommon('active')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeactivate(user)}
                    disabled={
                      user.status === StatusEnum.INACTIVE ||
                      updateStatusMutation.isPending
                    }
                    className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                  >
                    <X className="mr-2 size-4" />
                    {tCommon('inactive')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDeleteClick(user)}
                    disabled={deleteMutation.isPending}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 size-4" />
                    {tCommon('delete')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>

    <ViewUserDialog
      open={!!viewingUser}
      onOpenChange={open => !open && setViewingUser(null)}
      user={viewingUser}
    />
    <DeleteUserDialog
      open={!!userToDelete}
      onOpenChange={open => !open && setUserToDelete(null)}
      userName={userToDelete?.name}
      onConfirm={handleDeleteConfirm}
      isDeleting={deleteMutation.isPending}
    />
    </>
  );
}
