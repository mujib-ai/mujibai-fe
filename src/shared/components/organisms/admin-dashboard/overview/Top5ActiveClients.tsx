import { useLocale, useTranslations } from 'next-intl';

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

export default function Top5ActiveClients() {
  const t = useTranslations('analytics.top5ActiveClients');
  const locale = useLocale();
  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardHeader className="px-0">
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="rounded-2xl bg-[#FFFFFFBF] py-7 dark:bg-[#00143473]">
        <Table>
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
                {t('calls')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>simple client</TableCell>
              <TableCell>25</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>simple client</TableCell>
              <TableCell>19</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>simple client</TableCell>
              <TableCell>17</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>simple client</TableCell>
              <TableCell>13</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>simple client</TableCell>
              <TableCell>11</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
