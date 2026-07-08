import { Container } from '@/shared/components/atoms/Container';
import PricingCards from '@/shared/components/organisms/PricingCards';
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
  return (
    <section className="bg-background-darker relative py-20">
      <div className="absolute top-1/2 left-1/2 z-0 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/40 opacity-60 blur-[160px]" />

      <Container className="relative">
        <div className="text-center">
          <div className="mb-20 flex flex-col gap-5">
            <h2 className="text-text-light text-[22px] font-bold md:text-[44px]">
              Pricing
            </h2>

            <p className="text-text-light mt-2 text-sm md:text-base">
              Plans depending on your needs and use case
            </p>
          </div>

          <PricingCards plans={plans} />
        </div>
      </Container>
    </section>
  );
}
