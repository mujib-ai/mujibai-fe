'use client';

import { useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { TablePagination } from '@/features/client/tickets';
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

const DEFAULT_LIMIT = 6;

export default function RecentClientsTable({ title }: { title: string }) {
  const clients = [
    {
      name: 'Cristiano Ronaldo',
      id: 'C001',
      duration: '20',
      date: '26 Jan 2026',
    },
    {
      name: 'Cristiano Ronaldo',
      id: 'C002',
      duration: '20',
      date: '26 Jan 2026',
    },
    {
      name: 'Cristiano Ronaldo',
      id: 'C003',
      duration: '20',
      date: '26 Jan 2026',
    },
    {
      name: 'Cristiano Ronaldo',
      id: 'C004',
      duration: '20',
      date: '26 Jan 2026',
    },
    {
      name: 'Cristiano Ronaldo',
      id: 'C005',
      duration: '20',
      date: '26 Jan 2026',
    },
    {
      name: 'Cristiano Ronaldo',
      id: 'C006',
      duration: '20',
      date: '26 Jan 2026',
    },
    {
      name: 'Cristiano Ronaldo',
      id: 'C007',
      duration: '20',
      date: '26 Jan 2026',
    },
    {
      name: 'Cristiano Ronaldo',
      id: 'C008',
      duration: '20',
      date: '26 Jan 2026',
    },
    {
      name: 'Cristiano Ronaldo',
      id: 'C009',
      duration: '20',
      date: '26 Jan 2026',
    },
    {
      name: 'Cristiano Ronaldo',
      id: 'C010',
      duration: '20',
      date: '26 Jan 2026',
    },
  ];

  const t = useTranslations('dashboardOverview');
  const locale = useLocale();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);

  const totalPages = Math.max(1, Math.ceil(clients.length / limit));
  const paginatedClients = clients.slice((page - 1) * limit, page * limit);

  const changeLimit = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(1);
  };

  return (
    <Card className="w-full border-0 bg-transparent shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border">
          <Table className="rounded-lg border-0 bg-[#FFFFFFBF] dark:bg-[#001434A6]">
            <TableHeader>
              <TableRow>
                <TableHead
                  className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
                >
                  {t('clientName')}
                </TableHead>
                <TableHead
                  className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
                >
                  {t('date')}
                </TableHead>
                <TableHead
                  className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
                >
                  {t('duration')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedClients.map(client => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.date}</TableCell>
                  <TableCell>{client.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex justify-center">
          <TablePagination
            page={page}
            totalPages={totalPages}
            total={clients.length}
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
