'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/atoms/ui/dialog';
import type { Client } from '@/shared/types';

interface ViewClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
}

const InfoRow = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string | null | undefined;
  className?: string;
}) => {
  if (!value) return null;
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-muted-foreground text-xs font-medium">{label}</span>
      <span className="text-foreground text-sm">{value}</span>
    </div>
  );
};

export default function ViewClientDialog({
  open,
  onOpenChange,
  client,
}: ViewClientDialogProps) {
  const tColumns = useTranslations('tables.columns');
  const tCommon = useTranslations('common');

  const formatDate = (date: string | null | undefined) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden border-0 bg-white/95 p-0 shadow-2xl backdrop-blur-xl sm:max-w-lg dark:bg-slate-900/95">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            {client?.name ?? tCommon('view')}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200/50 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-800/50 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="space-y-6">
            {client ? (
              <>
                <div className="flex items-center justify-between gap-4 rounded-xl bg-linear-to-br from-cyan-50 to-blue-50 p-4 dark:from-cyan-900/20 dark:to-blue-900/20">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {tColumns('status')}
                  </span>
                  <Badge
                    variant="secondary"
                    className={
                      client.subscriptionActive
                        ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                        : 'bg-red-500/20 text-red-600 dark:text-red-400'
                    }
                  >
                    {client.subscriptionActive
                      ? tCommon('active')
                      : tCommon('inactive')}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoRow label={tColumns('name')} value={client.name} />
                  <InfoRow label={tColumns('email')} value={client.email} />
                  <InfoRow label={tColumns('phone')} value={client.phone} />
                  <InfoRow label={tColumns('industry')} value={client.industry} />
                  <InfoRow label="Address" value={client.address} />
                  <InfoRow label="Website" value={client.website} />
                  {client.description && (
                    <InfoRow
                      label="Description"
                      value={client.description}
                      className="sm:col-span-2"
                    />
                  )}
                  {client.commercialRegister && (
                    <InfoRow
                      label="Commercial Register"
                      value={client.commercialRegister}
                    />
                  )}
                  {client.taxId && (
                    <InfoRow label="Tax ID" value={client.taxId} />
                  )}
                  {client.size && (
                    <InfoRow label="Company Size" value={client.size} />
                  )}
                  {client.domain && (
                    <InfoRow label="Domain" value={client.domain} />
                  )}
                </div>

                <div className="space-y-2 rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-800/20">
                  <InfoRow
                    label="Created"
                    value={formatDate(client.createdAt)}
                  />
                  <InfoRow
                    label="Last Updated"
                    value={formatDate(client.updatedAt)}
                  />
                </div>
              </>
            ) : (
              <div className="text-muted-foreground flex min-h-[120px] items-center justify-center">
                —
              </div>
            )}
          </div>
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
