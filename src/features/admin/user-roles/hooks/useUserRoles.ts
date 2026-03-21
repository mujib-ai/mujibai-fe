'use client';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { UserRolesService } from '../services/user-roles.service';
import type { GetAdminUsersParams } from '../types';

export const userRolesKeys = {
  all: ['user-roles'] as const,
  list: (params: GetAdminUsersParams) =>
    [...userRolesKeys.all, 'list', params] as const,
};

export function useUserRoles(initialParams: GetAdminUsersParams = {}) {
  const [page, setPage] = useState(initialParams.page ?? 1);
  const [limit, setLimit] = useState(initialParams.limit ?? 10);
  const [q, setQ] = useState(initialParams.q ?? '');
  const [debouncedQ, setDebouncedQ] = useState(q);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQ(q), 300);
    return () => clearTimeout(timer);
  }, [q]);
  
  useEffect(() => {
    setPage(1);
  }, [debouncedQ]);

  const params: GetAdminUsersParams = {
    page,
    limit,
    ...(debouncedQ && { q: debouncedQ }),
  };

  const CACHE_STALE_MS = 10 * 60 * 1000;
  const CACHE_GC_MS = 30 * 60 * 1000;

  const userRolesQuery = useQuery({
    queryKey: userRolesKeys.list(params),
    queryFn: () => UserRolesService.getAdminUsers(params),
    placeholderData: prev => prev,
    staleTime: CACHE_STALE_MS,
    gcTime: CACHE_GC_MS,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });

  const responseData = userRolesQuery.data?.data;
  const users = responseData?.items ?? [];
  const meta = responseData?.meta;


  return {
    users,
    usersMeta: meta,
    page,
    limit,
    q,
    setPage,
    setLimit,
    setQ,
    nextPage: () => setPage(prev => prev + 1),
    prevPage: () => setPage(prev => Math.max(prev - 1, 1)),
    isLoading: userRolesQuery.isLoading,
    isFetching: userRolesQuery.isFetching,
    isError: userRolesQuery.isError,
    error: userRolesQuery.error,
    userRolesQuery,
  };
}
