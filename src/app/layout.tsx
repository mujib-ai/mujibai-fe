import type { Metadata, Viewport } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import localFont from 'next/font/local';

import { Providers } from '@/providers/Providers';
import { PwaManager } from '@/shared/components/atoms/PwaManager';
import { VisitTracker } from '@/shared/components/atoms/VisitTracker';
import { Toaster } from '@/shared/components/atoms/ui/sonner';
import { SITE_NAME, createUrl } from '@/shared/seo';
import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: createUrl(),
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
      </head>
      <GoogleTagManager gtmId="GTM-MNJLKK52" />
      <body
        suppressHydrationWarning
        style={{
          fontFamily: 'var(--font-vazirmatn)',
        }}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MNJLKK52"
            height="0"
            width="0"
            title="Google Tag Manager"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
