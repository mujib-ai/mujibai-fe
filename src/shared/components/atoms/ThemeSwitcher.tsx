'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';
import Image from 'next/image';

import { useIconTheme } from '@/shared/components/atoms/ThemedIcon';
import { Button } from '@/shared/components/atoms/ui/button';

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const iconTheme = useIconTheme();

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
      <Image
        src={`/icons/sun-${iconTheme}.svg`}
        alt=""
        width={16}
        height={16}
        className={`absolute size-4 transition-all duration-300 ${
          isDark
            ? 'scale-100 rotate-0 opacity-100'
            : 'scale-0 -rotate-90 opacity-0'
        }`}
      />
      <Image
        src={`/icons/moon-${iconTheme}.svg`}
        alt=""
        width={16}
        height={16}
        className={`absolute size-4 transition-all duration-300 ${
          isDark
            ? 'scale-0 rotate-90 opacity-0'
            : 'scale-100 rotate-0 opacity-100'
        }`}
      />
    </Button>
  );
}
