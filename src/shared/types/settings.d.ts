export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  browser: boolean;
  marketing: boolean;
  security: boolean;
  updates: boolean;
}

export interface ThemeSettings {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  accentColor: string;
  fontSize: 'small' | 'medium' | 'large';
}

export interface UserPreferences {
  theme: ThemeSettings;
  notifications: NotificationSettings;
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
}

export interface IntegrationSettings {
  slack?: {
    enabled: boolean;
    webhookUrl?: string;
    channel?: string;
  };
  discord?: {
    enabled: boolean;
    webhookUrl?: string;
    channel?: string;
  };
  email?: {
    enabled: boolean;
    smtp?: {
      host: string;
      port: number;
      secure: boolean;
      auth: {
        user: string;
        pass: string;
      };
    };
  };
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
  };
  allowedIpAddresses: string[];
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'team';
  showEmail: boolean;
  showPhone: boolean;
  dataSharing: boolean;
  analytics: boolean;
}

export interface UpdateSettingsDto {
  theme?: Partial<ThemeSettings>;
  notifications?: Partial<NotificationSettings>;
  language?: string;
  timezone?: string;
  dateFormat?: string;
  timeFormat?: '12h' | '24h';
  integrations?: Partial<IntegrationSettings>;
  security?: Partial<SecuritySettings>;
  privacy?: Partial<PrivacySettings>;
}

export interface SettingsResponse {
  data: UserPreferences;
  message?: string;
}
