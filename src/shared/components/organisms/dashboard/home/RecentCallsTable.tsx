'use client';

import { useLocale, useTranslations } from 'next-intl';

import {
  CALL_STATUS_BADGE_VARIANT,
  CallsEmptyState,
  CallsErrorState,
  CallsPagination,
  useRecentCalls,
} from '@/features/calls';
import { Badge } from '@/shared/components/atoms/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';
import { formatPhoneNumber } from '@/shared/utils/formatPhoneNumber';
import { Loader2 } from 'lucide-react';

import RecentCallsTableSkeleton from './RecentCallsTableSkeleton';

export default function RecentCallsTable({ title }: { title: string }) {
  const t = useTranslations('dashboardOverview');
  const locale = useLocale();
  const alignClass = locale === 'ar' ? 'text-right' : 'text-left';

  const {
    calls,
    pagination,
    answeredTotal,
    missedTotal,
    isLoading,
    isFetching,
    error,
    setPage,
    setLimit,
    refetch,
  } = useRecentCalls();

  return (
    <Card className="w-full border-0 bg-transparent shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <p className="text-muted-foreground text-sm">
            {t('newCallsSummary', {
              total: pagination.total,
              answered: answeredTotal,
              missed: missedTotal,
            })}
          </p>
        </div>
        {isFetching && !isLoading && (
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <Loader2 className="size-3.5 animate-spin" />
            {t('updating')}
          </span>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <RecentCallsTableSkeleton title={title} alignClass={alignClass} />
        ) : error ? (
          <CallsErrorState
            message={error}
            errorPrefix={t('errorPrefix')}
            retryText={t('retry')}
            onRetry={refetch}
          />
        ) : calls.length === 0 ? (
          <CallsEmptyState text={t('empty')} />
        ) : (
          <Table
            aria-label={title}
            className="min-w-160 rounded-xl bg-[#FFFFFFBF] dark:bg-[#001434A6]"
          >
            <TableHeader>
              <TableRow>
                <TableHead
                  scope="row"
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {calls.map(call => (
                <TableRow
                  key={call.id}
                  className="hover:bg-primary/40 border-t border-transparent transition-colors dark:hover:bg-[#00214f]/40"
                >
                  <TableCell className="text-foreground px-4 py-3 font-medium">
                    {formatPhoneNumber(call.phone)}
                  </TableCell>
                  <TableCell className="text-foreground px-4 py-3">
                    {call.duration}
                  </TableCell>
                  <TableCell className="text-foreground px-4 py-3">
                    {call.scenario}
                  </TableCell>
                  <TableCell className="text-foreground px-4 py-3">
                    {call.date}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center">
                    <Badge variant={CALL_STATUS_BADGE_VARIANT[call.status]}>
                      {t(call.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {!isLoading && !error && calls.length > 0 && (
          <div className="mt-4 flex justify-center">
            <CallsPagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              limit={pagination.limit}
              isFetching={isFetching}
              onPageChange={setPage}
              onLimitChange={setLimit}
              ofText={t('of')}
              clientsText={t('clients')}
              previousText={t('previous')}
              nextText={t('next')}
              locale={locale}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
