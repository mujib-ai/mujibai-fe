'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { NotificationService } from '../services/notifications.api';
import type { PaginatedNotifications } from '../types';

const LIST_QUERY_KEY = ['notifications', 'list'];
const UNREAD_COUNT_QUERY_KEY = ['notifications', 'unread-count'];

export function useNotifications() {
  const queryClient = useQueryClient();

  const {
    data: list,
    isLoading: isListLoading,
    isError: isListError,
  } = useQuery({
    queryKey: LIST_QUERY_KEY,
    queryFn: () => NotificationService.list({ page: 1, pageSize: 20 }),
  });

  const { data: unreadCount = 0 } = useQuery({
    queryKey: UNREAD_COUNT_QUERY_KEY,
    queryFn: NotificationService.unreadCount,
    staleTime: 30 * 1000,
  });

  function snapshot() {
    return {
      previousList:
        queryClient.getQueryData<PaginatedNotifications>(LIST_QUERY_KEY),
      previousUnreadCount: queryClient.getQueryData<number>(
        UNREAD_COUNT_QUERY_KEY
      ),
    };
  }

  function rollback(context?: {
    previousList?: PaginatedNotifications;
    previousUnreadCount?: number;
  }) {
    if (context?.previousList) {
      queryClient.setQueryData(LIST_QUERY_KEY, context.previousList);
    }
    if (context?.previousUnreadCount !== undefined) {
      queryClient.setQueryData(
        UNREAD_COUNT_QUERY_KEY,
        context.previousUnreadCount
      );
    }
  }

  const markReadMutation = useMutation({
    mutationFn: (notificationId: string) =>
      NotificationService.markRead(notificationId),
    onMutate: async notificationId => {
      await queryClient.cancelQueries({ queryKey: LIST_QUERY_KEY });
      await queryClient.cancelQueries({ queryKey: UNREAD_COUNT_QUERY_KEY });
      const context = snapshot();

      queryClient.setQueryData<PaginatedNotifications | undefined>(
        LIST_QUERY_KEY,
        old =>
          old && {
            ...old,
            items: old.items.map(n =>
              n.id === notificationId && !n.readAt
                ? { ...n, readAt: new Date().toISOString() }
                : n
            ),
          }
      );
      if (context.previousUnreadCount) {
        queryClient.setQueryData(
          UNREAD_COUNT_QUERY_KEY,
          Math.max(0, context.previousUnreadCount - 1)
        );
      }
      return context;
    },
    onError: (error, _id, context) => {
      rollback(context);
      toast.error(
        getErrorMessage(error, 'Failed to mark notification as read')
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: LIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: UNREAD_COUNT_QUERY_KEY });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => NotificationService.markAllRead(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: LIST_QUERY_KEY });
      await queryClient.cancelQueries({ queryKey: UNREAD_COUNT_QUERY_KEY });
      const context = snapshot();

      queryClient.setQueryData<PaginatedNotifications | undefined>(
        LIST_QUERY_KEY,
        old =>
          old && {
            ...old,
            items: old.items.map(n =>
              n.readAt ? n : { ...n, readAt: new Date().toISOString() }
            ),
          }
      );
      queryClient.setQueryData(UNREAD_COUNT_QUERY_KEY, 0);
      return context;
    },
    onError: (error, _vars, context) => {
      rollback(context);
      toast.error(
        getErrorMessage(error, 'Failed to mark all notifications as read')
      );
    },
    onSuccess: () => {
      toast.success('All notifications marked as read.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: LIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: UNREAD_COUNT_QUERY_KEY });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (notificationId: string) =>
      NotificationService.remove(notificationId),
    onMutate: async notificationId => {
      await queryClient.cancelQueries({ queryKey: LIST_QUERY_KEY });
      await queryClient.cancelQueries({ queryKey: UNREAD_COUNT_QUERY_KEY });
      const context = snapshot();
      const removed = context.previousList?.items.find(
        n => n.id === notificationId
      );

      queryClient.setQueryData<PaginatedNotifications | undefined>(
        LIST_QUERY_KEY,
        old =>
          old && {
            ...old,
            items: old.items.filter(n => n.id !== notificationId),
            total: Math.max(0, old.total - 1),
          }
      );
      if (removed && !removed.readAt && context.previousUnreadCount) {
        queryClient.setQueryData(
          UNREAD_COUNT_QUERY_KEY,
          Math.max(0, context.previousUnreadCount - 1)
        );
      }
      return context;
    },
    onError: (error, _id, context) => {
      rollback(context);
      toast.error(getErrorMessage(error, 'Failed to delete notification'));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: LIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: UNREAD_COUNT_QUERY_KEY });
    },
  });

  return {
    notifications: list?.items ?? [],
    isLoading: isListLoading,
    isError: isListError,
    unreadCount,
    markRead: markReadMutation.mutate,
    markAllRead: markAllReadMutation.mutate,
    markAllReadLoading: markAllReadMutation.isPending,
    remove: removeMutation.mutate,
  };
}
