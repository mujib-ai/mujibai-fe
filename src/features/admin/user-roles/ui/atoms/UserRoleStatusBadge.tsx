import { useTranslations } from 'next-intl';

import { Badge } from '@/shared/components/atoms/ui/badge';

import { StatusEnum, type UserWithRole } from '../../types';

interface UserRoleStatusBadgeProps {
  status: UserWithRole['status'];
}

export function UserRoleStatusBadge({ status }: UserRoleStatusBadgeProps) {
  const tCommon = useTranslations('common');
  const styles =
    status === StatusEnum.ACTIVE
      ? 'bg-green-500/20 text-green-600 dark:text-green-400'
      : 'bg-red-500/20 text-red-600 dark:text-red-400';

  return (
    <Badge variant="secondary" className={styles}>
      {status === StatusEnum.ACTIVE ? tCommon('active') : tCommon('inactive')}
    </Badge>
  );
}
