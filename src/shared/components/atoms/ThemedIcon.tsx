'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

export function useIconTheme(): 'dark' | 'light' {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === 'dark' ? 'dark' : 'light';
}

interface ThemedIconProps {
  name: string;
  className?: string;
  size?: number;
  alt?: string;
}

export function ThemedIcon({
  name,
  className,
  size = 20,
  alt = '',
}: ThemedIconProps) {
  const iconTheme = useIconTheme();

  return (
    <Image
      src={`/icons/${name}-${iconTheme}.svg`}
      alt={alt}
      width={size}
      height={size}
      className={className}
      loading="eager"
    />
  );
}
