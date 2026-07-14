'use client';

import { TablePagination } from '@/features/client/calls';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';
import { Progress } from '@/shared/components/atoms/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';
import { useIsMobile } from '@/shared/hooks/use-mobile';

import ScenarioPerformanceCardList from '../molecules/ScenarioPerformanceCardList';

export default function ScenarioPerformance({
  t,
}: {
  t: (key: string) => string;
}) {
  const isMobile = useIsMobile();

  const items = Array.from({ length: 5 }).map(() => ({
    scenarioName: t('scenarioName'),
    calls: 31,
    duration: 3,
    satisfaction: 30,
  }));

  return (
    <Card className="col-span-2 gap-3 border-none bg-transparent shadow-none">
      <CardHeader className="p-2">
        <CardTitle className="text-xl font-semibold">
          {t('scenarioPerformance')}
        </CardTitle>
      </CardHeader>
      <CardContent className="rounded-2xl bg-[#FFFFFFBF] p-4 dark:bg-[#00143473]">
        {isMobile ? (
          <ScenarioPerformanceCardList items={items} t={t} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('scenarioName')}</TableHead>
                <TableHead>{t('calls')}</TableHead>
                <TableHead>{t('duration')}</TableHead>
                <TableHead>{t('satisfaction')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.scenarioName}</TableCell>
                  <TableCell>{item.calls}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>
                    <div className="w-full">
                      <p className="text-[#000000BF] dark:text-[#FFFFFFBF]">
                        {item.satisfaction}%
                      </p>
                      <Progress value={item.satisfaction} />
                    </div>
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
        />
      </CardContent>
    </Card>
  );
}
