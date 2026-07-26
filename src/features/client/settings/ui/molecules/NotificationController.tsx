'use client';

import { useLocale } from 'next-intl';

import { Switch } from '@/shared/components/atoms/ui/switch';

export interface NotificationControllerProps {
  title: string;
  description: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function NotificationController({
  title,
  description,
  checked,
  onCheckedChange,
  disabled,
}: NotificationControllerProps) {
  const locale = useLocale();

  return (
    <div className="my-3 flex w-full items-center justify-between rounded-xl bg-[#3B82F614] p-4">
      <div className="flex flex-col items-start">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Switch
        id={title}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={`${locale === 'ar' ? 'mr-4' : 'ml-4'}`}
      />
    </div>
  );
}
