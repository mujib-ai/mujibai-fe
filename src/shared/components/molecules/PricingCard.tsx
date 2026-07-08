'use client';

import type { PlanDisplay } from '@/shared/types';
import { Button } from '@/shared/components/atoms/ui/button';
import { CheckCircle, X } from 'lucide-react';

/**
 * PricingCard Component
 * Glassmorphic pricing card with smooth shadows and gradient glow
 * matching the Figma design (dark and light modes supported)
 */

export default function PricingCard({ plan }: { plan: PlanDisplay }) {
  return (
    <div
      key={plan.id}
      className={`relative flex w-full flex-col items-center gap-2 rounded-2xl border border-white/20 px-8 py-10 shadow-[0_8px_60px_-10px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 lg:w-[344px] ${
        plan.isPopular
          ? 'bg-[linear-gradient(180deg,_rgba(59,130,246,0.2)_0%,_rgba(59,130,246,0.1)_100%)] shadow-[0_0_60px_rgba(59,130,246,0.4)]'
          : 'bg-[linear-gradient(180deg,_rgba(255,255,255,0.4)_0%,_rgba(255,255,255,0.1)_100%)] dark:bg-[linear-gradient(180deg,_rgba(255,255,255,0.08)_0%,_rgba(255,255,255,0.02)_100%)]'
      }`}
    >
      <div className="flex w-full flex-col gap-4 text-left">
        {plan.isPopular ? (
          <div className="flex items-center justify-between">
            <h3 className="text-[20px] font-bold md:text-[32px]">
              {plan.name}
            </h3>
            <Button className="rounded-full bg-cyan-500/20 px-4 py-1 text-xs font-medium shadow-md md:text-sm">
              Trending
            </Button>
          </div>
        ) : (
          <h3 className="text-[18px] font-bold md:text-[28px]">{plan.name}</h3>
        )}

        <div className="text-[28px] font-bold md:text-[40px]">
          <span className="text-cyan-400">{plan.price}</span>
          <span className="mx-1 text-xs">/</span>
          <span className="text-[14px] md:text-lg">{plan.period}</span>
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

      <Button className="mt-4 w-full rounded-full bg-cyan-500 py-3 font-semibold shadow-[0_4px_30px_rgba(6,182,212,0.3)] transition-all duration-200 hover:bg-cyan-400">
        Select
      </Button>

      {plan.isPopular && (
        <div className="absolute inset-0 -z-10 rounded-2xl bg-cyan-500/20 blur-[100px]"></div>
      )}
    </div>
  );
}
