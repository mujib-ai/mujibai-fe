'use client';

import type { Plan } from '@/features/admin/plans';

import { PlanCardSkeleton } from '../atoms/PlanCardSkeleton';
import { PlanCard } from './PlanCard';

interface PlansTableMobileProps {
  plans: Plan[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onEdit: (plan: Plan) => void;
  onView: (plan: Plan) => void;
}

export function PlansTableMobile({
  plans,
  isLoading,
  onDelete,
  onEdit,
  onView,
}: PlansTableMobileProps) {
  return (
    <div className="space-y-4 md:hidden">
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <PlanCardSkeleton key={index} />
          ))
        : plans.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onDelete={onDelete}
              onEdit={onEdit}
              onView={onView}
            />
          ))}
    </div>
  );
}
