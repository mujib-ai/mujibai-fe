import type { PlanDisplay } from '@/shared/types';
import PricingCard from '@/shared/components/molecules/PricingCard';

/**
 * PricingCards Component
 * Displays a list of plan cards for a given billing period.
 */
function PricingCards({ plans }: { plans: PlanDisplay[] }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 lg:flex-row">
      {plans.map(plan => (
        <PricingCard plan={plan} key={plan.id.toString()} />
      ))}
    </div>
  );
}

export default PricingCards;
