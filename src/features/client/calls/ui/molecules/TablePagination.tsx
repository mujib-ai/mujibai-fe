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
      <Pagination className="mx-0 flex w-fit items-center rounded-[6px] bg-[#FFFFFFBF] py-1 dark:bg-[#001434A6]">
        <Pagination.Content className="flex flex-row items-center gap-1">
          <Pagination.Item>
            <Pagination.Previous
              aria-label="Go to previous page"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'default' }),
                'text-foreground gap-1 px-2.5 sm:pl-2.5'
              )}
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
          <Pagination.Item>
            <Pagination.Link
              isActive
              className={cn(
                buttonVariants({ variant: 'outline', size: 'icon' }),
                'text-foreground bg-[#00d9ff] font-medium hover:bg-[#00b9e6]'
              )}
            >
              1
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'text-foreground'
              )}
            >
              2
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'text-foreground'
              )}
            >
              3
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Ellipsis className="text-foreground flex size-9 items-center justify-center" />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'text-foreground'
              )}
            >
              12
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Next
              aria-label="Go to next page"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'default' }),
                'text-foreground gap-1 px-2.5 sm:pr-2.5'
              )}
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
    </div>
  );
}
