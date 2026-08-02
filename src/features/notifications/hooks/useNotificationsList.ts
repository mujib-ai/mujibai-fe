'use client';

import { useMemo, useState } from 'react';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { NotificationService } from '../services/notifications.api';
import type { GetNotificationsQuery, NotificationSeverity } from '../types';

export interface NotificationsListFilters {
  eventType?: string;
  severity?: NotificationSeverity;
  readStatus?: boolean;
  dateFrom?: string;
  dateTo?: string;
}

const DEFAULT_PAGE_SIZE = 20;

export function useNotificationsList() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<NotificationsListFilters>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const query: GetNotificationsQuery = useMemo(
    () => ({ ...filters, page, pageSize }),
    [filters, page, pageSize]
  );

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['notifications', 'list', 'all', query],
    queryFn: () => NotificationService.list(query),
  });

  const updateFilters = (next: NotificationsListFilters) => {
    setFilters(next);
    setPage(1);
  };

  const changePage = (nextPage: number) => setPage(nextPage);

  const changePageSize = (nextSize: number) => {
    setPageSize(nextSize);
    setPage(1);
  };

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  };

  const markReadMutation = useMutation({
    mutationFn: (notificationId: string) =>
      NotificationService.markRead(notificationId),
    onError: error => {
      toast.error(
        getErrorMessage(error, 'Failed to mark notification as read')
      );
    },
    onSettled: invalidate,
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => NotificationService.markAllRead(),
    onError: error => {
      toast.error(
        getErrorMessage(error, 'Failed to mark all notifications as read')
      );
    },
    onSuccess: () => toast.success('All notifications marked as read.'),
    onSettled: invalidate,
  });

  const removeMutation = useMutation({
    mutationFn: (notificationId: string) =>
      NotificationService.remove(notificationId),
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to delete notification'));
    },
    onSettled: invalidate,
  });

  return {
    notifications: data?.items ?? [],
    pagination: data?.pagination,
    isLoading,
    isFetching,
    isError,
    filters,
    updateFilters,
    page,
    pageSize,
    changePage,
    changePageSize,
    markRead: markReadMutation.mutate,
    markAllRead: markAllReadMutation.mutate,
    markAllReadLoading: markAllReadMutation.isPending,
    remove: removeMutation.mutate,
  };
}
