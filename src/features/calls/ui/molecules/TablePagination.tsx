'use client';

import { ThemedIcon } from '@/shared/components/atoms/ThemedIcon';
import { buttonVariants } from '@/shared/components/atoms/ui/button';
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
import { cn } from '@/shared/lib/utils';

export default function TablePagination({
  ofText,
  clientsText,
  previousText,
  nextText,
  locale,
}: {
  ofText: string;
  clientsText: string;
  previousText: string;
  nextText: string;
  locale?: string;
}) {
  return (
    <div className="flex w-full items-center justify-between bg-transparent py-2">
      <div className="flex items-center gap-2">
        <Select>
          <SelectTrigger className="bg-control text-foreground h-12 w-20 rounded-full border-0 text-sm shadow-none transition-colors focus-visible:ring-0">
            <SelectValue placeholder="06" />
          </SelectTrigger>
          <SelectContent className="text-foreground border-[#0b254a] bg-[#FFFFFFBF] dark:bg-[#001434A6]">
            <SelectItem value="06">06</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="24">24</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-foreground text-sm">
          {ofText} 120 {clientsText}
        </p>
      </div>
      <Pagination className="mx-0 flex w-fit items-center rounded-[6px] bg-[#FFFFFFBF] py-1 dark:bg-[#001434A6]">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'default' }),
                'text-foreground gap-1 px-2.5 sm:ps-2.5'
              )}
            >
              {locale === 'ar' ? (
                <ThemedIcon name="arrow-right" size={16} />
              ) : (
                <ThemedIcon name="arrow-left" size={16} />
              )}
              <span className="hidden sm:block">{previousText}</span>
            </PaginationPrevious>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive
              className={cn(
                buttonVariants({ variant: 'outline', size: 'icon' }),
                'text-foreground bg-[#00d9ff] font-medium hover:bg-[#00b9e6]'
              )}
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'text-foreground'
              )}
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'text-foreground'
              )}
            >
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis className="text-foreground" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'text-foreground'
              )}
            >
              12
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'default' }),
                'text-foreground gap-1 px-2.5 sm:pe-2.5'
              )}
            >
              <span className="hidden sm:block">{nextText}</span>
              {locale === 'ar' ? (
                <ThemedIcon name="arrow-left" size={16} />
              ) : (
                <ThemedIcon name="arrow-right" size={16} />
              )}
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
