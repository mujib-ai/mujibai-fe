'use client';

import { ThemedIcon } from '@/shared/components/atoms/ThemedIcon';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';

export default function Filtering({
  filterPlaceholderOne,
  filterPlaceholderTwo,
}: {
  filterPlaceholderOne: string;
  filterPlaceholderTwo: string;
}) {
  return (
    <div className="flex w-full items-center justify-end gap-3 px-2 py-2">
      <Select>
        <SelectTrigger className="h-[44px] w-[260px] rounded-lg border-0 bg-[#F7F7F7F2] shadow-none transition-colors dark:bg-[#001434A6]">
          <SelectValue placeholder={filterPlaceholderOne} />
        </SelectTrigger>
        <SelectContent className="border-[#0b254a] bg-[#001434] text-gray-200">
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="h-[44px] w-[260px] rounded-lg border-0 bg-[#F7F7F7F2] shadow-none transition-colors dark:bg-[#001434A6]">
          <SelectValue placeholder={filterPlaceholderTwo} />
        </SelectTrigger>
        <SelectContent className="border-[#0b254a] bg-[#001434] text-gray-200">
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
      <Button>
        <ThemedIcon name="filters" size={20} className="h-5 w-5" />
      </Button>
    </div>
  );
}
