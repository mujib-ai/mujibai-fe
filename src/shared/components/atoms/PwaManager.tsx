'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/shared/components/atoms/ui/button';
import { Download, X } from 'lucide-react';
import { toast } from 'sonner';

const INSTALL_DISMISSED_KEY = 'mujibai-install-dismissed-at';
// Don't re-show the install prompt for a while after the user dismisses it.
const DISMISS_COOLDOWN_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

function wasRecentlyDismissed() {
  const raw = localStorage.getItem(INSTALL_DISMISSED_KEY);
  if (!raw) return false;
  const dismissedAt = Number(raw);
  return (
    Number.isFinite(dismissedAt) &&
    Date.now() - dismissedAt < DISMISS_COOLDOWN_MS
  );
}

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari
    (window.navigator as { standalone?: boolean }).standalone === true
  );
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  navigator.serviceWorker.register('/sw.js').then(registration => {
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        const hasActiveController = Boolean(navigator.serviceWorker.controller);
        if (newWorker.state === 'installed' && hasActiveController) {
          toast('A new version is available', {
            duration: Infinity,
            action: {
              label: 'Refresh',
              onClick: () => {
                newWorker.postMessage('SKIP_WAITING');
              },
            },
          });
        }
      });
    });
  });

  let reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloaded) return;
    reloaded = true;
    window.location.reload();
  });
}

export function PwaManager() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker();
    }

    if (isStandalone()) return;

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      if (wasRecentlyDismissed()) return;
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setShowInstall(true);
    };

    const handleAppInstalled = () => {
      setShowInstall(false);
      setInstallPrompt(null);
      localStorage.removeItem(INSTALL_DISMISSED_KEY);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (!showInstall || !installPrompt) return null;

  const dismiss = () => {
    localStorage.setItem(INSTALL_DISMISSED_KEY, String(Date.now()));
    setShowInstall(false);
  };

  const install = async () => {
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'dismissed') {
      localStorage.setItem(INSTALL_DISMISSED_KEY, String(Date.now()));
    }
    setShowInstall(false);
    setInstallPrompt(null);
  };

  return (
    <div className="border-border bg-background fixed inset-x-4 bottom-4 z-50 flex items-center gap-3 rounded-2xl border p-4 shadow-lg sm:inset-x-auto sm:right-4 sm:max-w-sm">
      <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-full">
        <Download className="text-primary size-5" strokeWidth={1.5} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-foreground text-sm font-semibold">Install app</p>
        <p className="text-muted-foreground text-xs">
          Add mujibai to your device for quick access.
        </p>
      </div>
      <div className="flex items-center gap-1">
        <Button size="sm" onClick={install}>
          Install
        </Button>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={dismiss}
          className="text-muted-foreground hover:text-foreground p-1"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
