'use client';

import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardHeader,
} from '@/shared/components/atoms/ui/card';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';
import { MoreHorizontal } from 'lucide-react';

const BAR = 'rounded-md bg-primary/10 dark:bg-white/10';
const ROW_COUNT = 5;

interface KnowledgeSourcesTableSkeletonProps {
  isMobile: boolean;
}

function CardRowSkeleton({ index }: { index: number }) {
  return (
    <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-2 px-4">
        <div className="flex min-w-0 items-center gap-2">
          <Skeleton className={`${BAR} size-4 shrink-0 rounded`} />
          <Skeleton
            className={`${BAR} h-4 rounded`}
            style={{ width: 96 + ((index * 37) % 64) }}
          />
        </div>
        <span className="text-muted-foreground/40 inline-flex size-8 items-center justify-center rounded-md">
          <MoreHorizontal className="size-4" />
        </span>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 px-4">
        <div className="flex flex-col gap-2">
          <Skeleton className={`${BAR} h-5 w-20 rounded-full`} />
        </div>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, cellIndex) => (
            <div key={cellIndex}>
              <dt>
                <Skeleton className={`${BAR} h-3 w-14 rounded`} />
              </dt>
              <dd className="mt-1.5">
                <Skeleton className={`${BAR} h-3.5 w-16 rounded`} />
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

export default function KnowledgeSourcesTableSkeleton({
  isMobile,
}: KnowledgeSourcesTableSkeletonProps) {
  const t = useTranslations('KnowledgeBase.sources.columns');

  if (isMobile) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardRowSkeleton key={index} index={index} />
        ))}
      </div>
    );
  }

  return (
    <Table
      aria-label={t('source')}
      className="rounded-lg border bg-white dark:bg-[#00143473]"
    >
      <TableHeader>
        <TableRow>
          <TableHead
            scope="row"
            className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap"
          >
            {t('source')}
          </TableHead>
          <TableHead className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
            {t('type')}
          </TableHead>
          <TableHead className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
            {t('status')}
          </TableHead>
          <TableHead className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
            {t('progress')}
          </TableHead>
          <TableHead className="text-foreground h-10 px-2 text-center align-middle font-medium whitespace-nowrap">
            {t('documents')}
          </TableHead>
          <TableHead className="text-foreground h-10 px-2 text-center align-middle font-medium whitespace-nowrap">
            {t('chunks')}
          </TableHead>
          <TableHead className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
            {t('uploadedAt')}
          </TableHead>
          <TableHead className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
            {t('updatedAt')}
          </TableHead>
          <TableHead className="text-foreground h-10 px-2 text-right align-middle font-medium whitespace-nowrap">
            {t('actions')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: ROW_COUNT }).map((_, index) => (
          <TableRow key={index} className="border-t">
            <TableCell className="max-w-56 p-2 align-middle">
              <div className="flex items-center gap-1.5">
                <Skeleton className={`${BAR} size-4 shrink-0 rounded`} />
                <Skeleton
                  className={`${BAR} h-4 rounded`}
                  style={{ width: 90 + ((index * 41) % 70) }}
                />
              </div>
            </TableCell>
            <TableCell className="p-2 align-middle">
              <div className="flex items-center gap-1.5">
                <Skeleton className={`${BAR} size-4 shrink-0 rounded`} />
                <Skeleton className={`${BAR} h-4 w-14 rounded`} />
              </div>
            </TableCell>
            <TableCell className="p-2 align-middle">
              <Skeleton className={`${BAR} h-5 w-20 rounded-full`} />
            </TableCell>
            <TableCell className="p-2 align-middle">
              <Skeleton className={`${BAR} h-2 w-40 rounded-full`} />
            </TableCell>
            <TableCell className="p-2 text-center align-middle">
              <Skeleton className={`${BAR} mx-auto h-4 w-6 rounded`} />
            </TableCell>
            <TableCell className="p-2 text-center align-middle">
              <Skeleton className={`${BAR} mx-auto h-4 w-6 rounded`} />
            </TableCell>
            <TableCell className="p-2 align-middle">
              <Skeleton className={`${BAR} h-4 w-24 rounded`} />
            </TableCell>
            <TableCell className="p-2 align-middle">
              <Skeleton className={`${BAR} h-4 w-24 rounded`} />
            </TableCell>
            <TableCell className="p-2 text-right align-middle">
              <span className="text-muted-foreground/40 inline-flex size-8 items-center justify-center rounded-md">
                <MoreHorizontal className="size-4" />
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
