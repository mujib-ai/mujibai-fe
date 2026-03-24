'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ApiKeysService } from '../services/apiKeys.service';
import type { UpdateApiKeyDto } from '../types';

export default function useApiKeys() {
  const queryClient = useQueryClient();

  const { data: apiKeys = [], isLoading, error } = useQuery({
    queryKey: ['apiKeys'],
    queryFn: ApiKeysService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: ApiKeysService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
      toast.success('API key created successfully');
    },
    onError: () => toast.error('Failed to create API key'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateApiKeyDto }) =>
      ApiKeysService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
      toast.success('API key updated successfully');
    },
    onError: () => toast.error('Failed to update API key'),
  });

  const deleteMutation = useMutation({
    mutationFn: ApiKeysService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
      toast.success('API key deleted successfully');
    },
    onError: () => toast.error('Failed to delete API key'),
  });

  const revokeMutation = useMutation({
    mutationFn: ApiKeysService.revoke,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
      toast.success('API key revoked successfully');
    },
    onError: () => toast.error('Failed to revoke API key'),
  });

  return {
    apiKeys,
    isLoading: isLoading || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending || revokeMutation.isPending,
    error: error ? (error as Error).message : null,
    createApiKey: createMutation.mutateAsync,
    updateApiKey: (id: string, data: UpdateApiKeyDto) => updateMutation.mutateAsync({ id, dto: data }),
    deleteApiKey: deleteMutation.mutateAsync,
    revokeApiKey: revokeMutation.mutateAsync,
    clearError: () => {}, // No longer needed
  };
}
