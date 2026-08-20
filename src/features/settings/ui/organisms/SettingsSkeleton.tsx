'use client';

import { Skeleton } from '@/shared/components/atoms/ui/skeleton';

const BAR = 'rounded-md bg-primary/10 dark:bg-white/10';

function FieldSkeleton({ labelWidth }: { labelWidth: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className={`${BAR} h-3.5 ${labelWidth}`} />
      <Skeleton className={`${BAR} h-12 w-full rounded-full`} />
    </div>
  );
}

export default function SettingsSkeleton() {
  return (
    <>
      <div className="mx-3 mt-4 flex h-12 flex-wrap justify-between gap-2 rounded-full bg-[#3B82F614] p-1 dark:bg-[#3B82F614]">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className={`${BAR} h-full flex-1 rounded-full`}
          />
        ))}
      </div>

      <div className="mt-4 w-full">
        <div className="px-6 pt-6">
          <Skeleton className={`${BAR} h-7 w-40`} />
        </div>
        <div className="bg-surface rounded-2xl p-6">
          <div className="mb-6 flex flex-col gap-2">
            <Skeleton className={`${BAR} h-5 w-48`} />
            <Skeleton className={`${BAR} h-3.5 w-64`} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full flex flex-col gap-4 rounded-2xl border border-dashed p-4 sm:flex-row sm:items-center">
              <Skeleton className={`${BAR} size-24 shrink-0 rounded-2xl`} />
              <div className="flex flex-1 flex-col gap-3">
                <Skeleton className={`${BAR} h-4 w-32`} />
                <Skeleton className={`${BAR} h-3.5 w-56`} />
                <Skeleton className={`${BAR} h-10 w-32 rounded-full`} />
              </div>
            </div>

            <FieldSkeleton labelWidth="w-16" />
            <FieldSkeleton labelWidth="w-16" />
            <FieldSkeleton labelWidth="w-20" />
            <FieldSkeleton labelWidth="w-20" />
            <FieldSkeleton labelWidth="w-12" />

            <div className="col-span-full mt-8 flex flex-col gap-2">
              <Skeleton className={`${BAR} h-5 w-52`} />
              <Skeleton className={`${BAR} h-3.5 w-72`} />
            </div>

            <FieldSkeleton labelWidth="w-32" />
            <FieldSkeleton labelWidth="w-28" />
            <FieldSkeleton labelWidth="w-36" />

            <div className="col-span-full mt-6 flex justify-end">
              <Skeleton className={`${BAR} h-10 w-32 rounded-full`} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 w-full">
        <div className="px-6 pt-6">
          <Skeleton className={`${BAR} h-7 w-40`} />
        </div>
        <div className="bg-surface flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6">
          <div className="flex flex-col gap-2">
            <Skeleton className={`${BAR} h-6 w-24 rounded-full`} />
            <Skeleton className={`${BAR} h-3.5 w-72`} />
          </div>
          <Skeleton className={`${BAR} h-10 w-32 rounded-full`} />
        </div>
      </div>
    </>
  );
}
