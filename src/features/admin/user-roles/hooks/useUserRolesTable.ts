'use client';

import { useState } from 'react';

import { useLocale } from 'next-intl';

import {
  useDeleteUser,
  useUpdateUserStatus,
} from './useUserRoleActions';
import type { UserWithRole } from '../types';

export function useUserRolesTable(users: UserWithRole[]) {
  const locale = useLocale();
  const [userToDelete, setUserToDelete] = useState<UserWithRole | null>(null);
  const [viewingUser, setViewingUser] = useState<UserWithRole | null>(null);
  const [selected, setSelected] = useState<number[]>([]);

  const updateStatusMutation = useUpdateUserStatus();
  const deleteMutation = useDeleteUser();

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

  const allChecked = users.length > 0 && selected.length === users.length;

  const toggleAll = () => {
    setSelected(allChecked ? [] : users.map(c => c.id));
  };

  const toggleOne = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

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

  const handleView = (user: UserWithRole) => {
    setViewingUser(user);
  };

  const closeViewDialog = () => setViewingUser(null);
  const closeDeleteDialog = () => setUserToDelete(null);

  return {
    selected,
    allChecked,
    toggleAll,
    toggleOne,
    formatLastActive,
    handleActivate,
    handleDeactivate,
    handleDeleteClick,
    handleDeleteConfirm,
    handleView,
    viewingUser,
    userToDelete,
    closeViewDialog,
    closeDeleteDialog,
    isUpdating: updateStatusMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
