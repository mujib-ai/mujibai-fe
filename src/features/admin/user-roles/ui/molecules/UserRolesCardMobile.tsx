'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Users } from 'lucide-react';

import { Skeleton } from '@/shared/components/atoms/ui/skeleton';

import {
  useDeleteUser,
  useUpdateUserStatus,
} from '../../hooks/useUserRoleActions';
import type { UserWithRole } from '../../types';
import DeleteUserDialog from './DeleteUserDialog';
import { UserRoleCard } from './UserRoleCard';
import ViewUserDialog from './ViewUserDialog';

interface UserRolesCardMobileProps {
  users: UserWithRole[];
  isLoading?: boolean;
}

function UserRolesMobileSkeleton() {
  return (
    <div className="my-10 space-y-3 md:hidden">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="border-border flex flex-col gap-3 rounded-xl border bg-background p-4 shadow-sm"
        >
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-full max-w-[200px] rounded-md" />
            <Skeleton className="h-3 w-full max-w-[160px] rounded-md" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function UserRolesCardMobile({
  users,
  isLoading,
}: UserRolesCardMobileProps) {
  const tUserRoles = useTranslations('userRoles');
  const [userToDelete, setUserToDelete] = useState<UserWithRole | null>(null);
  const [viewingUser, setViewingUser] = useState<UserWithRole | null>(null);
  const updateStatusMutation = useUpdateUserStatus();
  const deleteMutation = useDeleteUser();

  const handleActivate = (user: UserWithRole) => {
    updateStatusMutation.mutate({ id: user.id, status: 'ACTIVE' });
  };

  const handleDeactivate = (user: UserWithRole) => {
    updateStatusMutation.mutate({ id: user.id, status: 'INACTIVE' });
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

  if (isLoading) {
    return <UserRolesMobileSkeleton />;
  }

  if (users.length === 0) {
    return (
      <div className="my-10 block md:hidden">
        <div className="flex min-h-[220px] w-full flex-col items-center justify-center gap-4 rounded-2xl bg-[#FFFFFFBF] p-6 text-center dark:bg-[#001434A6]">
          <div className="bg-primary/10 rounded-full p-4">
            <Users className="text-primary h-10 w-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-tight">
              {tUserRoles('emptyTitle')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {tUserRoles('emptyDescription')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="my-10 space-y-3 md:hidden">
        {users.map(user => (
          <UserRoleCard
            key={user.id}
            user={user}
            onView={user => setViewingUser(user)}
            onActivate={handleActivate}
            onDeactivate={handleDeactivate}
            onDelete={handleDeleteClick}
            isUpdating={updateStatusMutation.isPending}
            isDeleting={deleteMutation.isPending}
          />
        ))}
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
