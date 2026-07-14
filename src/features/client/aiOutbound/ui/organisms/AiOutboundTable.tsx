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
import { useIsMobile } from '@/shared/hooks/use-mobile';

import SatisfactionCell from '../atoms/SatisfactionCell';
import AiOutboundCardList from '../molecules/AiOutboundCardList';

export default function AiOutboundTable({
  t,
  locale,
}: {
  t: (key: string) => string;
  locale: string;
}) {
  const isMobile = useIsMobile();

  const items = Array.from({ length: 5 }).map((_, index) => ({
    label: `Scenario ${index + 1}`,
    phone: '31',
    duration: '3',
    scenario: '3',
    satisfaction: 30,
  }));

  return (
    <>
      {isMobile ? (
        <AiOutboundCardList items={items} t={t} />
      ) : (
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
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.label}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.duration}</TableCell>
                <TableCell>{item.scenario}</TableCell>
                <TableCell>
                  <SatisfactionCell value={item.satisfaction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
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
