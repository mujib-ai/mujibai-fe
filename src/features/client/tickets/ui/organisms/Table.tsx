'use client';

import { Badge } from '@/shared/components/atoms/ui/badge';
import { Card, CardContent } from '@/shared/components/atoms/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/atoms/ui/tooltip';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { formatPhoneNumber } from '@/shared/utils/formatPhoneNumber';
import { Table } from '@heroui/react';
import { Eye } from 'lucide-react';

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
          <div className="flex h-40 items-center justify-center">
            <p className="text-destructive text-sm">
              {t('errorPrefix')}
              {error}
            </p>
          </div>
        ) : isLoading ? (
          <TicketsTableSkeleton t={t} locale={locale} titleKey={titleKey} />
        ) : tickets.length === 0 ? (
          <div className="text-muted-foreground flex h-40 items-center justify-center text-sm">
            {t('empty')}
          </div>
        ) : isMobile ? (
          <TicketsCardList items={tickets} t={t} />
        ) : (
          <Table>
            <Table.ScrollContainer className="overflow-x-auto">
              <Table.Content
                aria-label={t(titleKey)}
                className="w-full min-w-180 rounded-xl bg-[#FFFFFFBF] dark:bg-[#001434A6]"
              >
                <Table.Header>
                  <Table.Column
                    isRowHeader
                    className={`${alignClass} text-foreground px-4 py-3 font-medium`}
                  >
                    {t('customer')}
                  </Table.Column>
                  <Table.Column
                    className={`${alignClass} text-foreground px-4 py-3 font-medium`}
                  >
                    {t('phone')}
                  </Table.Column>
                  <Table.Column
                    className={`${alignClass} text-foreground px-4 py-3 font-medium`}
                  >
                    {t('duration')}
                  </Table.Column>
                  <Table.Column
                    className={`${alignClass} text-foreground px-4 py-3 font-medium`}
                  >
                    {t('scenario')}
                  </Table.Column>
                  <Table.Column
                    className={`${alignClass} text-foreground px-4 py-3 font-medium`}
                  >
                    {t('date')}
                  </Table.Column>
                  <Table.Column className="text-foreground px-4 py-3 text-center font-medium">
                    {t('status')}
                  </Table.Column>
                  <Table.Column className="text-foreground px-4 py-3 text-center font-medium">
                    {t('receipt')}
                  </Table.Column>
                </Table.Header>
                <Table.Body>
                  {tickets.map(item => (
                    <Table.Row
                      key={item.id}
                      className="hover:bg-primary/40 border-t border-transparent transition-colors dark:hover:bg-[#00214f]/40"
                    >
                      <Table.Cell className="text-foreground px-4 py-3 font-medium">
                        {item.customer}
                      </Table.Cell>
                      <Table.Cell className="text-foreground px-4 py-3">
                        {formatPhoneNumber(item.phone)}
                      </Table.Cell>
                      <Table.Cell className="text-foreground px-4 py-3">
                        {item.duration}
                      </Table.Cell>
                      <Table.Cell className="text-foreground px-4 py-3">
                        {item.scenario}
                      </Table.Cell>
                      <Table.Cell className="text-foreground px-4 py-3">
                        {item.date}
                      </Table.Cell>
                      <Table.Cell className="px-4 py-3 text-center">
                        <Badge
                          variant={TICKET_STATUS_BADGE_VARIANT[item.status]}
                        >
                          {t(`statuses.${item.status}`)}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell className="px-4 py-3 text-center">
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
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
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
