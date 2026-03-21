export interface UpdateAdminSettingsPayload {
  browserNotifications?: boolean;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
}

export interface NotificationSettingsData {
  email: boolean;
  sms: boolean;
  browser: boolean;
}

import type { ComponentType, ReactNode } from 'react';

export interface ThemeOption {
  label: string;
  value: 'light' | 'dark' | 'system';
  Icon: ComponentType<{ className?: string; fill?: string }>;
}

export interface ThemeOptionCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  isSelected: boolean;
  onChange: () => void;
}

export interface NotificationToggleRowProps {
  label: string;
  checked: boolean;
  onCheckedChange: (enabled: boolean) => void;
}

export interface ThemeSettingsProps {
  theme: string;
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
  options: ThemeOption[];
}

export interface NotificationSettingsProps {
  notifications: NotificationSettingsData;
  onNotificationChange: (
    type: keyof NotificationSettingsData,
    enabled: boolean
  ) => void;
}

export interface SettingsOrganismProps {
  theme: string;
  notifications: NotificationSettingsData;
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
  onNotificationChange: (
    type: 'email' | 'sms' | 'browser',
    enabled: boolean
  ) => void;
}
