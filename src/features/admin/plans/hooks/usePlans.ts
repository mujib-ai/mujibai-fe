'use client';
import { QUERY_CONSTANTS } from '@/shared/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PlansService } from '../services/plans.service';
import {
  CreatePlanDto,
  PaginatedPlansResponse,
  PlansFilters,
  PlanType,
  UpdatePlanDto,
} from '../types';

type PlansQueryFilters = Pick<PlansFilters, 'title' | 'type' | 'page' | 'limit'>;

export default function usePlans(filters?: PlansQueryFilters) {
  const queryClient = useQueryClient();

  const plansQuery = useQuery({
    queryKey: [
      QUERY_CONSTANTS.KEYS.PLANS,
      filters?.title ?? '',
      filters?.type ?? '',
      filters?.page ?? 1,
      filters?.limit ?? 10,
    ],
    queryFn: () => PlansService.getAll(filters),
  });

  const createPlanMutation = useMutation({
    mutationFn: (data: CreatePlanDto) => PlansService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_CONSTANTS.KEYS.PLANS] });
    },
  });

  const deletePlanMutation = useMutation({
    mutationFn: (id: string) => PlansService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_CONSTANTS.KEYS.PLANS] });
    },
  });

  const updatePlanMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePlanDto }) =>
      PlansService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_CONSTANTS.KEYS.PLANS] });
    },
  });

  const plansData: PaginatedPlansResponse | undefined = plansQuery.data?.data;

  return {
    plans: plansData?.items ?? [],
    isLoading: plansQuery.isLoading,
    isError: plansQuery.isError,
    error: plansQuery.error,
    createPlan: createPlanMutation.mutateAsync,
    isCreating: createPlanMutation.isPending,
    deletePlan: deletePlanMutation.mutateAsync,
    isDeleting: deletePlanMutation.isPending,
    updatePlan: updatePlanMutation.mutateAsync,
    isUpdating: updatePlanMutation.isPending,
    total: plansData?.total ?? 0,
  };
}

export function usePlan(id: string) {
  const query = useQuery({
    queryKey: [QUERY_CONSTANTS.KEYS.PLANS, id],
    queryFn: () => PlansService.getById(id),
    enabled: !!id,
  });

  return {
    plan: query.data?.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
