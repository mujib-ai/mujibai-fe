'use client';

import { useTranslations } from 'next-intl';

import { Container } from '@/shared/components/atoms/Container';
import PricingCards from '@/shared/components/organisms/PricingCards';
import { PageBackground } from '@/shared/components/templates/PageBackground';
import type { PlanDisplay } from '@/shared/types';

type PlanTranslation = {
  name: string;
  description: string;
  price: string;
  period: string;
  included: boolean[];
};

const planIds = ['starter', 'professional', 'enterprise'] as const;

const popularPlanId: (typeof planIds)[number] = 'professional';

export default function PricingSection() {
  const t = useTranslations('landingPage.pricingSection');
  const featureList = t.raw('featureList') as string[];
  const planTranslations = t.raw('plans') as Record<
    (typeof planIds)[number],
    PlanTranslation
  >;

  const plans: PlanDisplay[] = planIds.map(id => {
    const plan = planTranslations[id];
    return {
      id,
      name: plan.name,
      description: plan.description,
      price: plan.price,
      period: plan.period,
      features: featureList.map((name, i) => ({
        name,
        included: plan.included[i],
      })),
      isPopular: id === popularPlanId,
    };
  });

  return (
    <PageBackground
      showHeader={false}
      className="bg-background-darker min-h-0 py-20"
      glowClassName="absolute z-0 h-[65%] w-[65%]"
    >
      <Container className="relative z-10">
        <div className="text-center">
          <div className="mb-20 flex flex-col gap-5">
            <h2 className="text-text-light text-[22px] font-bold md:text-[44px]">
              {t('title')}
            </h2>

            <p className="text-text-light mt-2 text-sm md:text-base">
              {t('subTitle')}
            </p>
          </div>

          <PricingCards plans={plans} />
        </div>
      </Container>
    </PageBackground>
  );
}
