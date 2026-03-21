import { Badge } from '@/shared/components/atoms/ui/badge';

interface UserRoleBadgeProps {
  role: string;
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  const normalized = role?.toLowerCase() ?? '';
  const label =
    normalized === 'admin'
      ? 'Admin'
      : normalized === 'client'
        ? 'Client'
        : role;

  return (
    <Badge
      variant="secondary"
      className="bg-primary/20 text-primary hover:bg-primary/20"
    >
      {label}
    </Badge>
  );
}
