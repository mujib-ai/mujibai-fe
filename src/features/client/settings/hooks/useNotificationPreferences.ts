'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { NotificationPreferencesService } from '../services/notification-preferences.service';
import type { NotificationPreferences } from '../types';

const NOTIFICATION_PREFERENCES_QUERY_KEY = ['notification-preferences'];

export function useNotificationPreferences() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: NOTIFICATION_PREFERENCES_QUERY_KEY,
    queryFn: NotificationPreferencesService.get,
  });

  const updateMutation = useMutation({
    mutationFn: (preferences: NotificationPreferences) =>
      NotificationPreferencesService.update(preferences),
    onSuccess: updated => {
      queryClient.setQueryData(NOTIFICATION_PREFERENCES_QUERY_KEY, updated);
    },
  });

  return {
    preferences: data,
    isLoading,
    isError,
    updatePreferences: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
