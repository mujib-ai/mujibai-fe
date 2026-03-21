'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';

import type { UserWithRole } from '../../types';
import { UserRoleBadge, UserRoleStatusBadge } from '../atoms';

interface ViewUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserWithRole | null;
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  if (value == null || value === '') return null;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-muted-foreground text-xs font-medium">{label}</span>
      <div className="text-foreground text-sm">{value}</div>
    </div>
  );
}

function formatDate(dateStr: string | undefined, locale: string) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? dateStr
      : d.toLocaleDateString(locale, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
  } catch {
    return dateStr;
  }
}

export default function ViewUserDialog({
  open,
  onOpenChange,
  user,
}: ViewUserDialogProps) {
  const tColumns = useTranslations('tables.columns');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden border-0 bg-white/95 p-0 shadow-2xl backdrop-blur-xl sm:max-w-lg dark:bg-slate-900/95">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            {user?.name ?? tCommon('view')}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200/50 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-800/50 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-track]:bg-transparent">
          {user ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4 rounded-xl bg-linear-to-br from-cyan-50 to-blue-50 p-4 dark:from-cyan-900/20 dark:to-blue-900/20">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {tColumns('status')}
                </span>
                <UserRoleStatusBadge status={user.status} />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoRow label={tColumns('name')} value={user.name} />
                <InfoRow label={tColumns('email')} value={user.email} />
                <InfoRow label={tColumns('phone')} value={user.phone} />
                <InfoRow
                  label={tColumns('role')}
                  value={<UserRoleBadge role={user.role} />}
                />
                <InfoRow
                  label={tColumns('lastActive')}
                  value={formatDate(user.startDate, locale)}
                />
                {user.company && (
                  <InfoRow label={tColumns('company')} value={user.company} />
                )}
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground flex min-h-[120px] items-center justify-center">
              —
            </div>
          )}
        </div>

        <DialogFooter className="border-t border-gray-100 px-6 py-4 dark:border-gray-800">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full rounded-xl border-gray-200 font-semibold hover:bg-gray-50 hover:text-gray-900 sm:w-auto dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              {tCommon('close')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
