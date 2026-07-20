'use client';

import { Card, CardContent } from '@/shared/components/atoms/ui/card';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { Skeleton, Table } from '@heroui/react';

const SKELETON_ROWS = 4;
const BAR = 'rounded-md bg-black/10 dark:bg-white/10';

export default function TicketsTableSkeleton({
  t,
  locale,
  titleKey = 'title',
}: {
  t: (key: string) => string;
  locale: string;
  titleKey?: string;
}) {
  const isMobile = useIsMobile();
  const alignClass = locale === 'ar' ? 'text-right' : 'text-left';
  const rows = Array.from({ length: SKELETON_ROWS });

  if (isMobile) {
    return (
      <div className="flex flex-col gap-3">
        {rows.map((_, index) => (
          <Card
            key={index}
            className="border-0 bg-[#FFFFFFBF] shadow-none dark:bg-[#001434A6]"
          >
            <CardContent className="flex flex-col gap-3 p-4">
              <div className="flex items-center justify-between gap-2">
                <Skeleton animationType="none" className={`${BAR} h-4 w-28`} />
                <div className="flex items-center gap-2">
                  <Skeleton
                    animationType="none"
                    className={`${BAR} h-5 w-16 rounded-full`}
                  />
                  <Skeleton
                    animationType="none"
                    className={`${BAR} h-8 w-8 rounded-full`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {Array.from({ length: 4 }).map((__, cellIndex) => (
                  <Skeleton
                    key={cellIndex}
                    animationType="none"
                    className={`${BAR} h-3 w-20`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
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
            {rows.map((_, index) => (
              <Table.Row key={index} className="border-t border-transparent">
                <Table.Cell className="px-4 py-3">
                  <Skeleton
                    animationType="none"
                    className={`${BAR} h-4 w-24`}
                  />
                </Table.Cell>
                <Table.Cell className="px-4 py-3">
                  <Skeleton
                    animationType="none"
                    className={`${BAR} h-4 w-32`}
                  />
                </Table.Cell>
                <Table.Cell className="px-4 py-3">
                  <Skeleton
                    animationType="none"
                    className={`${BAR} h-4 w-16`}
                  />
                </Table.Cell>
                <Table.Cell className="px-4 py-3">
                  <Skeleton
                    animationType="none"
                    className={`${BAR} h-4 w-28`}
                  />
                </Table.Cell>
                <Table.Cell className="px-4 py-3">
                  <Skeleton
                    animationType="none"
                    className={`${BAR} h-4 w-20`}
                  />
                </Table.Cell>
                <Table.Cell className="px-4 py-3 text-center">
                  <Skeleton
                    animationType="none"
                    className={`${BAR} mx-auto h-5 w-16 rounded-full`}
                  />
                </Table.Cell>
                <Table.Cell className="px-4 py-3 text-center">
                  <Skeleton
                    animationType="none"
                    className={`${BAR} mx-auto h-8 w-8 rounded-full`}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
