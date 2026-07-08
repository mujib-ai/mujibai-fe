'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { Button } from '@/shared/components/atoms/ui/button';
import { Moon, Sun } from 'lucide-react';

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      variant="ghost"
      size="icon"
      className="relative size-8 rounded-full"
    >
      <Sun
        className={`absolute size-4 transition-all duration-300 ${
          isDark
            ? 'scale-100 rotate-0 opacity-100'
            : 'scale-0 -rotate-90 opacity-0'
        }`}
      />
      <Moon
        className={`absolute size-4 transition-all duration-300 ${
          isDark
            ? 'scale-0 rotate-90 opacity-0'
            : 'scale-100 rotate-0 opacity-100'
        }`}
      />
    </Button>
  );
}
