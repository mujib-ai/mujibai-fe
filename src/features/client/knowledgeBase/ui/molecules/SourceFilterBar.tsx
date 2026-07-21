'use client';

import { useTranslations } from 'next-intl';

import { Button, ListBox, ListBoxItem, Select } from '@heroui/react';
import { ChevronDown, RotateCcw, Search } from 'lucide-react';

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

const SELECT_TRIGGER_CLASS =
  'border-input flex h-9 w-40 cursor-pointer items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs outline-none';
const SELECT_POPOVER_CLASS =
  'bg-popover text-popover-foreground z-50 min-w-40 overflow-hidden rounded-md border shadow-md';
const SELECT_ITEM_CLASS =
  'cursor-pointer rounded-sm px-2 py-1.5 text-sm outline-none data-[hovered]:bg-[#06B6D40F] data-[hovered]:text-[#06B6D4] data-[focused]:bg-[#06B6D40F] data-[focused]:text-[#06B6D4]';

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
    <Select
      aria-label={ariaLabel}
      selectedKey={selectedValue}
      onSelectionChange={key => onChange(String(key))}
    >
      <Select.Trigger className={SELECT_TRIGGER_CLASS}>
        <Select.Value className="truncate" />
        <ChevronDown className="size-4 shrink-0 opacity-50" />
      </Select.Trigger>
      <Select.Popover className={SELECT_POPOVER_CLASS}>
        <ListBox className="p-1 outline-none">
          {options.map(option => (
            <ListBoxItem
              key={option.value}
              id={option.value}
              className={SELECT_ITEM_CLASS}
            >
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Select.Popover>
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
      <div className="relative min-w-48 flex-1">
        <Search
          aria-hidden
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <input
          value={searchInput}
          onChange={event => onSearchChange(event.target.value)}
          placeholder={t('filters.searchPlaceholder')}
          aria-label={t('filters.searchPlaceholder')}
          className="border-input placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-full rounded-md border bg-transparent py-1 pr-3 pl-9 text-sm shadow-xs outline-none focus-visible:ring-2"
        />
      </div>

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
          onPress={onReset}
          className="hover:bg-accent inline-flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm"
        >
          <RotateCcw className="size-3.5" />
          {t('filters.reset')}
        </Button>
      )}
    </div>
  );
}
