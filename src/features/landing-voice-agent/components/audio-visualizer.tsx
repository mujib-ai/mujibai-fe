import { cn } from '@/shared/lib/utils';

interface AudioVisualizerProps {
  active: boolean;
  level: number;
  speaking: boolean;
}

export function AudioVisualizer({
  active,
  level,
  speaking,
}: AudioVisualizerProps) {
  return (
    <div
      className="flex h-20 items-center justify-center gap-1.5"
      role="img"
      aria-label={active ? 'Audio activity' : 'Audio inactive'}
    >
      {Array.from({ length: 18 }, (_, index) => {
        const scale = active
          ? Math.max(0.2, speaking ? ((index * 7) % 10) / 10 : level)
          : 0.15;
        return (
          <span
            key={index}
            className={cn(
              'h-12 w-1.5 origin-center rounded-full bg-cyan-500 transition-transform duration-150 motion-reduce:transition-none',
              active && speaking && 'animate-pulse motion-reduce:animate-none'
            )}
            style={{ transform: `scaleY(${scale})` }}
          />
        );
      })}
    </div>
  );
}
