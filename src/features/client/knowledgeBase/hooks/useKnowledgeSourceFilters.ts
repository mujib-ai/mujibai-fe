'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useDebounce } from '@/shared/hooks/useDebounce';

import type {
  IngestionStatus,
  KnowledgeSourceFilters,
  KnowledgeSourceSortField,
  KnowledgeSourceType,
  SortOrder,
} from '../types';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_SORT_BY: KnowledgeSourceSortField = 'created_at';
const DEFAULT_SORT_ORDER: SortOrder = 'desc';

function parseBoolean(value: string | null): boolean | undefined {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

export default function useKnowledgeSourceFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(
    searchParams.get('search') ?? ''
  );
  const debouncedSearch = useDebounce(searchInput, 400);

  const page = Number(searchParams.get('page') ?? '1') || 1;
  const status =
    (searchParams.get('status') as IngestionStatus | null) ?? undefined;
  const sourceType =
    (searchParams.get('type') as KnowledgeSourceType | null) ?? undefined;
  const isEnabled = parseBoolean(searchParams.get('enabled'));
  const sortBy =
    (searchParams.get('sortBy') as KnowledgeSourceSortField | null) ??
    DEFAULT_SORT_BY;
  const sortOrder =
    (searchParams.get('sortOrder') as SortOrder | null) ?? DEFAULT_SORT_ORDER;

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>, resetPage: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      if (resetPage) {
        params.set('page', '1');
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams]
  );
  useEffect(() => {
    const currentSearch = searchParams.get('search') ?? '';
    if (debouncedSearch === currentSearch) return;
    updateParams({ search: debouncedSearch || undefined }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const filters: KnowledgeSourceFilters = useMemo(
    () => ({
      page,
      pageSize: DEFAULT_PAGE_SIZE,
      status,
      sourceType,
      isEnabled,
      search: searchParams.get('search') || undefined,
      sortBy,
      sortOrder,
    }),
    [page, status, sourceType, isEnabled, searchParams, sortBy, sortOrder]
  );

  const setPage = useCallback(
    (nextPage: number) => updateParams({ page: String(nextPage) }, false),
    [updateParams]
  );

  const setStatusFilter = useCallback(
    (value: IngestionStatus | undefined) =>
      updateParams({ status: value }, true),
    [updateParams]
  );

  const setSourceTypeFilter = useCallback(
    (value: KnowledgeSourceType | undefined) =>
      updateParams({ type: value }, true),
    [updateParams]
  );

  const setEnabledFilter = useCallback(
    (value: boolean | undefined) =>
      updateParams(
        { enabled: value === undefined ? undefined : String(value) },
        true
      ),
    [updateParams]
  );

  const setSort = useCallback(
    (field: KnowledgeSourceSortField, order: SortOrder) =>
      updateParams({ sortBy: field, sortOrder: order }, false),
    [updateParams]
  );

  const resetFilters = useCallback(() => {
    setSearchInput('');
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const hasActiveFilters = !!(
    status ||
    sourceType ||
    isEnabled !== undefined ||
    searchParams.get('search')
  );

  return {
    filters,
    page,
    searchInput,
    setSearchInput,
    setPage,
    setStatusFilter,
    setSourceTypeFilter,
    setEnabledFilter,
    setSort,
    resetFilters,
    hasActiveFilters,
  };
}
