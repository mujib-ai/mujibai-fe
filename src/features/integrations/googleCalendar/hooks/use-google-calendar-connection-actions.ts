'use client';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { disconnectGoogleCalendar } from '../api/disconnect-google-calendar';
import { selectGoogleCalendarCalendar } from '../api/select-google-calendar-calendar';
import { startGoogleCalendarOAuth } from '../api/start-google-calendar-oauth';
import { testGoogleCalendarIntegration } from '../api/test-google-calendar-integration';
import { GOOGLE_CALENDAR_CALENDARS_QUERY_KEY } from './use-google-calendar-calendars';
import { GOOGLE_CALENDAR_INTEGRATION_QUERY_KEY } from './use-google-calendar-integration';

export default function useGoogleCalendarConnectionActions() {
  const queryClient = useQueryClient();

  const connectMutation = useMutation({
    mutationFn: startGoogleCalendarOAuth,
    onSuccess: ({ authorizationUrl }) => {
      window.location.href = authorizationUrl;
    },
    onError: error => {
      toast.error(
        getErrorMessage(error, 'Failed to start Google Calendar connection')
      );
    },
  });

  const selectCalendarMutation = useMutation({
    mutationFn: selectGoogleCalendarCalendar,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GOOGLE_CALENDAR_INTEGRATION_QUERY_KEY,
      });
      toast.success('Calendar updated.');
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to select calendar'));
    },
  });

  const testMutation = useMutation({
    mutationFn: testGoogleCalendarIntegration,
    onSuccess: () => {
      toast.success('Test event created in Google Calendar.');
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to create test event'));
    },
  });

  const disconnectMutation = useMutation({
    mutationFn: disconnectGoogleCalendar,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GOOGLE_CALENDAR_INTEGRATION_QUERY_KEY,
      });
      queryClient.removeQueries({
        queryKey: GOOGLE_CALENDAR_CALENDARS_QUERY_KEY,
      });
      toast.success('Google Calendar disconnected.');
    },
    onError: error => {
      toast.error(
        getErrorMessage(error, 'Failed to disconnect Google Calendar')
      );
    },
  });

  return {
    connect: connectMutation.mutate,
    isConnecting: connectMutation.isPending,

    selectCalendar: selectCalendarMutation.mutate,
    isSelectingCalendar: selectCalendarMutation.isPending,

    sendTestEvent: testMutation.mutate,
    isSendingTestEvent: testMutation.isPending,

    disconnect: disconnectMutation.mutate,
    isDisconnecting: disconnectMutation.isPending,
  };
}
