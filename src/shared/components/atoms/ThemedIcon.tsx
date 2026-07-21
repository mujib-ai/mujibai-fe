import { iconData } from '@/shared/components/atoms/iconData';

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
  const icon = iconData[name];

  if (!icon) return null;

  return (
    <svg
      aria-hidden={alt ? undefined : true}
      aria-label={alt || undefined}
      role={alt ? 'img' : undefined}
      focusable="false"
      viewBox={icon.viewBox}
      width={size}
      height={size}
      className={`inline-block shrink-0 ${className ?? ''}`}
      dangerouslySetInnerHTML={{ __html: icon.content }}
    />
  );
}
