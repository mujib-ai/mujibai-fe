'use client';

import { QUERY_CONSTANTS } from '@/shared/constants/query.constants';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiKeyService } from '../services';
import type {
  ApiKeyPublic,
  CreateApiKeyDto,
  UpdateApiKeyExpirationDto,
  UpdateApiKeyNameDto,
  UpdateApiKeyScopesDto,
} from '../types';

const API_KEYS_QUERY_KEY = [QUERY_CONSTANTS.KEYS.API_KEYS];

export default function useApiKeys() {
  const queryClient = useQueryClient();

  const {
    data: apiKeys = [],
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: API_KEYS_QUERY_KEY,
    queryFn: ApiKeyService.list,
  });

  function patchCache(
    apiKeyId: string,
    patch: Partial<ApiKeyPublic>
  ): ApiKeyPublic[] | undefined {
    const previous =
      queryClient.getQueryData<ApiKeyPublic[]>(API_KEYS_QUERY_KEY);
    queryClient.setQueryData<ApiKeyPublic[]>(API_KEYS_QUERY_KEY, old =>
      old?.map(key => (key.id === apiKeyId ? { ...key, ...patch } : key))
    );
    return previous;
  }

  function rollback(previous: ApiKeyPublic[] | undefined) {
    if (previous) {
      queryClient.setQueryData(API_KEYS_QUERY_KEY, previous);
    }
  }

  const createMutation = useMutation({
    mutationFn: (payload: CreateApiKeyDto) => ApiKeyService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: API_KEYS_QUERY_KEY });
      toast.success('API key created successfully.');
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to create API key'));
    },
  });

  const updateNameMutation = useMutation({
    mutationFn: ({
      apiKeyId,
      payload,
    }: {
      apiKeyId: string;
      payload: UpdateApiKeyNameDto;
    }) => ApiKeyService.updateName(apiKeyId, payload),
    onMutate: async ({ apiKeyId, payload }) => {
      await queryClient.cancelQueries({ queryKey: API_KEYS_QUERY_KEY });
      const previous = patchCache(apiKeyId, { name: payload.name });
      return { previous };
    },
    onError: (error, _vars, context) => {
      rollback(context?.previous);
      toast.error(getErrorMessage(error, 'Failed to rename API key'));
    },
    onSuccess: () => {
      toast.success('API key renamed.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: API_KEYS_QUERY_KEY });
    },
  });

  const updateScopesMutation = useMutation({
    mutationFn: ({
      apiKeyId,
      payload,
    }: {
      apiKeyId: string;
      payload: UpdateApiKeyScopesDto;
    }) => ApiKeyService.updateScopes(apiKeyId, payload),
    onMutate: async ({ apiKeyId, payload }) => {
      await queryClient.cancelQueries({ queryKey: API_KEYS_QUERY_KEY });
      const previous = patchCache(apiKeyId, { scopes: payload.scopes });
      return { previous };
    },
    onError: (error, _vars, context) => {
      rollback(context?.previous);
      toast.error(getErrorMessage(error, 'Failed to update scopes'));
    },
    onSuccess: () => {
      toast.success('API key scopes updated.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: API_KEYS_QUERY_KEY });
    },
  });

  const updateExpirationMutation = useMutation({
    mutationFn: ({
      apiKeyId,
      payload,
    }: {
      apiKeyId: string;
      payload: UpdateApiKeyExpirationDto;
    }) => ApiKeyService.updateExpiration(apiKeyId, payload),
    onMutate: async ({ apiKeyId, payload }) => {
      await queryClient.cancelQueries({ queryKey: API_KEYS_QUERY_KEY });
      const previous = patchCache(apiKeyId, { expiresAt: payload.expiresAt });
      return { previous };
    },
    onError: (error, _vars, context) => {
      rollback(context?.previous);
      toast.error(getErrorMessage(error, 'Failed to update expiration'));
    },
    onSuccess: () => {
      toast.success('API key expiration updated.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: API_KEYS_QUERY_KEY });
    },
  });

  const rotateMutation = useMutation({
    mutationFn: (apiKeyId: string) => ApiKeyService.rotate(apiKeyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: API_KEYS_QUERY_KEY });
      toast.success('API key rotated. Copy the new secret now.');
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to rotate API key'));
    },
  });

  const revokeMutation = useMutation({
    mutationFn: (apiKeyId: string) => ApiKeyService.revoke(apiKeyId),
    onMutate: async (apiKeyId: string) => {
      await queryClient.cancelQueries({ queryKey: API_KEYS_QUERY_KEY });
      const previous = patchCache(apiKeyId, { status: 'revoked' });
      return { previous };
    },
    onError: (error, _vars, context) => {
      rollback(context?.previous);
      toast.error(getErrorMessage(error, 'Failed to revoke API key'));
    },
    onSuccess: () => {
      toast.success('API key revoked.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: API_KEYS_QUERY_KEY });
    },
  });

  return {
    apiKeys,
    isLoading,
    error: isError
      ? getErrorMessage(queryError, 'Failed to load API keys')
      : null,

    createApiKey: createMutation.mutateAsync,
    createLoading: createMutation.isPending,

    updateName: (apiKeyId: string, payload: UpdateApiKeyNameDto) =>
      updateNameMutation.mutateAsync({ apiKeyId, payload }),
    updateNameLoading: updateNameMutation.isPending,

    updateScopes: (apiKeyId: string, payload: UpdateApiKeyScopesDto) =>
      updateScopesMutation.mutateAsync({ apiKeyId, payload }),
    updateScopesLoading: updateScopesMutation.isPending,

    updateExpiration: (apiKeyId: string, payload: UpdateApiKeyExpirationDto) =>
      updateExpirationMutation.mutateAsync({ apiKeyId, payload }),
    updateExpirationLoading: updateExpirationMutation.isPending,

    rotateApiKey: rotateMutation.mutateAsync,
    rotateLoading: rotateMutation.isPending,

    revokeApiKey: revokeMutation.mutateAsync,
    revokeLoading: revokeMutation.isPending,
  };
}
