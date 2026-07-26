'use client';

import { QUERY_CONSTANTS } from '@/shared/constants/query.constants';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getGoogleCalendarCalendars } from '../api/get-google-calendar-calendars';

export const GOOGLE_CALENDAR_CALENDARS_QUERY_KEY = [
  QUERY_CONSTANTS.KEYS.GOOGLE_CALENDAR_CALENDARS,
];

export default function useGoogleCalendarCalendars(enabled: boolean) {
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: GOOGLE_CALENDAR_CALENDARS_QUERY_KEY,
    queryFn: ({ pageParam }) => getGoogleCalendarCalendars(pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: lastPage => lastPage.nextCursor,
    enabled,
  });

  return {
    calendars: data?.pages.flatMap(page => page.calendars) ?? [],
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasMore: hasNextPage ?? false,
    loadMore: fetchNextPage,
    isError,
    error: isError
      ? getErrorMessage(error, 'Failed to load Google Calendar calendars')
      : null,
    refetch,
  };
}
