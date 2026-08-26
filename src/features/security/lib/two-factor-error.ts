import { isAxiosError } from 'axios';

export type TwoFactorErrorTranslationKey =
  | 'errors.alreadyEnabled'
  | 'errors.secretRequired'
  | 'errors.codeRequired'
  | 'errors.invalidOrExpired'
  | 'errors.notEnabled'
  | 'errors.rateLimit'
  | 'errors.setupFailed'
  | 'errors.enableFailed'
  | 'errors.disableFailed';

const ERROR_TRANSLATION_KEYS: Record<string, TwoFactorErrorTranslationKey> = {
  'Two-factor authentication is already enabled.': 'errors.alreadyEnabled',
  'Please generate a 2FA secret before enabling.': 'errors.secretRequired',
  'A 2FA code is required.': 'errors.codeRequired',
  'The provided 2FA code is invalid or has expired.': 'errors.invalidOrExpired',
  'Two-factor authentication is not enabled.': 'errors.notEnabled',
  'Rate limit exceeded (3/minute)': 'errors.rateLimit',
  'Too many requests. Please try again later.': 'errors.rateLimit',
};

export function getTwoFactorErrorTranslationKey(
  error: unknown,
  fallback: TwoFactorErrorTranslationKey
): TwoFactorErrorTranslationKey {
  if (!isAxiosError<{ detail?: unknown; message?: unknown }>(error)) {
    return fallback;
  }

  if (error.response?.status === 429) return 'errors.rateLimit';

  const data = error.response?.data;
  const serverMessage = data?.detail ?? data?.message;

  return typeof serverMessage === 'string'
    ? (ERROR_TRANSLATION_KEYS[serverMessage] ?? fallback)
    : fallback;
}
