import { Progress } from '@/shared/components/atoms/ui/progress';

interface SubscriptionUsageCellProps {
  value: number;
}

export default function SubscriptionUsageCell({ value }: SubscriptionUsageCellProps) {
  return (
    <div className="flex flex-col items-start gap-2">
      <span>{value}</span>
      <Progress value={value} />
    </div>
  );
}
