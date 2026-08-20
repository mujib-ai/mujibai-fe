'use client';

import { Card, CardContent } from '@/shared/components/atoms/ui/card';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';
import { useIsMobile } from '@/shared/hooks/use-mobile';

const SKELETON_ROWS = 4;
const BAR = 'rounded-md bg-primary/10 dark:bg-white/10';

export default function TicketsTableSkeleton({
  t,
  locale,
  titleKey = 'title',
}: {
  t: (key: string) => string;
  locale: string;
  titleKey?: string;
}) {
  const isMobile = useIsMobile();
  const alignClass = locale === 'ar' ? 'text-right' : 'text-left';
  const rows = Array.from({ length: SKELETON_ROWS });

  if (isMobile) {
    return (
      <div className="flex flex-col gap-3">
        {rows.map((_, index) => (
          <Card
            key={index}
            className="border-0 bg-[#FFFFFFBF] shadow-none dark:bg-[#001434A6]"
          >
            <CardContent className="flex flex-col gap-3 p-4">
              <div className="flex items-center justify-between gap-2">
                <Skeleton className={`${BAR} h-4 w-28`} />
                <div className="flex items-center gap-2">
                  <Skeleton className={`${BAR} h-5 w-16 rounded-full`} />
                  <Skeleton className={`${BAR} h-8 w-8 rounded-full`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {Array.from({ length: 4 }).map((__, cellIndex) => (
                  <Skeleton key={cellIndex} className={`${BAR} h-3 w-20`} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Table
      aria-label={t(titleKey)}
      className="min-w-180 rounded-xl bg-[#FFFFFFBF] dark:bg-[#001434A6]"
    >
      <TableHeader>
        <TableRow>
          <TableHead
            scope="row"
            className={`${alignClass} text-foreground px-4 py-3 font-medium`}
          >
            {t('customer')}
          </TableHead>
          <TableHead
            className={`${alignClass} text-foreground px-4 py-3 font-medium`}
          >
            {t('phone')}
          </TableHead>
          <TableHead
            className={`${alignClass} text-foreground px-4 py-3 font-medium`}
          >
            {t('duration')}
          </TableHead>
          <TableHead
            className={`${alignClass} text-foreground px-4 py-3 font-medium`}
          >
            {t('scenario')}
          </TableHead>
          <TableHead
            className={`${alignClass} text-foreground px-4 py-3 font-medium`}
          >
            {t('date')}
          </TableHead>
          <TableHead className="text-foreground px-4 py-3 text-center font-medium">
            {t('status')}
          </TableHead>
          <TableHead className="text-foreground px-4 py-3 text-center font-medium">
            {t('receipt')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((_, index) => (
          <TableRow key={index} className="border-t border-transparent">
            <TableCell className="px-4 py-3">
              <Skeleton className={`${BAR} h-4 w-24`} />
            </TableCell>
            <TableCell className="px-4 py-3">
              <Skeleton className={`${BAR} h-4 w-32`} />
            </TableCell>
            <TableCell className="px-4 py-3">
              <Skeleton className={`${BAR} h-4 w-16`} />
            </TableCell>
            <TableCell className="px-4 py-3">
              <Skeleton className={`${BAR} h-4 w-28`} />
            </TableCell>
            <TableCell className="px-4 py-3">
              <Skeleton className={`${BAR} h-4 w-20`} />
            </TableCell>
            <TableCell className="px-4 py-3 text-center">
              <Skeleton className={`${BAR} mx-auto h-5 w-16 rounded-full`} />
            </TableCell>
            <TableCell className="px-4 py-3 text-center">
              <Skeleton className={`${BAR} mx-auto h-8 w-8 rounded-full`} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
