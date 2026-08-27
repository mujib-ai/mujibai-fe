import Cookies from 'js-cookie';

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

export function getAccessToken(): string | null {
  return Cookies.get(ACCESS_TOKEN_COOKIE) ?? null;
}

export function storeAuthTokens(
  accessToken: string,
  refreshToken?: string
): void {
  const options = {
    expires: 1,
    path: '/',
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
  };

  Cookies.set(ACCESS_TOKEN_COOKIE, accessToken, options);
  if (refreshToken) {
    Cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
      ...options,
      expires: 7,
    });
  }
}

export function clearAuthTokens(): void {
  Cookies.remove(ACCESS_TOKEN_COOKIE, { path: '/' });
  Cookies.remove(REFRESH_TOKEN_COOKIE, { path: '/' });
}
