'use client';

import { Skeleton, Table } from '@heroui/react';

const SKELETON_ROWS = 4;
const BAR = 'rounded-md bg-black/10 dark:bg-white/10';

export default function RecentCallsTableSkeleton({
  title,
  alignClass,
}: {
  title: string;
  alignClass: string;
}) {
  const rows = Array.from({ length: SKELETON_ROWS });

  return (
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
            <Skeleton animationType="none" className={`${BAR} h-4 w-16`} />
          </Table.Column>
          <Table.Column
            className={`${alignClass} text-foreground px-4 py-3 font-medium`}
          >
            <Skeleton animationType="none" className={`${BAR} h-4 w-16`} />
          </Table.Column>
          <Table.Column
            className={`${alignClass} text-foreground px-4 py-3 font-medium`}
          >
            <Skeleton animationType="none" className={`${BAR} h-4 w-16`} />
          </Table.Column>
          <Table.Column
            className={`${alignClass} text-foreground px-4 py-3 font-medium`}
          >
            <Skeleton animationType="none" className={`${BAR} h-4 w-16`} />
          </Table.Column>
          <Table.Column className="text-foreground px-4 py-3 text-center font-medium">
            <Skeleton
              animationType="none"
              className={`${BAR} mx-auto h-4 w-16`}
            />
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {rows.map((_, index) => (
            <Table.Row key={index} className="border-t border-transparent">
              <Table.Cell className="px-4 py-3">
                <Skeleton animationType="none" className={`${BAR} h-4 w-32`} />
              </Table.Cell>
              <Table.Cell className="px-4 py-3">
                <Skeleton animationType="none" className={`${BAR} h-4 w-16`} />
              </Table.Cell>
              <Table.Cell className="px-4 py-3">
                <Skeleton animationType="none" className={`${BAR} h-4 w-28`} />
              </Table.Cell>
              <Table.Cell className="px-4 py-3">
                <Skeleton animationType="none" className={`${BAR} h-4 w-20`} />
              </Table.Cell>
              <Table.Cell className="px-4 py-3 text-center">
                <Skeleton
                  animationType="none"
                  className={`${BAR} mx-auto h-5 w-16 rounded-full`}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Content>
    </Table.ScrollContainer>
  );
}
