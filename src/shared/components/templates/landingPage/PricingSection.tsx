'use client';

import { useTranslations } from 'next-intl';

import { Container } from '@/shared/components/atoms/Container';
import PricingCards from '@/shared/components/organisms/PricingCards';
import { PageBackground } from '@/shared/components/templates/PageBackground';
import type { PlanDisplay } from '@/shared/types';

const plans: PlanDisplay[] = [
  {
    id: 'free-trial',
    name: 'تجربة مجانية',
    description: 'جرّب نبرة مجاناً. لا حاجة لبطاقة ائتمان.',
    price: 'مجاني',
    period: '',
    features: [
      { name: 'رصيد 20,000', included: true },
      { name: 'وصول API مشمول', included: true },
    ],
    isPopular: false,
  },
  {
    id: 'individual',
    name: 'الباقة الفردية',
    description: 'للاستخدام الفردي والمشاريع الشخصية.',
    price: '39',
    period: 'الشهر',
    features: [
      { name: 'رصيد 50,000', included: true },
      { name: 'وكلاء صوت بالذكاء الاصطناعي غير محدودين', included: true },
      { name: 'أعضاء مشاريع غير محدودين', included: true },
      { name: 'تكامل واتساب', included: true },
      { name: 'نظام تذاكر مدمج', included: true },
      { name: 'إدارة جهات الاتصال', included: true },
      { name: 'تحليلات مكالمات ديناميكية', included: true },
      { name: 'استنساخ صوت غير محدود', included: true },
      { name: 'وصول API مشمول', included: true },
    ],
    isPopular: false,
  },
  {
    id: 'basic',
    name: 'الباقة الأساسية',
    description: 'للشركات الصغيرة والنمو المبكر.',
    price: '90',
    period: 'الشهر',
    features: [
      { name: 'رصيد 130,000', included: true },
      { name: 'كل ما في الباقة الفردية، بالإضافة إلى', included: true },
      { name: 'دعم قياسي، خلال ما يصل إلى 5 أيام عمل', included: true },
      { name: 'وصول API مشمول', included: true },
    ],
    isPopular: false,
  },
  {
    id: 'starter',
    name: 'الباقة المبدئية',
    description: 'للفِرق الجاهزة للاستخدام الإنتاجي.',
    price: '200',
    period: 'الشهر',
    features: [
      { name: 'رصيد 300,000', included: true },
      { name: 'كل ما في الباقة الأساسية، بالإضافة إلى', included: true },
      { name: 'دعم قياسي، خلال ما يصل إلى 3 أيام عمل', included: true },
      { name: 'وصول API مشمول', included: true },
    ],
    isPopular: true,
  },
  {
    id: 'professional',
    name: 'الباقة الاحترافية',
    description: 'للعمليات المتقدمة وحجم استخدام أعلى.',
    price: '350',
    period: 'الشهر',
    features: [
      { name: 'رصيد 550,000', included: true },
      { name: 'كل ما في الباقة المبدئية، بالإضافة إلى', included: true },
      { name: 'دعم بأولوية، خلال ما يصل إلى يومي عمل', included: true },
      { name: 'وصول API مشمول', included: true },
    ],
    isPopular: false,
  },
  {
    id: 'scale',
    name: 'باقة التوسع',
    description: 'للأحجام الكبيرة وعمليات التوسع.',
    price: '750',
    period: 'الشهر',
    features: [
      { name: 'رصيد 1,250,000', included: true },
      { name: 'كل ما في الباقة الاحترافية، بالإضافة إلى', included: true },
      { name: 'دعم بأولوية، خلال ما يصل إلى يوم عمل واحد', included: true },
      { name: 'وصول API مشمول', included: true },
    ],
    isPopular: false,
  },
  {
    id: 'enterprise',
    name: 'باقة المؤسسات',
    description: 'للمنظمات ذات المتطلبات المخصصة.',
    price: 'مخصص',
    period: '',
    features: [
      { name: 'رصيد حسب الطلب', included: true },
      { name: 'كل ما في باقة التوسع، بالإضافة إلى', included: true },
      { name: 'اتفاقية مستوى خدمة مخصصة حسب احتياجك', included: true },
      { name: 'وصول API حسب الطلب', included: true },
    ],
    isPopular: false,
  },
];

export default function PricingSection() {
  const t = useTranslations('landingPage.pricingSection');

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
