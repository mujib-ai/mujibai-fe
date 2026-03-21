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
          <SelectTrigger className="text-foreground w-[80px] rounded-md bg-[#FFFFFFBF] text-sm transition-colors focus:ring-2 focus:ring-[#00d9ff]/40 dark:bg-[#001434A6]">
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
      <Pagination className="mx-0 w-fit rounded-[6px] bg-[#FFFFFFBF] py-1 dark:bg-[#001434A6]">
        <PaginationContent className="gap-1">
          <PaginationItem>
            <PaginationPrevious locale={locale} text={previousText} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              className="text-foreground rounded-md bg-[#00d9ff] font-medium hover:bg-[#00b9e6]"
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="text-foreground rounded-md">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="text-foreground rounded-md">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis className="text-foreground" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="text-foreground rounded-md">
              12
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext text={nextText} locale={locale} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
