import { AuthRequestError } from '../services/auth.service';

export type AuthErrorTranslationKey =
  | 'invalidCredentials'
  | 'inactiveAccount'
  | 'tooManyRequests'
  | 'twoFactorSessionExpired'
  | 'twoFactorInvalidCode'
  | 'twoFactorCodeRequired'
  | 'twoFactorAttemptsExceeded'
  | 'authenticationExpired'
  | 'genericLoginError'
  | 'genericVerificationError';

const ERROR_KEYS: Record<string, AuthErrorTranslationKey> = {
  'Invalid email or password.': 'invalidCredentials',
  'This tenant account is not active.': 'inactiveAccount',
  'Invalid or expired 2FA session. Please log in again.':
    'twoFactorSessionExpired',
  'The provided 2FA code is invalid or has expired.': 'twoFactorInvalidCode',
  'A 2FA code is required.': 'twoFactorCodeRequired',
  'Too many failed 2FA attempts. Please log in again.':
    'twoFactorAttemptsExceeded',
  'Invalid or expired authentication token.': 'authenticationExpired',
  'Too many requests. Please try again later.': 'tooManyRequests',
};

export function getLoginErrorTranslationKey(
  error: unknown
): AuthErrorTranslationKey {
  if (!(error instanceof AuthRequestError)) return 'genericLoginError';
  if (error.status === 429) return 'tooManyRequests';
  return (
    ERROR_KEYS[error.message] ??
    (error.status === 401
      ? 'invalidCredentials'
      : error.status === 403
        ? 'inactiveAccount'
        : 'genericLoginError')
  );
}

export function getVerificationErrorTranslationKey(
  error: unknown
): AuthErrorTranslationKey {
  if (!(error instanceof AuthRequestError)) return 'genericVerificationError';
  return (
    ERROR_KEYS[error.message] ??
    (error.status === 429
      ? 'tooManyRequests'
      : error.status >= 500
        ? 'genericVerificationError'
        : 'twoFactorInvalidCode')
  );
}

export function requiresFreshLogin(error: unknown): boolean {
  if (!(error instanceof AuthRequestError)) return false;
  return (
    error.details?.reauthenticate === true ||
    error.message === 'Invalid or expired 2FA session. Please log in again.' ||
    error.message === 'Too many failed 2FA attempts. Please log in again.'
  );
}
