'use client';

import { useTransition } from 'react';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import { AxiosAPI } from '@/shared/utils/axiosInstance';
import { ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const currentLang = useLocale();

  function switchTo(locale: string) {
    startTransition(() => {
      document.cookie = `LANG=${locale}; path=/; max-age=31536000; SameSite=Lax`;
      router.refresh();
    });
    AxiosAPI.defaults.headers['Accept-Language'] = locale;
  }

  const currentFlag =
    currentLang === 'ar'
      ? '/saudi-arabia-flag-icon.svg'
      : '/united-kingdom-flag-icon.svg';

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground flex items-center gap-2 rounded-full px-3 py-2 transition-colors duration-300 outline-none hover:bg-[#06B6D40F] hover:text-[#06B6D4]"
          >
            <div className="relative h-5 w-5 overflow-hidden rounded-full">
              <Image
                src={currentFlag}
                alt="flag"
                fill
                className="object-cover"
                loading="eager"
              />
            </div>
            <span className="text-sm font-medium">
              {currentLang === 'en' ? 'EN' : 'AR'}
            </span>
            <ChevronDown size={14} className="opacity-70" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="min-w-32">
          <DropdownMenuItem onClick={() => switchTo('en')}>
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5 overflow-hidden rounded-full">
                <Image
                  src="/united-kingdom-flag-icon.svg"
                  alt="English"
                  fill
                  className="object-cover"
                  loading="eager"
                />
              </div>
              <span>English</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => switchTo('ar')}>
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5 overflow-hidden rounded-full">
                <Image
                  src="/saudi-arabia-flag-icon.svg"
                  alt="العربية"
                  fill
                  className="object-cover"
                  loading="eager"
                />
              </div>
              <span>العربية</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
