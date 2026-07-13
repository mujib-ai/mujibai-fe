'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/features/auth';
import Logo from '@/shared/components/atoms/Logo';
import { ThemedIcon } from '@/shared/components/atoms/ThemedIcon';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/atoms/ui/avatar';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/atoms/ui/sidebar';
import { User } from '@/shared/types';
import { EllipsisVertical } from 'lucide-react';

export default function ClientSidebar({
  dir,
  user,
}: {
  dir: 'left' | 'right';
  user: User;
}) {
  const t = useTranslations('sidebar');
  const pathname = usePathname();

  const menuItems: { title: string; icon: string; href: string }[] = [
    { title: t('dashboard'), icon: 'dashboard', href: '/dashboard' },
    { title: t('calls'), icon: 'calls', href: '/dashboard/calls' },
    { title: t('tickets'), icon: 'tickets', href: '/dashboard/tickets' },
    {
      title: t('voice-script'),
      icon: 'voice-script',
      href: '/dashboard/voice-script',
    },
    {
      title: t('performance-analytics'),
      icon: 'analytics',
      href: '/dashboard/performance-analytics',
    },
    {
      title: t('ai-outbound'),
      icon: 'export-call',
      href: '/dashboard/ai-outbound',
    },
    {
      title: t('api-keys'),
      icon: 'secret-key',
      href: '/dashboard/api-keys',
    },
    { title: t('settings'), icon: 'settings', href: '/dashboard/settings' },
    { title: t('docs'), icon: 'docs', href: '/docs' },
  ];

  const { handleLogout } = useAuth();

  return (
    <Sidebar
      side={dir}
      className="my-2 flex w-62.5 flex-col justify-between rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]"
    >
      <div className="mt-2 mb-6 flex flex-col items-center">
        <Logo />
      </div>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map(item => {
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={`my-2 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-all active:bg-[#06B6D40F] active:text-[#06B6D4] ${
                    isActive
                      ? 'bg-[#06B6D40F] text-[#06B6D4] hover:bg-[#06B6D40F] hover:text-[#06B6D4]'
                      : 'text-gray-700 hover:bg-[#06B6D40F] dark:text-gray-300'
                  }`}
                >
                  <Link href={String(item.href)}>
                    <ThemedIcon name={item.icon} className="size-5" />
                    <span className="text-sm font-semibold text-black dark:text-white">
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <div className="mt-6 flex items-center gap-3 rounded-xl bg-[#06B6D40F] p-3 dark:bg-[#0e2235]">
        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.firstName} ${user?.lastName}&backgroundColor=2563eb&backgroundType=solid`}
            alt={`${user?.firstName} ${user?.lastName}`}
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <AvatarFallback>{`${user?.firstName ?? ''} ${user?.lastName ?? ''}`}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col text-sm">
          <span className="font-semibold text-gray-900 dark:text-white">
            {`${user?.firstName ?? ''} ${user?.lastName ?? ''}`}
          </span>
          <span className="text-xs text-gray-500">{user?.role}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="m-0 p-0 hover:bg-transparent dark:bg-transparent"
            >
              <EllipsisVertical className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-[#fff] dark:bg-[#0e2235]"
            align="start"
          >
            <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>

            <DropdownMenuItem onClick={handleLogout}>
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Sidebar>
  );
}
