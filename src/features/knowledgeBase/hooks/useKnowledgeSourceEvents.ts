'use client';

import { useEffect, useRef } from 'react';

import { useTranslations } from 'next-intl';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { knowledgeKeys } from '../constants/query-keys';
import type { KnowledgeSource } from '../types';

export default function useKnowledgeSourceEvents(sources: KnowledgeSource[]) {
  const queryClient = useQueryClient();
  const t = useTranslations('KnowledgeBase');
  const previousStatuses = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    let shouldInvalidateStats = false;

    for (const source of sources) {
      const previousStatus = previousStatuses.current.get(source.id);

      if (previousStatus && previousStatus !== source.status) {
        if (source.status === 'completed') {
          toast.success(t('notifications.completed', { name: source.name }));
          shouldInvalidateStats = true;
        } else if (source.status === 'failed') {
          toast.error(t('notifications.failed', { name: source.name }));
          shouldInvalidateStats = true;
        }
      }

      previousStatuses.current.set(source.id, source.status);
    }

    if (shouldInvalidateStats) {
      queryClient.invalidateQueries({
        queryKey: knowledgeKeys.sourcesRoot(),
      });
    }
  }, [sources, queryClient, t]);
}
