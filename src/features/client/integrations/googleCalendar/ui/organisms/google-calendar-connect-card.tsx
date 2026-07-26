'use client';

import Image from 'next/image';

import { Button } from '@/shared/components/atoms/ui/button';
import { Spinner } from '@heroui/react';

export default function GoogleCalendarConnectCard({
  title,
  description,
  connectLabel,
  onConnect,
  isConnecting,
}: {
  title: string;
  description: string;
  connectLabel: string;
  onConnect: () => void;
  isConnecting: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-white p-4 text-center dark:bg-[#FFFFFF0F]">
      <div className="rounded-full bg-white p-3 shadow-sm dark:bg-[#00143473]">
        <Image
          src="/dashboard-images/logos_google-calendar.svg"
          alt={title}
          width={40}
          height={40}
          loading="lazy"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 capitalize dark:text-gray-200">
        {title}
      </h3>
      <p className="mx-auto w-[80%] text-gray-600 dark:text-gray-400">
        {description}
      </p>
      <Button
        className="mt-5 w-full rounded-full py-6"
        onClick={onConnect}
        disabled={isConnecting}
      >
        {isConnecting ? (
          <span className="flex items-center gap-2">
            <Spinner size="sm" color="current" />
            {connectLabel}
          </span>
        ) : (
          connectLabel
        )}
      </Button>
    </div>
  );
}
