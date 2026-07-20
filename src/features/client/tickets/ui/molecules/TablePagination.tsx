'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/atoms/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';

const PAGE_SIZE_OPTIONS = [6, 12, 24] as const;

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
          <SelectTrigger className="text-foreground w-[80px] rounded-md bg-[#FFFFFFBF] text-sm transition-colors focus:ring-2 focus:ring-[#00d9ff]/40 dark:bg-[#001434A6]">
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
        <Pagination className="mx-0 w-fit rounded-[6px] bg-[#FFFFFFBF] py-1 dark:bg-[#001434A6]">
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                locale={locale}
                text={previousText}
                aria-disabled={page <= 1}
                className={
                  page <= 1 ? 'pointer-events-none opacity-50' : undefined
                }
                onClick={event => {
                  event.preventDefault();
                  goTo(page - 1);
                }}
              />
            </PaginationItem>
            {buildPageList(page, totalPages).map((item, index) =>
              item === 'ellipsis' ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis className="text-foreground" />
                </PaginationItem>
              ) : (
                <PaginationItem key={item}>
                  <PaginationLink
                    href="#"
                    isActive={item === page}
                    className={
                      item === page
                        ? 'text-foreground rounded-md bg-[#00d9ff] font-medium hover:bg-[#00b9e6]'
                        : 'text-foreground rounded-md'
                    }
                    onClick={event => {
                      event.preventDefault();
                      goTo(item);
                    }}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                text={nextText}
                locale={locale}
                aria-disabled={page >= totalPages}
                className={
                  page >= totalPages
                    ? 'pointer-events-none opacity-50'
                    : undefined
                }
                onClick={event => {
                  event.preventDefault();
                  goTo(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
