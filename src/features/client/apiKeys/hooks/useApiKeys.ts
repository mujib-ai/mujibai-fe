'use client';

import React from 'react';

import { API_KEYS_CONSTANTS } from '../constants';
import type { ApiKey } from '../types';

export type { ApiKey };

export interface ApiKeysState {
  apiKeys: ApiKey[];
  isLoading: boolean;
  error: string | null;
}

export default function useApiKeys() {
  const [state, setState] = React.useState<ApiKeysState>({
    apiKeys: [
      {
        id: '1',
        name: 'Secret Key',
        key: `${API_KEYS_CONSTANTS.SECRET_KEY_PREFIX}${API_KEYS_CONSTANTS.MASK_CHAR.repeat(5)}gkbs`,
        permissions: [API_KEYS_CONSTANTS.PERMISSIONS.ALL],
        isActive: true,
        createdBy: 'Abdulrhman A...',
        createdAt: new Date('2025-09-22'),
        updatedAt: new Date('2025-09-22'),
        lastUsed: new Date('2025-10-11'),
      } as ApiKey,
    ],
    isLoading: false,
    error: null,
  });

  const createApiKey = React.useCallback(async (data: Partial<ApiKey>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await new Promise(resolve =>
        setTimeout(resolve, API_KEYS_CONSTANTS.CREATE_DELAY_MS)
      );
      const now = new Date();
      const newApiKey: ApiKey = {
        id: Date.now().toString(),
        name: data.name || API_KEYS_CONSTANTS.DEFAULT_KEY_NAME,
        key: `${API_KEYS_CONSTANTS.SECRET_KEY_PREFIX}${API_KEYS_CONSTANTS.MASK_CHAR.repeat(5)}${Math.random().toString(36).substring(2, 6)}`,
        permissions: data.permissions || [API_KEYS_CONSTANTS.PERMISSIONS.ALL],
        isActive: true,
        createdBy: 'Current User',
        createdAt: now,
        updatedAt: now,
      };
      setState(prev => ({
        ...prev,
        apiKeys: [...prev.apiKeys, newApiKey],
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error:
          error instanceof Error ? error.message : 'Failed to create API key',
        isLoading: false,
      }));
    }
  }, []);

  const updateApiKey = React.useCallback(
    async (id: string, data: Partial<ApiKey>) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        await new Promise(resolve =>
          setTimeout(resolve, API_KEYS_CONSTANTS.UPDATE_DELAY_MS)
        );
        setState(prev => ({
          ...prev,
          apiKeys: prev.apiKeys.map(key =>
            key.id === id ? { ...key, ...data } : key
          ),
          isLoading: false,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error:
            error instanceof Error ? error.message : 'Failed to update API key',
          isLoading: false,
        }));
      }
    },
    []
  );

  const deleteApiKey = React.useCallback(async (id: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await new Promise(resolve =>
        setTimeout(resolve, API_KEYS_CONSTANTS.DELETE_DELAY_MS)
      );
      setState(prev => ({
        ...prev,
        apiKeys: prev.apiKeys.filter(key => key.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error:
          error instanceof Error ? error.message : 'Failed to delete API key',
        isLoading: false,
      }));
    }
  }, []);

  const clearError = React.useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    clearError,
  };
}
