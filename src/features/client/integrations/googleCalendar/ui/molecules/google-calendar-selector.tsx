'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';

import type { GoogleCalendarCalendar } from '../../types';

export default function GoogleCalendarSelector({
  calendars,
  value,
  onChange,
  placeholder,
  disabled,
}: {
  calendars: GoogleCalendarCalendar[];
  value: string | null;
  onChange: (calendarId: string) => void;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <Select
      value={value ?? undefined}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {calendars.map(calendar => (
          <SelectItem key={calendar.id} value={calendar.id}>
            {calendar.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
