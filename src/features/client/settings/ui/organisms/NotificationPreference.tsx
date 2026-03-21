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

import { NotificationController } from '../molecules';

export function NotificationPreference() {
  const t = useTranslations('settings.notificationPreference');
  const [selected, setSelected] = useState('Daily');
  const options = [
    t('newInvoice.daily'),
    t('newInvoice.weekly'),
    t('newInvoice.monthly'),
    t('newInvoice.never'),
  ];

  return (
    <div>
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t('emailsNotifications.title')}
          </CardTitle>
          <CardDescription>{t('emailsNotifications.subTitle')}</CardDescription>
        </CardHeader>
        <CardContent className="rounded-xl bg-white py-6 dark:bg-[#00143473]">
          <NotificationController
            title={t('emailsNotifications.dailyPerformanceReportsTitle')}
            description={t(
              'emailsNotifications.dailyPerformanceReportsSubTitle'
            )}
          />
          <NotificationController
            title={t('emailsNotifications.productUpdatesTitle')}
            description={t('emailsNotifications.productUpdatesSubTitle')}
          />
          <NotificationController
            title={t('emailsNotifications.marketingTitle')}
            description={t('emailsNotifications.marketingSubTitle')}
          />
          <NotificationController
            title={t('emailsNotifications.securityTitle')}
            description={t('emailsNotifications.securitySubTitle')}
          />
        </CardContent>
      </Card>

      <Card className="shadow-none border-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t('inAppNotifications.title')}
          </CardTitle>
          <CardDescription>{t('inAppNotifications.subTitle')}</CardDescription>
        </CardHeader>
        <CardContent className="rounded-xl bg-white py-6 dark:bg-[#00143473]">
          <NotificationController
            title={t('inAppNotifications.newMessageTitle')}
            description={t('inAppNotifications.newMessageSubTitle')}
          />
          <NotificationController
            title={t('inAppNotifications.taskCompletionTitle')}
            description={t('inAppNotifications.taskCompletionSubTitle')}
          />
          <NotificationController
            title={t('inAppNotifications.featureUsageTipsTitle')}
            description={t('inAppNotifications.featureUsageTipsSubTitle')}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 items-start justify-start gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card className="border-none bg-transparent shadow-none">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {t('usageBilling.title')}
            </CardTitle>
            <CardDescription>{t('usageBilling.subTitle')}</CardDescription>
          </CardHeader>
          <CardContent className="rounded-xl bg-white py-6 dark:bg-[#00143473]">
            <NotificationController
              title={t('usageBilling.usageExceedsTitle')}
              description={t('usageBilling.usageExceedsSubTitle')}
            />
            <NotificationController
              title={t('usageBilling.taskCompletionAlertsTitle')}
              description={t('usageBilling.taskCompletionAlertsSubTitle')}
            />
            <NotificationController
              title={t('usageBilling.newInvoiceTitle')}
              description={t('usageBilling.newInvoiceSubTitle')}
            />
          </CardContent>
        </Card>
        <Card className="border-none bg-transparent shadow-none">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {t('newInvoice.title')}
            </CardTitle>
            <CardDescription>{t('newInvoice.subTitle')}</CardDescription>
          </CardHeader>
          <CardContent className="rounded-xl bg-white py-6 dark:bg-[#00143473]">
            <div className="flex flex-col gap-4">
              <Label className="text-base font-medium text-white">
                {t('newInvoice.chooseYourPreference')}
              </Label>

              <div className="grid grid-cols-2 gap-4">
                {options.map((option) => (
                  <label
                    key={option}
                    className={`flex h-20 cursor-pointer items-center gap-4 rounded-2xl px-5 transition-all duration-200 ${
                      selected === option
                        ? 'border border-[#06B6D4] bg-[#3B82F633]'
                        : 'border border-transparent bg-[#3B82F614] hover:border-[#3B82F640]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="frequency"
                      value={option}
                      checked={selected === option}
                      onChange={() => setSelected(option)}
                      className="relative h-5 w-5 appearance-none rounded-full border-2 border-[#06B6D4] transition-all duration-200 before:absolute before:inset-1 before:rounded-full before:bg-[#06B6D4] before:content-[''] checked:border-[#06B6D4] checked:bg-[#06B6D4] checked:before:bg-white"
                    />
                    <span className="text-[16px] font-normal">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
