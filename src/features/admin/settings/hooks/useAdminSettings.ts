'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { toast } from 'sonner';

import { useAuth } from '@/features/auth';
import { SETTINGS_CONSTANTS } from '@/shared/constants';
import type { NotificationSettings } from '@/shared/types';

import { AdminSettingsService } from '../services/admin-settings.service';

function getNotificationsFromUser(user: { browserNotifications?: boolean; emailNotifications?: boolean; smsNotifications?: boolean } | undefined): Pick<NotificationSettings, 'email' | 'sms' | 'browser'> {
  return {
    email: user?.emailNotifications ?? SETTINGS_CONSTANTS.DEFAULT_NOTIFICATION_SETTINGS.email,
    sms: user?.smsNotifications ?? SETTINGS_CONSTANTS.DEFAULT_NOTIFICATION_SETTINGS.sms,
    browser: user?.browserNotifications ?? SETTINGS_CONSTANTS.DEFAULT_NOTIFICATION_SETTINGS.browser,
  };
}

export function useAdminSettings() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const userNotifications = getNotificationsFromUser(user);

  const [notifications, setNotifications] = React.useState<
    Pick<NotificationSettings, 'email' | 'sms' | 'browser'>
  >(userNotifications);

  React.useEffect(() => {
    setNotifications(userNotifications);
  }, [userNotifications.email, userNotifications.sms, userNotifications.browser]);

  const mutation = useMutation({
    mutationFn: (payload: {
      browserNotifications: boolean;
      emailNotifications: boolean;
      smsNotifications: boolean;
    }) => AdminSettingsService.update(payload),
    onSuccess: (_, payload) => {
      queryClient.setQueryData(['auth'], (old: { data?: { browserNotifications?: boolean; emailNotifications?: boolean; smsNotifications?: boolean } } | undefined) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            browserNotifications: payload.browserNotifications,
            emailNotifications: payload.emailNotifications,
            smsNotifications: payload.smsNotifications,
          },
        };
      });
    },
    onError: (error: unknown) => {
      const message =
        error instanceof AxiosError
          ? (error.response?.data as { message?: string })?.message
          : undefined;
      toast.error(message ?? 'Failed to update settings');
    },
  });

  const updateNotification = React.useCallback(
    (type: 'email' | 'sms' | 'browser', enabled: boolean) => {
      const previous = { ...notifications };
      setNotifications((prev) => ({ ...prev, [type]: enabled }));

      const payload = {
        browserNotifications: type === 'browser' ? enabled : notifications.browser,
        emailNotifications: type === 'email' ? enabled : notifications.email,
        smsNotifications: type === 'sms' ? enabled : notifications.sms,
      };

      mutation.mutate(payload, {
        onError: () => {
          setNotifications(previous);
        },
      });
    },
    [notifications, mutation]
  );

  return {
    notifications,
    updateNotification,
    isUpdating: mutation.isPending,
  };
}
