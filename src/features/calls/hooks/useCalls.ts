'use client';

import { useState } from 'react';

import { QUERY_CONSTANTS } from '@/shared/constants/query.constants';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { CallService } from '../services';
import type { CallStatus } from '../types';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export default function useCalls() {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [status, setStatus] = useState<CallStatus | undefined>(undefined);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: [QUERY_CONSTANTS.KEYS.CALLS, { page, limit, status }],
    queryFn: () => CallService.getAllCalls({ page, limit, status }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 1;

  const goToPage = (nextPage: number) => {
    if (isFetching) return;
    const clamped = Math.min(Math.max(nextPage, 1), totalPages);
    setPage(clamped);
  };

  const changeLimit = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(DEFAULT_PAGE);
  };

  const changeStatus = (nextStatus: CallStatus | undefined) => {
    setStatus(nextStatus);
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
    status,
    setStatus: changeStatus,
    page,
    setPage: goToPage,
    limit,
    setLimit: changeLimit,
    isLoading,
    isFetching,
    isError,
    error: isError ? getErrorMessage(error, 'Failed to load calls') : null,
    refetch,
  };
}
