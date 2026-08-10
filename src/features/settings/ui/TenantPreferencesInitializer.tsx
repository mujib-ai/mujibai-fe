'use client';

import { useEffect, useRef } from 'react';

import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

import useAuth from '@/features/auth/hooks/useAuth';
import { AxiosAPI } from '@/shared/utils/axiosInstance';

const SUPPORTED_LOCALES = new Set(['ar', 'en']);

export function TenantPreferencesInitializer() {
  const { user } = useAuth();
  const locale = useLocale();
  const router = useRouter();
  const { setTheme } = useTheme();
  const appliedPreferences = useRef<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const language = SUPPORTED_LOCALES.has(user.language ?? '')
      ? user.language
      : null;
    const theme = user.theme;
    const preferenceKey = `${user.id}:${language ?? ''}:${theme ?? ''}`;

    if (appliedPreferences.current === preferenceKey) return;
    appliedPreferences.current = preferenceKey;

    if (theme === 'light' || theme === 'dark' || theme === 'system') {
      setTheme(theme);
    }

    if (language) {
      AxiosAPI.defaults.headers['Accept-Language'] = language;

      if (language !== locale) {
        document.cookie = `LANG=${language}; path=/; max-age=31536000; SameSite=Lax`;
        router.refresh();
      }
    }
  }, [locale, router, setTheme, user]);

  return null;
}
