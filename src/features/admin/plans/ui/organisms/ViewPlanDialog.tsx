'use client';

import { useTranslations } from 'next-intl';

import { PlanType, usePlan } from '@/features/admin/plans';
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
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import { Check } from 'lucide-react';

interface ViewPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planId: string | null;
  onClose: () => void;
}

export default function ViewPlanDialog({
  open,
  onOpenChange,
  planId,
  onClose,
}: ViewPlanDialogProps) {
  const tColumns = useTranslations('tables.columns');
  const tPlans = useTranslations('plans');
  const tCommon = useTranslations('common');
  const tFields = useTranslations('dialogs.createPlan.fields');
  const tStates = useTranslations('states.empty');

  const { plan, isLoading } = usePlan(planId || '');
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden border-0 bg-white/95 p-0 shadow-2xl backdrop-blur-xl sm:max-w-lg dark:bg-slate-900/95">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            {isLoading ? <Skeleton className="h-6 w-32" /> : plan?.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200/50 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-800/50 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : plan ? (
              <>
                <div className="flex flex-col items-center justify-between gap-4 rounded-xl bg-linear-to-br from-cyan-50 to-blue-50 p-6 sm:flex-row dark:from-cyan-900/20 dark:to-blue-900/20">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {tColumns('price')}
                    </p>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-white px-3 py-1 text-sm font-semibold text-cyan-600 shadow-sm dark:bg-slate-800 dark:text-cyan-400"
                  >
                    {plan.type === PlanType.MONTHLY
                      ? tPlans('monthly')
                      : tPlans('yearly')}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold tracking-wide text-gray-900 dark:text-white">
                    {tFields('description')}
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-3 rounded-xl border border-gray-100 bg-gray-50/50 p-5 dark:border-gray-800 dark:bg-gray-800/20">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {tColumns('includes')}
                  </h4>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {plan.features?.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0 rounded-full bg-cyan-100 p-1 dark:bg-cyan-900/30">
                          <Check className="size-3 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center text-gray-500">
                <p>{tStates('noResults')}</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="border-t border-gray-100 px-6 py-4 dark:border-gray-800">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
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
