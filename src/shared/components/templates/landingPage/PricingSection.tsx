'use client';

import { useState } from 'react';

import type { PlanDisplay } from '@/shared/types';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/atoms/ui/tabs';
import PricingCards from '@/shared/components/organisms/PricingCards';

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState('monthly');

  const plans: { monthly: PlanDisplay[]; yearly: PlanDisplay[] } = {
    monthly: [
      {
        id: '1',
        name: 'Starter',
        description: 'Get started with the basics',
        price: '$0',
        period: 'month',
        features: [
          { name: 'Lorem', included: true },
          { name: 'Lorem Ipsum', included: false },
          { name: 'Lorem Ipsum', included: false },
          { name: 'Lorem Ipsum', included: false },
        ],
        isPopular: false,
      },
      {
        id: '2',
        name: 'Pro',
        description: 'For growing teams',
        price: '$44',
        period: 'month',
        features: [
          { name: 'Lorem Ipsum', included: true },
          { name: 'Lorem Ipsum', included: true },
          { name: 'Lorem Ipsum', included: true },
          { name: 'Lorem Ipsum', included: false },
        ],
        isPopular: true,
      },
      {
        id: '3',
        name: 'Enterprise',
        description: 'For large organizations',
        price: '$94',
        period: 'month',
        features: [
          { name: 'Lorem Ipsum', included: true },
          { name: 'Lorem Ipsum', included: true },
          { name: 'Lorem Ipsum', included: true },
          { name: 'Lorem Ipsum', included: true },
        ],
        isPopular: false,
      },
    ],
    yearly: [
      {
        id: '1',
        name: 'Starter',
        description: 'Get started with the basics',
        price: '$0',
        period: 'year',
        features: [
          { name: 'Lorem', included: true },
          { name: 'Lorem Ipsum', included: false },
          { name: 'Lorem Ipsum', included: false },
          { name: 'Lorem Ipsum', included: false },
        ],
        isPopular: false,
      },
      {
        id: '2',
        name: 'Pro',
        description: 'For growing teams',
        price: '$399',
        period: 'year',
        features: [
          { name: 'Lorem Ipsum', included: true },
          { name: 'Lorem Ipsum', included: true },
          { name: 'Lorem Ipsum', included: true },
          { name: 'Lorem Ipsum', included: false },
        ],
        isPopular: true,
      },
      {
        id: '3',
        name: 'Enterprise',
        description: 'For large organizations',
        price: '$899',
        period: 'year',
        features: [
          { name: 'Lorem Ipsum', included: true },
          { name: 'Lorem Ipsum', included: true },
          { name: 'Lorem Ipsum', included: true },
          { name: 'Lorem Ipsum', included: true },
        ],
        isPopular: false,
      },
    ],
  };

  return (
    <>
      <section className="bg-background-darker relative py-20">
        <div className="absolute top-1/2 left-1/2 z-0 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/40 opacity-60 blur-[160px]" />

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Tabs
              defaultValue="monthly"
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex w-full flex-col items-center"
            >
              <div className="mb-20 flex flex-col gap-5">
                <h2 className="text-text-light text-[22px] font-bold md:text-[44px]">
                  Pricing
                </h2>

                <p className="text-text-light mt-2 text-sm md:text-base">
                  Plans depending on your needs and use case
                </p>

                <div>
                  <TabsList className="flex gap-4 rounded-full bg-white/20 p-1">
                    <TabsTrigger
                      value="monthly"
                      className="w-[200px] rounded-full bg-transparent transition-all duration-300 hover:bg-cyan-500/20 data-[state=active]:bg-cyan-500 data-[state=inactive]:bg-transparent"
                    >
                      Monthly
                    </TabsTrigger>

                    <TabsTrigger
                      value="yearly"
                      className="w-[200px] rounded-full bg-transparent transition-all duration-300 hover:bg-cyan-500/20 data-[state=active]:bg-cyan-500 data-[state=inactive]:bg-transparent"
                    >
                      Yearly
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              {activeTab === 'monthly' && (
                <TabsContent value="monthly" className="w-full">
                  <PricingCards plans={plans.monthly} />
                </TabsContent>
              )}

              {activeTab === 'yearly' && (
                <TabsContent value="yearly" className="w-full">
                  <PricingCards plans={plans.yearly} />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}
