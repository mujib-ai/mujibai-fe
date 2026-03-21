'use client';

import Image from 'next/image';

import { Button } from '@/shared/components/atoms/ui/button';

export interface IntegrationCardProps {
  title: string;
  subtitle: string;
  image: string;
  add: string;
}

export function IntegrationCard({
  title,
  subtitle,
  image,
  add,
}: IntegrationCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-white p-4 text-center dark:bg-[#FFFFFF0F]">
      <div className="rounded-full bg-white p-3 shadow-sm dark:bg-[#00143473]">
        <Image src={image} alt={title} width={40} height={40} loading="lazy" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 capitalize dark:text-gray-200">
        {title}
      </h3>
      <p className="mx-auto w-[80%] text-gray-600 dark:text-gray-400">
        {subtitle}
      </p>
      <Button className="mt-5 w-full rounded-full py-6">{add}</Button>
    </div>
  );
}
