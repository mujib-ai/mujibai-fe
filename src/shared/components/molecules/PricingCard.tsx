'use client';

import { useTranslations } from 'next-intl';

import RyialIcon from '@/shared/components/atoms/RyialIcon';
import { Button } from '@/shared/components/atoms/ui/button';
import type { PlanDisplay } from '@/shared/types';
import { CheckCircle, X } from 'lucide-react';

export default function PricingCard({ plan }: { plan: PlanDisplay }) {
  const t = useTranslations('landingPage.pricingSection');

  return (
    <div
      key={plan.id}
      className="relative flex w-full flex-col items-center gap-2 rounded-2xl bg-[#FFFFFFCC] px-8 py-10 shadow-[0_0_25px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-200 lg:w-86 dark:bg-[#06B6D40F]"
    >
      <div className="flex w-full flex-col gap-4 text-center">
        <h3 className="text-[18px] font-bold md:text-[28px]">{plan.name}</h3>

        <div className="flex items-center justify-center gap-1 text-[28px] font-bold md:text-[40px]">
          {plan.period && <RyialIcon size={24} />}
          <span className="text-priamry">{plan.price}</span>
          {plan.period && (
            <>
              <span className="mx-1 text-xs">/</span>
              <span className="text-[14px] md:text-lg">{plan.period}</span>
            </>
          )}
        </div>
      </div>

      <div className="mt-2 flex w-full flex-col gap-3">
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            {feature.included ? (
              <div className="rounded-full bg-green-600/10 p-1">
                <CheckCircle className="size-4 text-green-600" />
              </div>
            ) : (
              <div className="rounded-full bg-red-600/10 p-1">
                <X className="size-4 text-red-600" />
              </div>
            )}
            <span className="text-sm md:text-base">{feature.name}</span>
          </div>
        ))}
      </div>

      <Button className="bg-primary text-foreground mt-4 w-full rounded-full py-3 font-semibold">
        {t('select')}
      </Button>

      {plan.isPopular && (
        <div className="absolute inset-0 -z-10 rounded-2xl bg-cyan-500/20 blur-[100px]"></div>
      )}
    </div>
  );
}
