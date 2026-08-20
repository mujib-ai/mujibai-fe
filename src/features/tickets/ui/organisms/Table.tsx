'use client';

import { Badge } from '@/shared/components/atoms/ui/badge';
import { Card, CardContent } from '@/shared/components/atoms/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/atoms/ui/tooltip';
import { EmptyState } from '@/shared/components/molecules/EmptyState';
import { ErrorState } from '@/shared/components/molecules/ErrorState';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { formatPhoneNumber } from '@/shared/utils/formatPhoneNumber';
import { Eye, Ticket } from 'lucide-react';

import { TICKET_STATUS_BADGE_VARIANT } from '../../constants';
import type { TicketItem } from '../../types';
import TablePagination from '../molecules/TablePagination';
import TicketsCardList from '../molecules/TicketsCardList';
import TicketsTableSkeleton from './TicketsTableSkeleton';

export default function TicketsTable({
  t,
  locale,
  titleKey = 'title',
  tickets,
  total,
  page,
  limit,
  totalPages,
  isLoading,
  error,
  goToPage,
  changeLimit,
}: {
  t: (key: string) => string;
  locale: string;
  titleKey?: string;
  tickets: TicketItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  goToPage: (page: number) => void;
  changeLimit: (limit: number) => void;
}) {
  const isMobile = useIsMobile();
  const alignClass = locale === 'ar' ? 'text-right' : 'text-left';

  return (
    <Card className="w-full border-0 bg-transparent shadow-none">
      <CardContent>
        {error ? (
          <ErrorState title={t('errorPrefix')} description={error} />
        ) : isLoading ? (
          <TicketsTableSkeleton t={t} locale={locale} titleKey={titleKey} />
        ) : tickets.length === 0 ? (
          <div className="flex min-h-40 items-center justify-center">
            <EmptyState icon={Ticket} title={t('empty')} />
          </div>
        ) : isMobile ? (
          <TicketsCardList items={tickets} t={t} />
        ) : (
          <Table
            aria-label={t(titleKey)}
            className="bg-surface min-w-180 rounded-xl border"
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
              {tickets.map(item => (
                <TableRow
                  key={item.id}
                  className="hover:bg-primary/40 border-t border-transparent transition-colors dark:hover:bg-[#00214f]/40"
                >
                  <TableCell className="text-foreground px-4 py-3 font-medium">
                    {item.customer}
                  </TableCell>
                  <TableCell className="text-foreground px-4 py-3">
                    {formatPhoneNumber(item.phone)}
                  </TableCell>
                  <TableCell className="text-foreground px-4 py-3">
                    {item.duration}
                  </TableCell>
                  <TableCell className="text-foreground px-4 py-3">
                    {item.scenario}
                  </TableCell>
                  <TableCell className="text-foreground px-4 py-3">
                    {item.date}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center">
                    <Badge variant={TICKET_STATUS_BADGE_VARIANT[item.status]}>
                      {t(`statuses.${item.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="rounded-full bg-[#06B6D426] p-2 transition-colors dark:bg-[#00214f]"
                        >
                          <Eye className="text-primary size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{t('viewReceipt')}</TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {!error && !isLoading && tickets.length > 0 && (
          <TablePagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={limit}
            onPageChange={goToPage}
            onLimitChange={changeLimit}
            ofText={t('of')}
            clientsText={t('clients')}
            previousText={t('previous')}
            nextText={t('next')}
            locale={locale}
          />
        )}
      </CardContent>
    </Card>
  );
}
