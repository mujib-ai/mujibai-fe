'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Logo from '@/shared/components/atoms/Logo';
import { ThemedIcon } from '@/shared/components/atoms/ThemedIcon';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/atoms/ui/sidebar';

export default function ClientSidebar({ dir }: { dir: 'left' | 'right' }) {
  const t = useTranslations('sidebar');
  const pathname = usePathname();

  const menuItems: { title: string; icon: string; href: string }[] = [
    { title: t('dashboard'), icon: 'dashboard', href: '/dashboard' },
    { title: t('calls'), icon: 'calls', href: '/dashboard/calls' },
    { title: t('tickets'), icon: 'tickets', href: '/dashboard/tickets' },
    {
      title: t('knowledge-base'),
      icon: 'knowledge-base',
      href: '/dashboard/knowledge-base',
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
    {
      title: t('billing'),
      icon: 'receipt',
      href: '/dashboard/billing',
    },
    { title: t('settings'), icon: 'settings', href: '/dashboard/settings' },
    { title: t('docs'), icon: 'docs', href: '/docs' },
  ];

  return (
    <Sidebar
      side={dir}
      className="my-2 flex w-62.5 flex-col justify-between rounded-2xl bg-[#FFFFFFBF] p-4 shadow-sm dark:bg-[#001434A6]"
    >
      <div className="mt-2 mb-6 flex flex-col items-center">
        <Logo />
      </div>

      <SidebarContent>
        <SidebarMenu className="gap-1.25">
          {menuItems.map(item => {
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-all active:bg-[#06B6D40F] active:text-[#06B6D4] ${
                    isActive
                      ? 'bg-[#06B6D40F] text-[#06B6D4] hover:bg-[#06B6D40F] hover:text-[#06B6D4]'
                      : 'text-gray-700 hover:bg-[#06B6D40F] dark:text-gray-300'
                  }`}
                >
                  <Link href={String(item.href)}>
                    <ThemedIcon
                      name={item.icon}
                      className="size-7 [&_path]:[stroke:0.35]"
                    />
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
    </Sidebar>
  );
}
