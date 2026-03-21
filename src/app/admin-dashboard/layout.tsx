import { getLocale } from 'next-intl/server';

import {
  SidebarInset,
  SidebarProvider,
} from '@/shared/components/atoms/ui/sidebar';
import AdminSidebar from '@/shared/components/organisms/admin-dashboard/AdminSidebar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <SidebarProvider>
      <div className="fixed top-1/2 left-1/2 z-0 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded bg-[#06B6D4]/70 opacity-80 blur-[120px]"></div>
      <AdminSidebar dir={locale === 'ar' ? 'right' : 'left'} />
      <SidebarInset className="min-w-0 overflow-x-hidden bg-transparent">
        <div className="h-full w-full p-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
