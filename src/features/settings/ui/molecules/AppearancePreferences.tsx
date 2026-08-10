'use client';

import { useSyncExternalStore } from 'react';

import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/features/auth';
import { useTenantPreferences } from '@/features/settings/hooks/useTenantPreferences';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/ui/select';
import { cn } from '@/shared/lib/utils';
import { AxiosAPI } from '@/shared/utils/axiosInstance';
import { Languages, MonitorCog, Moon, Sun } from 'lucide-react';

import type { TenantTheme } from '../../services/tenant-settings.service';

const THEMES = [
  { value: 'light', icon: Sun },
  { value: 'dark', icon: Moon },
  { value: 'system', icon: MonitorCog },
] as const;

export function AppearancePreferences() {
  const t = useTranslations('settings.accountSettings.preferences');
  const locale = useLocale();
  const router = useRouter();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { updatePreferences, isUpdating } = useTenantPreferences();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );
  const selectedTheme = (
    mounted ? (theme ?? user?.theme ?? 'system') : 'system'
  ) as TenantTheme;
  const selectedLanguage = mounted ? (user?.language ?? locale) : locale;

  async function changeTheme(nextTheme: TenantTheme) {
    if (nextTheme === selectedTheme || isUpdating) return;
    try {
      await updatePreferences({ theme: nextTheme });
      setTheme(nextTheme);
    } catch {
      // Keep the current theme when persistence fails.
    }
  }

  async function changeLanguage(language: string) {
    if (language === selectedLanguage || isUpdating) return;
    try {
      await updatePreferences({ language });
      AxiosAPI.defaults.headers['Accept-Language'] = language;
      document.cookie = `LANG=${language}; path=/; max-age=31536000; SameSite=Lax`;
      router.refresh();
    } catch {
      // Keep the current language when persistence fails.
    }
  }

  return (
    <section className="bg-surface space-y-8 rounded-2xl p-5 sm:p-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{t('theme.title')}</h2>
          <p className="text-muted-foreground text-sm">
            {t('theme.description')}
          </p>
        </div>

        <div
          role="radiogroup"
          aria-label={t('theme.title')}
          className="grid gap-4 sm:grid-cols-3"
        >
          {THEMES.map(({ value, icon: Icon }) => {
            const selected = selectedTheme === value;
            return (
              <Button
                key={value}
                type="button"
                variant="ghost"
                role="radio"
                aria-checked={selected}
                disabled={isUpdating}
                onClick={() => void changeTheme(value)}
                className={cn(
                  'bg-card hover:bg-card/80 flex h-32 flex-col gap-4 rounded-2xl border-2 border-transparent shadow-none',
                  selected && 'border-primary bg-card'
                )}
              >
                <span className="bg-primary/15 text-primary flex size-12 items-center justify-center rounded-full">
                  <Icon className="size-6" />
                </span>
                <span className="text-base font-semibold">
                  {t(`theme.options.${value}`)}
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{t('language.title')}</h2>
          <p className="text-muted-foreground text-sm">
            {t('language.description')}
          </p>
        </div>

        <div className="bg-card flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
              <Languages className="size-5" />
            </span>
            <div>
              <p className="font-semibold">{t('language.label')}</p>
              <p className="text-muted-foreground text-sm">
                {t('language.hint')}
              </p>
            </div>
          </div>

          <Select
            value={selectedLanguage}
            onValueChange={value => void changeLanguage(value)}
            disabled={isUpdating}
          >
            <SelectTrigger className="w-full sm:w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ar">{t('language.options.ar')}</SelectItem>
              <SelectItem value="en">{t('language.options.en')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}
