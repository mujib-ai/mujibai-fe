'use client';

import { NextIntlClientProvider } from 'next-intl';

import { ThemeProvider } from '@/shared/components/atoms/ThemeProvider';

import { ErrorMessageProvider } from '@/shared/hooks/useErrorMessage';

import ReactQueryProvider from './ReactQueryProvider';

export function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: any;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      <ReactQueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorMessageProvider>{children}</ErrorMessageProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
