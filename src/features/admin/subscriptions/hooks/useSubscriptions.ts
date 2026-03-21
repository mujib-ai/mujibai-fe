'use client';

import { useEffect, useState, useTransition } from 'react';

import { useQuery } from '@tanstack/react-query';

import { SubscriptionsService } from '../services/subscriptions.service';
import type { SubscriptionsListParams } from '../types';

export const subscriptionsKeys = {
  all: ['subscriptions'] as const,
  list: (params: SubscriptionsListParams) =>
    [...subscriptionsKeys.all, 'list', params] as const,
};

export type UseSubscriptionsParams = SubscriptionsListParams;

export function useSubscriptions(initialParams: UseSubscriptionsParams = {}) {
  const [page, setPage] = useState(initialParams.page ?? 1);
  const [limit, setLimit] = useState(initialParams.limit ?? 10);
  const q = initialParams.q ?? '';
  const tenantId = initialParams.tenantId;
  const planId = initialParams.planId;
  const isActive = initialParams.isActive;
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => setPage(1));
  }, [q, tenantId, planId, isActive]);

  const params: SubscriptionsListParams = {
    page,
    limit,
    ...(q && { q }),
    ...(tenantId && { tenantId }),
    ...(planId && { planId }),
    ...(isActive !== undefined && { isActive }),
  };

  const subscriptionsQuery = useQuery({
    queryKey: subscriptionsKeys.list(params),
    queryFn: () => SubscriptionsService.getSubscriptions(params),
    placeholderData: prev => prev,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });

  const responseData = subscriptionsQuery.data?.data;
  const subscriptions = responseData?.items ?? [];
  const meta = responseData?.meta;

  return {
    subscriptions,
    subscriptionsMeta: meta,
    page,
    limit,
    q,
    tenantId,
    planId,
    isActive,
    setPage,
    setLimit,
    nextPage: () => setPage(prev => prev + 1),
    prevPage: () => setPage(prev => Math.max(prev - 1, 1)),
    isLoading: subscriptionsQuery.isLoading,
    isFetching: subscriptionsQuery.isFetching,
    isError: subscriptionsQuery.isError,
    error: subscriptionsQuery.error,
    subscriptionsQuery,
  };
}
