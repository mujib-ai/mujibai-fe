'use client';

import { useTranslations } from 'next-intl';

import type { Plan } from '@/features/admin/plans';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import { Eye, MoreHorizontal, Pen, Trash2 } from 'lucide-react';

interface PlanCardProps {
  plan: Plan;
  onDelete: (id: string) => void;
  onEdit: (plan: Plan) => void;
  onView: (plan: Plan) => void;
}

export function PlanCard({ plan, onDelete, onEdit, onView }: PlanCardProps) {
  const tColumns = useTranslations('tables.columns');
  const tCommon = useTranslations('common');

  return (
    <div className="border-border rounded-xl border bg-[#FFFFFFBF] p-4 shadow-sm transition-all hover:shadow-md dark:bg-[#001434A6]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-lg font-semibold">{plan.title}</h3>
            <p className="text-muted-foreground text-sm">{plan.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
              ${plan.price}
            </span>
            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
              {plan.type}
            </span>
          </div>

          {plan.features && plan.features.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm font-medium">{tColumns('includes')}:</p>
              <ul className="space-y-1">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="text-muted-foreground flex items-start gap-2 text-sm"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onView(plan)}
              className="text-primary focus:text-primary flex items-center gap-2"
            >
              <Eye className="text-primary h-4 w-4" />
              {tCommon('view')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onEdit(plan)}
              className="text-primary focus:text-primary flex items-center gap-2"
            >
              <Pen className="text-primary h-4 w-4" />
              {tCommon('edit')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(plan.id)}
              className="text-destructive focus:text-destructive flex items-center gap-2"
            >
              <Trash2 className="text-destructive h-4 w-4" />
              {tCommon('delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
