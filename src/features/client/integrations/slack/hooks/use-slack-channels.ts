'use client';

import { QUERY_CONSTANTS } from '@/shared/constants/query.constants';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getSlackChannels } from '../api/get-slack-channels';

export const SLACK_CHANNELS_QUERY_KEY = [QUERY_CONSTANTS.KEYS.SLACK_CHANNELS];

export default function useSlackChannels(enabled: boolean) {
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
    queryKey: SLACK_CHANNELS_QUERY_KEY,
    queryFn: ({ pageParam }) => getSlackChannels(pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: lastPage => lastPage.nextCursor,
    enabled,
  });

  return {
    channels: data?.pages.flatMap(page => page.channels) ?? [],
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasMore: hasNextPage ?? false,
    loadMore: fetchNextPage,
    isError,
    error: isError
      ? getErrorMessage(error, 'Failed to load Slack channels')
      : null,
    refetch,
  };
}
