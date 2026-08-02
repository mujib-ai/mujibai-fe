'use client';

import { useTranslations } from 'next-intl';

import { Card, Skeleton, Table } from '@heroui/react';
import { MoreHorizontal } from 'lucide-react';

const BAR = 'rounded-md bg-black/10 dark:bg-white/10';
const ROW_COUNT = 5;

interface KnowledgeSourcesTableSkeletonProps {
  isMobile: boolean;
}

function CardRowSkeleton({ index }: { index: number }) {
  return (
    <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      <Card.Header className="flex flex-row items-center justify-between gap-2 px-4">
        <div className="flex min-w-0 items-center gap-2">
          <Skeleton
            animationType="none"
            className={`${BAR} size-4 shrink-0 rounded`}
          />
          <Skeleton
            animationType="none"
            className={`${BAR} h-4 rounded`}
            style={{ width: 96 + ((index * 37) % 64) }}
          />
        </div>
        <span className="text-muted-foreground/40 inline-flex size-8 items-center justify-center rounded-md">
          <MoreHorizontal className="size-4" />
        </span>
      </Card.Header>
      <Card.Content className="flex flex-col gap-3 px-4">
        <div className="flex flex-col gap-2">
          <Skeleton
            animationType="none"
            className={`${BAR} h-5 w-20 rounded-full`}
          />
        </div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {Array.from({ length: 4 }).map((_, cellIndex) => (
            <div key={cellIndex}>
              <dt>
                <Skeleton
                  animationType="none"
                  className={`${BAR} h-3 w-14 rounded`}
                />
              </dt>
              <dd className="mt-1.5">
                <Skeleton
                  animationType="none"
                  className={`${BAR} h-3.5 w-16 rounded`}
                />
              </dd>
            </div>
          ))}
        </dl>
      </Card.Content>
    </Card>
  );
}

export default function KnowledgeSourcesTableSkeleton({
  isMobile,
}: KnowledgeSourcesTableSkeletonProps) {
  const t = useTranslations('KnowledgeBase.sources.columns');

  if (isMobile) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardRowSkeleton key={index} index={index} />
        ))}
      </div>
    );
  }

  return (
    <Table>
      <Table.ScrollContainer className="overflow-x-auto rounded-lg border">
        <Table.Content aria-label={t('source')} className="w-full">
          <Table.Header>
            <Table.Column
              isRowHeader
              className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap"
            >
              {t('source')}
            </Table.Column>
            <Table.Column className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
              {t('type')}
            </Table.Column>
            <Table.Column className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
              {t('status')}
            </Table.Column>
            <Table.Column className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
              {t('progress')}
            </Table.Column>
            <Table.Column className="text-foreground h-10 px-2 text-center align-middle font-medium whitespace-nowrap">
              {t('documents')}
            </Table.Column>
            <Table.Column className="text-foreground h-10 px-2 text-center align-middle font-medium whitespace-nowrap">
              {t('chunks')}
            </Table.Column>
            <Table.Column className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
              {t('uploadedAt')}
            </Table.Column>
            <Table.Column className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
              {t('updatedAt')}
            </Table.Column>
            <Table.Column className="text-foreground h-10 px-2 text-right align-middle font-medium whitespace-nowrap">
              {t('actions')}
            </Table.Column>
          </Table.Header>
          <Table.Body>
            {Array.from({ length: ROW_COUNT }).map((_, index) => (
              <Table.Row key={index} className="border-t">
                <Table.Cell className="max-w-56 p-2 align-middle">
                  <div className="flex items-center gap-1.5">
                    <Skeleton
                      animationType="none"
                      className={`${BAR} size-4 shrink-0 rounded`}
                    />
                    <Skeleton
                      animationType="none"
                      className={`${BAR} h-4 rounded`}
                      style={{ width: 90 + ((index * 41) % 70) }}
                    />
                  </div>
                </Table.Cell>
                <Table.Cell className="p-2 align-middle">
                  <div className="flex items-center gap-1.5">
                    <Skeleton
                      animationType="none"
                      className={`${BAR} size-4 shrink-0 rounded`}
                    />
                    <Skeleton
                      animationType="none"
                      className={`${BAR} h-4 w-14 rounded`}
                    />
                  </div>
                </Table.Cell>
                <Table.Cell className="p-2 align-middle">
                  <Skeleton
                    animationType="none"
                    className={`${BAR} h-5 w-20 rounded-full`}
                  />
                </Table.Cell>
                <Table.Cell className="p-2 align-middle">
                  <Skeleton
                    animationType="none"
                    className={`${BAR} h-2 w-40 rounded-full`}
                  />
                </Table.Cell>
                <Table.Cell className="p-2 text-center align-middle">
                  <Skeleton
                    animationType="none"
                    className={`${BAR} mx-auto h-4 w-6 rounded`}
                  />
                </Table.Cell>
                <Table.Cell className="p-2 text-center align-middle">
                  <Skeleton
                    animationType="none"
                    className={`${BAR} mx-auto h-4 w-6 rounded`}
                  />
                </Table.Cell>
                <Table.Cell className="p-2 align-middle">
                  <Skeleton
                    animationType="none"
                    className={`${BAR} h-4 w-24 rounded`}
                  />
                </Table.Cell>
                <Table.Cell className="p-2 align-middle">
                  <Skeleton
                    animationType="none"
                    className={`${BAR} h-4 w-24 rounded`}
                  />
                </Table.Cell>
                <Table.Cell className="p-2 text-right align-middle">
                  <span className="text-muted-foreground/40 inline-flex size-8 items-center justify-center rounded-md">
                    <MoreHorizontal className="size-4" />
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
