import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get('LANG')?.value || 'en';

  const dashboard = (await import(`./messages/${locale}/dashboard.json`))
    .default;
  const enrollPage = (await import(`./messages/${locale}/enrollPage.json`))
    .default;
  const loginPage = (await import(`./messages/${locale}/loginPage.json`))
    .default;
  const forgetPasswordPage = (
    await import(`./messages/${locale}/forgetPasswordPage.json`)
  ).default;
  const resetPasswordPage = (
    await import(`./messages/${locale}/resetPasswordPage.json`)
  ).default;
  const passwordResetRequested = (
    await import(`./messages/${locale}/passwordResetRequested.json`)
  ).default;
  const landingPage = (await import(`./messages/${locale}/landingPage.json`))
    .default;
  const contact = (await import(`./messages/${locale}/contact.json`)).default;
  const legal = (await import(`./messages/${locale}/legal.json`)).default;
  const cancellationPage = (
    await import(`./messages/${locale}/cancellationPage.json`)
  ).default;
  const refundPage = (await import(`./messages/${locale}/refundPage.json`))
    .default;

  return {
    locale,
    timeZone: 'UTC',
    messages: {
      ...dashboard,
      ...enrollPage,
      ...loginPage,
      ...forgetPasswordPage,
      ...resetPasswordPage,
      ...passwordResetRequested,
      ...landingPage,
      ...contact,
      ...legal,
      ...cancellationPage,
      ...refundPage,
    },
  };
});
