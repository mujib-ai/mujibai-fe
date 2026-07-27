import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { EnrollPage } from '@/features/enroll';
import { createSeoMetadata } from '@/shared/seo';

const copy = {
  en: {
    title: 'Company Enrollment Form | mujibai',
    description:
      'Enroll your company with mujibai to start using AI-powered customer service agents that answer your phone calls, chat with your website visitors through a landing page widget, and let you analyze performance and collaborate with your team. Fill out the enrollment form and your request will be reviewed within 3 to 5 business days.',
    keywords: [
      'company enrollment',
      'enrollment form',
      'AI customer service',
      'mujibai platform',
      'AI receptionist',
      'automated call answering',
      'landing page integration',
      'call and conversation analytics',
      'SaaS',
      'mujibai',
    ],
  },
  ar: {
    title: 'نموذج تسجيل الشركة | mujibai',
    description:
      'سجّل شركتك في mujibai لبدء استخدام موظفي خدمة عملاء مدعومين بالذكاء الاصطناعي يجيبون على مكالماتك الهاتفية، ويتحدثون مع زوار موقعك عبر صفحة الهبوط، ويتيحون لك تحليل الأداء والتعاون مع فريقك. املأ نموذج التسجيل وسيتم مراجعة طلبك خلال 3 إلى 5 أيام عمل.',
    keywords: [
      'تسجيل شركة',
      'نموذج تسجيل',
      'خدمة عملاء بالذكاء الاصطناعي',
      'منصة mujibai',
      'موظف استقبال ذكاء اصطناعي',
      'الرد الآلي على المكالمات',
      'تكامل صفحة الهبوط',
      'تحليلات المكالمات والمحادثات',
      'SaaS',
      'mujibai',
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { title, description, keywords } = copy[locale === 'ar' ? 'ar' : 'en'];

  return createSeoMetadata({
    path: '/register',
    title,
    description,
    keywords,
    category: 'Marketing',
  });
}

export default function Enroll() {
  return <EnrollPage />;
}
