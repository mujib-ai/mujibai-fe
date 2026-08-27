export const AUTH_STATE_COOKIE = 'tenant_auth_state';
export const ACCESS_TOKEN_COOKIE = 'access_token';
export const REFRESH_TOKEN_COOKIE = 'refresh_token';
export const TWO_FACTOR_TOKEN_COOKIE = 'two_factor_token';
export const TWO_FACTOR_REDIRECT_COOKIE = 'two_factor_redirect';

export const AUTHENTICATED_MAX_AGE_SECONDS = 60 * 60 * 24;
export const PENDING_TWO_FACTOR_MAX_AGE_SECONDS = 5 * 60;

export const AUTH_COOKIE_NAMES = [
  AUTH_STATE_COOKIE,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  TWO_FACTOR_TOKEN_COOKIE,
  TWO_FACTOR_REDIRECT_COOKIE,
  'app_session',
  'token',
  'session',
] as const;
