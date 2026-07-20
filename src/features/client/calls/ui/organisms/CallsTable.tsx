'use client';

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
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { formatPhoneNumber } from '@/shared/utils/formatPhoneNumber';
import { Eye, Play } from 'lucide-react';

import { CallsCardList, TablePagination } from '../molecules';

export default function CallsTable({
  t,
  locale,
  titleKey = 'callsTitle',
}: {
  t: (key: string) => string;
  locale: string;
  titleKey?: string;
}) {
  const isMobile = useIsMobile();

  const items = [
    {
      customer: 'Toni Kroos',
      phone: '03:34',
      duration: '05:34',
      scenario: 'Appointments Booking',
      date: 'Sample date',
    },
    {
      customer: 'Toni Kroos',
      phone: '03:34',
      duration: '05:34',
      scenario: 'Appointments Booking',
      date: 'Sample date',
    },
    {
      customer: 'Toni Kroos',
      phone: '03:34',
      duration: '05:34',
      scenario: 'Appointments Booking',
      date: 'Sample date',
    },
    {
      customer: 'Toni Kroos',
      phone: '03:34',
      duration: '05:34',
      scenario: 'Appointments Booking',
      date: 'Sample date',
    },
  ];

  return (
    <Card className="w-full border-0 bg-transparent shadow-none">
      <CardHeader>
        <CardTitle className="text-foreground text-xl font-semibold">
          {t(titleKey)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isMobile ? (
          <CallsCardList items={items} t={t} />
        ) : (
          <div className="overflow-x-auto">
            <Table className="w-full rounded-xl border-0 bg-[#FFFFFFBF] dark:bg-[#001434A6]">
              <TableHeader>
                <TableRow className="text-foreground border-none">
                  <TableHead
                    className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
                  >
                    {t('customer')}
                  </TableHead>
                  <TableHead
                    className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
                  >
                    {t('phone')}
                  </TableHead>
                  <TableHead
                    className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
                  >
                    {t('duration')}
                  </TableHead>
                  <TableHead
                    className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
                  >
                    {t('scenario')}
                  </TableHead>
                  <TableHead
                    className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
                  >
                    {t('date')}
                  </TableHead>
                  <TableHead className="text-center">{t('status')}</TableHead>
                  <TableHead className="text-center">{t('receipt')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, idx) => (
                  <TableRow
                    key={idx}
                    className="hover:bg-primary/40 border-none transition-colors dark:hover:bg-[#00214f]/40"
                  >
                    <TableCell className="text-foreground font-medium">
                      {item.customer}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {formatPhoneNumber(item.phone)}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {item.duration}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {item.scenario}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {item.date}
                    </TableCell>
                    <TableCell className="text-center">
                      <button className="rounded-full bg-[#06B6D426] p-2 transition-colors dark:bg-[#00214f]">
                        <Play fill="#06B6D4" className="size-4" />
                      </button>
                    </TableCell>
                    <TableCell className="text-center">
                      <button className="rounded-full bg-[#06B6D426] p-2 transition-colors dark:bg-[#00214f]">
                        <Eye className="text-primary size-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        <TablePagination
          ofText={t('of')}
          clientsText={t('clients')}
          previousText={t('previous')}
          nextText={t('next')}
          locale={locale}
        />
      </CardContent>
    </Card>
  );
}
