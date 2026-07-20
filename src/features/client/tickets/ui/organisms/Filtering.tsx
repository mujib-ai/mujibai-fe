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

import { TICKET_STATUSES } from '../../types';
import type { TicketStatus } from '../../types';

const ALL_STATUSES = 'all';

export default function Filtering({
  status,
  onStatusChange,
  statusPlaceholder,
  allStatusesText,
  t,
}: {
  status: TicketStatus | undefined;
  onStatusChange: (status: TicketStatus | undefined) => void;
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
                value === ALL_STATUSES ? undefined : (value as TicketStatus)
              )
            }
          >
            <SelectTrigger className="h-11 w-65 rounded-lg border-0 bg-[#F7F7F7F2] shadow-none transition-colors dark:bg-[#001434A6]">
              <SelectValue placeholder={statusPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_STATUSES}>{allStatusesText}</SelectItem>
              {TICKET_STATUSES.map(value => (
                <SelectItem key={value} value={value}>
                  {t(`statuses.${value}`)}
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
