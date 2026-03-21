'use client';

import React from 'react';

import { usePlansFilters } from '@/features/admin/plans';

import PlansSearchAndFiltering from './PlansSearchAndFiltering';
import PlansTable from './PlansTable';

export default function PlansPageOrganism() {
  const { filters, setFilters } = usePlansFilters();

  return (
    <div className="space-y-4">
      <PlansSearchAndFiltering filters={filters} setFilters={setFilters} />
      <PlansTable filters={filters} setFilters={setFilters} />
    </div>
  );
}
