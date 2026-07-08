'use client';

import { TablePagination } from '@/features/client/calls';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';

import SatisfactionCell from '../atoms/SatisfactionCell';

export default function AiOutboundTable({
  t,
  locale,
}: {
  t: (key: string) => string;
  locale: string;
}) {
  return (
    <>
      <Table className="bg-[#FFFFFF73] dark:bg-[#00143473]">
        <TableHeader>
          <TableRow>
            <TableHead
              className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}
            >
              #
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
              {t('satisfaction')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>Scenario {index + 1}</TableCell>
              <TableCell>31</TableCell>
              <TableCell>3</TableCell>
              <TableCell>3</TableCell>
              <TableCell>
                <SatisfactionCell value={30} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        ofText={t('of')}
        clientsText={t('clients')}
        previousText={t('previous')}
        nextText={t('next')}
        locale={locale}
      />
    </>
  );
}
