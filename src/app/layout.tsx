import type { Metadata } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import { Cairo, Poppins } from 'next/font/google';

import { Providers } from '@/providers/Providers';
import { ThemeProvider } from '@/shared/components/atoms/ThemeProvider';
import { Toaster } from '@/shared/components/atoms/ui/sonner';

import '@/styles/globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  if (locale === 'ar') {
    return {
      title: 'مجيب AI | المساعد الذكي الذي يتحدث بلسانك ويخدم عملاءك بكل إحساس',
      description:
        'مجيب AI هو رفيقك الذكي الذي يتحدث بصوتك، يفهم نيتك، ويخدم عملاءك قبل أن تنطق. اجعل كل مكالمة تجربة لا تُنسى بذكاء صوتي متكامل وسرعة استجابة إنسانية.',
      keywords: [
        'مجيب AI',
        'ذكاء اصطناعي صوتي',
        'مساعد صوتي عربي',
        'خدمة عملاء بالذكاء الاصطناعي',
        'تفاعل صوتي ذكي',
        'روبوت محادثة صوتي',
        'تحويل الكلام إلى نص',
        'تحويل النص إلى صوت',
        'خدمة العملاء السعودية',
        'مساعد افتراضي صوتي',
      ],
      openGraph: {
        title:
          'مجيب AI | المساعد الذكي الذي يتحدث بلسانك ويخدم عملاءك بكل إحساس',
        description:
          'حوّل طريقة تواصلك مع عملائك — مع مجيب AI، الصوت الذي يفهمك ويرد بإحساس. تجربة صوتية طبيعية واحترافية مدعومة بالذكاء الاصطناعي.',
        url: 'https://www.mujibai.net',
        siteName: 'مجيب AI',
        locale: 'ar_SA',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'مجيب AI | صوتك الأول مع العميل',
        description:
          'مجيب AI هو المساعد الذكي الذي يتحدث بلسانك ويترك انطباعًا لا يُنسى لدى عملائك.',
        creator: '@mujibai',
      },
      metadataBase: new URL('https://www.mujibai.net'),
    };
  }

  return {
    title: 'Mujib AI | The Voice That Understands, Serves, and Connects',
    description:
      'Mujib AI is your intelligent voice assistant that speaks with empathy, understands your customers, and responds instantly — making every call unforgettable.',
    keywords: [
      'Mujib AI',
      'voice AI assistant',
      'AI voice bot',
      'customer service automation',
      'speech-to-text',
      'text-to-speech',
      'real-time AI interaction',
      'smart voice agent',
      'AI call assistant',
      'customer experience enhancement',
    ],
    openGraph: {
      title: 'Mujib AI | The Voice That Understands, Serves, and Connects',
      description:
        'Let your brand speak naturally — Mujib AI brings empathy, understanding, and intelligence to every customer interaction.',
      url: 'https://www.mujibai.net',
      siteName: 'Mujib AI',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Mujib AI | Your Intelligent Voice Assistant',
      description:
        'Mujib AI — the voice that understands, responds, and connects emotionally with your customers.',
      creator: '@mujibai',
    },
    metadataBase: new URL('https://www.mujibai.net'),
    icons: {
      icon: '/favicon.ico',
    },
  };
}

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  weight: ['400', '500', '700', '800'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      className={`${poppins.variable} ${cairo.variable}`}
      suppressHydrationWarning
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body
        suppressHydrationWarning
        style={{
          fontFamily:
            locale === 'ar' ? 'var(--font-cairo)' : 'var(--font-poppins)',
        }}
      >
        <Providers locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-center" />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
