'use client';

import { useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { TablePagination } from '@/features/client/tickets';
import { Badge } from '@/shared/components/atoms/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';
import { formatPhoneNumber } from '@/shared/utils/formatPhoneNumber';
import { Table } from '@heroui/react';

const DEFAULT_LIMIT = 6;

interface NewCall {
  id: string;
  phone: string;
  duration: string;
  scenario: string;
  date: string;
  status: 'answered' | 'missed';
}

const NEW_CALLS: NewCall[] = [
  {
    id: 'C001',
    phone: '+201012345001',
    duration: '04:12',
    scenario: 'Appointment Booking',
    date: '26 Jan 2026',
    status: 'answered',
  },
  {
    id: 'C002',
    phone: '+201012345002',
    duration: '02:47',
    scenario: 'Order Support',
    date: '26 Jan 2026',
    status: 'answered',
  },
  {
    id: 'C003',
    phone: '+201012345003',
    duration: '00:00',
    scenario: 'Appointment Booking',
    date: '25 Jan 2026',
    status: 'missed',
  },
  {
    id: 'C004',
    phone: '+201012345004',
    duration: '05:34',
    scenario: 'Billing Inquiry',
    date: '25 Jan 2026',
    status: 'answered',
  },
  {
    id: 'C005',
    phone: '+201012345005',
    duration: '03:02',
    scenario: 'Order Support',
    date: '25 Jan 2026',
    status: 'answered',
  },
  {
    id: 'C006',
    phone: '+201012345006',
    duration: '00:00',
    scenario: 'Appointment Booking',
    date: '24 Jan 2026',
    status: 'missed',
  },
  {
    id: 'C007',
    phone: '+201012345007',
    duration: '06:18',
    scenario: 'Billing Inquiry',
    date: '24 Jan 2026',
    status: 'answered',
  },
  {
    id: 'C008',
    phone: '+201012345008',
    duration: '01:54',
    scenario: 'Order Support',
    date: '23 Jan 2026',
    status: 'answered',
  },
];

export default function RecentCallsTable({ title }: { title: string }) {
  const t = useTranslations('dashboardOverview');
  const locale = useLocale();
  const alignClass = locale === 'ar' ? 'text-right' : 'text-left';
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);

  const totalPages = Math.max(1, Math.ceil(NEW_CALLS.length / limit));
  const paginatedCalls = NEW_CALLS.slice((page - 1) * limit, page * limit);

  const answeredCount = NEW_CALLS.filter(
    call => call.status === 'answered'
  ).length;
  const missedCount = NEW_CALLS.length - answeredCount;

  const changeLimit = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(1);
  };

  return (
    <Card className="w-full border-0 bg-transparent shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <p className="text-muted-foreground text-sm">
          {t('newCallsSummary', {
            total: NEW_CALLS.length,
            answered: answeredCount,
            missed: missedCount,
          })}
        </p>
      </CardHeader>
      <CardContent>
        <Table.ScrollContainer className="overflow-x-auto">
          <Table.Content
            aria-label={title}
            className="w-full min-w-160 rounded-xl bg-[#FFFFFFBF] dark:bg-[#001434A6]"
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
            </Table.Header>
            <Table.Body>
              {paginatedCalls.map(call => (
                <Table.Row
                  key={call.id}
                  className="hover:bg-primary/40 border-t border-transparent transition-colors dark:hover:bg-[#00214f]/40"
                >
                  <Table.Cell className="text-foreground px-4 py-3 font-medium">
                    {formatPhoneNumber(call.phone)}
                  </Table.Cell>
                  <Table.Cell className="text-foreground px-4 py-3">
                    {call.duration}
                  </Table.Cell>
                  <Table.Cell className="text-foreground px-4 py-3">
                    {call.scenario}
                  </Table.Cell>
                  <Table.Cell className="text-foreground px-4 py-3">
                    {call.date}
                  </Table.Cell>
                  <Table.Cell className="px-4 py-3 text-center">
                    <Badge
                      variant={
                        call.status === 'answered' ? 'secondary' : 'outline'
                      }
                    >
                      {t(call.status === 'answered' ? 'answered' : 'missed')}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <div className="mt-4 flex justify-center">
          <TablePagination
            page={page}
            totalPages={totalPages}
            total={NEW_CALLS.length}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={changeLimit}
            ofText={t('of')}
            clientsText={t('clients')}
            previousText={t('previous')}
            nextText={t('next')}
            locale={locale}
          />
        </div>
      </CardContent>
    </Card>
  );
}
