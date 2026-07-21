import type { StatusColor } from '../types';

/**
 * HeroUI's own stylesheet (`@heroui/styles`) isn't loaded in this project —
 * every HeroUI primitive already in the codebase (Table, Pagination,
 * Skeleton, Modal) is styled entirely via explicit Tailwind classNames
 * rather than HeroUI's `color`/`variant` props. This map follows the same
 * convention for the semantic status colors used across Chip/ProgressBar.
 */
export const STATUS_COLOR_CLASSES: Record<StatusColor, string> = {
  default: 'bg-muted text-muted-foreground',
  accent: 'bg-[#06B6D41A] text-[#06B6D4] dark:bg-[#06B6D426]',
  success:
    'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400',
  danger: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  warning:
    'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
};

export const STATUS_DOT_COLOR_CLASSES: Record<StatusColor, string> = {
  default: 'bg-muted-foreground',
  accent: 'bg-[#06B6D4]',
  success: 'bg-green-500',
  danger: 'bg-destructive',
  warning: 'bg-amber-500',
};

export const STATUS_PROGRESS_COLOR_CLASSES: Record<StatusColor, string> = {
  default: 'bg-muted-foreground',
  accent: 'bg-[#06B6D4]',
  success: 'bg-green-500',
  danger: 'bg-destructive',
  warning: 'bg-amber-500',
};
