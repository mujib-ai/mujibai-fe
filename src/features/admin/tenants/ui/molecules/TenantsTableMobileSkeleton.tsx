'use client';

import { Skeleton } from '@/shared/components/atoms/ui/skeleton';

export function TenantsTableMobileSkeleton() {
  return (
    <div className="space-y-3 p-4 md:hidden">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="border-[#06B6D426] hover:bg-[#06B6D40F] flex flex-col gap-3 rounded-xl border bg-[#FFFFFFBF] p-4 shadow-sm transition-colors dark:bg-[#001434A6]"
        >
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-40 rounded-md" />
            <Skeleton className="h-3 w-32 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

