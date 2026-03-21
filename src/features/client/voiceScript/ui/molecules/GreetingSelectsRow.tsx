'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';

import { PlayButton } from '../atoms';

export default function GreetingSelectsRow({
  t,
  locale,
}: {
  t: (key: string) => string;
  locale: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-4 sm:flex-nowrap">
      <Select>
        <SelectTrigger className="w-full border-0 bg-[#06B6D426]">
          <SelectValue placeholder={t('selectLanguageGreeting')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="greeting-1">Greeting 1</SelectItem>
          <SelectItem value="greeting-2">Greeting 2</SelectItem>
          <SelectItem value="greeting-3">Greeting 3</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full border-0 bg-[#06B6D426]">
          <SelectValue placeholder={t('selectVoice')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="greeting-1">Greeting 1</SelectItem>
          <SelectItem value="greeting-2">Greeting 2</SelectItem>
          <SelectItem value="greeting-3">Greeting 3</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full border-0 bg-[#06B6D426]">
          <SelectValue placeholder={t('selectGreeting')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="greeting-1">Greeting 1</SelectItem>
          <SelectItem value="greeting-2">Greeting 2</SelectItem>
          <SelectItem value="greeting-3">Greeting 3</SelectItem>
        </SelectContent>
      </Select>
      <PlayButton locale={locale} />
    </div>
  );
}
