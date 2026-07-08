export const SETTINGS_CONSTANTS = {
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
  } as const,

  NOTIFICATION_TYPES: {
    EMAIL: 'email',
    SMS: 'sms',
    BROWSER: 'browser',
  } as const,

  DEFAULT_NOTIFICATION_SETTINGS: {
    email: true,
    sms: false,
    browser: true,
    marketing: false,
    security: true,
    updates: true,
  } as const,

  CLIENT_SETTINGS_TABS: {
    ACCOUNT_SETTINGS: 'accountSettings',
    INTEGRATION_SETTINGS: 'integrationSettings',
    NOTIFICATION_PREFERENCE: 'notificationPreference',
  } as const,

  DEFAULT_ACTIVE_TAB: 'accountSettings',
} as const;

export type Theme =
  (typeof SETTINGS_CONSTANTS.THEMES)[keyof typeof SETTINGS_CONSTANTS.THEMES];
export type NotificationType =
  (typeof SETTINGS_CONSTANTS.NOTIFICATION_TYPES)[keyof typeof SETTINGS_CONSTANTS.NOTIFICATION_TYPES];
export type ClientSettingsTab =
  (typeof SETTINGS_CONSTANTS.CLIENT_SETTINGS_TABS)[keyof typeof SETTINGS_CONSTANTS.CLIENT_SETTINGS_TABS];
