'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';
import { SearchInput } from '@/shared/components/molecules/SearchInput';
import { RotateCcw } from 'lucide-react';

import { INGESTION_STATUSES } from '../../constants/ingestion-status';
import type {
  IngestionStatus,
  KnowledgeSourceFilters,
  KnowledgeSourceType,
} from '../../types';

const SOURCE_TYPES: KnowledgeSourceType[] = [
  'pdf',
  'txt',
  'csv',
  'excel',
  'manual_text',
  'faq',
  'website',
  'api',
];

const ALL = 'all';

interface FilterSelectOption {
  value: string;
  label: string;
}

function FilterSelect({
  ariaLabel,
  selectedValue,
  options,
  onChange,
}: {
  ariaLabel: string;
  selectedValue: string;
  options: FilterSelectOption[];
  onChange: (value: string) => void;
}) {
  return (
    <Select value={selectedValue} onValueChange={onChange}>
      <SelectTrigger aria-label={ariaLabel} className="w-full sm:w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface SourceFilterBarProps {
  filters: KnowledgeSourceFilters;
  searchInput: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: IngestionStatus | undefined) => void;
  onSourceTypeChange: (value: KnowledgeSourceType | undefined) => void;
  onEnabledChange: (value: boolean | undefined) => void;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export default function SourceFilterBar({
  filters,
  searchInput,
  onSearchChange,
  onStatusChange,
  onSourceTypeChange,
  onEnabledChange,
  hasActiveFilters,
  onReset,
}: SourceFilterBarProps) {
  const t = useTranslations('KnowledgeBase');

  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput
        value={searchInput}
        onChange={event => onSearchChange(event.target.value)}
        placeholder={t('filters.searchPlaceholder')}
        aria-label={t('filters.searchPlaceholder')}
        containerClassName="min-w-48 flex-1"
      />

      <FilterSelect
        ariaLabel={t('filters.status')}
        selectedValue={filters.status ?? ALL}
        onChange={value =>
          onStatusChange(value === ALL ? undefined : (value as IngestionStatus))
        }
        options={[
          { value: ALL, label: t('filters.allStatuses') },
          ...INGESTION_STATUSES.map(status => ({
            value: status,
            label: t(`status.${status}.label`),
          })),
        ]}
      />

      <FilterSelect
        ariaLabel={t('filters.type')}
        selectedValue={filters.sourceType ?? ALL}
        onChange={value =>
          onSourceTypeChange(
            value === ALL ? undefined : (value as KnowledgeSourceType)
          )
        }
        options={[
          { value: ALL, label: t('filters.allTypes') },
          ...SOURCE_TYPES.map(type => ({
            value: type,
            label: t(`sourceTypes.${type}`),
          })),
        ]}
      />

      <FilterSelect
        ariaLabel={t('filters.enabled')}
        selectedValue={
          filters.isEnabled === undefined ? ALL : String(filters.isEnabled)
        }
        onChange={value =>
          onEnabledChange(value === ALL ? undefined : value === 'true')
        }
        options={[
          { value: ALL, label: t('filters.allSources') },
          { value: 'true', label: t('filters.enabledOnly') },
          { value: 'false', label: t('filters.disabledOnly') },
        ]}
      />

      {hasActiveFilters && (
        <Button
          variant="ghost"
          onClick={onReset}
          className="hover:bg-accent inline-flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm"
        >
          <RotateCcw className="size-3.5" />
          {t('filters.reset')}
        </Button>
      )}
    </div>
  );
}
