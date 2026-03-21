'use client';

import * as React from 'react';

import { type PlansFilters } from '../types';

const DEFAULT_FILTERS: Readonly<PlansFilters> = {
  title: '',
  type: undefined,
  page: 1,
  limit: 10,
};

export default function usePlansFilters() {
  const [filters, setFilters] = React.useState<PlansFilters>(DEFAULT_FILTERS);

  return {
    filters,
    setFilters,
  };
}
