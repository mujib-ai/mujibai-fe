'use client';

import { QUERY_CONSTANTS } from '@/shared/constants/query.constants';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';

import { getAnalytics } from '../api/get-analytics';

export default function useAnalytics() {
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: [QUERY_CONSTANTS.KEYS.ANALYTICS],
    queryFn: getAnalytics,
  });

  return {
    overview: data?.overview ?? null,
    callsTrend: data?.callsTrend ?? null,
    sentiment: data?.sentiment ?? null,
    intents: data?.intents ?? null,
    keywords: data?.keywords ?? null,
    latency: data?.latency ?? null,
    isLoading,
    isFetching,
    isError,
    error: isError ? getErrorMessage(error, 'Failed to load analytics') : null,
    refetch,
  };
}
