import { Badge } from '@/shared/components/atoms/ui/badge';

interface SubscriptionPlanBadgeProps {
  plan: string;
}

export default function SubscriptionPlanBadge({ plan }: SubscriptionPlanBadgeProps) {
  return (
    <Badge variant="default" className="text-foreground">
      {plan}
    </Badge>
  );
}
