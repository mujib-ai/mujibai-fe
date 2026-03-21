'use client';

import { useTranslations } from 'next-intl';

import { Search } from 'lucide-react';

import { Input } from '@/shared/components/atoms/ui/input';

import CreateUserDialog from './CreateUserDialog';

interface UserRolesSearchAndFilteringProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function UserRolesSearchAndFiltering({
  searchValue,
  onSearchChange,
}: UserRolesSearchAndFilteringProps) {
  const tPlaceholders = useTranslations('placeholders');

  return (
    <div className="grid w-full grid-cols-1 items-center justify-between md:grid-cols-6 lg:grid-cols-6">
      <div className="col-span-3 flex w-full items-center gap-2 rounded-full bg-[#06B6D426] px-3 py-2 dark:bg-white/10">
        <Input
          placeholder={tPlaceholders('searchByNameEmailSector')}
          className="flex-1 border-0 py-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
        />
        <div className="text-primary flex items-center rounded-full bg-white p-2 dark:bg-[#FFFFFF26]">
          <Search className="size-4" />
        </div>
      </div>

      <div className="col-span-3 flex items-center justify-end gap-2">
        <CreateUserDialog />
      </div>
    </div>
  );
}
