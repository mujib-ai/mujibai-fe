import { ProgressBar } from '@heroui/react';

interface UploadProgressBarProps {
  value: number;
  label: string;
  className?: string;
}

export default function UploadProgressBar({
  value,
  label,
  className,
}: UploadProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <ProgressBar value={clamped} aria-label={label} className={className}>
      <div className="text-muted-foreground mb-1 flex items-center justify-between text-xs">
        <span>{label}</span>
        <span>{clamped}%</span>
      </div>
      <ProgressBar.Track className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full">
        <ProgressBar.Fill
          className="bg-primary h-full rounded-full transition-all"
          style={{ width: `${clamped}%` }}
        />
      </ProgressBar.Track>
    </ProgressBar>
  );
}
