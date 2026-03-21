import { Skeleton } from '@/shared/components/atoms/ui/skeleton';

export function PlanCardSkeleton() {
  return (
    <div className="border-border rounded-xl border bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-16 rounded-full" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}
