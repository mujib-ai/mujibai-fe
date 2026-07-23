'use client';

import { ThemedIcon } from '@/shared/components/atoms/ThemedIcon';
import { buttonVariants } from '@/shared/components/atoms/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';
import { cn } from '@/shared/lib/utils';
import { Pagination } from '@heroui/react';

const PAGE_SIZE_OPTIONS = [6, 12, 20, 24] as const;

function buildPageList(
  current: number,
  total: number
): (number | 'ellipsis')[] {
  const delta = 1;
  const range: number[] = [];
  const withDots: (number | 'ellipsis')[] = [];
  let last: number | undefined;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (last !== undefined) {
      if (i - last === 2) {
        withDots.push(last + 1);
      } else if (i - last > 2) {
        withDots.push('ellipsis');
      }
    }
    withDots.push(i);
    last = i;
  }

  return withDots;
}

export default function TablePagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  onLimitChange,
  ofText,
  clientsText,
  previousText,
  nextText,
  locale,
}: {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  ofText: string;
  clientsText: string;
  previousText: string;
  nextText: string;
  locale?: string;
}) {
  const goTo = (nextPage: number) => {
    const clamped = Math.min(Math.max(nextPage, 1), totalPages);
    if (clamped !== page) onPageChange(clamped);
  };

  return (
    <div className="flex w-full items-center justify-between bg-transparent py-2">
      <div className="flex items-center gap-2">
        <Select
          value={String(limit)}
          onValueChange={value => onLimitChange(Number(value))}
        >
          <SelectTrigger className="bg-control text-foreground h-12 w-[80px] rounded-full border-0 text-sm shadow-none transition-colors focus-visible:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="text-foreground border-[#0b254a] bg-[#FFFFFFBF] dark:bg-[#001434A6]">
            {PAGE_SIZE_OPTIONS.map(size => (
              <SelectItem key={size} value={String(size)}>
                {String(size).padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-foreground text-sm">
          {ofText} {total} {clientsText}
        </p>
      </div>
      {totalPages > 1 && (
        <Pagination className="mx-0 flex w-fit items-center rounded-[6px] bg-[#FFFFFFBF] py-1 dark:bg-[#001434A6]">
          <Pagination.Content className="flex flex-row items-center gap-1">
            <Pagination.Item>
              <Pagination.Previous
                aria-label="Go to previous page"
                isDisabled={page <= 1}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'default' }),
                  'text-foreground gap-1 px-2.5 disabled:pointer-events-none disabled:opacity-50 sm:pl-2.5'
                )}
                onPress={() => goTo(page - 1)}
              >
                <Pagination.PreviousIcon>
                  {locale === 'ar' ? (
                    <ThemedIcon name="arrow-right" size={16} />
                  ) : (
                    <ThemedIcon name="arrow-left" size={16} />
                  )}
                </Pagination.PreviousIcon>
                <span className="hidden sm:block">{previousText}</span>
              </Pagination.Previous>
            </Pagination.Item>
            {buildPageList(page, totalPages).map((item, index) =>
              item === 'ellipsis' ? (
                <Pagination.Item key={`ellipsis-${index}`}>
                  <Pagination.Ellipsis className="text-foreground flex size-9 items-center justify-center" />
                </Pagination.Item>
              ) : (
                <Pagination.Item key={item}>
                  <Pagination.Link
                    isActive={item === page}
                    className={cn(
                      buttonVariants({
                        variant: item === page ? 'outline' : 'ghost',
                        size: 'icon',
                      }),
                      item === page
                        ? 'text-foreground bg-[#00d9ff] font-medium hover:bg-[#00b9e6]'
                        : 'text-foreground'
                    )}
                    onPress={() => goTo(item)}
                  >
                    {item}
                  </Pagination.Link>
                </Pagination.Item>
              )
            )}
            <Pagination.Item>
              <Pagination.Next
                aria-label="Go to next page"
                isDisabled={page >= totalPages}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'default' }),
                  'text-foreground gap-1 px-2.5 disabled:pointer-events-none disabled:opacity-50 sm:pr-2.5'
                )}
                onPress={() => goTo(page + 1)}
              >
                <span className="hidden sm:block">{nextText}</span>
                <Pagination.NextIcon>
                  {locale === 'ar' ? (
                    <ThemedIcon name="arrow-left" size={16} />
                  ) : (
                    <ThemedIcon name="arrow-right" size={16} />
                  )}
                </Pagination.NextIcon>
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      )}
    </div>
  );
}
