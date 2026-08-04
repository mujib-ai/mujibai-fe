'use client';

import { Badge } from '@/shared/components/atoms/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/atoms/ui/tooltip';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { formatPhoneNumber } from '@/shared/utils/formatPhoneNumber';
import { Spinner, Table } from '@heroui/react';
import { Eye, Play } from 'lucide-react';

import { CALL_STATUS_BADGE_VARIANT } from '../../constants';
import type { CallItem } from '../../types';
import CallsCardList from '../molecules/CallsCardList';
import CallsEmptyState from '../molecules/CallsEmptyState';
import CallsErrorState from '../molecules/CallsErrorState';
import CallsPagination from '../molecules/CallsPagination';
import CallsTableSkeleton from './CallsTableSkeleton';

export default function CallsTable({
  t,
  locale,
  titleKey = 'callsTitle',
  calls,
  pagination,
  isLoading,
  isFetching,
  error,
  onPageChange,
  onLimitChange,
  onRetry,
}: {
  t: (key: string) => string;
  locale: string;
  titleKey?: string;
  calls: CallItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onRetry: () => void;
}) {
  const isMobile = useIsMobile();
  const alignClass = locale === 'ar' ? 'text-right' : 'text-left';

  return (
    <Card className="w-full border-0 bg-transparent shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground text-xl font-semibold">
          {t(titleKey)}
        </CardTitle>
        {isFetching && !isLoading && (
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <Spinner />
            {t('updating')}
          </span>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <CallsTableSkeleton t={t} locale={locale} titleKey={titleKey} />
        ) : error ? (
          <CallsErrorState
            message={error}
            errorPrefix={t('errorPrefix')}
            retryText={t('retry')}
            onRetry={onRetry}
          />
        ) : calls.length === 0 ? (
          <CallsEmptyState text={t('empty')} />
        ) : isMobile ? (
          <CallsCardList items={calls} t={t} />
        ) : (
          <Table>
            <Table.ScrollContainer className="overflow-x-auto">
              <Table.Content
                aria-label={t(titleKey)}
                className="bg-surface w-full min-w-180 rounded-xl border"
              >
                <Table.Header>
                  <Table.Column
                    isRowHeader
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
                  {calls.map(item => (
                    <Table.Row
                      key={item.id}
                      className="hover:bg-primary/40 border-t border-transparent transition-colors dark:hover:bg-[#00214f]/40"
                    >
                      <Table.Cell className="text-foreground px-4 py-3 font-medium">
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
                        <Badge variant={CALL_STATUS_BADGE_VARIANT[item.status]}>
                          {t(`callStatuses.${item.status}`)}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="rounded-full bg-[#06B6D426] p-2 transition-colors dark:bg-[#00214f]"
                              >
                                <Play fill="#06B6D4" className="size-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {t('playRecording')}
                            </TooltipContent>
                          </Tooltip>
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
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        )}
        {!isLoading && !error && calls.length > 0 && (
          <CallsPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            isFetching={isFetching}
            onPageChange={onPageChange}
            onLimitChange={onLimitChange}
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
