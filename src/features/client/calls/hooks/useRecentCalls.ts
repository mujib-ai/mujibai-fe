'use client';

import { useState } from 'react';

import { QUERY_CONSTANTS } from '@/shared/constants/query.constants';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';

import { CallService } from '../services';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 6;

export default function useRecentCalls() {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: [QUERY_CONSTANTS.KEYS.CALLS, 'recent', { page, limit }],
    queryFn: () => CallService.getAllCalls({ page, limit }),
    placeholderData: keepPreviousData,
  });

  const summaryQueries = useQueries({
    queries: [
      {
        queryKey: [QUERY_CONSTANTS.KEYS.CALLS, 'summary', 'answered'],
        queryFn: () =>
          CallService.getAllCalls({ page: 1, limit: 1, status: 'answered' }),
      },
      {
        queryKey: [QUERY_CONSTANTS.KEYS.CALLS, 'summary', 'missed'],
        queryFn: () =>
          CallService.getAllCalls({ page: 1, limit: 1, status: 'missed' }),
      },
    ],
  });
  const [answeredSummary, missedSummary] = summaryQueries;

  const totalPages = data?.totalPages ?? 1;

  const goToPage = (nextPage: number) => {
    if (isFetching) return;
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  const changeLimit = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(DEFAULT_PAGE);
  };

  return {
    calls: data?.items ?? [],
    pagination: {
      page: data?.page ?? page,
      limit: data?.limit ?? limit,
      total: data?.total ?? 0,
      totalPages,
    },
    answeredTotal: answeredSummary.data?.total ?? 0,
    missedTotal: missedSummary.data?.total ?? 0,
    isLoading,
    isFetching,
    isError,
    error: isError
      ? getErrorMessage(error, 'Failed to load recent calls')
      : null,
    setPage: goToPage,
    setLimit: changeLimit,
    refetch,
  };
}
