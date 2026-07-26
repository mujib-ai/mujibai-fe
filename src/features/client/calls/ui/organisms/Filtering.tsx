'use client';

import { useState } from 'react';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';
import { cn } from '@/shared/lib/utils';
import { Filter } from 'lucide-react';

import { CALL_STATUSES } from '../../types';
import type { CallStatus } from '../../types';

const ALL_STATUSES = 'all';

export default function Filtering({
  status,
  onStatusChange,
  statusPlaceholder,
  allStatusesText,
  t,
}: {
  status: CallStatus | undefined;
  onStatusChange: (status: CallStatus | undefined) => void;
  statusPlaceholder: string;
  allStatusesText: string;
  t: (key: string) => string;
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex w-full items-center justify-end gap-3 px-2 py-2">
      {showFilters && (
        <div className="animate-in fade-in-0 slide-in-from-top-1 flex flex-wrap items-center gap-3 duration-200">
          <Select
            value={status ?? ALL_STATUSES}
            onValueChange={value =>
              onStatusChange(
                value === ALL_STATUSES ? undefined : (value as CallStatus)
              )
            }
          >
            <SelectTrigger className="bg-control h-12 w-65 rounded-full border-0 shadow-none transition-colors focus-visible:ring-0">
              <SelectValue placeholder={statusPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_STATUSES}>{allStatusesText}</SelectItem>
              {CALL_STATUSES.map(value => (
                <SelectItem key={value} value={value}>
                  {t(`callStatuses.${value}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <Button
        type="button"
        aria-pressed={showFilters}
        onClick={() => setShowFilters(prev => !prev)}
        className={cn(showFilters && 'bg-primary/20 text-primary')}
      >
        <Filter className="size-4" />
      </Button>
    </div>
  );
}
