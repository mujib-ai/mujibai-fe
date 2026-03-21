'use client';

import { useMemo } from 'react';

import { useTranslations } from 'next-intl';

import type { TenantStatusFilter } from '../types';

type FilterKey = 'all' | 'active' | 'inactive' | 'trail';

interface FilterState {
  all: boolean;
  active: boolean;
  inactive: boolean;
  trail: boolean;
}

function statusToFilterState(status: TenantStatusFilter): FilterState {
  return {
    all: status === 'all',
    active: status === 'active',
    inactive: status === 'disactive',
    trail: false,
  };
}

export interface UseTenantsSearchAndFilteringParams {
  status: TenantStatusFilter;
  onStatusChange: (status: TenantStatusFilter) => void;
}

export function useTenantsSearchAndFiltering({
  status,
  onStatusChange,
}: UseTenantsSearchAndFilteringParams) {
  const tPlaceholders = useTranslations('placeholders');
  const tActions = useTranslations('actions');
  const tCommon = useTranslations('common');

  const filterState = useMemo(() => statusToFilterState(status), [status]);

  const handleFilterChange = (key: FilterKey) => {
    if (key === 'all') {
      onStatusChange('all');
      return;
    }
    if (key === 'active') {
      onStatusChange('active');
      return;
    }
    if (key === 'inactive') {
      onStatusChange('disactive');
      return;
    }
  };

  return {
    tPlaceholders,
    tActions,
    tCommon,
    filterState,
    handleFilterChange,
  };
}
