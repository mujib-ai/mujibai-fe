'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';

import type { SlackChannel } from '../../types';

export default function SlackChannelSelector({
  channels,
  value,
  onChange,
  placeholder,
  disabled,
}: {
  channels: SlackChannel[];
  value: string | null;
  onChange: (channelId: string) => void;
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
        {channels.map(channel => (
          <SelectItem key={channel.id} value={channel.id}>
            #{channel.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
