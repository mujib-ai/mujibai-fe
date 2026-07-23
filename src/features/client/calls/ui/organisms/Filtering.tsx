'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';

import FilterButton from '../atoms/FilterButton';

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
        <SelectTrigger className="bg-control h-12 w-[260px] rounded-full border-0 shadow-none transition-colors focus-visible:ring-0">
          <SelectValue placeholder={filterPlaceholderOne} />
        </SelectTrigger>
        <SelectContent className="border-[#0b254a] bg-[#001434] text-gray-200">
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="bg-control h-12 w-[260px] rounded-full border-0 shadow-none transition-colors focus-visible:ring-0">
          <SelectValue placeholder={filterPlaceholderTwo} />
        </SelectTrigger>
        <SelectContent className="border-[#0b254a] bg-[#001434] text-gray-200">
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
      <FilterButton />
    </div>
  );
}
