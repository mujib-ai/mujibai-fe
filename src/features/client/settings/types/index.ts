export interface TabItem {
  value: string;
  label: string;
}

export type InvoiceEmailFrequency = 'daily' | 'weekly' | 'monthly' | 'never';

export interface NotificationPreferences {
  emailDailyReports: boolean;
  emailProductUpdates: boolean;
  emailMarketing: boolean;
  emailSecurityAlerts: boolean;
  inAppNewMessages: boolean;
  inAppTaskCompleted: boolean;
  inAppFeatureTips: boolean;
  usageLimitAlerts: boolean;
  billingTaskCompleted: boolean;
  newInvoiceAlerts: boolean;
  invoiceEmailFrequency: InvoiceEmailFrequency;
}
