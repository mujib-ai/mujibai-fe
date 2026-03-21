'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { PlanType, type PlansFilters } from '@/features/admin/plans';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import { Input } from '@/shared/components/atoms/ui/input';
import { Filter, Search } from 'lucide-react';

import CreatePlanDialog from './CreatePlanDialog';

interface PlansSearchAndFilteringProps {
  filters: PlansFilters;
  setFilters: React.Dispatch<React.SetStateAction<PlansFilters>>;
}

export default function PlansSearchAndFiltering({
  filters,
  setFilters,
}: PlansSearchAndFilteringProps) {
  const tPlaceholders = useTranslations('placeholders');
  const tPlans = useTranslations('plans');
  const [searchValue, setSearchValue] = React.useState(filters.title ?? '');
  const [selectedType, setSelectedType] = React.useState<PlanType | undefined>(
    filters.type
  );

  return (
    <div className="grid w-full grid-cols-1 items-center gap-4 md:grid-cols-2">
      <div className="flex w-full items-center gap-2 rounded-full bg-[#06B6D426] px-3 py-2 dark:bg-white/10">
        <Input
          placeholder={tPlaceholders('searchByPlanName')}
          className="flex-1 border-0 py-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
          value={searchValue}
            onChange={e => {
              const value = e.target.value;
              setSearchValue(value);
              setFilters(prev => ({
                ...prev,
                title: value || undefined,
                page: 1,
              }));
            }}
        />
        <div className="text-primary flex items-center rounded-full bg-white p-2 dark:bg-[#FFFFFF26]">
          <Search className="size-4" />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-primary text-primary hover:bg-primary/10 hover:text-primary data-[state=open]:bg-primary size-10 rounded-md data-[state=open]:text-white"
            >
              <Filter className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuItem
              onClick={() => {
                setSelectedType(PlanType.MONTHLY);
                setFilters(prev => ({
                  ...prev,
                  type: PlanType.MONTHLY,
                  page: 1,
                }));
              }}
            >
              {tPlans('monthly')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedType(PlanType.YEARLY);
                setFilters(prev => ({
                  ...prev,
                  type: PlanType.YEARLY,
                  page: 1,
                }));
              }}
            >
              {tPlans('yearly')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CreatePlanDialog />
      </div>
    </div>
  );
}
