'use client';

import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';

import type { ThemeOption, ThemeSettingsProps } from '../../types';
import { ThemeOptionCard } from '../atoms';

export function ThemeSettings({
  theme,
  onThemeChange,
  options,
}: ThemeSettingsProps) {
  const t = useTranslations('adminSettings.theme');

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {options.map(({ label, value, Icon }) => (
            <ThemeOptionCard
              key={value}
              label={label}
              value={value}
              icon={<Icon className="size-7 text-white" fill="white" />}
              isSelected={theme === value}
              onChange={() => onThemeChange(value)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
