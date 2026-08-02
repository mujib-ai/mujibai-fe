'use client';

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { GOOGLE_CALENDAR_INTEGRATION_QUERY_KEY } from './use-google-calendar-integration';

const OAUTH_ERROR_REASON_KEYS: Record<string, string> = {
  access_denied: 'oauthErrorAccessDenied',
  invalid_state: 'oauthErrorInvalidState',
  expired_state: 'oauthErrorInvalidState',
  code_exchange_failed: 'oauthErrorExchangeFailed',
};

export default function useGoogleCalendarOAuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const t = useTranslations(
    'settings.integrationSettings.googleCalendarIntegration'
  );

  useEffect(() => {
    const googleCalendarParam = searchParams.get('googleCalendar');
    if (!googleCalendarParam) return;

    if (googleCalendarParam === 'error') {
      const reason = searchParams.get('reason');
      const messageKey =
        (reason && OAUTH_ERROR_REASON_KEYS[reason]) || 'genericError';
      toast.error(t(messageKey));
    } else if (googleCalendarParam === 'connected') {
      toast.success(t('connected'));
    }

    queryClient.invalidateQueries({
      queryKey: GOOGLE_CALENDAR_INTEGRATION_QUERY_KEY,
    });

    const remainingParams = new URLSearchParams(searchParams.toString());
    remainingParams.delete('googleCalendar');
    remainingParams.delete('reason');
    const query = remainingParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
