'use client';

import { Button } from '@/shared/components/atoms/ui/button';
import { WifiOff } from 'lucide-react';

export function OfflineView() {
  return (
    <main className="bg-background flex min-h-screen w-full flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="bg-primary/10 flex size-16 items-center justify-center rounded-full">
        <WifiOff className="text-primary size-8" strokeWidth={1.5} />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-foreground text-2xl font-bold md:text-3xl">
          You&apos;re offline
        </h1>
        <p
          className="text-muted-foreground max-w-sm text-sm md:text-base"
          dir="ltr"
        >
          No internet connection was found. Check your connection and try again.
        </p>
      </div>

      <div
        className="border-border flex flex-col gap-2 border-t pt-6"
        dir="rtl"
      >
        <h2 className="text-foreground text-xl font-bold md:text-2xl">
          أنت غير متصل بالإنترنت
        </h2>
        <p className="text-muted-foreground max-w-sm text-sm md:text-base">
          تعذر العثور على اتصال بالإنترنت. تحقق من اتصالك وحاول مرة أخرى.
        </p>
      </div>

      <Button onClick={() => window.location.reload()} className="mt-2">
        Retry / إعادة المحاولة
      </Button>
    </main>
  );
}
