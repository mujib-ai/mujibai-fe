'use client';

import { useLocale } from 'next-intl';

import { Switch } from '@/shared/components/atoms/ui/switch';

export interface NotificationControllerProps {
  title: string;
  description: string;
}

export function NotificationController({
  title,
  description,
}: NotificationControllerProps) {
  const locale = useLocale();

  return (
    <div className="my-3 flex w-full items-center justify-between rounded-xl bg-[#3B82F614] p-4">
      <div className="flex flex-col items-start">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Switch id={title} className={`${locale === 'ar' ? 'mr-4' : 'ml-4'}`} />
    </div>
  );
}
