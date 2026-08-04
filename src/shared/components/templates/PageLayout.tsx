import type { ReactNode, Ref } from 'react';

import DashboardHeader from '@/shared/components/organisms/dashboard/DashboardHeader';
import { cn } from '@/shared/lib/utils';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  contentRef?: Ref<HTMLDivElement>;
}

export function PageLayout({
  title,
  subtitle,
  children,
  className,
  contentClassName,
  contentRef,
}: PageLayoutProps) {
  return (
    <section
      ref={contentRef}
      className={cn('flex min-h-0 w-full flex-1 flex-col gap-4', className)}
    >
      <DashboardHeader title={title} subtitle={subtitle} />
      <div
        className={cn(
          'bg-surface relative z-10 min-h-0 w-full flex-1 rounded-2xl border border-white/40 p-4 shadow-sm backdrop-blur-sm sm:p-5 dark:border-white/10',
          contentClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
