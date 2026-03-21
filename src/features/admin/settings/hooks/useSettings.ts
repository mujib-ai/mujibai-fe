'use client';

import { SETTINGS_CONSTANTS } from '@/shared/constants';
import type { ThemeSettings } from '@/shared/types';
import { useTheme } from 'next-themes';
import React from 'react';

import { useAdminSettings } from './useAdminSettings';

export default function useSettings() {
  const { theme, setTheme } = useTheme();
  const { notifications, updateNotification } = useAdminSettings();

  const updateTheme = React.useCallback(
    (newTheme: ThemeSettings['mode']) => {
      setTheme(newTheme);
    },
    [setTheme]
  );

  return {
    theme: theme || SETTINGS_CONSTANTS.THEMES.SYSTEM,
    notifications,
    updateTheme,
    updateNotification,
  };
}
