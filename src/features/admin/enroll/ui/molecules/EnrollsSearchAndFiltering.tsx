'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { EnrollStatus } from '@/features/admin/enroll';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import { Input } from '@/shared/components/atoms/ui/input';
import { Filter, Search } from 'lucide-react';

const SEARCH_DEBOUNCE_MS = 300;

interface EnrollsSearchAndFilteringProps {
  t: (key: string) => string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusFilter?: EnrollStatus;
  onStatusFilterChange: (value: EnrollStatus | undefined) => void;
}

export default function EnrollsSearchAndFiltering({
  t,
  searchValue,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: EnrollsSearchAndFilteringProps) {
  const tPlaceholders = useTranslations('placeholders');
  const tEnrollmentForms = useTranslations('enrollmentForms');
  const [localValue, setLocalValue] = useState(searchValue);

  useEffect(() => {
    setLocalValue(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localValue);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [localValue, onSearchChange]);

  return (
    <div className="grid w-full grid-cols-1 items-center justify-between md:grid-cols-6 lg:grid-cols-6">
      <div className="col-span-3 flex w-full items-center gap-2 rounded-full bg-[#06B6D426] px-3 py-2 dark:bg-white/10">
        <Input
          placeholder={tPlaceholders('searchByNameEmailSector')}
          className="flex-1 border-0 py-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
          value={localValue}
          onChange={e => setLocalValue(e.target.value)}
        />
        <div className="text-primary flex items-center rounded-full bg-white p-2 dark:bg-[#FFFFFF26]">
          <Search className="size-4" />
        </div>
      </div>

      <div className="col-span-3 flex items-center justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label={t('filterByStatus')}
              className={`border-primary text-primary hover:border-primary hover:text-primary size-10 rounded-md border-2 data-[state=open]:bg-primary data-[state=open]:text-white ${
                statusFilter ? 'bg-primary/10' : ''
              }`}
            >
              <Filter className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => onStatusFilterChange(undefined)}
              className={!statusFilter ? 'bg-primary/10' : ''}
            >
              {tEnrollmentForms('statusAll')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStatusFilterChange(EnrollStatus.PENDING)}
              className={statusFilter === EnrollStatus.PENDING ? 'bg-primary/10' : ''}
            >
              {tEnrollmentForms('statusPending')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStatusFilterChange(EnrollStatus.APPROVED)}
              className={statusFilter === EnrollStatus.APPROVED ? 'bg-primary/10' : ''}
            >
              {tEnrollmentForms('statusApproved')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStatusFilterChange(EnrollStatus.REJECTED)}
              className={statusFilter === EnrollStatus.REJECTED ? 'bg-primary/10' : ''}
            >
              {tEnrollmentForms('statusRejected')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
