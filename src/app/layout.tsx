import type { Metadata, Viewport } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import localFont from 'next/font/local';
import Script from 'next/script';

import { Providers } from '@/providers/Providers';
import { PwaManager } from '@/shared/components/atoms/PwaManager';
import { VisitTracker } from '@/shared/components/atoms/VisitTracker';
import { Toaster } from '@/shared/components/atoms/ui/sonner';
import { SITE_NAME, createUrl } from '@/shared/seo';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: createUrl(),
  // Plain string, not a title.template — every route already bakes its own
  // full "<page> - mujibai" title via src/shared/seo, so a template here
  // would double-append the site name.
  title: SITE_NAME,
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE_NAME,
  },
};

export const viewport: Viewport = {
  themeColor: '#06B6D4',
  width: 'device-width',
  initialScale: 1,
};

const vazirmatn = localFont({
  variable: '--font-vazirmatn',
  display: 'swap',
  // This family is only applied to text for the 'ar' locale (see the body
  // style below) — the default locale is 'en', which never uses it. With
  // preload on, Next would fetch all 9 weights on the critical path of
  // every English page for a font that's never rendered there.
  preload: false,
  src: [
    { path: '../../public/font/Vazirmatn-Thin.ttf', weight: '100' },
    { path: '../../public/font/Vazirmatn-ExtraLight.ttf', weight: '200' },
    { path: '../../public/font/Vazirmatn-Light.ttf', weight: '300' },
    { path: '../../public/font/Vazirmatn-Regular.ttf', weight: '400' },
    { path: '../../public/font/Vazirmatn-Medium.ttf', weight: '500' },
    { path: '../../public/font/Vazirmatn-SemiBold.ttf', weight: '600' },
    { path: '../../public/font/Vazirmatn-Bold.ttf', weight: '700' },
    { path: '../../public/font/Vazirmatn-ExtraBold.ttf', weight: '800' },
    { path: '../../public/font/Vazirmatn-Black.ttf', weight: '900' },
  ],
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
      className={vazirmatn.variable}
      suppressHydrationWarning
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        {process.env.NEXT_PUBLIC_API_URL && (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL} />
        )}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9CMX51PF21"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-9CMX51PF21');
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        style={{
          fontFamily: locale === 'ar' ? 'var(--font-vazirmatn)' : undefined,
        }}
      >
        <Providers locale={locale} messages={messages}>
          {children}
          <Toaster position="top-center" />
          <VisitTracker />
          <SpeedInsights />
          <PwaManager />
        </Providers>
      </body>
    </html>
  );
}
