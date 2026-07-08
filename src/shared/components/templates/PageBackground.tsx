import type { ReactNode } from 'react';

import Header from '@/shared/components/organisms/Header';

export function PageBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden py-12">
      <div className="fixed top-1/2 left-1/2 z-[-1] h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/40 opacity-60 blur-[160px]"></div>

      <Header />
      {children}
    </div>
  );
}
