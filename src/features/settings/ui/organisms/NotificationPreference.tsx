'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/atoms/ui/card';
import { Label } from '@/shared/components/atoms/ui/label';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { toast } from 'sonner';

import { useNotificationPreferences } from '../../hooks';
import type {
  InvoiceEmailFrequency,
  NotificationPreferences,
} from '../../types';
import { NotificationController } from '../molecules';

const FREQUENCY_OPTIONS: InvoiceEmailFrequency[] = [
  'daily',
  'weekly',
  'monthly',
  'never',
];

export function NotificationPreference() {
  const t = useTranslations('settings.notificationPreference');
  const { preferences, isLoading, updatePreferences } =
    useNotificationPreferences();

  const [overrides, setOverrides] = useState<Partial<NotificationPreferences>>(
    {}
  );

  const values: NotificationPreferences | null = preferences
    ? { ...preferences, ...overrides }
    : null;

  const applyChange = (change: Partial<NotificationPreferences>) => {
    if (!values) {
      return;
    }

    const previousOverrides = overrides;
    const nextValues = { ...values, ...change };

    setOverrides(prev => ({ ...prev, ...change }));

    updatePreferences(nextValues, {
      onError: error => {
        setOverrides(previousOverrides);
        toast.error(getErrorMessage(error, t('saveFailed')));
      },
    });
  };

  const toggle = (key: keyof NotificationPreferences) => (checked: boolean) => {
    applyChange({ [key]: checked });
  };

  return (
    <div>
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {t('emailsNotifications.title')}
          </CardTitle>
          <CardDescription>{t('emailsNotifications.subTitle')}</CardDescription>
        </CardHeader>
        <CardContent className="bg-surface rounded-2xl p-6">
          <NotificationController
            title={t('emailsNotifications.dailyPerformanceReportsTitle')}
            description={t(
              'emailsNotifications.dailyPerformanceReportsSubTitle'
            )}
            checked={values?.emailDailyReports ?? false}
            onCheckedChange={toggle('emailDailyReports')}
            disabled={isLoading}
          />
          <NotificationController
            title={t('emailsNotifications.productUpdatesTitle')}
            description={t('emailsNotifications.productUpdatesSubTitle')}
            checked={values?.emailProductUpdates ?? false}
            onCheckedChange={toggle('emailProductUpdates')}
            disabled={isLoading}
          />
          <NotificationController
            title={t('emailsNotifications.marketingTitle')}
            description={t('emailsNotifications.marketingSubTitle')}
            checked={values?.emailMarketing ?? false}
            onCheckedChange={toggle('emailMarketing')}
            disabled={isLoading}
          />
          <NotificationController
            title={t('emailsNotifications.securityTitle')}
            description={t('emailsNotifications.securitySubTitle')}
            checked={values?.emailSecurityAlerts ?? false}
            onCheckedChange={toggle('emailSecurityAlerts')}
            disabled={isLoading}
          />
        </CardContent>
      </Card>

      <Card className="border-none bg-transparent shadow-none">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {t('inAppNotifications.title')}
          </CardTitle>
          <CardDescription>{t('inAppNotifications.subTitle')}</CardDescription>
        </CardHeader>
        <CardContent className="bg-surface rounded-2xl p-6">
          <NotificationController
            title={t('inAppNotifications.newMessageTitle')}
            description={t('inAppNotifications.newMessageSubTitle')}
            checked={values?.inAppNewMessages ?? false}
            onCheckedChange={toggle('inAppNewMessages')}
            disabled={isLoading}
          />
          <NotificationController
            title={t('inAppNotifications.taskCompletionTitle')}
            description={t('inAppNotifications.taskCompletionSubTitle')}
            checked={values?.inAppTaskCompleted ?? false}
            onCheckedChange={toggle('inAppTaskCompleted')}
            disabled={isLoading}
          />
          <NotificationController
            title={t('inAppNotifications.featureUsageTipsTitle')}
            description={t('inAppNotifications.featureUsageTipsSubTitle')}
            checked={values?.inAppFeatureTips ?? false}
            onCheckedChange={toggle('inAppFeatureTips')}
            disabled={isLoading}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 items-start justify-start gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card className="border-none bg-transparent shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {t('usageBilling.title')}
            </CardTitle>
            <CardDescription>{t('usageBilling.subTitle')}</CardDescription>
          </CardHeader>
          <CardContent className="bg-surface rounded-2xl p-6">
            <NotificationController
              title={t('usageBilling.usageExceedsTitle')}
              description={t('usageBilling.usageExceedsSubTitle')}
              checked={values?.usageLimitAlerts ?? false}
              onCheckedChange={toggle('usageLimitAlerts')}
              disabled={isLoading}
            />
            <NotificationController
              title={t('usageBilling.taskCompletionAlertsTitle')}
              description={t('usageBilling.taskCompletionAlertsSubTitle')}
              checked={values?.billingTaskCompleted ?? false}
              onCheckedChange={toggle('billingTaskCompleted')}
              disabled={isLoading}
            />
            <NotificationController
              title={t('usageBilling.newInvoiceTitle')}
              description={t('usageBilling.newInvoiceSubTitle')}
              checked={values?.newInvoiceAlerts ?? false}
              onCheckedChange={toggle('newInvoiceAlerts')}
              disabled={isLoading}
            />
          </CardContent>
        </Card>
        <Card className="border-none bg-transparent shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {t('newInvoice.title')}
            </CardTitle>
            <CardDescription>{t('newInvoice.subTitle')}</CardDescription>
          </CardHeader>
          <CardContent className="bg-surface rounded-2xl p-6">
            <div className="flex flex-col gap-4">
              <Label className="text-base font-medium">
                {t('newInvoice.chooseYourPreference')}
              </Label>

              <div className="grid grid-cols-2 gap-4">
                {FREQUENCY_OPTIONS.map(option => {
                  const isSelected = values?.invoiceEmailFrequency === option;

                  return (
                    <label
                      key={option}
                      className={`flex h-20 cursor-pointer items-center gap-4 rounded-2xl px-5 transition-all duration-200 ${
                        isSelected
                          ? 'border border-[#06B6D4] bg-[#3B82F633]'
                          : 'border border-transparent bg-[#3B82F614] hover:border-[#3B82F640]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="frequency"
                        value={option}
                        checked={isSelected}
                        onChange={() =>
                          applyChange({ invoiceEmailFrequency: option })
                        }
                        className="relative h-5 w-5 appearance-none rounded-full border-2 border-[#06B6D4] transition-all duration-200 before:absolute before:inset-1 before:rounded-full before:bg-[#06B6D4] before:content-[''] checked:border-[#06B6D4] checked:bg-[#06B6D4] checked:before:bg-white"
                      />
                      <span className="text-[16px] font-normal">
                        {t(`newInvoice.${option}`)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
