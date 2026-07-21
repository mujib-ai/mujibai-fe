import { Skeleton } from '@heroui/react';

const BAR = 'rounded-md bg-black/10 dark:bg-white/10';

interface KnowledgeSourcesTableSkeletonProps {
  isMobile: boolean;
}

export default function KnowledgeSourcesTableSkeleton({
  isMobile,
}: KnowledgeSourcesTableSkeletonProps) {
  if (isMobile) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            animationType="none"
            className={`${BAR} h-40 w-full rounded-xl`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Skeleton
        animationType="none"
        className={`${BAR} h-10 w-full rounded-none`}
      />
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton
          key={index}
          animationType="none"
          className={`${BAR} border-border/50 h-14 w-full rounded-none border-t`}
        />
      ))}
    </div>
  );
}
