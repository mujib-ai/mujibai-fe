import { Skeleton } from '@heroui/react';

const BAR = 'rounded-md bg-black/10 dark:bg-white/10';

export default function KnowledgeBaseLoading() {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <Skeleton
        animationType="none"
        className={`${BAR} h-20 w-full rounded-2xl`}
      />
      <div className="flex h-full w-full flex-col gap-6 rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]">
        <div className="flex items-center justify-between gap-3">
          <Skeleton animationType="none" className={`${BAR} h-6 w-40`} />
          <div className="flex gap-2">
            <Skeleton animationType="none" className={`${BAR} h-8 w-28`} />
            <Skeleton animationType="none" className={`${BAR} h-8 w-28`} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              animationType="none"
              className={`${BAR} h-24 w-full rounded-xl`}
            />
          ))}
        </div>
        <Skeleton
          animationType="none"
          className={`${BAR} h-9 w-full max-w-2xl`}
        />
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
      </div>
    </div>
  );
}
