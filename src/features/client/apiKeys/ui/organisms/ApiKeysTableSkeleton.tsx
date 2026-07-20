'use client';

import { Card, CardContent } from '@/shared/components/atoms/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { Skeleton } from '@heroui/react';

const SKELETON_ROWS = 5;
const SKELETON_BAR_CLASS = 'h-4 rounded-md bg-black/10 dark:bg-white/10';

interface ApiKeysTableSkeletonProps {
  locale: string;
  headers: {
    name: string;
    secretKey: string;
    environment: string;
    status: string;
    scopes: string;
    createdOn: string;
    expiresAt: string;
    lastUsed: string;
    actions: string;
  };
}

export default function ApiKeysTableSkeleton({
  locale,
  headers,
}: ApiKeysTableSkeletonProps) {
  const isMobile = useIsMobile();
  const alignClass = locale === 'ar' ? 'text-right' : 'text-left';
  const rows = Array.from({ length: SKELETON_ROWS });

  if (isMobile) {
    return (
      <div className="my-10 flex flex-col gap-3">
        {rows.map((_, index) => (
          <Card
            key={index}
            className="border-0 bg-white shadow-none dark:bg-[#00143473]"
          >
            <CardContent className="flex flex-col gap-3 p-4">
              <div className="flex items-center justify-between gap-2">
                <Skeleton
                  animationType="none"
                  className={`${SKELETON_BAR_CLASS} w-32`}
                />
                <Skeleton
                  animationType="none"
                  className={`${SKELETON_BAR_CLASS} w-16`}
                />
              </div>
              <Skeleton
                animationType="none"
                className={`${SKELETON_BAR_CLASS} w-40`}
              />
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {Array.from({ length: 4 }).map((__, cellIndex) => (
                  <Skeleton
                    key={cellIndex}
                    animationType="none"
                    className={`${SKELETON_BAR_CLASS} w-20`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Table className="my-10 bg-white dark:bg-[#00143473]">
      <TableHeader>
        <TableRow>
          <TableHead className={alignClass}>{headers.name}</TableHead>
          <TableHead className={alignClass}>{headers.secretKey}</TableHead>
          <TableHead className={alignClass}>{headers.environment}</TableHead>
          <TableHead className={alignClass}>{headers.status}</TableHead>
          <TableHead className={alignClass}>{headers.scopes}</TableHead>
          <TableHead className={alignClass}>{headers.createdOn}</TableHead>
          <TableHead className={alignClass}>{headers.expiresAt}</TableHead>
          <TableHead className={alignClass}>{headers.lastUsed}</TableHead>
          <TableHead className={alignClass}>{headers.actions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton
                animationType="none"
                className={`${SKELETON_BAR_CLASS} w-24`}
              />
            </TableCell>
            <TableCell>
              <Skeleton
                animationType="none"
                className={`${SKELETON_BAR_CLASS} w-28`}
              />
            </TableCell>
            <TableCell>
              <Skeleton
                animationType="none"
                className={`${SKELETON_BAR_CLASS} w-16`}
              />
            </TableCell>
            <TableCell>
              <Skeleton
                animationType="none"
                className={`${SKELETON_BAR_CLASS} w-16`}
              />
            </TableCell>
            <TableCell>
              <Skeleton
                animationType="none"
                className={`${SKELETON_BAR_CLASS} w-20`}
              />
            </TableCell>
            <TableCell>
              <Skeleton
                animationType="none"
                className={`${SKELETON_BAR_CLASS} w-20`}
              />
            </TableCell>
            <TableCell>
              <Skeleton
                animationType="none"
                className={`${SKELETON_BAR_CLASS} w-20`}
              />
            </TableCell>
            <TableCell>
              <Skeleton
                animationType="none"
                className={`${SKELETON_BAR_CLASS} w-20`}
              />
            </TableCell>
            <TableCell>
              <Skeleton
                animationType="none"
                className={`${SKELETON_BAR_CLASS} w-8`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
