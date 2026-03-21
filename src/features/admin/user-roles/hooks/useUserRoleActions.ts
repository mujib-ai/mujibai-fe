'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import type { AdminUsersListResponse } from '../types';
import { UserRolesService } from '../services/user-roles.service';
import { userRolesKeys } from './useUserRoles';

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: 'ACTIVE' | 'INACTIVE';
    }) => UserRolesService.updateStatus(id, status),
    onSuccess: (_, { id, status }) => {
      const mappedStatus = status === 'ACTIVE' ? 'Active' : 'Inactive';
      queryClient.setQueriesData(
        { queryKey: userRolesKeys.all },
        (old: AdminUsersListResponse | undefined) => {
          if (!old?.data?.items) return old;
          return {
            ...old,
            data: {
              ...old.data,
              items: old.data.items.map(user =>
                user.id === id ? { ...user, status: mappedStatus } : user
              ),
            },
          };
        }
      );
      toast.success(
        status === 'ACTIVE' ? 'User activated' : 'User deactivated'
      );
    },
    onError: (error: unknown) => {
      const message =
        error instanceof AxiosError
          ? (error.response?.data as { message?: string })?.message
          : undefined;
      toast.error(message ?? 'Failed to update user status');
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => UserRolesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userRolesKeys.all });
      toast.success('User deleted');
    },
    onError: (error: unknown) => {
      const message =
        error instanceof AxiosError
          ? (error.response?.data as { message?: string })?.message
          : undefined;
      toast.error(message ?? 'Failed to delete user');
    },
  });
}
