import { getLocale } from 'next-intl/server';

import { DashboardFloatingAiAssistantButton } from '@/features/aiHelper/DashboardFloatingAiAssistantButton';
import { DashboardProvider } from '@/features/aiHelper/DashboardProvider';
import { SidebarProvider } from '@/shared/components/atoms/ui/sidebar';
import ClientSidebar from '@/shared/components/organisms/dashboard/ClientSidebar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <main className="relative h-screen w-full overflow-x-hidden p-2">
      <div className="fixed top-1/2 left-1/2 z-0 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded bg-[#06B6D4]/70 opacity-80 blur-[120px]"></div>
      <DashboardProvider>
        <SidebarProvider>
          <ClientSidebar dir={locale === 'ar' ? 'right' : 'left'} />
          {children}
          <DashboardFloatingAiAssistantButton />
        </SidebarProvider>
      </DashboardProvider>
    </main>
  );
}
