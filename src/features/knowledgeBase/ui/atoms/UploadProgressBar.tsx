import { Progress } from '@/shared/components/atoms/ui/progress';

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
    <div className={className}>
      <div className="text-muted-foreground mb-1 flex items-center justify-between text-xs">
        <span>{label}</span>
        <span>{clamped}%</span>
      </div>
      <Progress value={clamped} aria-label={label} className="h-2" />
    </div>
  );
}
