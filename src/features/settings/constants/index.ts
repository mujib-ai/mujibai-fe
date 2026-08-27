export const CLIENT_SETTINGS_CONSTANTS = {
  TABS: {
    ACCOUNT_SETTINGS: 'accountSettings',
    INTEGRATION_SETTINGS: 'integrationSettings',
    NOTIFICATION_PREFERENCE: 'notificationPreference',
  },
  TAB_QUERY_VALUES: {
    accountSettings: 'account',
    integrationSettings: 'integrations',
    notificationPreference: 'notifications',
  },
  TAB_QUERY_PARAM: 'tab',
  DEFAULT_ACTIVE_TAB: 'accountSettings',
} as const;

export type SettingsTab =
  (typeof CLIENT_SETTINGS_CONSTANTS.TABS)[keyof typeof CLIENT_SETTINGS_CONSTANTS.TABS];

const QUERY_TO_TAB: Record<string, SettingsTab> = {
  account: CLIENT_SETTINGS_CONSTANTS.TABS.ACCOUNT_SETTINGS,
  integrations: CLIENT_SETTINGS_CONSTANTS.TABS.INTEGRATION_SETTINGS,
  notifications: CLIENT_SETTINGS_CONSTANTS.TABS.NOTIFICATION_PREFERENCE,
  accountSettings: CLIENT_SETTINGS_CONSTANTS.TABS.ACCOUNT_SETTINGS,
  integrationSettings: CLIENT_SETTINGS_CONSTANTS.TABS.INTEGRATION_SETTINGS,
  notificationPreference:
    CLIENT_SETTINGS_CONSTANTS.TABS.NOTIFICATION_PREFERENCE,
};

export function getSettingsTabFromQuery(value: string | null): SettingsTab {
  return value
    ? (QUERY_TO_TAB[value] ?? CLIENT_SETTINGS_CONSTANTS.DEFAULT_ACTIVE_TAB)
    : CLIENT_SETTINGS_CONSTANTS.DEFAULT_ACTIVE_TAB;
}

export function getSettingsTabQueryValue(tab: string): string {
  return (
    CLIENT_SETTINGS_CONSTANTS.TAB_QUERY_VALUES[tab as SettingsTab] ??
    CLIENT_SETTINGS_CONSTANTS.TAB_QUERY_VALUES.accountSettings
  );
}
