import { Bell } from 'lucide-react';

import LanguageSwitcher from '@/shared/components/atoms/LanguageSwitcher';
import { ThemeSwitcher } from '@/shared/components/atoms/ThemeSwitcher';
import { Button } from '@/shared/components/atoms/ui/button';
import { SidebarTrigger } from '@/shared/components/atoms/ui/sidebar';

export default function DashboardHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="z-50 flex w-full flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#FFFFFFBF] px-5 py-4 shadow-sm dark:bg-[#001434A6]">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {title}
          </h1>
          {subtitle && <p className="text-foreground text-sm">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-white/10 dark:hover:bg-black/10"
        >
          <div className="relative">
            <Bell className="size-5" />
            <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-red-500"></span>
          </div>
        </Button>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
}
