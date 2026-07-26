'use client';

import { QUERY_CONSTANTS } from '@/shared/constants/query.constants';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';

import { getGoogleCalendarIntegration } from '../api/get-google-calendar-integration';

export const GOOGLE_CALENDAR_INTEGRATION_QUERY_KEY = [
  QUERY_CONSTANTS.KEYS.GOOGLE_CALENDAR_INTEGRATION,
];

export default function useGoogleCalendarIntegration() {
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: GOOGLE_CALENDAR_INTEGRATION_QUERY_KEY,
    queryFn: getGoogleCalendarIntegration,
  });

  return {
    integration: data ?? null,
    isLoading,
    isFetching,
    isError,
    error: isError
      ? getErrorMessage(
          error,
          'Failed to load Google Calendar connection status'
        )
      : null,
    refetch,
  };
}
