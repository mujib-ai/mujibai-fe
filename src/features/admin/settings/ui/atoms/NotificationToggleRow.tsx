'use client';

import { Switch } from '@/shared/components/atoms/ui/switch';

import type { NotificationToggleRowProps } from '../../types';

export function NotificationToggleRow({
  label,
  checked,
  onCheckedChange,
}: NotificationToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-[#3B82F614] px-3 py-3 dark:bg-[#3B82F614]">
      <h1 className="min-w-0 flex-1 text-start">{label}</h1>
      <Switch id={label} checked={checked} onCheckedChange={onCheckedChange} className="shrink-0" />
    </div>
  );
}
