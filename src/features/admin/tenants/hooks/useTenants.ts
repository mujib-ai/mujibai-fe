'use client';

import { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { TenantsService } from '../services/tenants.service';
import type { CreateClientPayload, UpdateClientPayload } from '../types';

import type { TenantStatusFilter } from '../types';

export const tenantsKeys = {
  all: ['tenants'] as const,
  list: (params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: TenantStatusFilter;
  }) => [...tenantsKeys.all, 'list', params] as const,
  detail: (id: string) => [...tenantsKeys.all, 'detail', id] as const,
};

interface UseTenantParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: TenantStatusFilter;
  id?: string;
}

export function useTenant(initialParams: UseTenantParams = {}) {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(initialParams.page || 1);
  const [limit, setLimit] = useState(initialParams.limit || 10);
  const search = initialParams.search ?? '';
  const status = initialParams.status ?? 'all';

  const [tenantId, setTenantId] = useState<string | undefined>(
    initialParams.id
  );

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const tenantsQuery = useQuery({
    queryKey: tenantsKeys.list({ page, limit, search, status }),
    queryFn: () => TenantsService.getTenants({ page, limit, search, status }),
    placeholderData: prev => prev,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });

  const tenantQuery = useQuery({
    queryKey: tenantsKeys.detail(tenantId || ''),
    queryFn: () => TenantsService.getTenant(tenantId!),
    enabled: !!tenantId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateClientPayload) =>
      TenantsService.createTenant(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tenantsKeys.all });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateClientPayload;
    }) => TenantsService.updateTenant(id, payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: tenantsKeys.all });
      if (variables.id) {
        queryClient.invalidateQueries({
          queryKey: tenantsKeys.detail(variables.id),
        });
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => TenantsService.deleteTenant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tenantsKeys.all });
    },
  });

  const nextPage = () => setPage(prev => prev + 1);
  const prevPage = () => setPage(prev => Math.max(prev - 1, 1));

  const responseData = tenantsQuery.data?.data;
  const tenants = responseData?.items;
  return {
    tenants,
    tenantsMeta: responseData?.meta,
    page,
    limit,
    search,
    status,
    setPage,
    setLimit,
    nextPage,
    prevPage,
    setTenantId,
    tenantId,

    tenant: tenantQuery.data,

    isLoading: tenantsQuery.isLoading || tenantQuery.isLoading,
    isFetching: tenantsQuery.isFetching || tenantQuery.isFetching,
    isError: tenantsQuery.isError || tenantQuery.isError,
    error: tenantsQuery.error || tenantQuery.error,

    tenantsQuery,
    tenantQuery,

    createTenant: createMutation.mutate,
    createTenantAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    updateTenant: updateMutation.mutate,
    updateTenantAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    deleteTenant: deleteMutation.mutate,
    deleteTenantAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
