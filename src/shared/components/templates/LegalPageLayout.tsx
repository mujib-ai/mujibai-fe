import type { ReactNode } from 'react';

import Image from 'next/image';

export function LegalPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-14">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl bg-linear-to-b from-cyan-50 to-cyan-100/60 p-6 sm:p-8 dark:from-cyan-950/30 dark:to-cyan-950/10">
          <div className="bg-background/90 flex items-center justify-center rounded-2xl p-6 shadow-sm">
            <Image
              src="/policies-image.svg"
              alt=""
              width={512}
              height={402}
              className="h-auto w-full max-w-105"
              priority
            />
          </div>
        </div>
      </div>

      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default LegalPageLayout;
