'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { NotificationSettingsService } from '../services/notification-settings.api';
import type {
  NotificationSettingsPublic,
  UpdateNotificationSettingsPayload,
} from '../types';

const SETTINGS_QUERY_KEY = ['notification-settings', 'list'];

export function useNotificationSettings() {
  const queryClient = useQueryClient();

  const {
    data: settings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: NotificationSettingsService.list,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      eventType,
      payload,
    }: {
      eventType: string;
      payload: UpdateNotificationSettingsPayload;
    }) => NotificationSettingsService.update(eventType, payload),
    onMutate: async ({ eventType, payload }) => {
      await queryClient.cancelQueries({ queryKey: SETTINGS_QUERY_KEY });
      const previous =
        queryClient.getQueryData<NotificationSettingsPublic[]>(
          SETTINGS_QUERY_KEY
        );

      queryClient.setQueryData<NotificationSettingsPublic[] | undefined>(
        SETTINGS_QUERY_KEY,
        old =>
          old?.map(s => (s.eventType === eventType ? { ...s, ...payload } : s))
      );

      return { previous };
    },
    onError: (error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(SETTINGS_QUERY_KEY, context.previous);
      }
      toast.error(
        getErrorMessage(error, 'Failed to update notification settings')
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEY });
    },
  });

  return {
    settings: settings ?? [],
    isLoading,
    isError,
    updateSettings: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
