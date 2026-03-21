'use client';

import { useEffect, useState, useTransition } from 'react';

import { useQuery } from '@tanstack/react-query';

import { EnrollService } from '../services/enroll.service';
import {
  type EnrollmentsListParams,
  type SortBy,
  type SortOrder,
} from '../types';

export const enrollmentsKeys = {
  all: ['enrollments'] as const,
  list: (params: EnrollmentsListParams) =>
    [...enrollmentsKeys.all, 'list', params] as const,
};

export function useEnrollments(
  initialParams: EnrollmentsListParams = {}
) {
  const [page, setPage] = useState(initialParams.page ?? 1);
  const [limit, setLimit] = useState(initialParams.limit ?? 10);
  const [q, setQ] = useState(initialParams.q ?? '');
  const [status, setStatus] = useState<
    EnrollmentsListParams['status']
  >(initialParams.status);
  const [sortBy, setSortBy] = useState<SortBy>(
    initialParams.sortBy ?? 'createdAt'
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    initialParams.sortOrder ?? 'desc'
  );
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => setPage(1));
  }, [q, status]);

  const params: EnrollmentsListParams = {
    page,
    limit,
    sortBy,
    sortOrder,
    ...(q && { q }),
    ...(status && { status }),
  };

  const CACHE_STALE_MS = 10 * 60 * 1000;
  const CACHE_GC_MS = 30 * 60 * 1000;

  const enrollmentsQuery = useQuery({
    queryKey: enrollmentsKeys.list(params),
    queryFn: () => EnrollService.getEnrollments(params),
    placeholderData: prev => prev,
    staleTime: CACHE_STALE_MS,
    gcTime: CACHE_GC_MS,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });

  const responseData = enrollmentsQuery.data?.data;
  const enrollments = responseData?.data;
  const meta = responseData?.meta;

  return {
    enrollments,
    enrollmentsMeta: meta,
    page,
    limit,
    q,
    status,
    sortBy,
    sortOrder,
    setPage,
    setLimit,
    setQ,
    setStatus,
    setSortBy,
    setSortOrder,
    nextPage: () => setPage(prev => prev + 1),
    prevPage: () => setPage(prev => Math.max(prev - 1, 1)),
    isLoading: enrollmentsQuery.isLoading,
    isFetching: enrollmentsQuery.isFetching,
    isError: enrollmentsQuery.isError,
    error: enrollmentsQuery.error,
    enrollmentsQuery,
  };
}
