'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import useAuth from '@/features/auth/hooks/useAuth';
import { useTenantPreferences } from '@/features/client/settings/hooks/useTenantPreferences';
import { ThemedIcon } from '@/shared/components/atoms/ThemedIcon';
import { Button } from '@/shared/components/atoms/ui/button';

export function ThemeSwitcher({ persist = false }: { persist?: boolean }) {
  const { setTheme, resolvedTheme } = useTheme();
  const { user } = useAuth();
  const { updatePreferences } = useTenantPreferences();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (persist && user?.theme) setTheme(user.theme);
  }, [persist, setTheme, user?.theme]);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';
  const toggleTheme = () => {
    const theme = isDark ? 'light' : 'dark';
    setTheme(theme);
    if (persist) void updatePreferences({ theme }).catch(() => undefined);
  };

  return (
    <Button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      variant="ghost"
      size="icon"
      className="relative size-8 rounded-full"
    >
      <ThemedIcon
        name="sun"
        size={16}
        className={`absolute size-4 transition-all duration-300 ${
          isDark
            ? 'scale-100 rotate-0 opacity-100'
            : 'scale-0 -rotate-90 opacity-0'
        }`}
      />
      <ThemedIcon
        name="moon"
        size={16}
        className={`absolute size-4 transition-all duration-300 ${
          isDark
            ? 'scale-0 rotate-90 opacity-0'
            : 'scale-100 rotate-0 opacity-100'
        }`}
      />
    </Button>
  );
}
